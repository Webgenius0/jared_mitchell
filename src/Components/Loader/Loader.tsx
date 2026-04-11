export const ArtistCategorySkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 min-h-[80px] animate-pulse relative">
      <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-full bg-gray-200 rounded mb-1" />

      <div className="absolute top-3 right-3 h-4 w-4 bg-gray-200 rounded-full" />
    </div>
  );
};
