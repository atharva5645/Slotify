"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function CreateMeetingPage() {
  const [participants, setParticipants] = useState([
    { name: "Alex Carter" },
    { name: "Sarah Lee" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreate = () => {
    setIsProcessing(true);
    // Simulate AI & Workflow processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Meeting created & synced to team calendar!");
      
      // Simulate follow-up notification
      setTimeout(() => {
        toast("💡 AI Suggestion: Create a 'Meeting Prep' task for this sync?", {
          icon: '🤖',
          duration: 5000,
          style: {
            borderRadius: '12px',
            background: 'var(--bg-surface-soft)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-main)',
            fontSize: '12px',
            fontWeight: 'bold'
          }
        });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Create Meeting" />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-32">
          <div className="max-w-5xl mx-auto w-full animate-fade-in relative">
            
            <AnimatePresence>
              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-surface/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-black uppercase tracking-widest text-primary">Optimizing Team Slots...</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center">
              
              {/* Center: Form */}
              <div className="w-full max-w-2xl space-y-8">
                <div className={`bg-surface p-8 rounded-2xl border border-outline shadow-2xl transition-all ${isProcessing ? 'blur-sm scale-[0.98]' : ''}`}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black tracking-tight text-on-surface">Meeting Details</h2>
                    <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">AI Assisted</span>
                    </div>
                  </div>
                  
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Meeting Title</label>
                      <input 
                        className="w-full bg-surface-container border border-outline rounded-xl p-4 text-on-surface focus:border-primary transition-all outline-none font-bold placeholder:text-on-surface-variant/30" 
                        placeholder="e.g. Q4 Strategy Review" 
                        type="text"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Description</label>
                      <textarea 
                        className="w-full bg-surface-container border border-outline rounded-xl p-4 text-sm text-on-surface focus:border-primary transition-all outline-none resize-none placeholder:text-on-surface-variant/30" 
                        placeholder="Briefly describe the objective of this meeting..." 
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Date</label>
                        <div className="relative group">
                          <input 
                            className="w-full bg-surface-container border border-outline rounded-xl p-4 text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer font-bold" 
                            type="date"
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-focus-within:text-primary">calendar_today</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Start Time</label>
                        <div className="relative group">
                          <input 
                            className="w-full bg-surface-container border border-outline rounded-xl p-4 text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer font-bold" 
                            type="time"
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-focus-within:text-primary">schedule</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Participants</label>
                      <div className="w-full bg-surface-container border border-outline rounded-xl p-2 flex flex-wrap gap-2 items-center min-h-[56px]">
                        {participants.map((p, idx) => (
                          <div key={idx} className="bg-surface px-3 py-1.5 rounded-full flex items-center gap-2 border border-outline">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-white uppercase">
                              {p.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-[10px] font-bold text-on-surface">{p.name}</span>
                            <button type="button" className="material-symbols-outlined text-[14px] text-on-surface-variant hover:text-red-500">close</button>
                          </div>
                        ))}
                        <input 
                          className="bg-transparent border-none focus:ring-0 text-xs text-on-surface flex-1 min-w-[120px] ml-2 outline-none" 
                          placeholder="Add team member..." 
                          type="text"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-surface/90 backdrop-blur-xl border-t border-outline px-8 py-4 flex items-center justify-between z-30">
          <div className="hidden sm:flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Autosave enabled</span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link href="/dashboard" className="flex-1 sm:flex-none px-6 py-3 text-xs font-black uppercase text-on-surface-variant hover:text-on-surface transition-colors">
              Discard
            </Link>
            <button 
              onClick={handleCreate}
              disabled={isProcessing}
              className="btn-primary flex-1 sm:flex-none px-10 py-3 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Schedule Meeting'}
            </button>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
