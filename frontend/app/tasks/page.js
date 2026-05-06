"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design System Update", priority: "high", status: "todo", duration: "4h", category: "Design" },
    { id: 2, title: "Fix Dashboard Sidebar", priority: "medium", status: "in-progress", duration: "2h", category: "Dev" },
    { id: 3, title: "Client Presentation", priority: "urgent", status: "todo", duration: "1h", category: "Business" },
    { id: 4, title: "Database Migration", priority: "high", status: "completed", duration: "6h", category: "Dev" },
    { id: 5, title: "User Feedback Loop", priority: "low", status: "in-progress", duration: "3h", category: "Product" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { id: "todo", name: "To Do", color: "bg-[#1197e8]" },
    { id: "in-progress", name: "In Progress", color: "bg-[#ffb778]" },
    { id: "completed", name: "Completed", color: "bg-[#a0d0c8]" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'high': return 'text-[#ffb778] bg-[#ffb778]/10 border-[#ffb778]/20';
      case 'medium': return 'text-[#1197e8] bg-[#1197e8]/10 border-[#1197e8]/20';
      default: return 'text-[#bfc7d3] bg-[#bfc7d3]/10 border-[#bfc7d3]/20';
    }
  };

  const addTask = (status) => {
    toast.success(`New task added to ${status}`);
    // Logic to add task would go here
  };

  return (
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Tasks Board" />

        <main className="flex-1 overflow-x-auto custom-scrollbar p-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6 h-full min-w-[1000px]"
          >
            {columns.map((column, colIdx) => (
              <motion.div 
                key={column.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: colIdx * 0.1 }}
                className="flex-1 flex flex-col gap-4 min-w-[320px]"
              >
                <div className="flex items-center justify-between px-2 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
                    <h3 className="font-bold text-lg">{column.name}</h3>
                    <span className="bg-[#1c2025] text-[#bfc7d3] text-[10px] px-2 py-0.5 rounded-full font-black tracking-tighter">
                      {tasks.filter(t => t.status === column.id).length}
                    </span>
                  </div>
                  <button 
                    onClick={() => addTask(column.id)}
                    className="material-symbols-outlined text-[#bfc7d3] hover:text-[#1197e8] transition-colors bg-[#1c2025] p-1 rounded-lg"
                  >
                    add
                  </button>
                </div>

                <div className="flex-1 bg-[#0f1419]/40 border border-[#2d3656]/30 rounded-3xl p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar backdrop-blur-sm">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      [...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 w-full bg-[#161b33] rounded-2xl animate-pulse"></div>
                      ))
                    ) : (
                      tasks.filter(t => t.status === column.id).map((task, taskIdx) => (
                        <motion.div 
                          layout
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.02, translateY: -2 }}
                          key={task.id} 
                          className="bg-[#0f1419] border border-[#2d3656] p-5 rounded-2xl shadow-xl hover:border-[#1197e8]/40 transition-all group cursor-grab active:cursor-grabbing"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <button className="material-symbols-outlined text-[#bfc7d3] opacity-0 group-hover:opacity-100 transition-opacity">more_horiz</button>
                          </div>
                          
                          <h4 className="font-bold text-sm mb-2 group-hover:text-[#1197e8] transition-colors leading-tight">{task.title}</h4>
                          <p className="text-xs text-[#bfc7d3] mb-6 line-clamp-2 leading-relaxed">Optimization and performance refinement across the user interface dashboard.</p>
                          
                          <div className="flex items-center justify-between border-t border-[#2d3656] pt-4">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[14px] text-[#bfc7d3]">timer</span>
                              <span className="text-[10px] font-bold text-[#bfc7d3]">{task.duration}</span>
                            </div>
                            <div className="flex -space-x-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1197e8] to-[#97cbff] border-2 border-[#0f1419] flex items-center justify-center text-[8px] font-bold">AS</div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                  
                  {!loading && (
                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addTask(column.id)}
                      className="w-full py-4 border-2 border-dashed border-[#2d3656] rounded-2xl text-[#bfc7d3] text-sm font-bold hover:border-[#1197e8]/40 hover:text-[#1197e8] hover:bg-[#1197e8]/5 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_circle</span>
                      Add Task
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
