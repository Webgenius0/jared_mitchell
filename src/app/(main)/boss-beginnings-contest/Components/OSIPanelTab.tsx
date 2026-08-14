"use client";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { CMSRoundsSection } from "@/Types/cms";

export default function OSIPanelTab({ data }: { data?: CMSRoundsSection }) {
  const metadata = data?.metadata;
  const cmsRounds = metadata?.rounds ?? [];
  const block = metadata?.block;
  const bottom = metadata?.bottom;

  const fairPoints = bottom?.description
    ? Array.from(
        new Set(
          bottom.description
            .split("\n")
            .map(s => s.trim())
            .filter(Boolean),
        ),
      )
    : [];

  const hasBlock = Boolean(
    block &&
      (block.title || block.subtitle || block.description || block.image),
  );
  const hasBottom = Boolean(
    bottom && (bottom.title || bottom.subtitle || fairPoints.length > 0),
  );

  // No CMS content for this section yet — show an empty state.
  if (cmsRounds.length === 0 && !hasBlock && !hasBottom) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-10 sm:p-16 flex flex-col items-center text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1977DD29] flex items-center justify-center mb-4">
          <FiCheckCircle className="size-6 sm:size-7 text-blue-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-[#101828]">
          No OSI Panel Information Yet
        </h3>
        <p className="text-sm sm:text-base text-black/50 mt-2 max-w-md">
          The OSI panel rounds and details will appear here once they are
          published.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Block header */}
      {block &&
        (block.title || block.subtitle || block.description || block.image) && (
        <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
          <div
            className={`relative min-h-[200px] flex items-end ${
              block.image ? "" : "bg-[#2563EB]"
            }`}
          >
            {block.image && (
              <img
                src={block.image}
                alt={block.title || "Boss Beginnings"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div
              className={`relative w-full p-6 sm:p-10 ${
                block.image
                  ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white"
                  : "text-white"
              }`}
            >
              {block.title && (
                <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-wider">
                  {block.title}
                </h2>
              )}
              {block.subtitle && (
                <p className="mt-2 text-base sm:text-lg text-white/90">
                  {block.subtitle}
                </p>
              )}
              {block.description && (
                <p className="mt-3 text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed">
                  {block.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rounds */}
      {cmsRounds.map((round, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-black/10 bg-white overflow-hidden"
        >
          {/* Round header */}
          <div className="bg-[#2563EB] px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 text-white">
            {round.icon && (
              <div className="bg-white/20 size-14 flex items-center justify-center rounded-full shrink-0 overflow-hidden">
                <img
                  src={round.icon}
                  alt={round.round_title}
                  className="size-7 object-contain"
                />
              </div>
            )}
            <div>
              <h4 className="text-base sm:text-lg font-medium uppercase flex flex-wrap items-center gap-2 sm:gap-3">
                {round.round_text && (
                  <span className="text-xs sm:text-sm font-normal py-1">
                    {round.round_text}
                  </span>
                )}
                {round.round_title}
              </h4>
              {round.subtitle && (
                <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                  {round.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Round content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {round.goal_text && (
              <div>
                <h6 className="text-[#2563EB] text-base font-medium mb-2 flex items-center gap-2">
                  {round.goal_label || "Goal:"}
                </h6>
                <p className="text-[14px] text-black/70">{round.goal_text}</p>
              </div>
            )}

            {Boolean(round.requirements?.length) && (
              <div>
                <h6 className="text-[#2563EB] text-base font-medium mb-2 flex items-center gap-2">
                  {round.requirements_label || "Requirements:"}
                </h6>
                <ul className="space-y-2">
                  {(round.requirements ?? []).map((req, reqIdx) => (
                    <li
                      key={reqIdx}
                      className="text-[14px] text-black/70 flex items-start gap-2"
                    >
                      <span className="mt-1.5 size-1.5 rounded-full bg-[#2563EB] shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Why this system is fair */}
      {bottom && (bottom.title || bottom.subtitle || fairPoints.length > 0) && (
        <div className="bg-[#306FDC] py-12 sm:py-16 lg:py-20 px-4 text-white">
          {bottom.title && (
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center uppercase tracking-wider text-white">
              {bottom.title}
            </h3>
          )}
          {fairPoints.length > 0 && (
            <div className="space-y-3 border-b border-white/20 pb-5 mb-5 max-w-5xl mx-auto">
              {fairPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-3"
                >
                  <FiCheckCircle className="size-4 shrink-0" />
                  <p className="text-base font-normal">{item}</p>
                </div>
              ))}
            </div>
          )}
          {bottom.subtitle && (
            <p className="text-lg sm:text-xl lg:text-[24px] text-center text-white/80 max-w-3xl mx-auto">
              {bottom.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
