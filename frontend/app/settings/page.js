"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [themeMode, setThemeMode] = useState("dark");
  const [accentColor, setAccentColor] = useState("#1197e8");

  // Apply theme class to document root
  useEffect(() => {
    if (themeMode === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, [themeMode]);

  const tabs = [
    { id: "profile", name: "Profile", icon: "person" },
    { id: "appearance", name: "Appearance", icon: "palette" },
    { id: "notifications", name: "Notifications", icon: "notifications" },
    { id: "integrations", name: "Integrations", icon: "link" },
    { id: "security", name: "Security", icon: "shield_lock" },
  ];

  const colors = [
    { name: "Blue", value: "#1197e8" },
    { name: "Purple", value: "#8b5cf6" },
    { name: "Emerald", value: "#10b981" },
    { name: "Rose", value: "#f43f5e" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Indigo", value: "#6366f1" },
  ];

  const handleSave = () => {
    toast.success("Settings updated successfully");
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
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
            <div className="flex items-center gap-2 border-b border-outline mb-10 pb-1 overflow-x-auto custom-scrollbar whitespace-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-t-xl text-sm font-bold transition-all relative
                    ${activeTab === tab.id 
                      ? 'bg-opacity-10' 
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
                  style={{ 
                    color: activeTab === tab.id ? accentColor : undefined,
                    backgroundColor: activeTab === tab.id ? `${accentColor}15` : undefined 
                  }}
                >
                  <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                  {tab.name}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-[-1px] left-0 right-0 h-0.5"
                      style={{ backgroundColor: accentColor }}
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
                        <div className="w-32 h-32 rounded-3xl bg-surface-container border-2 border-outline flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3ckWBmzptZ6iW6jGIQoFJKSIkQ5jXV9Bq69jCt346iuwRTnAhs7zh1D05qO-edbKs1rGL_npJ_E50cP6PnPQHYlwtBzOiAfrKGjK17rJV45P6y92mwWR6xDefVfDv70U-pc5qhK66gZIdYYVph770aiGFuuGwypCqTXL7qLRr0GNXP3roW2xzhDtljaVAMSxtSjL5o3oPUny1ZvEInbtkSYI9rgZe4_VyCva_iCm9MKbE5b2APipW13o1ZcpD5YD3v3ES6TiiX2Y" 
                            alt="Profile" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center border-4 border-background shadow-lg hover:scale-110 active:scale-95 transition-all">
                          <span className="material-symbols-outlined text-white text-[18px]">photo_camera</span>
                        </button>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-xl font-bold">Alex Carter</h3>
                        <p className="text-sm text-on-surface-variant">Product Designer at Slotify Labs</p>
                        <div className="flex items-center gap-2 mt-4">
                          <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Pro Account</span>
                          <span className="text-[10px] text-on-surface-variant">Member since Oct 2023</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Full Name</label>
                        <input className="w-full bg-surface-container border border-outline rounded-xl p-4 text-on-surface focus:border-primary outline-none transition-colors" defaultValue="Alex Carter" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Email Address</label>
                        <input className="w-full bg-surface-container border border-outline rounded-xl p-4 text-on-surface focus:border-primary outline-none transition-colors" defaultValue="alex@slotify.com" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Bio</label>
                        <textarea className="w-full bg-surface-container border border-outline rounded-xl p-4 text-on-surface focus:border-primary outline-none h-32 resize-none transition-colors" defaultValue="Building the future of team scheduling. Focused on deep work and minimalism." />
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === "appearance" && (
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: accentColor }}>light_mode</span>
                        Interface Mode
                      </h3>
                      <p className="text-sm text-on-surface-variant">Choose between Dark and Snowy UI</p>
                    </div>

                    <div className="flex gap-4 p-1 bg-surface-container rounded-2xl w-fit">
                      {[
                        { id: 'dark', name: 'Dark Mode', icon: 'dark_mode' },
                        { id: 'light', name: 'Snowy UI', icon: 'light_mode' }
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setThemeMode(mode.id)}
                          className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                            ${themeMode === mode.id 
                              ? 'bg-surface text-on-surface shadow-lg' 
                              : 'text-on-surface-variant hover:text-on-surface'}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">{mode.icon}</span>
                          {mode.name}
                        </button>
                      ))}
                    </div>

                    <div className="h-px bg-outline w-full" />

                    <div>
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ color: accentColor }}>palette</span>
                        Brand Accent
                      </h3>
                      <p className="text-sm text-on-surface-variant">Select your workspace's primary accent color</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setAccentColor(color.value)}
                          className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all
                            ${accentColor === color.value 
                              ? 'bg-opacity-10 border-opacity-100' 
                              : 'bg-surface-container border-outline hover:border-on-surface/20'}`}
                          style={{ 
                            borderColor: accentColor === color.value ? color.value : undefined,
                            backgroundColor: accentColor === color.value ? `${color.value}15` : undefined
                          }}
                        >
                          <div 
                            className="w-10 h-10 rounded-full shadow-lg transition-transform group-hover:scale-110"
                            style={{ backgroundColor: color.value }}
                          />
                          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface">
                            {color.name}
                          </span>
                          {accentColor === color.value && (
                            <motion.div 
                              layoutId="selectedColor"
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface flex items-center justify-center shadow-xl border-4 border-background"
                            >
                              <span className="material-symbols-outlined text-[14px] text-on-surface font-bold">check</span>
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="p-8 rounded-3xl border border-dashed border-outline bg-surface-container/30">
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Interface Preview</p>
                        <div className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                          Live Preview
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-4 w-1/2 rounded-full bg-outline/50" />
                        <div className="h-10 w-full rounded-xl" style={{ backgroundColor: accentColor }} />
                        <div className="flex gap-2">
                          <div className="h-8 w-24 rounded-lg border border-outline" />
                          <div className="h-8 w-24 rounded-lg" style={{ border: `1px solid ${accentColor}`, color: accentColor }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary rounded-full"></span>
                      Notification Settings
                    </h3>
                    {[
                      { title: "Smart Slot Reminders", desc: "Get notified when a deep work block is about to start", enabled: true },
                      { title: "Meeting Invitations", desc: "When someone invites you to a new slot", enabled: true },
                      { title: "Weekly Report", desc: "Receive a weekly summary of your productivity", enabled: false },
                      { title: "Desktop Alerts", desc: "Show push notifications on your desktop", enabled: true }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-6 bg-surface-container/30 border border-outline rounded-2xl hover:bg-surface-container/50 transition-colors">
                        <div className="space-y-1">
                          <p className="font-bold text-on-surface">{item.title}</p>
                          <p className="text-xs text-on-surface-variant">{item.desc}</p>
                        </div>
                        <button className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${item.enabled ? 'bg-primary' : 'bg-surface-container'}`}>
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
                        className="p-6 bg-surface border border-outline rounded-3xl flex flex-col gap-6 hover:border-primary/40 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className={`w-14 h-14 rounded-2xl bg-surface-container border border-outline flex items-center justify-center`}>
                            <span className={`material-symbols-outlined text-3xl ${app.color}`}>{app.icon}</span>
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${app.status === 'Connected' ? 'bg-success/10 text-success border border-success/20' : 'bg-surface-container text-on-surface-variant border border-outline'}`}>
                            {app.status}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1 text-on-surface">{app.name}</p>
                          <p className="text-xs text-on-surface-variant mb-4">Sync your {app.name.toLowerCase()} data with Slotify.</p>
                          <button className="w-full py-3 rounded-xl border border-outline text-xs font-bold hover:bg-primary hover:border-primary hover:text-white transition-all text-on-surface">
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
            <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-background/80 backdrop-blur-xl border-t border-outline px-8 py-4 flex items-center justify-end z-30">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-10 py-3 text-white font-bold rounded-xl shadow-lg transition-all"
                style={{ 
                  backgroundColor: accentColor,
                  shadowColor: `${accentColor}33`
                }}
              >
                Save Changes
              </motion.button>
            </div>

            {/* Global Theme Injection */}
            <style jsx global>{`
              :root {
                --color-primary: ${accentColor};
                --color-primary-container: ${accentColor};
                --color-primary-light: ${accentColor}dd;
                --color-primary-soft: ${accentColor}20;
              }
              
              /* Global utility class overrides */
              .bg-primary { background-color: var(--color-primary) !important; }
              .text-primary { color: var(--color-primary) !important; }
              .border-primary { border-color: var(--color-primary) !important; }
              
              /* Sidebar and common component overrides */
              .sidebar-active { 
                color: var(--color-primary-light) !important; 
                border-left-color: var(--color-primary-light) !important;
                background-color: var(--color-primary-soft) !important;
              }
              .btn-primary {
                background-color: var(--color-primary) !important;
                box-shadow: 0 10px 15px -3px ${accentColor}33 !important;
              }
              .btn-primary:hover {
                filter: brightness(1.1);
              }
            `}</style>
          </motion.div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
