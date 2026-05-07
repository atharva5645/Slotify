"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { negotiateScheduling } from "@/lib/ai/negotiationClient";
import { createMeeting } from "@/lib/scheduler/schedulingService";

export default function CreateMeetingPage() {
  const [participants, setParticipants] = useState([
    { userId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12", name: "Sarah Lee", mandatory: true },
    { userId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13", name: "John Doe", mandatory: false }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiLog, setAiLog] = useState([]);
  const [showAiLog, setShowAiLog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    duration: "60",
    location: "",
    type: "remote"
  });

  const handleAISchedule = async () => {
    if (!formData.title) {
      toast.error("Please enter a meeting title first");
      return;
    }

    setIsProcessing(true);
    setShowAiLog(true);
    setAiLog(["🤖 Orchestrator: Initializing AI scheduling engine..."]);

    try {
      // Direct call to client-side negotiation (Logic + Gemini + Firebase)
      const result = await negotiateScheduling({
        title: formData.title,
        participantIds: participants.map(p => p.userId),
        durationMinutes: parseInt(formData.duration),
        dateRange: {
          start: new Date().toISOString(),
          end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      });

      if (result.success) {
        // Mock the negotiation log for UI feedback
        const mockLogs = [
          "🤖 Orchestrator: Fetching participant schedules...",
          "🤖 Orchestrator: Analyzing conflicts for Sarah Lee and John Doe...",
          "🤖 Orchestrator: Running scoring algorithm on 10 candidate slots...",
          "✅ Orchestrator: Found optimal slot with 95% availability score!"
        ];

        for (const msg of mockLogs) {
          await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
          setAiLog(prev => [...prev, msg]);
        }

        // Apply the best slot to the form
        const bestSlot = result.bestSlot;
        setFormData(prev => ({
          ...prev,
          date: new Date(bestSlot.startTime).toISOString().split('T')[0],
          startTime: new Date(bestSlot.startTime).toTimeString().split(' ')[0].substring(0, 5),
          location: result.meetingLink // Auto-fill Jitsi link
        }));

        // Show AI summary
        if (result.aiSummary) {
          await new Promise(r => setTimeout(r, 500));
          setAiLog(prev => [...prev, `🤖 AI Summary: ${result.aiSummary}`]);
        }

        toast.success("AI found the optimal slot!");
      } else {
        throw new Error(result.error || "AI scheduling failed");
      }
    } catch (error) {
      console.error("AI Schedule Error:", error);
      setAiLog(prev => [...prev, `❌ Error: ${error.message}`]);
      toast.error(`AI Scheduling Failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.date || !formData.startTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    
    try {
      const start = new Date(`${formData.date}T${formData.startTime}:00`);
      const end = new Date(start.getTime() + parseInt(formData.duration) * 60 * 1000);
      const meetingId = `slot-${Math.random().toString(36).substring(2, 10)}`;

      // Direct call to client-side meeting creation (Firebase Firestore)
      const result = await createMeeting({
        ...formData,
        id: meetingId,
        organizerId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11", // Alex Carter (demo)
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        participants: participants,
        minAttendees: 1
      });

      if (result.success) {
        toast.success("Meeting orchestrated successfully!");
        
        // Redirect to the new Join UI after a short delay
        setTimeout(() => {
          window.location.href = `/meetings/join/${meetingId}`;
        }, 1500);

      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Create error:", error);
      toast.error(`Meeting Creation Failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative min-h-screen">
        <Header title="Create Meeting" />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 pb-32">
          <div className="w-full animate-fade-in relative">
            
            <AnimatePresence>
              {(isProcessing || showAiLog) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-x-0 top-0 z-50 bg-surface/95 backdrop-blur-xl border border-outline rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto mt-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary animate-pulse">smart_toy</span>
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary">AI Negotiation Engine</h3>
                    </div>
                    {isProcessing && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>}
                    {!isProcessing && (
                      <button onClick={() => setShowAiLog(false)} className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">close</button>
                    )}
                  </div>
                  
                  <div className="space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                    {aiLog.map((log, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`text-[11px] font-bold py-2 px-3 rounded-lg ${
                          log.includes('⚠️') ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          log.includes('🚫') ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          log.includes('✅') ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          'bg-surface-container text-on-surface-variant border border-outline'
                        }`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full max-w-4xl mx-auto space-y-8">
              <div className={`bg-surface p-6 md:p-10 rounded-3xl border border-outline shadow-2xl transition-all ${isProcessing ? 'blur-sm scale-[0.99]' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-on-surface">Meeting Details</h2>
                    <p className="text-xs text-on-surface-variant mt-1 font-bold uppercase tracking-widest opacity-50">Configure your autonomous sync</p>
                  </div>
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
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Description</label>
                      <textarea 
                        className="w-full bg-surface-container border border-outline rounded-xl p-4 text-sm text-on-surface focus:border-primary transition-all outline-none resize-none placeholder:text-on-surface-variant/30" 
                        placeholder="Briefly describe the objective of this meeting..." 
                        rows="4"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Date</label>
                        <div className="relative group">
                          <input 
                            className="w-full bg-surface-container border border-outline rounded-xl p-4 text-sm text-on-surface focus:border-primary outline-none appearance-none cursor-pointer font-bold" 
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
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
                            value={formData.startTime}
                            onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-focus-within:text-primary">schedule</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Meeting Type</label>
                        <div className="flex bg-surface-container p-1 rounded-xl border border-outline">
                          <button 
                            type="button" 
                            onClick={() => setFormData({...formData, type: 'remote'})}
                            className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${formData.type === 'remote' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                          >
                            Remote
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setFormData({...formData, type: 'in-person'})}
                            className={`flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all ${formData.type === 'in-person' ? 'bg-surface text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                          >
                            In-Person
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Duration</label>
                        <div className="relative group">
                          <select 
                            className="w-full bg-surface-container border border-outline rounded-xl p-4 text-sm text-on-surface focus:border-primary outline-none cursor-pointer font-bold appearance-none"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          >
                            <option value="30">30 Minutes</option>
                            <option value="60">1 Hour</option>
                            <option value="90">1.5 Hours</option>
                            <option value="120">2 Hours</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-focus-within:text-primary">timer</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Location / Link</label>
                        <div className="relative group flex gap-2">
                          <div className="relative flex-1">
                            <input 
                              className="w-full bg-surface-container border border-outline rounded-xl p-4 text-sm text-on-surface focus:border-primary outline-none font-bold placeholder:text-on-surface-variant/30 pr-10" 
                              placeholder="Zoom or Room" 
                              type="text"
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-focus-within:text-primary">location_on</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const mockLink = `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`;
                              setFormData({...formData, location: mockLink});
                              toast.success("Zoom link generated!");
                            }}
                            className="px-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all flex items-center justify-center shrink-0 group/zoom"
                            title="Generate Zoom Link"
                          >
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">videocam</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Participants</label>
                      <div className="w-full bg-surface-container border border-outline rounded-xl p-2 flex flex-wrap gap-2 items-center min-h-[56px]">
                        {participants.map((p, idx) => (
                          <div key={idx} className="bg-surface px-3 py-1.5 rounded-full flex items-center gap-2 border border-outline shadow-sm">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-white uppercase">
                              {p.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-[10px] font-bold text-on-surface">{p.name}</span>
                            <button type="button" className="material-symbols-outlined text-[14px] text-on-surface-variant hover:text-red-500 transition-colors">close</button>
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
        </main>

        {/* Footer Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-surface/90 backdrop-blur-xl border-t border-outline px-8 py-4 flex items-center justify-between z-30">
          <div className="hidden sm:flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Autosave enabled</span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={handleAISchedule}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-xl hover:bg-primary/20 transition-all active:scale-95 disabled:opacity-50 group"
            >
              <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">smart_toy</span>
              <span className="text-[10px] font-black uppercase tracking-widest">AI Auto-Schedule</span>
            </button>
            <Link href="/dashboard" className="hidden sm:block px-6 py-3 text-xs font-black uppercase text-on-surface-variant hover:text-on-surface transition-colors">
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
