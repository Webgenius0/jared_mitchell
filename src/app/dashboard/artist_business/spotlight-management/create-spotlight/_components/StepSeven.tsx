import { Check } from "lucide-react";
import Link from "next/link";

const StepSeven = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 md:p-12 flex flex-col items-center text-center">
      <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
        <Check className="w-7 h-7 md:w-8 md:h-8 text-emerald-500" />
      </span>

      <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
        Submission Successful!
      </h2>

      <p className="text-sm md:text-base text-slate-500 max-w-md mb-6">
        Thank you for submitting your Business Spotlight application. We&apos;re
        excited to review your brand, story, and the work you&apos;re building
      </p>

      <Link
        href={`/dashboard/artist_business/spotlight-management`}
        className="bg-blue-500 text-white text-sm md:text-base font-medium px-8 py-2.5 md:py-3 rounded-full hover:bg-blue-600 transition-colors"
      >
        Done
      </Link>
    </div>
  );
};

export default StepSeven;
