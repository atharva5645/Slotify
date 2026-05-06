"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Tasks Done", value: "12", icon: "task_alt", color: "text-[#a0d0c8]" },
    { label: "Smart Slots", value: "4", icon: "psychology", color: "text-[#97cbff]" },
    { label: "Team Members", value: "8", icon: "group", color: "text-[#ffb778]" },
    { label: "Upcoming", value: "3", icon: "event", color: "text-[#1197e8]" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen overflow-y-auto custom-scrollbar">
        <Header title="Dashboard" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-8 pb-24 md:pb-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-2">Welcome back, Alex!</h2>
            <p className="text-[#bfc7d3]">You have 3 smart slots scheduled for today.</p>
          </motion.div>

          {/* stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <motion.div 
                key={stat.label} 
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="bg-[#0f1419] border border-[#2d3656] p-6 rounded-2xl flex items-center gap-4 hover:border-[#1197e8]/50 transition-colors group cursor-pointer shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-xl bg-[#161b33] animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-8 bg-[#161b33] rounded animate-pulse"></div>
                      <div className="h-2 w-16 bg-[#161b33] rounded animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`w-12 h-12 rounded-xl bg-[#161b33] flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                      <span className="material-symbols-outlined text-[28px]">{stat.icon}</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                      <div className="text-[10px] text-[#bfc7d3] uppercase tracking-widest font-black">{stat.label}</div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-3 bg-[#0f1419] border border-[#2d3656] rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1197e8]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#1197e8] rounded-full"></span>
                  Today&apos;s Focus
                </h3>
                <Link href="/tasks" className="text-sm font-bold text-[#1197e8] hover:text-[#0088cc] flex items-center gap-1 group">
                  View All Tasks
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>

              <div className="space-y-6 relative z-10">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 w-full bg-[#161b33] rounded-2xl animate-pulse"></div>
                  ))
                ) : (
                  [
                    { time: "09:00", title: "Daily Standup", desc: "Team sync and blockers", color: "border-l-[#a0d0c8]" },
                    { time: "10:30", title: "Architecture Planning", desc: "Define Q4 roadmap", isSmart: true, color: "border-l-[#1197e8]" },
                    { time: "14:00", title: "Code Review", desc: "PR #402 and #405", color: "border-l-[#ffb778]" },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 10 }}
                      className={`flex gap-6 p-6 rounded-2xl bg-[#161b33]/30 border-l-4 ${item.color} hover:bg-[#161b33] transition-all cursor-pointer shadow-sm group`}
                    >
                      <div className="text-sm font-black text-[#bfc7d3] w-12 pt-1">{item.time}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg group-hover:text-[#1197e8] transition-colors">{item.title}</span>
                          {item.isSmart && (
                            <span className="bg-[#1197e8]/10 text-[#1197e8] text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-[#1197e8]/20 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]">psychology</span>
                              Smart
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[#bfc7d3] leading-relaxed">{item.desc}</div>
                      </div>
                      <button className="material-symbols-outlined text-[#bfc7d3] opacity-0 group-hover:opacity-100 transition-opacity self-center">chevron_right</button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <MobileNav />
    </div>
  );
}
