"use client";

import React, { useState } from "react";
import { Eye, Pencil, Trash2, Globe, Calendar, User, Building2, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/Components/Common/Modal";

type BusinessStatus = "Approved" | "Terminated" | "Pending";

interface Business {
  id: string;
  businessName: string;
  ownerName: string;
  story: string;
  websiteLink: string;
  date: string;
  status: BusinessStatus;
}

const businesses: Business[] = [
  {
    id: "1",
    businessName: "New Year Campaign",
    ownerName: "TechKori Ltd.",
    story: "The Walt Disney Company has been a global leader in entertainment for decades...",
    websiteLink: "http://www.abc.com",
    date: "2025-01-01",
    status: "Approved",
  },
  {
    id: "2",
    businessName: "EduLearn Beta Launch",
    ownerName: "EduLearn Hub",
    story: "An innovative platform transforming how students learn with AI-powered tools...",
    websiteLink: "http://www.abc.com",
    date: "2025-01-01",
    status: "Terminated",
  },
  {
    id: "3",
    businessName: "EduLearn Beta Launch",
    ownerName: "EduLearn Hub",
    story: "An innovative platform transforming how students learn with AI-powered tools...",
    websiteLink: "http://www.abc.com",
    date: "2025-01-01",
    status: "Pending",
  },
  {
    id: "4",
    businessName: "New Year Campaign",
    ownerName: "TechKori Ltd.",
    story: "The Walt Disney Company has been a global leader in entertainment for decades...",
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
      mission: "",
      website: b.websiteLink,
      communityImpact: "",
      revenueStage: "",
      whyCompete: "",
    };
    const encoded = encodeURIComponent(JSON.stringify(data));
    router.push(`/dashboard/boss_beginning/business/create-business?edit=${encoded}`);
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
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 min-w-[100px]">Name</span>
              <span className="text-sm font-medium text-slate-800">
                {selectedBusiness.businessName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 min-w-[100px]">
                Owner
              </span>
              <span className="text-sm font-medium text-slate-800">
                {selectedBusiness.ownerName}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
              <span className="text-sm text-slate-500 min-w-[100px]">
                Story
              </span>
              <span className="text-sm text-slate-800">
                {selectedBusiness.story}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 min-w-[100px]">
                Website
              </span>
              <a
                href={selectedBusiness.websiteLink}
                target="_blank"
                className="text-sm text-blue-500 hover:underline"
              >
                {selectedBusiness.websiteLink}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-500 min-w-[100px]">
                Date
              </span>
              <span className="text-sm font-medium text-slate-800">
                {selectedBusiness.date}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 min-w-[100px]">
                Status
              </span>
              <StatusBadge status={selectedBusiness.status} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
