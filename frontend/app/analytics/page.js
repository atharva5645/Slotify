"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const utilizationData = [
  { name: 'Mon', used: 65, total: 100 },
  { name: 'Tue', used: 80, total: 100 },
  { name: 'Wed', used: 45, total: 100 },
  { name: 'Thu', used: 90, total: 100 },
  { name: 'Fri', used: 55, total: 100 },
];

const mixData = [
  { name: 'Deep Work', value: 45, color: 'var(--color-primary)' },
  { name: 'Meetings', value: 30, color: 'var(--color-warning)' },
  { name: 'Admin', value: 15, color: 'var(--color-outline-variant)' },
  { name: 'Social', value: 10, color: 'var(--color-on-surface-variant)' },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen overflow-y-auto custom-scrollbar">
        <Header title="Team Analytics" />

        <div className="p-8 max-w-[1400px] mx-auto w-full space-y-8 pb-32 md:pb-8">
          
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-on-surface">Performance Overview</h2>
              <p className="text-on-surface-variant text-sm font-medium">Last 7 days of workspace activity</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-surface-container border border-outline rounded-xl text-xs font-bold hover:bg-surface-container/80 transition-all flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Report
              </button>
              <div className="bg-surface-container p-1 rounded-xl border border-outline flex">
                <button className="px-4 py-1.5 bg-primary rounded-lg text-[10px] font-black uppercase text-white">Week</button>
                <button className="px-4 py-1.5 text-on-surface-variant rounded-lg text-[10px] font-black uppercase">Month</button>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Slots", value: "142", trend: "+12%", desc: "vs last week" },
              { label: "Avg. Utilization", value: "72.4%", trend: "-3%", desc: "vs last week" },
              { label: "Meeting Efficiency", value: "88%", trend: "+5%", desc: "vs last week" },
              { label: "Active Members", value: "12", trend: "0%", desc: "stable" },
            ].map((m, i) => (
              <motion.div 
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-outline p-6 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">{m.label}</p>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black tracking-tighter text-on-surface">{m.value}</span>
                  <span className={`text-[10px] font-black mb-1.5 ${m.trend.startsWith('+') ? 'text-success' : m.trend === '0%' ? 'text-on-surface-variant' : 'text-error'}`}>{m.trend}</span>
                </div>
                <p className="text-[9px] font-black text-on-surface-variant/50 uppercase mt-2">{m.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-12 gap-8">
            {/* Slot Utilization */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-12 lg:col-span-8 bg-surface border border-outline rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-lg font-black mb-8 flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-primary">stacked_bar_chart</span>
                Slot Utilization Trends
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-outline)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--color-on-surface-variant)" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="var(--color-on-surface-variant)" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-main)', borderRadius: '8px', color: 'var(--text-main)' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                      cursor={{ fill: 'var(--color-primary)', opacity: 0.05 }}
                    />
                    <Bar dataKey="used" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Work Mix Pie */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-12 lg:col-span-4 bg-surface border border-outline rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-lg font-black mb-8 text-on-surface">Workload Distribution</h3>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mixData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mixData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-main)', borderRadius: '8px', color: 'var(--text-main)' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {mixData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[10px] font-black text-on-surface-variant uppercase">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Team Efficiency Heatmap (Simulated) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface border border-outline rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-lg font-black mb-8 text-on-surface">Workspace Peak Activity</h3>
            <div className="overflow-x-auto custom-scrollbar">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-[80px_repeat(12,1fr)] gap-2 mb-4">
                  <div />
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="text-[10px] font-black text-on-surface-variant text-center uppercase tracking-tighter">
                      {i + 8}:00
                    </div>
                  ))}
                </div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                  <div key={day} className="grid grid-cols-[80px_repeat(12,1fr)] gap-2 mb-2">
                    <div className="text-xs font-black text-on-surface self-center">{day}</div>
                    {[...Array(12)].map((_, i) => {
                      const opacity = 0.1 + Math.random() * 0.9;
                      return (
                        <div 
                          key={i} 
                          className="h-8 rounded-md transition-all hover:scale-110 cursor-pointer"
                          style={{ 
                            backgroundColor: 'var(--color-primary)',
                            opacity: opacity,
                            border: opacity > 0.5 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                          }}
                          title={`Activity level: ${Math.round(opacity * 100)}%`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-[9px] font-black text-on-surface-variant uppercase">Less Active</span>
              <div className="flex gap-1">
                {[0.1, 0.3, 0.6, 0.9].map((o) => (
                  <div key={o} className="w-4 h-4 rounded bg-primary" style={{ opacity: o }}></div>
                ))}
              </div>
              <span className="text-[9px] font-black text-on-surface-variant uppercase">Peak Performance</span>
            </div>
          </motion.div>

        </div>
      </main>

      <MobileNav />
    </div>
  );
}
