"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithGemini } from "@/lib/ai/geminiClient";

export default function MeetingAIBrief({ meetingId, title }) {
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrief = async () => {
      try {
        const prompt = `Give me a 3-sentence professional briefing for a meeting titled "${title}". 
        Include:
        1. The likely goal of the meeting.
        2. What the user should prepare.
        3. A professional welcome.
        Keep it concise and encouraging.`;
        
        const response = await chatWithGemini(prompt);
        setBrief(response);
      } catch (error) {
        console.error("AI Brief error:", error);
        setBrief("Welcome to the session! I'm your AI assistant. I'll be here to help you summarize the meeting and track action items once we begin.");
      } finally {
        setLoading(false);
      }
    };

    fetchBrief();
  }, [title]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-3 relative overflow-hidden"
    >
      {/* Background Icon */}
      <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-[60px] text-primary/5 icon-fill pointer-events-none">
        psychology
      </span>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[14px] icon-fill">psychology</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Briefing</span>
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-3 w-full bg-primary/10 rounded-full animate-pulse" />
          <div className="h-3 w-4/5 bg-primary/10 rounded-full animate-pulse" />
          <div className="h-3 w-2/3 bg-primary/10 rounded-full animate-pulse" />
        </div>
      ) : (
        <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
          {brief}
        </p>
      )}

      <div className="flex items-center gap-1.5 pt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
        <span className="text-[9px] font-bold text-success uppercase tracking-wider">AI Assistant Active</span>
      </div>
    </motion.div>
  );
}
