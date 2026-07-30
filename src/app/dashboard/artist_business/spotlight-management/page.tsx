"use client";
import { SpotlightRowSkeleton } from "@/Components/Loader/Loader";
import { getArtistSpotlights } from "@/Hooks/api/cms_api";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
type SpotlightStatus = "Approved" | "Terminated" | "Pending";

interface SpotlightEntry {
  id: string;
  campaign: string;
  business: string;
  startDate: string;
  endDate: string;
  status: SpotlightStatus;
  votes: number;
  date: string;
}

const spotlightHistory: SpotlightEntry[] = [
  {
    id: "1",
    campaign: "New Year Campaign",
    business: "TechKori Ltd.",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "Approved",
    votes: 620,
    date: "2025-01-31",
  },
  {
    id: "2",
    campaign: "EduLearn Beta Launch",
    business: "EduLearn Hub",
    startDate: "2025-02-15",
    endDate: "2025-03-01",
    status: "Terminated",
    votes: 180,
    date: "2025-03-01",
  },
  {
    id: "3",
    campaign: "EduLearn Beta Launch",
    business: "EduLearn Hub",
    startDate: "2025-02-15",
    endDate: "2025-03-01",
    status: "Pending",
    votes: 180,
    date: "2025-03-01",
  },
  {
    id: "4",
    campaign: "New Year Campaign",
    business: "TechKori Ltd.",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "Approved",
    votes: 620,
    date: "2025-01-31",
  },
];

const statusStyles: Record<SpotlightStatus, string> = {
  Approved: "bg-emerald-50 text-emerald-600",
  Terminated: "bg-red-50 text-red-500",
  Pending: "bg-amber-50 text-amber-500",
};

function StatusBadge({ status }: { status: SpotlightStatus }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

const columns = [
  "Name",
  "Category",
  "Duration",
  "Status",
  "Votes",
  "Date",
  "Actions",
];

export default function Page() {
  const { data: spotlights, isLoading } = getArtistSpotlights();
  console.log(spotlights?.data);

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <div className=" bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Spotlight history
          </h1>

          <Link
            href="/dashboard/artist_business/spotlight-management/create-spotlight"
            className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
          >
            Create
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
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
              {isLoading ? (
                <SpotlightRowSkeleton />
              ) : (
                spotlightHistory.map(entry => (
                  <tr
                    key={entry.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {entry.campaign}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {entry.business}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      <div className="leading-snug">
                        <div>{entry.startDate}</div>
                        <div>{entry.endDate}</div>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <StatusBadge status={entry.status} />
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {entry.votes}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-4">
                        <button
                          type="button"
                          title="View"
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>

                        <Link
                          href={`/artist-spotlight?id=${1}`}
                          title="Edit"
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
