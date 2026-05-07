"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import Image from "next/image";
import MeetingAIBrief from "@/components/MeetingAIBrief";
import AIAssistant from "@/components/AIAssistant";

export default function JoinMeetingPage({ params }) {
  const [isJoined, setIsJoined] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // In a real app, we'd fetch this from Firestore using params.id
  const meetingTitle = "Strategy Session: Q4 Review";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Join Meeting" />

        <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

          {!isJoined ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start z-10"
            >
              {/* Video Preview Side */}
              <div className="space-y-6">
                <div className="relative aspect-video bg-surface-container rounded-[32px] border border-outline overflow-hidden shadow-2xl group">
                  {cameraOn ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-container to-background flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto border border-primary/30">
                          <span className="material-symbols-outlined text-primary text-[40px] animate-pulse">person</span>
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Camera Preview Active</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-[64px]">videocam_off</span>
                    </div>
                  )}

                  {/* Overlay Controls */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                    <button 
                      onClick={() => setMicOn(!micOn)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-surface/80 backdrop-blur-md text-on-surface hover:bg-surface' : 'bg-error text-white'}`}
                    >
                      <span className="material-symbols-outlined">{micOn ? 'mic' : 'mic_off'}</span>
                    </button>
                    <button 
                      onClick={() => setCameraOn(!cameraOn)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${cameraOn ? 'bg-surface/80 backdrop-blur-md text-on-surface hover:bg-surface' : 'bg-error text-white'}`}
                    >
                      <span className="material-symbols-outlined">{cameraOn ? 'videocam' : 'videocam_off'}</span>
                    </button>
                  </div>
                </div>
                
                {/* AI BRIEFING COMPONENT */}
                <MeetingAIBrief title={meetingTitle} />

                <div className="flex items-center justify-center gap-6 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Mic Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Camera Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Connection Stable</span>
                  </div>
                </div>
              </div>

              {/* Join Details Side */}
              <div className="space-y-8 bg-surface border border-outline rounded-[40px] p-10 shadow-xl backdrop-blur-sm">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                    <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Meeting ID: {params.id}</span>
                  </div>
                  <h1 className="text-4xl font-black tracking-tighter mb-4">Ready to join?</h1>
                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    Strategy Session: Q4 Review and Roadmap Planning. Sarah Lee and 2 others are already in the room.
                  </p>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      setIsJoined(true);
                      toast.success("Joining meeting room...");
                    }}
                    className="w-full bg-primary text-white py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/30"
                  >
                    Join Now
                  </button>
                  <Link href="/dashboard" className="w-full block py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant hover:text-on-surface transition-colors">
                    Back to Dashboard
                  </Link>
                </div>

                <div className="pt-8 border-t border-outline flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-surface-container flex items-center justify-center font-black text-[10px] text-primary">
                        U{i}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary flex items-center justify-center font-black text-[10px] text-white">
                      +2
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Sarah, John & 3 more</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
                <span className="material-symbols-outlined text-primary text-[48px]">videocam</span>
              </div>
              <div>
                <h2 className="text-4xl font-black mb-2 tracking-tight">Connected</h2>
                <p className="text-on-surface-variant font-medium">Redirecting you to the secure video session...</p>
              </div>
              <div className="w-64 h-1.5 bg-surface-container rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-primary"
                />
              </div>
            </motion.div>
          )}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
