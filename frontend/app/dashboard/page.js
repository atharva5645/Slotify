"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { prototypeStore } from "@/lib/prototypeStore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [urgentTasks, setUrgentTasks] = useState([]);
  const [profile, setProfile] = useState({
    full_name: "User",
    email: "",
    avatar_url: "https://ui-avatars.com/api/?name=User&background=1197e8&color=fff"
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const userId = user.uid;
      setLoading(true);

      try {
        const [meetingsRes, tasksRes, profileRes] = await Promise.all([
          fetch(`/api/meetings/user/${userId}`),
          fetch(`/api/tasks/user/${userId}`),
          fetch(`/api/profiles/${userId}`)
        ]);

        const [meetingsData, tasksData] = await Promise.all([
          meetingsRes.ok ? meetingsRes.json() : [],
          tasksRes.ok ? tasksRes.json() : []
        ]);

        if (profileRes.ok) {
          setProfile(await profileRes.json());
        }

        // Prototype Fallback: Populate with high-priority mock data
        let finalMeetings = [...meetingsData];
        let finalTasks = [...tasksData];

        if (process.env.NEXT_PUBLIC_PROTOTYPE_MODE === 'true') {
          // Add data from LocalStorage prototype store
          const protoMeetings = prototypeStore.getMeetings();
          const protoTasks = prototypeStore.getTasks();
          
          finalMeetings = [...protoMeetings, ...finalMeetings];
          finalTasks = [...protoTasks, ...finalTasks];

          if (finalMeetings.length === 0) {
            finalMeetings = [
              { 
                title: "Product Strategy Sync", 
                startTime: new Date().setHours(10, 0, 0, 0), 
                location: "Room 402",
                priority: "high"
              },
              { 
                title: "Design Review: Q4 Roadmap", 
                startTime: new Date().setHours(14, 30, 0, 0), 
                location: "Virtual",
                priority: "urgent"
              }
            ];
          }
        }

        setMeetings(finalMeetings.slice(0, 4));
        setUrgentTasks(finalTasks.filter(t => !t.completed).slice(0, 3));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const stats = [
    { label: "Completion", value: "85%", icon: "check_circle", color: "text-success" },
    { label: "Meeting Hours", value: "12.5h", icon: "timer", color: "text-primary" },
    { label: "Smart Savings", value: "4.2h", icon: "psychology", color: "text-success" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen overflow-y-auto custom-scrollbar">
        <Header title="Dashboard" userProfile={profile} />

        <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full space-y-10 pb-32 md:pb-10">
          
          {/* Hero Section */}
          <section>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2 text-on-surface">
                  Hello, {profile?.full_name?.split(' ')[0]}!
                </h2>
                <p className="text-on-surface-variant text-lg">
                  You have <span className="text-primary font-bold">{meetings.length} meetings</span> today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/meetings/create" className="px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:opacity-90 shadow-xl shadow-primary/20 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  Create Meeting
                </Link>
              </div>
            </motion.div>
          </section>

          {/* Key Metrics Summary */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-outline p-6 rounded-3xl hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${stat.color} text-[28px]`}>{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-2xl font-black tracking-tighter text-on-surface">{stat.value}</p>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Main Grid: Upcoming & Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Upcoming Meetings Section */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-on-surface">Upcoming Meetings</h3>
                <Link href="/calendar" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {meetings.length > 0 ? meetings.map((m, i) => (
                  <div key={i} className="group flex items-center gap-5 p-5 rounded-3xl bg-surface border border-outline hover:border-primary/30 transition-all shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <span className="text-[10px] font-black uppercase">{new Date(m.startTime).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-lg font-black leading-none">{new Date(m.startTime).getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{m.title}</p>
                        {m.priority && (
                          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border 
                            ${m.priority === 'urgent' ? 'bg-error/10 border-error/20 text-error' : 
                              m.priority === 'high' ? 'bg-primary/10 border-primary/20 text-primary' : 
                              'bg-on-surface/5 border-outline text-on-surface-variant'}`}>
                            {m.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant uppercase tracking-widest font-medium mt-1">
                        {new Date(m.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {m.location || 'Remote'}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward_ios</span>
                  </div>
                )) : (
                  <div className="p-10 border border-dashed border-outline rounded-3xl text-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-4xl mb-3">event_busy</span>
                    <p className="text-sm text-on-surface-variant font-medium">No meetings scheduled for today.</p>
                  </div>
                )}
              </div>
            </motion.section>

            {/* AI Insights & Urgent Tasks */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* AI Insights Card */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">auto_awesome</span>
                    Smart Suggestion
                  </h3>
                  <p className="text-on-surface font-medium mb-6 leading-relaxed">
                    We found a better slot for your <span className="font-bold">Product Review</span> that saves you 45 minutes of context switching.
                  </p>
                  <button className="w-full py-4 bg-primary text-white text-xs font-black uppercase rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Apply Optimization
                  </button>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              </div>

              {/* Urgent Tasks Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-on-surface">Critical Tasks</h3>
                  <Link href="/tasks" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Manage Board</Link>
                </div>
                <div className="space-y-3">
                  {urgentTasks.length > 0 ? urgentTasks.map((t, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-outline hover:bg-surface-container/30 transition-all">
                      <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                      <p className="text-sm font-bold text-on-surface flex-1">{t.title}</p>
                      <span className="text-[10px] font-black text-error uppercase tracking-widest">{t.priority}</span>
                    </div>
                  )) : (
                    <div className="p-6 bg-success/5 border border-success/20 rounded-2xl flex items-center gap-4 text-success">
                      <span className="material-symbols-outlined">task_alt</span>
                      <p className="text-xs font-bold uppercase tracking-wider">All critical tasks are currently handled!</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
