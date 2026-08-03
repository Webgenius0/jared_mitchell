"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCMSAboutData,
  getEventBySlug,
  useEventRegister,
} from "@/Hooks/api/cms_api";
import { CMSEventItem, EventTicketTier } from "@/Types/cms";
import { PageLoader } from "@/Shared/PageLoader";
import EventDetailsBanner from "../../_Components/Eventsdetails/EventDetailsBanner";
import { IoIosArrowDown } from "react-icons/io";
import Sponsors from "@/app/(main)/_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import useAuth from "@/Hooks/useAuth";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";

export default function BuyTicketPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { user, token, setToken } = useAuth();

  const { data, isLoading, error } = getEventBySlug(slug ?? "");
  const { mutate: registerEvent, isPending } = useEventRegister();

  const event = data?.data as CMSEventItem | undefined;

  // ── Form state ──────────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tierId, setTierId] = useState<number | "">("");
  const [quantity, setQuantity] = useState(1);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Clear an inline error for a given field
  const clearError = (field: string) => {
    setErrors(prev => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // ── Derived helpers ──────────────────────────────────────────────────────────
  const activeTiers = useMemo(
    () => event?.ticket_tiers?.filter(t => t.is_active) ?? [],
    [event],
  );

  const selectedTier: EventTicketTier | undefined = useMemo(
    () => activeTiers.find(t => t.id === tierId),
    [activeTiers, tierId],
  );
  const { data: cmsRes } = getCMSAboutData();
  const CmsData = cmsRes?.data;

  const subtotal = selectedTier ? parseFloat(selectedTier.price) * quantity : 0;
  const serviceFee = selectedTier
    ? parseFloat(selectedTier.service_fee) * quantity
    : 0;
  const total = subtotal + serviceFee;

  const formatDateRange = (start: string, end: string, tz: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const date = s.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: tz,
    });
    const startTime = s.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
    const endTime = e.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });
    return { date, timeRange: `${startTime} - ${endTime} ${tz}` };
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!tierId) {
      newErrors.ticket_tier = "Please select a Ticket type.";
    }
    if (!firstName.trim()) {
      newErrors.first_name = "First name is required.";
    }
    if (!lastName.trim()) {
      newErrors.last_name = "Last name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) {
      newErrors.phone_number = "Phone number is required.";
    }

    if (!user) {
      if (!password) {
        newErrors.password = "Please enter a password.";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }
      if (!confirmPassword) {
        newErrors.confirm_password = "Please confirm your password.";
      } else if (password !== confirmPassword) {
        newErrors.confirm_password = "Passwords do not match.";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateFields();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const payload: Record<string, any> = {
      event_id: event?.id,
      ticket_tier_id: tierId,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      quantity,
    };

    if (user && token) {
      payload.token = token;
    } else {
      payload.password = password;
      payload.password_confirmation = confirmPassword;
    }

    registerEvent(payload, {
      onSuccess: (res: any) => {
        if (res?.success) {

          if (res?.data?.token) {
            setToken(res.data.token);
          }

          const checkoutUrl = res?.data?.checkout_url;
          if (checkoutUrl) {
            window.location.href = checkoutUrl;
          } else {
            router.push(`/events/${slug}`);
          }
        }
      },
    });
  };

  if (isLoading) return <PageLoader />;

  if (error || !event) {
    return (
      <section className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Event Not Found
          </h2>
          <a href="/events" className="text-[#1977DD] underline">
            Browse Events
          </a>
        </div>
      </section>
    );
  }

  const { date, timeRange } = formatDateRange(
    event.starts_at,
    event.ends_at,
    event.timezone,
  );

  return (
    <>
      <EventDetailsBanner event={event} />

      <section className="py-10 xl:py-16 ">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-[70%] bg-gray-100 rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-5xl font-bold text-gray-900 mb-7">
                Attendee Information
              </h2>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Name row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="first_name"
                      type="text"
                      required
                      placeholder="John"
                      value={firstName}
                      aria-invalid={Boolean(errors.first_name)}
                      onChange={e => {
                        setFirstName(e.target.value);
                        clearError("first_name");
                      }}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition ${
                        errors.first_name
                          ? "border-red-400 bg-red-50/40 focus:ring-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.first_name && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.first_name}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="last_name"
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      aria-invalid={Boolean(errors.last_name)}
                      onChange={e => {
                        setLastName(e.target.value);
                        clearError("last_name");
                      }}
                      className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition ${
                        errors.last_name
                          ? "border-red-400 bg-red-50/40 focus:ring-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.last_name && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.last_name}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={email}
                    aria-invalid={Boolean(errors.email)}
                    onChange={e => {
                      setEmail(e.target.value);
                      clearError("email");
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition ${
                      errors.email
                        ? "border-red-400 bg-red-50/40 focus:ring-red-300"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone_number"
                    type="tel"
                    required
                    placeholder="+1 (555) 123-4567"
                    value={phone}
                    aria-invalid={Boolean(errors.phone_number)}
                    onChange={e => {
                      setPhone(e.target.value);
                      clearError("phone_number");
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition ${
                      errors.phone_number
                        ? "border-red-400 bg-red-50/40 focus:ring-red-300"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.phone_number && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.phone_number}</p>
                  )}
                </div>

                {/* ── Password fields for guest users ──────────────────────── */}
                {!user && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required={!user}
                          placeholder="Create a password"
                          value={password}
                          aria-invalid={Boolean(errors.password)}
                          onChange={e => {
                            setPassword(e.target.value);
                            clearError("password");
                            clearError("confirm_password");
                          }}
                          className={`w-full px-4 py-2.5 pr-10 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition ${
                            errors.password
                              ? "border-red-400 bg-red-50/40 focus:ring-red-300"
                              : "border-gray-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(prev => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <IoEyeOutline className="size-5" />
                          ) : (
                            <VscEyeClosed className="size-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="confirm_password"
                          type={showConfirmPassword ? "text" : "password"}
                          required={!user}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          aria-invalid={Boolean(errors.confirm_password)}
                          onChange={e => {
                            setConfirmPassword(e.target.value);
                            clearError("confirm_password");
                            clearError("password");
                          }}
                          className={`w-full px-4 py-2.5 pr-10 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition ${
                            errors.confirm_password
                              ? "border-red-400 bg-red-50/40 focus:ring-red-300"
                              : "border-gray-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(prev => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <IoEyeOutline className="size-5" />
                          ) : (
                            <VscEyeClosed className="size-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirm_password && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.confirm_password}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Ticket type — selectable cards */}
                <div>
                  <label className="block text-[15px] font-semibold text-gray-800 mb-2">
                    Ticket type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="ticket_tier"
                      value={tierId}
                      aria-invalid={Boolean(errors.ticket_tier)}
                      onChange={e => {
                        setTierId(e.target.value ? Number(e.target.value) : "");
                        clearError("ticket_tier");
                      }}
                      className={`w-full appearance-none px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 text-sm transition pr-10 cursor-pointer ${
                        errors.ticket_tier
                          ? "border-red-400 bg-red-50/40 focus:ring-red-300 focus:border-red-400"
                          : "border-gray-200"
                      }`}
                    >
                      <option value="" disabled>
                        Select Ticket type
                      </option>
                      {activeTiers.map(tier => (
                        <option key={tier.id} value={tier.id}>
                          {tier.name} —{" "}
                          {parseFloat(tier.price) === 0
                            ? "Free"
                            : `$${parseFloat(tier.price).toFixed(2)}`}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                      <IoIosArrowDown />
                    </span>
                  </div>
                  {errors.ticket_tier && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.ticket_tier}</p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={e => setQuantity(Number(e.target.value))}
                      className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1977DD] focus:border-transparent text-gray-800 text-sm transition pr-10 cursor-pointer"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                      <IoIosArrowDown />
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="complete_booking_btn"
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#1977DD] text-white py-3.5 rounded-xl font-normal text-base hover:bg-[#1565C0] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1 shadow-md"
                >
                  {isPending ? "Processing…" : "Complete Booking"}
                </button>
              </form>
            </div>

            <div className="w-full lg:w-[30%] bg-gray-100 rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:sticky lg:top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                {/* Date */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-medium text-black shrink-0">
                    Date
                  </span>
                  <span className="text-gray-800 text-right">{date}</span>
                </div>
                {/* Time */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-medium text-black shrink-0">
                    Time
                  </span>
                  <span className="text-gray-800 text-right">{timeRange}</span>
                </div>
                {/* Location */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-medium text-black  shrink-0">
                    Location
                  </span>
                  <span className="text-gray-800 text-right">
                    {event.city}, {event.state}
                  </span>
                </div>

                <hr className="border-gray-100 my-2" />

                {/* Ticket row */}
                {selectedTier && (
                  <>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="font-medium text-gray-800">
                          {selectedTier.name}
                        </span>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Qty: {quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900 shrink-0">
                        {parseFloat(selectedTier.price) === 0
                          ? "Free"
                          : `$${(parseFloat(selectedTier.price) * quantity).toFixed(2)}`}
                      </span>
                    </div>
                    <hr className="border-gray-100 my-1" />
                  </>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center gap-4 text-black">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Service fee */}
                <div className="flex justify-between items-center gap-4 text-black">
                  <span>
                    Service Fee{" "}
                    {selectedTier && parseFloat(selectedTier.service_fee) > 0
                      ? `(${(
                          (parseFloat(selectedTier.service_fee) /
                            parseFloat(selectedTier.price)) *
                          100
                        ).toFixed(0)}%)`
                      : ""}
                  </span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>

                <hr className="border-gray-200 my-2" />

                {/* Total */}
                <div className="flex justify-between items-center gap-4 text-base font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#1977DD] text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
}
