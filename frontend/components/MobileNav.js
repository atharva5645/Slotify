"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileItems = [
  { name: "Dash", href: "/dashboard", icon: "dashboard" },
  { name: "Tasks", href: "/tasks", icon: "assignment" },
  { name: "Calendar", href: "/calendar", icon: "calendar_month" },
  { name: "Team", href: "/team", icon: "group" },
  { name: "More", href: "/settings", icon: "more_horiz" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden flex justify-around items-center h-16 px-4 pb-safe fixed bottom-0 w-full z-50 rounded-t-xl bg-surface border-t border-outline shadow-lg">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? "text-primary scale-110" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${isActive ? "icon-fill" : ""}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] mt-1 ${isActive ? "font-medium" : ""}`}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
