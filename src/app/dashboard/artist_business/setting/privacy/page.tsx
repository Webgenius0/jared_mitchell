const data = [
  { title: "Public profile", desc: "Allow others to see your profile" },
  { title: "Show vote count", desc: "Display total votes on your profile" },
  { title: "Show activity", desc: "Display recent activity publicly" },
];

const page = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-medium pb-5">Privacy</h2>

      <div className="space-y-3">
        {data?.map(item => (
          <div
            key={item?.title}
            className="pb-5 last:pb-0 border-b border-gray-200 last:border-b-0 flex gap-3 items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-medium mb-1">{item?.title}</h3>
              <p className="text-gray-500">{item?.desc}</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
