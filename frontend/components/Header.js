"use client";

export default function Header({ title }) {
  return (
    <header className="flex justify-between items-center w-full px-6 h-16 bg-[#0f1419] border-b border-[#2d3656] shrink-0 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-[#bfc7d3] hover:text-[#97cbff] transition-opacity">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity group">
        <div className="flex flex-col items-end hidden sm:flex">
          <span className="text-sm font-medium group-hover:text-[#97cbff]">Alex Mercer</span>
          <span className="text-xs text-[#bfc7d3]">Pro Plan</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#31353b] border border-[#2d3656] overflow-hidden flex items-center justify-center group-hover:border-[#97cbff]">
          <span className="material-symbols-outlined text-[#bfc7d3] group-hover:text-[#97cbff]">person</span>
        </div>
      </div>
    </header>
  );
}
