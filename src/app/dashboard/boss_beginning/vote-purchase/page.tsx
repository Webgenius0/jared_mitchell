"use client";

import toast from "react-hot-toast";
import { getVotePackages } from "@/Hooks/api/cms_api";
import type { VotePackage } from "@/Types/cms";

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-slate-500 flex-1">{label}</span>
      <span className="font-medium text-gray-600 flex-1">{value}</span>
    </div>
  );
}

const VotePurchase = () => {
  const { data: res, isLoading, isError } = getVotePackages();
  const packages = res?.data?.packages ?? [];
  const maxPaidVotes = res?.data?.max_paid_votes;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-5 md:p-6 animate-pulse space-y-5">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-full" />
            <div className="h-10 bg-gray-200 rounded w-1/2 mt-6" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load vote packages. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      {maxPaidVotes !== undefined && (
        <div className="mb-5 text-sm text-gray-500">
          Max paid votes per nominee: <span className="font-semibold text-gray-700">{maxPaidVotes}</span>
        </div>
      )}
      {packages.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No vote packages available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg: VotePackage) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl p-5 md:p-6 flex flex-col"
            >
              <div className="flex-1 space-y-5">
                <Row label="Package Name" value={pkg.name} />
                <Row label="Package Type" value={pkg.name} />
                <Row label="Vote Count:" value={pkg.votes_count} />
                <Row label="Package Price" value={`$${pkg.price}`} />
                <div className="flex items-start gap-1">
                  <span className="text-slate-500 flex-1">Description</span>
                  <span className="font-medium text-gray-600 leading-relaxed flex-1">
                    {pkg.description}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.success("Redirecting to stripe....")}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-7 py-2.5 rounded-full self-start transition-colors"
              >
                Purchase now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotePurchase;
