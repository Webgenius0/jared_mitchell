export const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white gap-6">
    <div className="relative flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-black/10 absolute" />
      <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-black animate-spin absolute" />
      <div className="w-3 h-3 rounded-full bg-black" />
    </div>

    <div className="flex flex-col items-center gap-1">
      <span className="text-black font-semibold tracking-widest text-sm uppercase">
        Jared Mitchel
      </span>
      <div className="w-32 h-0.5 bg-black/10 rounded-full overflow-hidden mt-1">
        <div className="h-full bg-black rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
      </div>
    </div>

    <style>{`
      @keyframes loading {
        0%   { width: 0%;   margin-left: 0; }
        50%  { width: 60%;  margin-left: 20%; }
        100% { width: 0%;   margin-left: 100%; }
      }
    `}</style>
  </div>
);
