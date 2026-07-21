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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/Components/Common/Modal";

type BusinessStatus = "Approved" | "Terminated" | "Pending";

interface Business {
  id: string;
  businessName: string;
  ownerName: string;
  story: string;
  mission?: string;
  websiteLink: string;
  communityImpact?: string;
  revenueStage?: string;
  whyCompete?: string;
  videoThumbnail?: string;
  gallery?: string[];
  date: string;
  status: BusinessStatus;
}

const businesses: Business[] = [
  {
    id: "1",
    businessName: "New Year Campaign",
    ownerName: "TechKori Ltd.",
    story:
      "The Walt Disney Company has been a global leader in entertainment for decades...",
    mission:
      "To bring joy and inspiration to families everywhere through timeless storytelling and innovative campaigns.",
    websiteLink: "http://www.abc.com",
    communityImpact:
      "Partnered with 12 local schools to run free creative-writing workshops for kids this year.",
    revenueStage: "Profitable, growing 18% quarter over quarter since launch.",
    whyCompete:
      "A locally-run campaign with measurable community reach and strong repeat engagement.",
    videoThumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
    ],
    date: "2025-01-01",
    status: "Approved",
  },
  {
    id: "2",
    businessName: "EduLearn Beta Launch",
    ownerName: "EduLearn Hub",
    story:
      "An innovative platform transforming how students learn with AI-powered tools...",
    websiteLink: "http://www.abc.com",
    date: "2025-01-01",
    status: "Terminated",
  },
  {
    id: "3",
    businessName: "EduLearn Beta Launch",
    ownerName: "EduLearn Hub",
    story:
      "An innovative platform transforming how students learn with AI-powered tools...",
    websiteLink: "http://www.abc.com",
    date: "2025-01-01",
    status: "Pending",
  },
  {
    id: "4",
    businessName: "New Year Campaign",
    ownerName: "TechKori Ltd.",
    story:
      "The Walt Disney Company has been a global leader in entertainment for decades...",
    websiteLink: "http://www.abc.com",
    date: "2025-01-01",
    status: "Approved",
  },
];

const statusStyles: Record<BusinessStatus, string> = {
  Approved: "bg-emerald-50 text-emerald-600",
  Terminated: "bg-red-50 text-red-500",
  Pending: "bg-amber-50 text-amber-500",
};

function StatusBadge({ status }: { status: BusinessStatus }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function InfoCard({ title, body }: { title: string; body?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5">
      <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
        {body && body.trim() ? body : "No data provided."}
      </p>
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
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null,
  );

  const handleView = (b: Business) => setSelectedBusiness(b);

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
    };
    const encoded = encodeURIComponent(JSON.stringify(data));
    router.push(
      `/dashboard/boss_beginning/business/create-business?edit=${encoded}`,
    );
  };

  const handleDelete = (b: Business) => console.log("Delete", b);

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
                  <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {b.story}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {b.websiteLink}
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
}
