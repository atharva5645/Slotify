"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Meetings", href: "/meetings/create", icon: "groups" },
  { name: "Tasks", href: "/tasks", icon: "assignment" },
  { name: "Calendar", href: "/calendar", icon: "calendar_today" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col w-64 bg-[#0f1419] border-r border-[#2d3656] fixed left-0 top-0 bottom-0 z-50 overflow-y-auto custom-scrollbar">
      <div className="p-6 flex items-center gap-3 shrink-0">
        <span className="material-symbols-outlined text-[#97cbff] text-[32px] icon-fill">dataset</span>
        <span className="text-2xl font-bold text-[#97cbff]">Slotify</span>
      </div>
      
      <div className="px-4 mb-6">
        <Link 
          href="/meetings/create"
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#1197e8] text-white rounded-xl text-sm font-bold hover:bg-[#0088cc] active:scale-[0.98] transition-all shadow-lg shadow-[#1197e8]/20"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Meeting</span>
        </Link>
      </div>

      <ul className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-6 py-3 transition-colors duration-200 ${
                  isActive
                    ? "text-[#97cbff] border-l-4 border-[#97cbff] bg-[#97cbff]/10 font-bold"
                    : "text-[#bfc7d3] border-l-4 border-transparent hover:bg-[#31353b] hover:text-white"
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "icon-fill" : ""}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto px-2 shrink-0">
        <Link
          href="/settings"
          className={`flex items-center gap-4 px-6 py-3 transition-colors duration-200 ${
            pathname === "/settings"
              ? "text-[#97cbff] border-l-4 border-[#97cbff] bg-[#97cbff]/10 font-bold"
              : "text-[#bfc7d3] border-l-4 border-transparent hover:bg-[#31353b] hover:text-white"
          }`}
        >
          <span className={`material-symbols-outlined ${pathname === "/settings" ? "icon-fill" : ""}`}>
            settings
          </span>
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
