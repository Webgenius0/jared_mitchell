"use client";

import toast from "react-hot-toast";

interface VotePackage {
  id: string;
  packageName: string;
  packageType: string;
  voteCount: number;
  price: number;
  description: string;
}

const votePackages: VotePackage[] = [
  {
    id: "starter",
    packageName: "Starter",
    packageType: "Starter",
    voteCount: 1,
    price: 1,
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
  },
  {
    id: "popular",
    packageName: "Popular",
    packageType: "Popular",
    voteCount: 10,
    price: 8,
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
  },
  {
    id: "boost",
    packageName: "Boost",
    packageType: "Boost",
    voteCount: 24,
    price: 18,
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
  },
  {
    id: "power",
    packageName: "Power",
    packageType: "Power",
    voteCount: 50,
    price: 35,
    description: "Lorem Ipsum Dolor Sit Amet Consectetur.",
  },
];

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-slate-500 flex-1">{label}</span>
      <span className="font-medium text-gray-600 flex-1">{value}</span>
    </div>
  );
}

const VotePurchase = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {votePackages.map(pkg => (
        <div
          key={pkg.id}
          className="bg-white rounded-2xl p-5 md:p-6 flex flex-col"
        >
          <div className="flex-1 space-y-5">
            <Row label="Package Name" value={pkg.packageName} />
            <Row label="Package Type" value={pkg.packageType} />
            <Row label="Vote Count:" value={pkg.voteCount} />
            <Row label="Package Price" value={`$${pkg.price}`} />
            <div className="flex items-start gap-1">
              <span className="text-slate-500 flex-1">Descriptions</span>
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
  );
};

export default VotePurchase;
