import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Settings - Slotify",
  description: "Manage your account preferences and workspace configurations.",
};

export default function SettingsPage() {
  const settingsCategories = [
    {
      title: "Profile",
      desc: "Update your personal details and public presence.",
      items: [
        { label: "Personal Information", icon: "person", href: "#" },
        { label: "Appearance & Theme", icon: "palette", href: "#" },
      ],
    },
    {
      title: "Workspace",
      desc: "Configure team environments and billing plans.",
      items: [
        { label: "Organization Details", icon: "business", href: "#" },
        { label: "Member Management", icon: "manage_accounts", href: "#" },
        { label: "Billing & Subscriptions", icon: "credit_card", href: "#" },
      ],
    },
    {
      title: "Notifications",
      desc: "Control how and when you receive alerts.",
      items: [
        { label: "Email Summaries", icon: "mail", href: "#" },
        { label: "Push Notifications", icon: "notifications_active", href: "#" },
      ],
    },
    {
      title: "Security",
      desc: "Protect your account and review active sessions.",
      items: [
        { label: "Password & Authentication", icon: "lock", href: "#" },
        { label: "Active Sessions", icon: "devices", href: "#" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased overflow-hidden h-screen">
      <Sidebar activePage="settings" />

      <main className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen overflow-hidden">
        <Header title="Settings" />

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0b1026] p-8">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12 animate-fade-in">
            {/* Page Intro */}
            <div className="space-y-2">
              <p className="text-lg text-[#bfc7d3] leading-relaxed max-w-2xl">
                Manage your account preferences, workspace configurations, and security settings. Changes made here apply immediately to your current session.
              </p>
            </div>

            {/* Bento Grid for Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {settingsCategories.map((category, idx) => (
                <div 
                  key={category.title} 
                  className="bg-[#0f1419] border border-[#2d3656] rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-fade-in"
                  style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                >
                  <div className="p-6 border-b border-[#2d3656]/50 bg-[#161b33]/30">
                    <h2 className="text-xl font-bold text-white mb-1">{category.title}</h2>
                    <p className="text-xs text-[#bfc7d3]">{category.desc}</p>
                  </div>
                  <div className="flex-1 flex flex-col">
                    {category.items.map((item) => (
                      <Link 
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between p-4 hover:bg-[#161b33] transition-all group border-b border-[#2d3656]/30 last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#0b1026] flex items-center justify-center text-[#1197e8] group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                          </div>
                          <span className="text-sm font-medium text-[#dfe3ea] group-hover:text-white transition-colors">{item.label}</span>
                        </div>
                        <span className="material-symbols-outlined text-[#bfc7d3] group-hover:text-[#1197e8] transition-all group-hover:translate-x-1">chevron_right</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer className="mt-12 py-8 border-t border-[#2d3656] flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
              <span className="text-xs text-[#bfc7d3]">© 2024 Slotify Inc. All rights reserved.</span>
              <div className="flex gap-6">
                <Link href="#" className="text-xs text-[#bfc7d3] hover:text-[#1197e8] transition-colors">Privacy Policy</Link>
                <Link href="#" className="text-xs text-[#bfc7d3] hover:text-[#1197e8] transition-colors">Terms of Service</Link>
                <Link href="#" className="text-xs text-[#bfc7d3] hover:text-[#1197e8] transition-colors">Contact</Link>
              </div>
            </footer>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
