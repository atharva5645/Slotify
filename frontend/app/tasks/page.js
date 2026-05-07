"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { createTask, getTasksForUser } from "@/lib/tasks/taskService";

export default function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("todo");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const MOCK_USER_ID = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"; // Alex Carter from seed.sql

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        setLoading(true);
        // Resolve the board from a single task query.
        const data = await getTasksForUser(MOCK_USER_ID);
        if (isMounted) {
          setTasks(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) {
          toast.error("Failed to load tasks");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
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

  const tasksByColumn = columns.reduce((acc, column) => {
    acc[column.id] = tasks
      .filter((task) => task.status === column.id)
      .sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);
    return acc;
  }, {});

  const addTask = (status) => {
    setModalStatus(status);
    setIsModalOpen(true);
  };

  const confirmAddTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const taskData = { 
      title: newTaskTitle, 
      priority: newTaskPriority, 
      status: modalStatus, 
      assignedBy: MOCK_USER_ID,
      assignedTo: MOCK_USER_ID, // Simplified: assigning to self for demo
      meetingId: null
    };

    try {
      // Direct call to client-side task creation (Firestore)
      const createdTask = await createTask(taskData);
      
      setTasks(prev => [...prev, createdTask]);
      setIsModalOpen(false);
      setNewTaskTitle("");
      setNewTaskPriority("medium");
      setNewTaskAssignee("");

      toast.success(`Task synced to Firebase`, {
        icon: '☁️',
        style: {
          borderRadius: '10px',
          background: 'var(--surface-container)',
          color: 'var(--on-surface)',
          border: '1px solid var(--outline)',
          fontSize: '12px',
          fontWeight: 'bold'
        }
      });
    } catch (err) {
      console.error("Task error:", err);
      toast.error(`Firebase Error: ${err.message}`);
    }

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
          {/* Workspace Performance Summary */}
          <div className="mb-10 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">Workspace Performance</h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-on-surface tracking-tighter">
                    {tasks.length > 0 ? Math.round(
                      ((tasks.filter(t => t.status === 'completed').length * 1.0) + 
                       (tasks.filter(t => t.status === 'in-progress').length * 0.5)) / tasks.length * 100
                    ) : 0}%
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total Progress</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-4 rounded-3xl bg-surface-container border border-outline flex flex-col gap-1">
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Active Tasks</span>
                  <span className="text-xl font-black text-on-surface">{tasks.filter(t => t.status !== 'completed').length}</span>
                </div>
                <div className="px-6 py-4 rounded-3xl bg-surface-container border border-outline flex flex-col gap-1">
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Completed</span>
                  <span className="text-xl font-black text-success">{tasks.filter(t => t.status === 'completed').length}</span>
                </div>
              </div>
            </div>
            
            {/* Master Progress Bar */}
            <div className="h-3 w-full bg-surface-container border border-outline rounded-full overflow-hidden relative shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${tasks.length > 0 ? 
                   ((tasks.filter(t => t.status === 'completed').length * 1.0) + 
                    (tasks.filter(t => t.status === 'in-progress').length * 0.5)) / tasks.length * 100 : 0}%` }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-primary to-primary-container relative"
               >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:20px_20px] opacity-20"></div>
               </motion.div>
            </div>
          </div>

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
                    {tasksByColumn[col.id]?.length || 0}
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
                        {tasksByColumn[col.id]?.length === 0 ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-outline/50">
                              <span className="material-symbols-outlined text-on-surface-variant text-[32px]">assignment_turned_in</span>
                            </div>
                            <p className="text-sm font-bold mb-1 text-on-surface">No tasks here</p>
                            <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest mb-4">Empty slot</p>
                            <button onClick={() => addTask(col.id)} className="text-xs font-black text-primary hover:underline uppercase tracking-tighter">Create First Task</button>
                          </div>
                        ) : (
                          tasksByColumn[col.id].map((task) => (
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
                  
                  <button 
                    onClick={() => addTask(col.id)}
                    className="w-full py-4 rounded-2xl border border-dashed border-outline text-on-surface-variant text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group mt-2"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[16px] group-hover:rotate-90 transition-transform">add</span>
                      New Task
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>


          {/* Discussion Panel and Insights removed as per request */}
        </main>
      </div>

      <MobileNav />

      {/* Task Creation Modal */}
      {hasMounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative z-[101] w-full max-w-md min-w-[320px] sm:min-w-[450px] flex-shrink-0 rounded-[32px] border border-outline bg-surface p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>

                <h3 className="pr-10 text-2xl font-bold mb-2">Create New Task</h3>
                <p className="text-sm text-on-surface-variant mb-8 uppercase font-black tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
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
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {['low', 'medium', 'high', 'urgent'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setNewTaskPriority(p)}
                          className={`py-3 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                            newTaskPriority === p
                              ? 'bg-primary text-white border-primary'
                              : 'bg-surface-container border-outline text-on-surface-variant hover:border-on-surface/20'
                          }`}
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
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
