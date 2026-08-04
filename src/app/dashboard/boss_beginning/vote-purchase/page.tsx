"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getVotePackages,
  useMyPendingPurchases,
  useCurrentSpotlightWeek,
  useGetNominatedSpotlights,
  useNomineePurchases,
  getArtistSpotlights,
  getBusinessSpotlights,
} from "@/Hooks/api/cms_api";
import { apiPurchaseVotes, apiPayVotePurchase } from "@/Hooks/api/events_api";
import type { VotePackage } from "@/Types/cms";
import { formatDate } from "@/helper/formatDate";
import { resolveMediaUrl, getUserDashboardType } from "@/lib/utils";
import useAuth from "@/Hooks/useAuth";
import Image from "next/image";

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-slate-500 flex-1">{label}</span>
      <span className="font-medium text-gray-600 flex-1">{value}</span>
    </div>
  );
}

// ─── Purchase status badge ─────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    paid: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    canceled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

// ─── Tab enum ───────────────────────────────────────────────────────────

type Tab = "packages" | "spotlight" | "pending" | "history";

// ─── Step tracker ───────────────────────────────────────────────────────

type PurchaseStep = "idle" | "purchasing" | "purchased" | "paying";

// ─── Own spotlight nominee ──────────────────────────────────────────────

interface OwnNominee {
  nomineeId: number;
  spotlightId: number;
  name: string;
  type: "artist" | "business";
  headshot: string;
  votes: number;
}

const VotePurchase = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("packages");
  const [payingId, setPayingId] = useState<number | null>(null);

  // ─── Vote packages ───────────────────────────────────────────────────

  const {
    data: packagesRes,
    isLoading: pkgLoading,
    isError: pkgError,
  } = getVotePackages();
  const { data: pendingRes, isLoading: pendingLoading } =
    useMyPendingPurchases(true);

  const packages: VotePackage[] = packagesRes?.data?.packages ?? [];
  const maxPaidVotes = packagesRes?.data?.max_paid_votes;
  const pendingPurchases: any[] = pendingRes?.data?.purchases ?? [];

  // ─── My own spotlights (role-scoped) ────────────────────────────────
  // The artist / business endpoints are role-scoped, so only call the one
  // matching the user's dashboard — otherwise the backend 403s and the
  // secure axios interceptor (historically) wiped the session.
  const { user: authUser } = useAuth();
  const dashboardType = getUserDashboardType(authUser);
  const isArtistDashboard = dashboardType === "artist_business";
  const isBusinessDashboard = dashboardType === "boss_beginning";

  const { data: artistSpotlightsRes, isLoading: artistOwnedLoading } =
    getArtistSpotlights(undefined, isArtistDashboard);
  const { data: businessSpotlightsRes, isLoading: businessOwnedLoading } =
    getBusinessSpotlights(undefined, isBusinessDashboard);
  const ownedLoading = artistOwnedLoading || businessOwnedLoading;

  const ownedArtistIds = useMemo(
    () => (artistSpotlightsRes?.data?.spotlights ?? []).map((s: any) => s.id),
    [artistSpotlightsRes],
  );
  const ownedBusinessIds = useMemo(
    () => (businessSpotlightsRes?.data?.spotlights ?? []).map((s: any) => s.id),
    [businessSpotlightsRes],
  );

  // ─── Current week + nominated nominees ───────────────────────────────

  const { data: currentWeekRes } = useCurrentSpotlightWeek(true);
  const weekId = currentWeekRes?.data?.week?.id;
  const { data: nominatedArtistRes } = useGetNominatedSpotlights(
    weekId ?? 0,
    "artist",
  );
  const { data: nominatedBusinessRes } = useGetNominatedSpotlights(
    weekId ?? 0,
    "business",
  );

  // Support votes can ONLY be purchased for your own spotlight. The nominee
  // id is derived from the nominated nominee whose spotlight belongs to you.
  const ownNominees: OwnNominee[] = useMemo(() => {
    const mapType = (nominee: any, type: "artist" | "business"): OwnNominee => ({
      nomineeId: nominee.id,
      spotlightId: nominee.spotlight?.id,
      name: nominee.spotlight?.name || "Unknown",
      type,
      headshot: nominee.spotlight?.headshot || "",
      votes: nominee.votes?.total ?? 0,
    });
    const artist = (nominatedArtistRes?.data?.nominees ?? [])
      .filter((n: any) => ownedArtistIds.includes(n?.spotlight?.id))
      .map((n: any) => mapType(n, "artist"));
    const business = (nominatedBusinessRes?.data?.nominees ?? [])
      .filter((n: any) => ownedBusinessIds.includes(n?.spotlight?.id))
      .map((n: any) => mapType(n, "business"));
    return [...artist, ...business];
  }, [
    ownedArtistIds,
    ownedBusinessIds,
    nominatedArtistRes,
    nominatedBusinessRes,
  ]);

  // ─── Purchase history ────────────────────────────────────────────────
  // Collect nominee ids from your current spotlights + pending purchases so
  // history can be fetched even for previous weeks' nominees.
  const historyOptions = useMemo(() => {
    const map = new Map<number, string>();
    for (const n of ownNominees) {
      map.set(n.nomineeId, `${n.name} (${n.type})`);
    }
    for (const p of pendingPurchases) {
      const id = p?.nominee?.id;
      if (id && !map.has(id)) {
        map.set(
          id,
          p?.nominee?.spotlight_name || `Nominee #${id}`,
        );
      }
    }
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [ownNominees, pendingPurchases]);

  const [historyNomineeId, setHistoryNomineeId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (historyNomineeId === null && historyOptions.length > 0) {
      setHistoryNomineeId(historyOptions[0].id);
    }
  }, [historyOptions, historyNomineeId]);

  const { data: historyRes, isLoading: historyLoading } =
    useNomineePurchases(historyNomineeId);

  // ─── Selection ───────────────────────────────────────────────────────

  const [selectedNominee, setSelectedNominee] = useState<OwnNominee | null>(
    null,
  );
  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string | null>(
    null,
  );
  const [selectedPackage, setSelectedPackage] = useState<VotePackage | null>(
    null,
  );
  const [purchaseStep, setPurchaseStep] = useState<PurchaseStep>("idle");

  // ─── Actions ─────────────────────────────────────────────────────────

  const handlePurchase = async () => {
    if (!selectedNominee || !selectedPackageSlug) {
      toast.error("Please select your spotlight and a vote package.");
      return;
    }

    setPurchaseStep("purchasing");

    try {
      const res = await apiPurchaseVotes(
        selectedNominee.nomineeId,
        selectedPackageSlug,
      );
      if (res?.success) {
        toast.success(
          res?.message ||
            "Purchase request submitted! Please wait for admin approval.",
        );
        setPurchaseStep("purchased");
        queryClient.invalidateQueries({ queryKey: ["my-pending-purchases"] });
        queryClient.invalidateQueries({ queryKey: ["nominee-purchases"] });
        // Take the user straight to their purchase requests
        setActiveTab("pending");
      } else {
        toast.error(res?.message || "Failed to initiate purchase.");
        setPurchaseStep("idle");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to initiate purchase.",
      );
      setPurchaseStep("idle");
    }
  };

  const handlePay = async (purchaseId: number) => {
    if (!purchaseId) {
      toast.error("No purchase to pay for.");
      return;
    }

    setPurchaseStep("paying");
    setPayingId(purchaseId);

    try {
      const res = await apiPayVotePurchase(purchaseId);
      if (res?.success && res?.data?.checkout_url) {
        toast.success(res?.message || "Redirecting to payment...");
        queryClient.invalidateQueries({ queryKey: ["my-pending-purchases"] });
        queryClient.invalidateQueries({ queryKey: ["nominee-purchases"] });
        // Redirect the user to the Stripe Checkout session
        window.location.href = res.data.checkout_url;
      } else {
        toast.error(res?.message || "Payment failed.");
        setPurchaseStep("purchased");
        setPayingId(null);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Payment failed.");
      setPurchaseStep("purchased");
      setPayingId(null);
    }
  };

  const payForPurchase = (id: number) => () => {
    handlePay(id);
  };

  const handleSelectPackage = (pkg: VotePackage) => {
    setSelectedPackageSlug(pkg.slug);
    setSelectedPackage(pkg);
    setPurchaseStep("idle");
    // If no spotlight selected yet, switch to the spotlight tab
    if (!selectedNominee) {
      setActiveTab("spotlight");
    }
  };

  const handleSelectNominee = (nominee: OwnNominee) => {
    setSelectedNominee(nominee);
    setPurchaseStep("idle");
    // If no package selected yet, switch to the packages tab
    if (!selectedPackageSlug) {
      setActiveTab("packages");
    }
  };

  const clearSelection = () => {
    setSelectedNominee(null);
    setSelectedPackageSlug(null);
    setSelectedPackage(null);
    setPurchaseStep("idle");
  };

  // ─── Tabs ─────────────────────────────────────────────────────────────

  const tabs: { key: Tab; label: string }[] = [
    { key: "packages", label: "Vote Packages" },
    { key: "spotlight", label: "Your Spotlight" },
    { key: "pending", label: "Purchase Requests" },
    { key: "history", label: "Purchase History" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Vote Purchase</h1>
        <p className="text-sm text-gray-500 mt-1">
          Purchase support votes for your own spotlight nominee.
        </p>
      </div>

      {/* Selection Summary Bar */}
      {(selectedNominee || selectedPackageSlug) && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center gap-4 text-sm">
          <span className="font-medium text-blue-800">Current Selection:</span>
          {selectedNominee && (
            <span className="bg-white px-3 py-1 rounded-full border border-blue-200 text-blue-700 capitalize">
              {selectedNominee.name} ({selectedNominee.type})
            </span>
          )}
          {selectedPackage && (
            <span className="bg-white px-3 py-1 rounded-full border border-blue-200 text-blue-700">
              {selectedPackage.name} — ${selectedPackage.price} (
              {selectedPackage.votes_count} votes)
            </span>
          )}
          {selectedNominee &&
            selectedPackageSlug &&
            (purchaseStep === "idle" || purchaseStep === "purchasing") && (
              <button
                onClick={handlePurchase}
                disabled={purchaseStep === "purchasing"}
                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {purchaseStep === "purchasing"
                  ? "Purchasing..."
                  : "Purchase Now"}
              </button>
            )}
          {purchaseStep === "purchased" && (
            <span className="ml-auto text-green-700 font-medium">
              ✓ Purchase request submitted — pending admin approval
            </span>
          )}
          {purchaseStep === "paying" && (
            <span className="ml-auto text-blue-700 font-medium">
              Redirecting to payment...
            </span>
          )}
          <button
            onClick={clearSelection}
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            Clear
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.key
                ? "bg-white text-blue-600 border border-b-white border-gray-200 -mb-[2px]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Vote Packages ─────────────────────────────────────── */}
      {activeTab === "packages" && (
        <div>
          {maxPaidVotes !== undefined && (
            <div className="mb-5 text-sm text-gray-500">
              Max paid votes per nominee:{" "}
              <span className="font-semibold text-gray-700">
                {maxPaidVotes}
              </span>
            </div>
          )}

          {pkgLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 md:p-6 animate-pulse space-y-5"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded w-full" />
                  <div className="h-10 bg-gray-200 rounded w-1/2 mt-6" />
                </div>
              ))}
            </div>
          ) : pkgError ? (
            <div className="text-center py-10">
              <p className="text-red-500">
                Failed to load vote packages. Please try again.
              </p>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No vote packages available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {packages.map((pkg: VotePackage) => {
                const isSelected = selectedPackageSlug === pkg.slug;
                return (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-2xl p-5 md:p-6 flex flex-col border-2 transition-colors ${
                      isSelected
                        ? "border-blue-500 shadow-md"
                        : "border-transparent shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="flex-1 space-y-5">
                      <Row label="Package Name" value={pkg.name} />
                      <Row label="Vote Count" value={pkg.votes_count} />
                      <Row label="Price" value={`$${pkg.price}`} />
                      {pkg.description && (
                        <div className="flex items-start gap-1">
                          <span className="text-slate-500 flex-1">
                            Description
                          </span>
                          <span className="font-medium text-gray-600 leading-relaxed flex-1 text-sm">
                            {pkg.description}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectPackage(pkg)}
                      className={`mt-6 text-white text-sm font-medium px-7 py-2.5 rounded-full self-start transition-colors ${
                        isSelected
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {isSelected ? "Selected" : "Select Package"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Your Spotlight ────────────────────────────────────── */}
      {activeTab === "spotlight" && (
        <div>
          <p className="text-sm text-gray-500 mb-5">
            Support votes can only be purchased for your own nominated
            spotlight.
          </p>

          {ownedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 animate-pulse h-24"
                />
              ))}
            </div>
          ) : ownNominees.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-4xl mb-3">🏆</p>
              <p className="text-gray-700 font-medium">
                No nominated spotlight found
              </p>
              <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                You can only purchase votes for your own spotlight once it has
                been nominated in the current week. Apply or check back when
                voting opens.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownNominees.map(nominee => {
                const isSelected =
                  selectedNominee?.nomineeId === nominee.nomineeId;
                const image = resolveMediaUrl(nominee.headshot);
                return (
                  <div
                    key={`${nominee.type}-${nominee.spotlightId}`}
                    className={`bg-white rounded-xl p-4 flex items-center gap-4 border-2 cursor-pointer transition-colors ${
                      isSelected
                        ? "border-blue-500 shadow-md"
                        : "border-gray-100 hover:border-gray-200 shadow-sm"
                    }`}
                    onClick={() => handleSelectNominee(nominee)}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-gray-100">
                      {image ? (
                        <Image
                          src={image}
                          alt={nominee.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-700 font-bold text-lg">
                          {nominee.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">
                          {nominee.name}
                        </h3>
                        <span className="text-[10px] uppercase tracking-wide bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full shrink-0">
                          {nominee.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Your spotlight — nominated this week
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold text-blue-600">
                        {nominee.votes.toLocaleString()} votes
                      </div>
                      {isSelected && (
                        <div className="text-xs text-green-600 font-medium mt-1">
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Purchase History ──────────────────────────────────── */}
      {activeTab === "history" && (
        <div>
          {historyOptions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-700 font-medium">
                No purchase history yet
              </p>
              <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                Your purchased support votes will appear here once you buy a
                vote package for your spotlight.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {historyOptions.length > 1 && (
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500 font-medium">
                    Spotlight:
                  </label>
                  <select
                    value={historyNomineeId ?? ""}
                    onChange={e =>
                      setHistoryNomineeId(Number(e.target.value))
                    }
                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {historyOptions.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {historyLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-5 animate-pulse h-24"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {/* Summary stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                      <p className="text-sm text-gray-500">Paid votes</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {historyRes?.data?.paid_vote_count ?? 0}
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                      <p className="text-sm text-gray-500">Remaining slots</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {historyRes?.data?.remaining_slots ?? 0}
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                      <p className="text-sm text-gray-500">Paid votes cap</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {historyRes?.data?.cap_reached
                          ? "Reached"
                          : "Not reached"}
                      </p>
                    </div>
                  </div>

                  {/* Purchase records */}
                  {!historyRes?.data?.purchases ||
                  historyRes.data.purchases.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-gray-500">
                        No purchases yet for this spotlight.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {historyRes.data.purchases.map((p: any) => (
                        <div
                          key={p.id}
                          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold shrink-0">
                                {(p.nominee?.spotlight_name || "?")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900">
                                    {p.nominee?.spotlight_name || "Unknown"}
                                  </p>
                                  <span className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                    {p.nominee?.spotlight_type ||
                                      "spotlight"}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {p.package_name} — {p.votes_count} votes — $
                                  {p.amount_paid}
                                </p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <StatusBadge status={p.status} />
                                  {p.status === "paid" && p.paid_at && (
                                    <span className="text-xs text-gray-400">
                                      Paid {formatDate(p.paid_at)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {p.can_pay && (
                              <button
                                onClick={payForPurchase(p.id)}
                                disabled={payingId === p.id}
                                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
                              >
                                {payingId === p.id
                                  ? "Redirecting..."
                                  : "Pay Now"}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Purchase Requests (pending) ──────────────────────── */}
      {activeTab === "pending" && (
        <div>
          {pendingLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading pending purchases...</p>
            </div>
          ) : pendingPurchases.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No pending purchases found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPurchases.map((purchase: any) => (
                <div
                  key={purchase.id}
                  className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder (nominee has no headshot in this response) */}
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold shrink-0">
                        {(purchase.nominee?.spotlight_name || "?")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">
                            {purchase.nominee?.spotlight_name || "Unknown"}
                          </p>
                          <span className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            {purchase.nominee?.spotlight_type || "spotlight"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {purchase.package_name} — {purchase.votes_count}{" "}
                          votes — ${purchase.amount_paid}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <StatusBadge status={purchase.status} />
                          {purchase.status === "pending" &&
                            !purchase.can_pay && (
                              <span className="text-xs text-gray-400">
                                Awaiting approval
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={payForPurchase(purchase.id)}
                      disabled={!purchase.can_pay || payingId === purchase.id}
                      className={`text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors disabled:cursor-not-allowed ${
                        purchase.can_pay
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-300 text-gray-500"
                      }`}
                    >
                      {payingId === purchase.id
                        ? "Redirecting..."
                        : "Pay Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VotePurchase;
