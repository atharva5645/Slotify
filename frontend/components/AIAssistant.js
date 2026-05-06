"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      <div 
        className={`absolute bottom-20 right-0 w-[380px] h-[550px] bg-[#0f1419]/90 backdrop-blur-xl border border-[#3f4851] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#3f4851] bg-[#161b33]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1197e8] flex items-center justify-center shadow-[0_0_15px_rgba(17,151,232,0.4)]">
              <span className="material-symbols-outlined text-white text-[20px] icon-fill">psychology</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Slotify AI</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-[#a0d0c8] font-bold uppercase tracking-wider">Active Scheduler</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-[#bfc7d3]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Welcome Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1197e8]/20 flex items-center justify-center shrink-0 border border-[#1197e8]/30">
              <span className="material-symbols-outlined text-[#1197e8] text-[16px]">psychology</span>
            </div>
            <div className="bg-[#1c2025] border border-[#2d3656] p-3 rounded-2xl rounded-tl-none text-sm text-[#dfe3ea] max-w-[85%] shadow-sm">
              Hello Alex! I&apos;m your Slotify AI assistant. I can help you optimize your schedule, create new tasks, or find the best "Smart Slots" for your deep work. 
              <br/><br/>
              How can I assist you today?
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Find a free slot", "Reschedule today", "Create a task"].map((action) => (
              <button 
                key={action}
                className="px-3 py-1.5 rounded-full border border-[#2d3656] bg-[#0f1419] text-[11px] font-medium text-[#bfc7d3] hover:border-[#1197e8] hover:text-[#1197e8] transition-all"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Thinking State Example */}
          <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="w-8 h-8 rounded-full bg-[#1197e8]/20 flex items-center justify-center shrink-0 border border-[#1197e8]/30">
              <span className="material-symbols-outlined text-[#1197e8] text-[16px]">psychology</span>
            </div>
            <div className="flex items-center gap-1.5 p-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1197e8] animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1197e8] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1197e8] animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[#3f4851] bg-[#161b33]/30">
          <div className="relative group">
            <input 
              type="text"
              placeholder="Ask anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl pl-4 pr-12 py-3 text-sm text-white outline-none transition-all focus:border-[#1197e8] focus:ring-2 focus:ring-[#1197e8]/10 placeholder:text-[#bfc7d3]/30"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#1197e8] text-white flex items-center justify-center hover:bg-[#0088cc] transition-colors active:scale-90">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
          <div className="mt-3 text-center">
            <span className="text-[10px] text-[#bfc7d3]/50 font-medium">Slotify AI can make mistakes. Verify important dates.</span>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 relative group
          ${isOpen ? 'bg-[#3f4851] rotate-90 scale-90' : 'bg-[#1197e8] hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(17,151,232,0.4)] hover:shadow-[0_0_30px_rgba(17,151,232,0.6)]'}`}
      >
        <span className={`material-symbols-outlined text-white text-[28px] transition-all
          ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100 icon-fill'}`}>
          psychology
        </span>
        <span className={`material-symbols-outlined text-white text-[28px] absolute transition-all
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          close
        </span>
        
        {/* Glow Effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#1197e8] animate-ping opacity-20 pointer-events-none"></span>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-18 px-3 py-1.5 bg-[#1c2025] border border-[#2d3656] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-x-4 group-hover:translate-x-0 duration-300 shadow-xl">
            Ask AI Assistant
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-[#1c2025]"></div>
          </div>
        )}
      </button>
    </div>
  );
}
