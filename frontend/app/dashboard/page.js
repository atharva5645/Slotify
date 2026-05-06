"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', tasks: 4, slots: 2 },
  { name: 'Tue', tasks: 7, slots: 3 },
  { name: 'Wed', tasks: 5, slots: 6 },
  { name: 'Thu', tasks: 8, slots: 4 },
  { name: 'Fri', tasks: 6, slots: 3 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Tasks Completed", value: "85%", icon: "check_circle", color: "text-success" },
    { label: "Meeting Hours", value: "12.5h", icon: "timer", color: "text-primary" },
    { label: "Team Velocity", value: "+12%", icon: "trending_up", color: "text-warning" },
    { label: "Smart Savings", value: "4.2h", icon: "psychology", color: "text-success" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen overflow-y-auto custom-scrollbar">
        <Header title="Workspace Overview" />

        <div className="p-8 max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-8 pb-32 md:pb-8">
          
          {/* Main Left Column (7/12) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Welcome & Stats Row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <h2 className="text-3xl font-black tracking-tight mb-1 text-on-surface">Good morning, Alex!</h2>
                <p className="text-on-surface-variant text-sm">Your workspace is currently <span className="text-success font-bold">highly efficient</span> today.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 bg-surface-container border border-outline rounded-xl text-xs font-bold hover:bg-surface-container/80 transition-all flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                  Manage Schedule
                </button>
                <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Quick Action
                </button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface/50 border border-outline p-5 rounded-2xl group hover:border-primary/40 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`material-symbols-outlined ${stat.color} text-[24px]`}>{stat.icon}</span>
                    <span className="text-[10px] text-success font-black">+4.2%</span>
                  </div>
                  <p className="text-2xl font-black tracking-tighter mb-1 text-on-surface">{stat.value}</p>
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Productivity Chart Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-surface border border-outline rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black mb-1 text-on-surface">Productivity Insights</h3>
                  <p className="text-xs text-on-surface-variant">Weekly task completion vs slot utilization</p>
                </div>
                <div className="flex items-center gap-2 bg-surface-container p-1 rounded-lg">
                  <button className="px-3 py-1 bg-primary rounded-md text-[10px] font-bold text-white">Week</button>
                  <button className="px-3 py-1 text-[10px] font-bold text-on-surface-variant hover:text-on-surface transition-colors">Month</button>
                </div>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--text-soft)" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-main)', borderRadius: '12px', fontSize: '12px', color: 'var(--text-main)' }}
                      itemStyle={{ color: 'var(--brand-primary)' }}
                    />
                    <Area type="monotone" dataKey="tasks" stroke="var(--brand-primary)" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Collaborative Feed */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Upcoming Meetings */}
              <div className="bg-surface border border-outline rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-on-surface">Next Meetings</h3>
                  <Link href="/calendar" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Full View</Link>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Design Review", time: "11:00 AM", status: "Starting soon", color: "bg-primary" },
                    { title: "Q4 Roadmap Sync", time: "2:30 PM", status: "Remote", color: "bg-purple-500" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container/50 border border-transparent hover:border-outline transition-all">
                      <div className={`w-1 h-8 rounded-full ${m.color}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-on-surface">{m.title}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{m.time} • {m.status}</p>
                      </div>
                      <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">videocam</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Priorities */}
              <div className="bg-surface border border-outline rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-on-surface">Urgent Tasks</h3>
                  <Link href="/tasks" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Board</Link>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Dashboard Refactor", priority: "urgent", time: "4h left" },
                    { title: "API Docs Update", priority: "high", time: "EOD" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container/50 border border-transparent hover:border-outline transition-all group">
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-success">check_box_outline_blank</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-on-surface">{t.title}</p>
                        <p className="text-[10px] text-error font-black uppercase tracking-widest">{t.priority} • {t.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Activity Feed */}
            <div className="bg-surface border border-outline rounded-3xl p-6 shadow-2xl h-[500px] flex flex-col">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-primary">history</span>
                Workspace Feed
              </h3>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
                {[
                  { user: "Sarah C.", action: "assigned you to", target: "Design Refactor", time: "2m ago", icon: "assignment" },
                  { user: "Alex Mercer", action: "created a new", target: "Marketing Sync", time: "15m ago", icon: "event" },
                  { user: "System", action: "optimized", target: "4 Smart Slots", time: "1h ago", icon: "bolt" },
                  { user: "John D.", action: "commented on", target: "Q4 Strategy", time: "3h ago", icon: "chat" },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== 3 && <div className="absolute left-4 top-10 bottom-[-15px] w-[1px] bg-outline"></div>}
                    <div className="w-8 h-8 rounded-lg bg-surface-container border border-outline flex items-center justify-center shrink-0 z-10">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{act.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs text-on-surface leading-relaxed">
                        <span className="font-black">{act.user}</span> {act.action} <span className="text-primary font-bold">{act.target}</span>
                      </p>
                      <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-tighter mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 mt-6 border border-outline rounded-xl text-[10px] font-black text-on-surface-variant uppercase hover:bg-surface-container transition-all">
                Full Activity Log
              </button>
            </div>

            {/* AI Smart Suggestions */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">psychology</span>
                AI Insights
              </h3>
              <p className="text-sm text-on-surface font-medium mb-6 leading-relaxed">
                Found <span className="text-primary font-black">2.5 hours</span> of reclaimable time on Wednesday. Should I schedule your deep work?
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-primary text-white text-xs font-black uppercase rounded-xl shadow-lg shadow-primary/20">Auto-Schedule</button>
                <button className="px-4 py-3 bg-on-surface/5 border border-on-surface/10 rounded-xl hover:bg-on-surface/10 transition-all text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                </button>
              </div>
            </div>

            {/* Empty States Onboarding */}
            <div className="p-6 border border-dashed border-outline rounded-3xl flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-on-surface-variant">person_add</span>
              </div>
              <h4 className="font-bold text-sm mb-1 text-on-surface">Invite your team</h4>
              <p className="text-[10px] text-on-surface-variant mb-4 uppercase font-black tracking-widest">Collaborative slots are better</p>
              <button className="text-xs font-black text-primary hover:underline uppercase">Copy Invite Link</button>
            </div>

          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
