export const ArtistCategorySkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 min-h-[80px] animate-pulse relative">
      <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-1" />

      <div className="absolute top-3 right-3 h-4 w-4 bg-gray-200 rounded-full" />
    </div>
  );
};

export const SpotlightRowSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <tr key={index} className="animate-pulse border-b border-slate-100">
          {/* Campaign */}
          <td className="px-5 md:px-6 py-3.5 md:py-4">
            <div className="h-5 w-40 rounded bg-slate-200" />
          </td>

          {/* Business */}
          <td className="px-5 md:px-6 py-3.5 md:py-4">
            <div className="h-5 w-32 rounded bg-slate-200" />
          </td>

          {/* Start & End Date */}
          <td className="px-5 md:px-6 py-3.5 md:py-4">
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-4 w-28 rounded bg-slate-200" />
            </div>
          </td>

          {/* Status */}
          <td className="px-5 md:px-6 py-3.5 md:py-4">
            <div className="h-7 w-24 rounded-full bg-slate-200" />
          </td>

          {/* Votes */}
          <td className="px-5 md:px-6 py-3.5 md:py-4">
            <div className="h-5 w-12 rounded bg-slate-200" />
          </td>

          {/* Date */}
          <td className="px-5 md:px-6 py-3.5 md:py-4">
            <div className="h-5 w-24 rounded bg-slate-200" />
          </td>

          {/* Actions */}
          <td className="px-5 md:px-6 py-3.5 md:py-4">
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 rounded bg-slate-200" />
              <div className="h-5 w-5 rounded bg-slate-200" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
