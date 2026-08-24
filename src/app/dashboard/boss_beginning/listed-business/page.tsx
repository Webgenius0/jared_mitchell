"use client";
import { useState } from "react";
import { Globe, Building2, User, Play, Loader2, Eye } from "lucide-react";
import Modal from "@/Components/Common/Modal";
import StatusBadge from "@/Components/Common/StatusBadge";
import Image from "next/image";
import { useGetAllBusinesses } from "@/Hooks/api/dashboard_api";
import {
  isHtmlString,
  mapApiBusiness,
  richTextToPlainText,
  sanitizeRichText,
  type Business,
} from "@/lib/business";

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
  "Registration Date",
  "Status",
  "Actions",
];

export default function Page() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );
  const [applySuccessOpen, setApplySuccessOpen] = useState(false);

  const { data: apiData, isLoading } = useGetAllBusinesses();

  const businesses: Business[] =
    apiData?.data?.businesses?.map(mapApiBusiness) || [];

  return (
    <div className="">
      <div className=" bg-white rounded-2xl border border-slate-100 overflow-hidden">
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
                  {columns.map((col) => (
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
                {businesses.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {b.businessName || "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.ownerName || "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap max-w-[200px] truncate">
                      {b.story ? richTextToPlainText(b.story) : "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap max-w-[160px] truncate">
                      {b.websiteLink || "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {b.date || "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          title="View"
                          onClick={() => setSelectedBusiness(b)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          onClick={() => setApplySuccessOpen(true)}
                          className="bg-primary-blue text-white px-7 py-2 text-sm rounded-full cursor-pointer"
                        >
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

      {/* View Modal */}
      <Modal
        open={!!selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        title="Business Details"
      >
        {selectedBusiness && (
          <div className="space-y-5 mt-2">
            {/* Header: business + owner */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 md:w-[18px] md:h-[18px] text-slate-400" />
                <span className="text-sm md:text-base font-medium text-slate-800">
                  {selectedBusiness.businessName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 md:w-[18px] md:h-[18px] text-slate-400" />
                <span className="text-sm md:text-base text-slate-600">
                  {selectedBusiness.ownerName}
                </span>
              </div>
            </div>

            {/* Story + Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard title="Story" body={selectedBusiness.story} />
              <InfoCard title="Mission" body={selectedBusiness.mission} />
            </div>

            {/* Website / social media */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1.5">
                Website/social media
              </h3>
              <a
                href={selectedBusiness.websiteLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs md:text-sm text-blue-500 hover:underline"
              >
                <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {selectedBusiness.websiteLink}
              </a>
            </div>

            {/* Video + gallery */}
            {(selectedBusiness.videoThumbnail ||
              (selectedBusiness.gallery &&
                selectedBusiness.gallery.length > 0)) && (
              <div>
                <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">
                  Video
                </h3>

                {selectedBusiness.videoThumbnail && (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200">
                    <img
                      src={selectedBusiness.videoThumbnail}
                      alt="Video thumbnail"
                      className="w-full  object-cover"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Play
                          className="w-5 h-5 md:w-6 md:h-6 text-slate-800 ml-0.5"
                          fill="currentColor"
                        />
                      </span>
                    </button>
                  </div>
                )}

                {selectedBusiness.gallery &&
                  selectedBusiness.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2 md:mt-3">
                      {selectedBusiness.gallery.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Gallery ${i + 1}`}
                          className="w-full object-cover rounded-xl border border-slate-200"
                        />
                      ))}
                    </div>
                  )}
              </div>
            )}

            {/* Stacked full-width sections */}
            <InfoCard
              title="Community impact statement"
              body={selectedBusiness.communityImpact}
            />
            <InfoCard
              title="Revenue stage"
              body={selectedBusiness.revenueStage}
            />
            <InfoCard
              title="Why they deserve to compete"
              body={selectedBusiness.whyCompete}
            />

            {/* Date + Status */}
            <div className="flex items-center gap-6 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-slate-500">Date</span>
                <span className="text-xs md:text-sm font-medium text-slate-800">
                  {selectedBusiness.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-slate-500">
                  Status
                </span>
                <StatusBadge status={selectedBusiness.status} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Apply Success Modal */}
      <Modal
        open={applySuccessOpen}
        onClose={() => setApplySuccessOpen(false)}
        className="max-w-lg rounded-lg"
      >
        <div className="text-center">
          {/* Illustration */}
          <div className="relative mx-auto w-28 h-28 md:w-32 md:h-32 mb-4">
            <Image src="" alt="Icon" />
          </div>

          <h2 className="text-lg md:text-2xl font-semibold text-slate-900 mb-3">
            Your business succesfully applied
            <br />
            for OSI Top Business Launch Award
          </h2>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-8">
            Your business has been submitted for review. You&apos;ll be notified
            once a decision has been made on this application.
          </p>

          <button
            type="button"
            onClick={() => setApplySuccessOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-14 py-3 rounded-full transition-colors"
          >
            Go Back
          </button>
        </div>
      </Modal>
    </div>
  );
}
