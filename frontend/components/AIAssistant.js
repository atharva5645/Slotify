"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      <div 
        className={`absolute bottom-20 right-0 w-[380px] h-[550px] bg-surface/90 backdrop-blur-xl border border-outline rounded-2xl shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-outline bg-surface-container/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-[20px] icon-fill">psychology</span>
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">Slotify AI</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <span className="text-[10px] text-success font-bold uppercase tracking-wider">Active Scheduler</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-on-surface/5 flex items-center justify-center transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Welcome Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
              <span className="material-symbols-outlined text-primary text-[16px]">psychology</span>
            </div>
            <div className="bg-surface-container border border-outline p-3 rounded-2xl rounded-tl-none text-sm text-on-surface max-w-[85%] shadow-sm">
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
                className="px-3 py-1.5 rounded-full border border-outline bg-surface text-[11px] font-medium text-on-surface-variant hover:border-primary hover:text-primary transition-all"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Thinking State Example */}
          <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
              <span className="material-symbols-outlined text-primary text-[16px]">psychology</span>
            </div>
            <div className="flex items-center gap-1.5 p-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-outline bg-surface-container/30">
          <div className="relative group">
            <input 
              type="text"
              placeholder="Ask anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-surface border border-outline rounded-xl pl-4 pr-12 py-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-on-surface-variant/30"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:opacity-90 transition-colors active:scale-90">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
          <div className="mt-3 text-center">
            <span className="text-[10px] text-on-surface-variant/50 font-medium">Slotify AI can make mistakes. Verify important dates.</span>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative group
          ${isOpen ? 'bg-on-surface/10 rotate-90 scale-90' : 'bg-primary hover:scale-110 active:scale-95 shadow-lg shadow-primary/40'}`}
      >
        <span className={`material-symbols-outlined text-white text-[28px] transition-all
          ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100 icon-fill'}`}>
          psychology
        </span>
        <span className={`material-symbols-outlined ${isOpen ? 'text-on-surface' : 'text-white'} text-[28px] absolute transition-all
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          close
        </span>
        
        {/* Glow Effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none"></span>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-18 px-3 py-1.5 bg-surface-container border border-outline text-on-surface text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none translate-x-4 group-hover:translate-x-0 duration-300 shadow-xl">
            Ask AI Assistant
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-surface-container"></div>
          </div>
        )}
      </button>
    </div>
  );
}
