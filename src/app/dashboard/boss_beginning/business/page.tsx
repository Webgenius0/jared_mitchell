"use client";

import React, { useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Globe,
  Building2,
  User,
  Play,
  Loader2,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/Components/Common/Modal";
import StatusBadge from "@/Components/Common/StatusBadge";
import ApplyContestModal from "@/Components/Common/ApplyContestModal";
import {
  useGetAllBusinesses,
  useGetBusinessDetails,
  useDeleteBusiness,
} from "@/Hooks/api/dashboard_api";
import {
  extractWebsite,
  formatStatus,
  isHtmlString,
  mapApiBusiness,
  richTextToPlainText,
  sanitizeRichText,
  type Business,
  type MediaItem,
} from "@/lib/business";
import { useQueryClient } from "@tanstack/react-query";

function InfoCard({ title, body }: { title: string; body?: string }) {
  const hasContent = !!body && body.trim().length > 0;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5">
      <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      {hasContent ? (
        isHtmlString(body) ? (
          /* Rich text editor output — display as HTML */
          <div
            className="rich-text-body text-xs md:text-sm text-slate-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeRichText(body) }}
          />
        ) : (
          /* Plain string — display as text */
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {body}
          </p>
        )
      ) : (
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
          No data provided.
        </p>
      )}
    </div>
  );
}

const columns = [
  "Business name",
  "Owner name",
  "Story",
  "Website link",
  "Date",
  "Status",
  "Actions",
];

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [viewingBusinessId, setViewingBusinessId] = useState<string | null>(
    null,
  );
  const [deletingBusiness, setDeletingBusiness] = useState<Business | null>(
    null,
  );
  const [applyingBusiness, setApplyingBusiness] = useState<Business | null>(
    null,
  );

  const { data: apiData, isLoading } = useGetAllBusinesses();
  const {
    data: detailsData,
    isLoading: isLoadingDetails,
  } = useGetBusinessDetails(viewingBusinessId);
  const { mutateAsync: deleteBusiness, isPending: isDeleting } =
    useDeleteBusiness();

  const businesses: Business[] =
    apiData?.data?.businesses?.map(mapApiBusiness) || [];

  const details = detailsData?.data;

  const handleView = (b: Business) => setViewingBusinessId(b.id);

  const handleEdit = (b: Business) => {
    const data = {
      businessName: b.businessName,
      ownerName: b.ownerName,
      story: b.story,
      mission: b.mission ?? "",
      website: b.websiteLink,
      communityImpact: b.communityImpact ?? "",
      revenueStage: b.revenueStage ?? "",
      whyCompete: b.whyCompete ?? "",
      existingMedia: b.gallery ?? [],
    };
    sessionStorage.setItem("editBusinessData", JSON.stringify(data));
    router.push(
      `/dashboard/boss_beginning/business/create-business?editId=${b.id}`,
    );
  };

  const handleDelete = (b: Business) => setDeletingBusiness(b);
  const confirmDelete = async () => {
    if (!deletingBusiness) return;
    await deleteBusiness(
      {
        endpoint: `/v1/businesses/delete/${deletingBusiness.id}`,
      },
      {
        onSuccess: (res: any) => {
          if (res?.success) {
            setDeletingBusiness(null);
            queryClient.invalidateQueries({ queryKey: ["all-businesses"] });
          }
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <div className=" bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Business list
          </h1>
          <Link href={"/dashboard/boss_beginning/business/create-business"}>
            <button
              type="button"
              className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              <span className="ml-3 text-sm text-slate-500">
                Loading businesses...
              </span>
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-20 text-sm text-slate-400">
              No businesses found.
            </div>
          ) : (
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  {columns.map(col => (
                    <th
                      key={col}
                      className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {businesses.map(b => (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {b.businessName}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.ownerName}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap max-w-[200px] truncate">
                      {b.story ? richTextToPlainText(b.story) : "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap max-w-[160px] truncate">
                      {b.websiteLink || "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.date}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          type="button"
                          title="View"
                          onClick={() => handleView(b)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => handleEdit(b)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(b)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          title="Apply to contest"
                          onClick={() => setApplyingBusiness(b)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500 text-white text-xs md:text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Apply
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deletingBusiness}
        onClose={() => setDeletingBusiness(null)}
        title="Delete Business"
        className="max-w-md"
      >
        <div className="mt-4 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
            Are you sure?
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
            This will permanently delete{" "}
            <span className="font-medium text-slate-700">
              {deletingBusiness?.businessName}
            </span>
            . This action cannot be undone.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setDeletingBusiness(null)}
              disabled={isDeleting}
              className="text-sm font-medium px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="text-sm font-medium px-6 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Apply to Contest Modal (mounted only while applying so its queries don't fire on page load) */}
      {applyingBusiness && (
        <ApplyContestModal
          open
          onClose={() => setApplyingBusiness(null)}
          businessId={applyingBusiness.id}
          businessName={applyingBusiness.businessName}
        />
      )}

      {/* View Modal */}
      <Modal
        open={!!viewingBusinessId}
        onClose={() => setViewingBusinessId(null)}
        title="Business Details"
      >
        {isLoadingDetails ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="ml-3 text-sm text-slate-500">
              Loading details...
            </span>
          </div>
        ) : details ? (
          <div className="space-y-5 mt-2 max-h-[70vh] overflow-y-auto pr-1">
            {/* Header: business + owner */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 md:w-[18px] md:h-[18px] text-slate-400" />
                <span className="text-sm md:text-base font-medium text-slate-800">
                  {details.business_name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 md:w-[18px] md:h-[18px] text-slate-400" />
                <span className="text-sm md:text-base text-slate-600">
                  {details.owner_founder_name}
                </span>
              </div>
            </div>

            {/* Story + Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard title="Story" body={details.story} />
              <InfoCard title="Mission" body={details.mission} />
            </div>

            {/* Website / social media */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1.5">
                Website/social media
              </h3>
              <a
                href={extractWebsite(details.website_social_media)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs md:text-sm text-blue-500 hover:underline break-all"
              >
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                {extractWebsite(details.website_social_media)}
              </a>
            </div>

            {/* Media gallery */}
            {details.media && details.media.length > 0 && (
              <div>
                <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">
                  Media
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {details.media.map((item: MediaItem, i: number) => {
                    const src = item.url;
                    return (
                      <div
                        key={item.id || i}
                        className="aspect-square overflow-hidden border border-slate-200 bg-slate-50"
                      >
                        {item.mime_type?.startsWith("video/") ? (
                          <video
                            src={src}
                            className="w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <img
                            src={src}
                            alt={item.file_name || `Media ${i + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stacked full-width sections */}
            <InfoCard
              title="Community impact statement"
              body={details.community_impact_statement}
            />
            <InfoCard
              title="Revenue stage"
              body={details.revenue_stage}
            />
            <InfoCard
              title="Why they deserve to compete"
              body={details.why_they_deserve_to_compete}
            />

            {/* Date + Status */}
            <div className="flex items-center gap-6 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-slate-500">Date</span>
                <span className="text-xs md:text-sm font-medium text-slate-800">
                  {details.created_at
                    ? new Date(details.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "—"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-slate-500">
                  Status
                </span>
                <StatusBadge
                  status={formatStatus(details.status)}
                />
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
