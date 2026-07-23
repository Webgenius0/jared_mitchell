export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm p-5 space-y-4 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="size-8 rounded-lg bg-gray-200" />
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="flex gap-2">
            <div className="h-8 flex-1 bg-gray-100 rounded-lg" />
            <div className="h-8 flex-1 bg-gray-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
