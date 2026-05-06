import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ title }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "New Meeting Invitation", desc: "Design Sync with Sarah", time: "2m ago", type: "invite", unread: true },
    { id: 2, title: "Task Assigned", desc: "Complete Dashboard refactor", time: "1h ago", type: "task", unread: true },
    { id: 3, title: "Workspace Update", desc: "Alex added 3 new smart slots", time: "3h ago", type: "update", unread: false },
  ]);

  return (
    <header className="flex justify-between items-center w-full px-8 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline shrink-0 z-40 sticky top-0">
      <div className="flex items-center gap-6">
        <button className="md:hidden text-on-surface-variant hover:text-primary transition-opacity">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-on-surface tracking-tight">{title}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Active Workspace</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Team Status Mini Grid */}
        <div className="hidden lg:flex items-center gap-2 px-4 border-r border-outline mr-2">
          {[
            { initials: "AM", status: "online", color: "bg-success" },
            { initials: "SC", status: "busy", color: "bg-error" },
            { initials: "JD", status: "offline", color: "bg-outline" },
          ].map((member, i) => (
            <div key={i} className="relative group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-surface-container border border-outline flex items-center justify-center text-[10px] font-bold text-on-surface-variant hover:border-primary transition-all">
                {member.initials}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ${member.color} border-2 border-surface`}></div>
              
              {/* Tooltip */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface-container border border-outline rounded text-[9px] font-black uppercase text-on-surface whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                {member.status}
              </div>
            </div>
          ))}
          <button className="w-8 h-8 rounded-full border border-dashed border-outline flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-primary transition-all">
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-surface-container border border-outline flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-primary transition-all relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-surface-container"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 bg-surface border border-outline rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-outline flex justify-between items-center bg-primary/5">
                  <h3 className="font-bold text-sm text-on-surface">Notifications</h3>
                  <button className="text-[10px] font-black text-primary uppercase hover:underline">Mark all read</button>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-4 border-b border-outline/50 hover:bg-primary/5 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 
                          ${n.type === 'invite' ? 'bg-primary/10 text-primary' : 
                            n.type === 'task' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                          <span className="material-symbols-outlined text-[18px]">
                            {n.type === 'invite' ? 'mail' : n.type === 'task' ? 'assignment' : 'sync'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate text-on-surface group-hover:text-primary transition-colors">{n.title}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{n.desc}</p>
                          <p className="text-[9px] font-black text-on-surface-variant/50 uppercase mt-2 tracking-tighter">{n.time}</p>
                        </div>
                        {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 text-center text-xs font-bold text-on-surface-variant hover:text-on-surface bg-primary/5">
                  View All Activity
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-outline cursor-pointer group">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Alex Carter</span>
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Admin</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary p-[1px] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[11px] bg-surface flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface">person</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
