"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("todo");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design System Update", priority: "high", status: "todo", duration: "4h", category: "Design", assignee: "Alex Carter" },
    { id: 2, title: "Fix Dashboard Sidebar", priority: "medium", status: "in-progress", duration: "2h", category: "Dev", assignee: "Sarah Lee" },
    { id: 3, title: "Client Presentation", priority: "urgent", status: "todo", duration: "1h", category: "Business", assignee: "John Doe" },
    { id: 4, title: "Database Migration", priority: "high", status: "completed", duration: "6h", category: "Dev", assignee: "Alex Carter" },
    { id: 5, title: "User Feedback Loop", priority: "low", status: "in-progress", duration: "3h", category: "Product", assignee: "Sarah Lee" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    { id: "todo", name: "To Do", color: "bg-primary" },
    { id: "in-progress", name: "In Progress", color: "bg-warning" },
    { id: "completed", name: "Completed", color: "bg-success" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-on-surface-variant bg-on-surface-variant/10 border-on-surface-variant/20';
    }
  };

  const priorityWeight = {
    urgent: 0,
    high: 1,
    medium: 2,
    low: 3
  };

  const addTask = (status) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const confirmAddTask = () => {
    if (!newTaskTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const newTask = { 
      id: Date.now(), 
      title: newTaskTitle, 
      priority: newTaskPriority, 
      status: modalStatus, 
      duration: "1h", 
      category: "Product",
      assignee: newTaskAssignee || "Unassigned"
    };

    setTasks(prev => [...prev, newTask]);
    setIsModalOpen(false);
    setNewTaskTitle("");
    setNewTaskPriority("medium");
    setNewTaskAssignee("");

    toast.success(`Task added to ${modalStatus}`, {
      icon: '🚀',
      style: {
        borderRadius: '10px',
        background: 'var(--surface-container)',
        color: 'var(--on-surface)',
        border: '1px solid var(--outline)',
        fontSize: '12px',
        fontWeight: 'bold'
      }
    });
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.error("Task removed", {
      icon: '🗑️',
      style: {
        borderRadius: '10px',
        background: 'var(--surface-container)',
        color: 'var(--on-surface)',
        border: '1px solid var(--outline)',
        fontSize: '12px',
        fontWeight: 'bold'
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Tasks Board" />

        <main className="flex-1 overflow-x-auto custom-scrollbar p-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-8 h-full min-w-[1000px]"
          >
            {columns.map((col, colIdx) => (
              <motion.div 
                key={col.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: colIdx * 0.1 }}
                className="flex-1 flex flex-col gap-4 min-w-[320px]"
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${col.color} shadow-sm`} />
                    <h2 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{col.name}</h2>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-surface-container text-on-surface-variant border border-outline">
                    {tasks.filter(t => t.status === col.id).length}
                  </span>
                </div>

                <div className="flex-1 bg-surface-container/30 border border-outline rounded-[32px] p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar backdrop-blur-sm">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      [...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 w-full bg-surface rounded-2xl animate-pulse border border-outline/50" />
                      ))
                    ) : (
                      <>
                        {tasks.filter(t => t.status === col.id).length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-outline/50">
                              <span className="material-symbols-outlined text-on-surface-variant text-[32px]">assignment_turned_in</span>
                            </div>
                            <p className="text-sm font-bold mb-1 text-on-surface">No tasks here</p>
                            <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest mb-4">Empty slot</p>
                            <button onClick={() => addTask(col.id)} className="text-xs font-black text-primary hover:underline uppercase tracking-tighter">Create First Task</button>
                          </div>
                        ) : (
                          tasks
                            .filter(t => t.status === col.id)
                            .sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority])
                            .map((task) => (
                            <motion.div 
                              layout
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              whileHover={{ scale: 1.02, translateY: -2 }}
                              key={task.id} 
                              className="bg-surface border border-outline p-5 rounded-2xl shadow-sm hover:border-primary/50 transition-all group relative overflow-hidden"
                            >
                              <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-bold mb-2 group-hover:text-primary transition-colors truncate">{task.title}</h4>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                                      {task.priority}
                                    </span>
                                    <span className="text-[10px] text-on-surface-variant font-bold flex items-center gap-1 opacity-60">
                                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                                      {task.duration}
                                    </span>
                                    {task.assignee && (
                                      <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-outline/50">
                                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-black text-primary uppercase">
                                          {task.assignee.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-[10px] text-on-surface-variant font-bold opacity-60">
                                          {task.assignee}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <button 
                                  onClick={() => deleteTask(task.id)}
                                  className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all"
                                >
                                  <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </>
                    )}
                  </AnimatePresence>
                  
                  {!loading && (
                    <button 
                      onClick={() => addTask(col.id)}
                      className="w-full py-4 rounded-2xl border border-dashed border-outline text-on-surface-variant text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[16px] group-hover:rotate-90 transition-transform">add</span>
                        New Task
                      </span>
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>


          {/* Right Column: Discussion Panel */}
          <div className="hidden xl:flex w-[320px] flex-col gap-6 sticky top-0 h-full">
            <div className="bg-surface border border-outline rounded-3xl p-6 shadow-sm flex flex-col flex-1">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline">
                <h3 className="font-bold flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-primary">forum</span>
                  Discussion
                </h3>
                <span className="text-[10px] font-black text-success uppercase tracking-widest">3 Active</span>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
                {[
                  { user: "Sarah Lee", text: "Has anyone reviewed the Q4 plan?", time: "2m ago" },
                  { user: "Alex Mercer", text: "I'll take a look after lunch.", time: "15m ago" },
                  { user: "John Doe", text: "Need the Figma links updated.", time: "1h ago" },
                ].map((msg, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container border border-outline flex items-center justify-center shrink-0 font-black text-[10px] text-on-surface-variant">
                      {msg.user[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-on-surface">{msg.user}</span>
                        <span className="text-[9px] font-black text-on-surface-variant uppercase">{msg.time}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed bg-surface-container/50 p-3 rounded-2xl rounded-tl-none border border-outline/30">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-outline">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    className="w-full bg-surface-container border border-outline rounded-xl py-3 pl-4 pr-10 text-xs font-bold outline-none focus:border-primary transition-colors"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Insights Widget */}
            <div className="bg-surface border border-outline rounded-3xl p-6">
              <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">speed</span>
                Team Velocity
              </h4>
              <p className="text-sm font-bold text-on-surface mb-2">Workspace at 85% capacity</p>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-primary"
                ></motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav />

      {/* Task Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border border-outline w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="text-2xl font-bold mb-2">Create New Task</h3>
              <p className="text-sm text-on-surface-variant mb-8 uppercase font-black tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Adding to {modalStatus}
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Task Title</label>
                  <input 
                    autoFocus
                    className="w-full bg-surface-container border border-outline rounded-xl p-4 text-on-surface focus:border-primary outline-none transition-colors"
                    placeholder="What needs to be done?"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && confirmAddTask()}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Assign To</label>
                  <input 
                    className="w-full bg-surface-container border border-outline rounded-xl p-4 text-on-surface focus:border-primary outline-none transition-colors"
                    placeholder="Employee Name"
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Priority Level</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['low', 'medium', 'high', 'urgent'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewTaskPriority(p)}
                        className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all
                          ${newTaskPriority === p 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-surface-container border-outline text-on-surface-variant hover:border-on-surface/20'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={confirmAddTask}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                >
                  Confirm Task
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
