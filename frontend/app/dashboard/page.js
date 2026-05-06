import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";

export const metadata = {
  title: "Dashboard - Slotify",
  description: "Overview of your schedule and tasks.",
};

export default function DashboardPage() {
  const stats = [
    { label: "Tasks Done", value: "12", icon: "task_alt", color: "text-[#a0d0c8]" },
    { label: "Smart Slots", value: "4", icon: "psychology", color: "text-[#97cbff]" },
    { label: "Team Members", value: "8", icon: "group", color: "text-[#ffb778]" },
    { label: "Upcoming", value: "3", icon: "event", color: "text-[#1197e8]" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen overflow-y-auto custom-scrollbar">
        <Header title="Dashboard" />

        <div className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
          {/* Welcome Section */}
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Alex!</h2>
            <p className="text-[#bfc7d3]">You have 3 smart slots scheduled for today.</p>
          </div>

          {/* stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#0f1419] border border-[#2d3656] p-6 rounded-2xl flex items-center gap-4 hover:border-[#1197e8]/50 transition-colors group">
                <div className={`w-12 h-12 rounded-xl bg-[#161b33] flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-[28px]">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-[#bfc7d3] uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-[#0f1419] border border-[#2d3656] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Today&apos;s Focus</h3>
                <Link href="/tasks" className="text-sm text-[#1197e8] hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {[
                  { time: "09:00", title: "Daily Standup", desc: "Team sync and blockers" },
                  { time: "10:30", title: "Architecture Planning", desc: "Define Q4 roadmap", isSmart: true },
                  { time: "14:00", title: "Code Review", desc: "PR #402 and #405" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-[#161b33] transition-colors border border-transparent hover:border-[#2d3656]">
                    <div className="text-sm font-bold text-[#bfc7d3] w-12 pt-1">{item.time}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{item.title}</span>
                        {item.isSmart && (
                          <span className="bg-[#22504b] text-[#a0d0c8] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Smart</span>
                        )}
                      </div>
                      <div className="text-sm text-[#bfc7d3]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-[#1197e8] rounded-2xl p-6 text-white shadow-[0_20px_50px_rgba(17,151,232,0.3)] relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
                  <p className="text-white/80 text-sm mb-4">Get unlimited smart slots and team collaboration tools.</p>
                  <button className="bg-white text-[#1197e8] px-4 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform">Learn More</button>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-[120px] rotate-12 group-hover:scale-110 transition-transform">rocket_launch</span>
              </div>

              <div className="bg-[#0f1419] border border-[#2d3656] rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#161b33] border border-[#2d3656] hover:border-[#97cbff]/50 transition-colors">
                    <span className="material-symbols-outlined text-[#97cbff]">add_task</span>
                    <span className="text-xs font-medium">New Task</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#161b33] border border-[#2d3656] hover:border-[#a0d0c8]/50 transition-colors">
                    <span className="material-symbols-outlined text-[#a0d0c8]">event_available</span>
                    <span className="text-xs font-medium">New Slot</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
