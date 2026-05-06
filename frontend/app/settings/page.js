"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Profile", icon: "person" },
    { id: "notifications", name: "Notifications", icon: "notifications" },
    { id: "integrations", name: "Integrations", icon: "link" },
    { id: "security", name: "Security", icon: "shield_lock" },
  ];

  const handleSave = () => {
    toast.success("Settings updated successfully");
  };

  return (
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Settings" />

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full"
          >
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-[#2d3656] mb-10 pb-1 overflow-x-auto custom-scrollbar whitespace-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-t-xl text-sm font-bold transition-all relative
                    ${activeTab === tab.id 
                      ? 'text-[#1197e8] bg-[#1197e8]/5' 
                      : 'text-[#bfc7d3] hover:text-white hover:bg-white/5'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                  {tab.name}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#1197e8]"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="space-y-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl bg-[#1c2025] border-2 border-[#2d3656] flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3ckWBmzptZ6iW6jGIQoFJKSIkQ5jXV9Bq69jCt346iuwRTnAhs7zh1D05qO-edbKs1rGL_npJ_E50cP6PnPQHYlwtBzOiAfrKGjK17rJV45P6y92mwWR6xDefVfDv70U-pc5qhK66gZIdYYVph770aiGFuuGwypCqTXL7qLRr0GNXP3roW2xzhDtljaVAMSxtSjL5o3oPUny1ZvEInbtkSYI9rgZe4_VyCva_iCm9MKbE5b2APipW13o1ZcpD5YD3v3ES6TiiX2Y" 
                            alt="Profile" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1197e8] rounded-xl flex items-center justify-center border-4 border-[#0b1026] shadow-lg hover:scale-110 active:scale-95 transition-all">
                          <span className="material-symbols-outlined text-white text-[18px]">photo_camera</span>
                        </button>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-xl font-bold">Alex Carter</h3>
                        <p className="text-sm text-[#bfc7d3]">Product Designer at Slotify Labs</p>
                        <div className="flex items-center gap-2 mt-4">
                          <span className="bg-[#1197e8]/20 text-[#1197e8] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Pro Account</span>
                          <span className="text-[10px] text-[#bfc7d3]">Member since Oct 2023</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">Full Name</label>
                        <input className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-white focus:border-[#1197e8] outline-none transition-colors" defaultValue="Alex Carter" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">Email Address</label>
                        <input className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-white focus:border-[#1197e8] outline-none transition-colors" defaultValue="alex@slotify.com" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">Bio</label>
                        <textarea className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-white focus:border-[#1197e8] outline-none h-32 resize-none transition-colors" defaultValue="Building the future of team scheduling. Focused on deep work and minimalism." />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#1197e8] rounded-full"></span>
                      Notification Settings
                    </h3>
                    {[
                      { title: "Smart Slot Reminders", desc: "Get notified when a deep work block is about to start", enabled: true },
                      { title: "Meeting Invitations", desc: "When someone invites you to a new slot", enabled: true },
                      { title: "Weekly Report", desc: "Receive a weekly summary of your productivity", enabled: false },
                      { title: "Desktop Alerts", desc: "Show push notifications on your desktop", enabled: true }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 bg-[#161b33]/30 border border-[#2d3656]/50 rounded-2xl hover:bg-[#161b33]/50 transition-colors">
                        <div className="space-y-1">
                          <p className="font-bold">{item.title}</p>
                          <p className="text-xs text-[#bfc7d3]">{item.desc}</p>
                        </div>
                        <button className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${item.enabled ? 'bg-[#1197e8]' : 'bg-[#2d3656]'}`}>
                          <motion.div 
                            animate={{ x: item.enabled ? 24 : 4 }}
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Integrations Tab */}
                {activeTab === "integrations" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { name: "Google Calendar", status: "Connected", icon: "event", color: "text-blue-400" },
                      { name: "Slack", status: "Connected", icon: "forum", color: "text-purple-400" },
                      { name: "Microsoft Outlook", status: "Not Connected", icon: "mail", color: "text-blue-500" },
                      { name: "Zoom", status: "Not Connected", icon: "videocam", color: "text-blue-300" }
                    ].map((app, idx) => (
                      <motion.div 
                        whileHover={{ translateY: -5 }}
                        key={idx} 
                        className="p-6 bg-[#161b33]/30 border border-[#2d3656]/50 rounded-3xl flex flex-col gap-6 hover:border-[#1197e8]/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className={`w-14 h-14 rounded-2xl bg-[#0b1026] border border-[#2d3656] flex items-center justify-center`}>
                            <span className={`material-symbols-outlined text-3xl ${app.color}`}>{app.icon}</span>
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${app.status === 'Connected' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-[#2d3656]/30 text-[#bfc7d3] border border-[#2d3656]/50'}`}>
                            {app.status}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1">{app.name}</p>
                          <p className="text-xs text-[#bfc7d3] mb-4">Sync your {app.name.toLowerCase()} data with Slotify.</p>
                          <button className="w-full py-3 rounded-xl border border-[#2d3656] text-xs font-bold hover:bg-[#1197e8] hover:border-[#1197e8] hover:text-white transition-all">
                            {app.status === 'Connected' ? 'Manage Settings' : 'Connect Now'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Save Button */}
            <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#0b1026]/80 backdrop-blur-xl border-t border-[#2d3656] px-8 py-4 flex items-center justify-end z-30">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-10 py-3 bg-[#1197e8] text-white font-bold rounded-xl shadow-lg shadow-[#1197e8]/20 hover:bg-[#0088cc] transition-all"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
