"use client";

import { businessStatusStyles } from "@/lib/business";

export default function StatusBadge({ status }: { status: string }) {
  const style = businessStatusStyles[status] || "bg-slate-50 text-slate-600";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium ${style}`}
    >
      {status}
    </span>
  );
}
