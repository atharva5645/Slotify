"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Link from "next/link";
import { useState } from "react";

export default function CreateMeetingPage() {
  const [participants, setParticipants] = useState([
    { name: "Alex Carter", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3ckWBmzptZ6iW6jGIQoFJKSIkQ5jXV9Bq69jCt346iuwRTnAhs7zh1D05qO-edbKs1rGL_npJ_E50cP6PnPQHYlwtBzOiAfrKGjK17rJV45P6y92mwWR6xDefVfDv70U-pc5qhK66gZIdYYVph770aiGFuuGwypCqTXL7qLRr0GNXP3roW2xzhDtljaVAMSxtSjL5o3oPUny1ZvEInbtkSYI9rgZe4_VyCva_iCm9MKbE5b2APipW13o1ZcpD5YD3v3ES6TiiX2Y" },
    { name: "Sarah Lee", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0LHSK3GqHX3qmmvCguXItMVC_xh_n7oacsP7Lxnhb2ajssKSYGr1qCTxOlV6PcVmkofFw8NtHlQ1dvejDt8ch4kVBtA0DYOdLkSBD0cV_cdUll1eSSWlFz7Pm38Tlayqo4X0YLP8hHZ0O0ij1RF66105djimYtkWo1iPPp5q1uUfmsuPGzbt40uLySrN4-VbZIQvsU2J7MhN17V9eqWJJGnN2WXuUYKhnySMp4_H4SCMDP8io3qhGiE8hnV5vPlTR0zlciCwILmg" }
  ]);

  return (
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Create Meeting" />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-32">
          <div className="max-w-5xl mx-auto w-full animate-fade-in">
            <div className="flex justify-center">
              
              {/* Center: Form */}
              <div className="w-full max-w-2xl space-y-8">
                <div className="bg-[#0f1419] p-8 rounded-2xl border border-[#2d3656] shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Meeting Details</h2>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider">Meeting Title</label>
                      <input 
                        className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-white focus:border-[#1197e8] focus:ring-2 focus:ring-[#1197e8]/10 transition-all outline-none" 
                        placeholder="e.g. Q4 Strategy Review" 
                        type="text"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider">Description</label>
                      <textarea 
                        className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-sm text-white focus:border-[#1197e8] focus:ring-2 focus:ring-[#1197e8]/10 transition-all outline-none resize-none" 
                        placeholder="Briefly describe the objective of this meeting..." 
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider">Date</label>
                        <div className="relative group">
                          <input 
                            className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-sm text-white focus:border-[#1197e8] outline-none appearance-none cursor-pointer" 
                            type="date"
                            onClick={(e) => e.target.showPicker?.()}
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#bfc7d3] pointer-events-none group-focus-within:text-[#1197e8]">calendar_today</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider">Start Time</label>
                        <div className="relative group">
                          <input 
                            className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-sm text-white focus:border-[#1197e8] outline-none appearance-none cursor-pointer" 
                            type="time"
                            onClick={(e) => e.target.showPicker?.()}
                          />
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#bfc7d3] pointer-events-none group-focus-within:text-[#1197e8]">schedule</span>
                        </div>
                      </div>
                    </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider">Duration</label>
                          <input 
                            list="duration-options"
                            className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-sm text-white focus:border-[#1197e8] outline-none transition-all"
                            placeholder="Select or type..."
                            defaultValue="1 hour"
                          />
                          <datalist id="duration-options">
                            <option value="15 minutes" />
                            <option value="30 minutes" />
                            <option value="1 hour" />
                            <option value="1.5 hours" />
                            <option value="2 hours" />
                          </datalist>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider">Meeting Type</label>
                          <input 
                            list="meeting-types"
                            className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-sm text-white focus:border-[#1197e8] outline-none transition-all"
                            placeholder="Select or type..."
                            defaultValue="Internal Sync"
                          />
                          <datalist id="meeting-types">
                            <option value="Internal Sync" />
                            <option value="Client Presentation" />
                            <option value="Workshop" />
                            <option value="General 1:1" />
                          </datalist>
                        </div>
                      </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider">Participants</label>
                      <div className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-2 flex flex-wrap gap-2 items-center min-h-[56px]">
                        {participants.map((p, idx) => (
                          <div key={idx} className="bg-[#0b1026] px-3 py-1.5 rounded-full flex items-center gap-2 border border-[#2d3656]">
                            <img src={p.avatar} alt={p.name} className="w-5 h-5 rounded-full object-cover" />
                            <span className="text-xs font-medium text-[#dfe3ea]">{p.name}</span>
                            <button type="button" className="material-symbols-outlined text-[14px] text-[#bfc7d3] hover:text-red-400">close</button>
                          </div>
                        ))}
                        <input 
                          className="bg-transparent border-none focus:ring-0 text-sm text-[#dfe3ea] flex-1 min-w-[120px] ml-2" 
                          placeholder="Add guest..." 
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
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#0f1419]/90 backdrop-blur-xl border-t border-[#2d3656] px-8 py-4 flex items-center justify-between z-30">
          <div className="hidden sm:flex items-center gap-2 text-[#bfc7d3]">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="text-xs font-medium">Draft saved 2m ago</span>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-[#bfc7d3] hover:text-white transition-colors">
              Cancel
            </button>
            <button className="flex-1 sm:flex-none px-10 py-3 bg-[#1197e8] text-white font-bold rounded-xl shadow-lg shadow-[#1197e8]/20 hover:bg-[#0088cc] active:scale-[0.98] transition-all">
              Create Meeting
            </button>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
