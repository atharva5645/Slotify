"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
  { name: "Calendar", href: "/calendar", icon: "calendar_today" },
  { name: "Meetings", href: "/meetings/create", icon: "groups" },
  { name: "Tasks", href: "/tasks", icon: "assignment" },
  { name: "Analytics", href: "/analytics", icon: "bar_chart" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [workspace, setWorkspace] = useState("Acme Corp");

  return (
    <nav className="hidden md:flex flex-col w-64 bg-surface border-r border-outline fixed left-0 top-0 bottom-0 z-50 overflow-y-auto custom-scrollbar">
      <div className="p-6 shrink-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-[20px] font-bold">dataset</span>
          </div>
          <span className="text-xl font-black text-on-surface tracking-tighter uppercase">Slotify</span>
        </div>

        {/* Workspace Switcher */}
        <button className="w-full flex items-center justify-between gap-3 px-3 py-2 bg-surface-container border border-outline rounded-xl hover:border-primary transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-[10px] font-black text-white">AC</div>
            <div className="text-left">
              <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest leading-none mb-1">Workspace</p>
              <p className="text-sm font-bold text-on-surface truncate max-w-[80px]">{workspace}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-on-surface transition-colors">unfold_more</span>
        </button>
      </div>
      
      <div className="px-4 mb-6">
        <Link 
          href="/meetings/create"
          className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-all"
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
                    ? "sidebar-active font-bold"
                    : "text-on-surface-variant border-l-4 border-transparent hover:bg-surface-container hover:text-on-surface"
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
              ? "sidebar-active font-bold"
              : "text-on-surface-variant border-l-4 border-transparent hover:bg-surface-container hover:text-on-surface"
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
