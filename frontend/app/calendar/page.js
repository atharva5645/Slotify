"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function CalendarPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(25);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2024, 9, 21)); // Monday, Oct 21, 2024
  const [editingEvent, setEditingEvent] = useState(null);
  
  const [events, setEvents] = useState([
    { id: 1, date: "2024-10-21", start: "09:00", end: "09:30", title: "Daily Standup", type: "meeting" },
    { id: 2, date: "2024-10-24", start: "09:00", end: "11:00", title: "Deep Work: Q4 Strategy", type: "smart", span: 2 },
    { id: 3, date: "2024-10-22", start: "10:00", end: "11:00", title: "Client Sync", type: "meeting" },
    { id: 4, date: "2024-10-21", start: "11:00", end: "13:00", title: "Focused Coding", type: "smart", span: 2 },
    { id: 5, date: "2024-10-24", start: "11:00", end: "12:00", title: "1:1 Review", type: "priority" },
  ]);

  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const formatRange = (start) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  const shiftWeek = (direction) => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + (direction * 7));
    setCurrentWeekStart(newStart);
  };

  const getDayDate = (dayIdx) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + dayIdx);
    return d.getDate();
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success("Event deleted");
  };

  const saveEvent = (eventData) => {
    if (eventData.id) {
      setEvents(events.map(e => e.id === eventData.id ? eventData : e));
      toast.success("Changes saved");
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
      toast.success("Event created");
    }
    setEditingEvent(null);
  };

  const handleSlotClick = (dayIdx, time) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + dayIdx);
    setEditingEvent({
      date: d.toISOString().split('T')[0],
      start: time,
      end: `${parseInt(time.split(':')[0]) + 1}:00`,
      title: "",
      type: "meeting"
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Calendar" />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar pb-24 md:pb-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-7xl mx-auto h-full flex flex-col xl:flex-row gap-6"
          >
            
            <div className="flex-1 flex flex-col bg-surface border border-outline rounded-3xl p-6 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
              
              {/* AI Suggestion Banner */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-white text-[18px]">psychology</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-on-surface">AI Optimization Available</p>
                    <p className="text-[10px] text-on-surface-variant">3 slots can be consolidated for 2h deep work</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all">Optimize</button>
              </motion.div>

              <div className="flex justify-between items-center mb-8 shrink-0 relative z-10">
                <div className="flex items-center gap-2 bg-surface-container border border-outline rounded-xl p-1">
                  <button 
                    onClick={() => shiftWeek(-1)}
                    className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <span className="text-sm font-black px-4 min-w-[180px] text-center tracking-tight text-on-surface">
                    {formatRange(currentWeekStart)}
                  </span>
                  <button 
                    onClick={() => shiftWeek(1)}
                    className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Team Avatars */}
                  <div className="flex -space-x-2 mr-4">
                    {['AM', 'SC', 'JD'].map((m, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-surface-container border-2 border-surface flex items-center justify-center text-[9px] font-black text-on-surface-variant">{m}</div>
                    ))}
                    <button className="w-7 h-7 rounded-full bg-primary/20 border-2 border-surface flex items-center justify-center text-[9px] font-black text-primary hover:bg-primary hover:text-white transition-all">+</button>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditMode(!isEditMode)}
                      className={`px-6 py-2 border rounded-xl text-sm font-bold transition-all flex items-center gap-2 group shadow-sm
                        ${isEditMode ? 'bg-primary border-primary text-white' : 'bg-surface-container border-outline text-on-surface-variant hover:bg-surface-container/80'}`}
                    >
                      <span className={`material-symbols-outlined text-[18px] transition-transform ${isEditMode ? 'rotate-0' : 'group-hover:rotate-12'}`}>
                        {isEditMode ? 'check_circle' : 'edit'}
                      </span>
                      {isEditMode ? 'Finish Editing' : 'Edit Mode'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-x-auto custom-scrollbar border border-outline rounded-2xl bg-background relative z-10">
                {/* Header Grid */}
                <div className="grid grid-cols-[60px_repeat(5,1fr)] min-w-[800px] bg-surface border-b border-outline">
                  <div className="p-4 border-r border-outline flex items-end justify-center">
                    <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Time</span>
                  </div>
                  {days.map((day, idx) => {
                    const dateNum = getDayDate(idx);
                    return (
                      <div key={day} className="p-4 flex flex-col items-center justify-center gap-1 border-r border-outline last:border-r-0">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 1 ? 'text-primary' : 'text-on-surface-variant'}`}>{day}</span>
                        <span className={`text-2xl font-black text-on-surface ${idx === 1 ? 'text-primary' : ''}`}>{dateNum}</span>
                        <div className="flex gap-0.5 mt-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success/50"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-warning/50"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-background min-w-[800px]">
                  <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-[1px] bg-outline/20 relative">
                    {/* Time labels column */}
                    <div className="flex flex-col">
                      {times.map((time) => (
                        <div key={time} className="h-[100px] bg-surface border-b border-outline/50 flex items-start justify-center p-3">
                          <span className="text-[10px] font-black text-on-surface-variant">{time}</span>
                        </div>
                      ))}
                    </div>

                    {/* Day columns */}
                    {days.map((_, dayIdx) => {
                      const currentDay = new Date(currentWeekStart);
                      currentDay.setDate(currentWeekStart.getDate() + dayIdx);
                      const dayEvents = events.filter(e => {
                        const eDate = new Date(e.date);
                        return eDate.toDateString() === currentDay.toDateString();
                      });

                      return (
                        <div key={dayIdx} className="relative h-[1000px] bg-surface border-r border-outline/50 last:border-r-0">
                          {/* Background Grid Lines */}
                          {times.map((t) => (
                            <div key={t} className="h-[100px] border-b border-outline/10"></div>
                          ))}

                          {/* Events Overlay */}
                          <AnimatePresence>
                            {dayEvents.map((event) => {
                              const [startH, startM] = event.start.split(':').map(Number);
                              const [endH, endM] = event.end.split(':').map(Number);
                              const startOffset = ((startH - 9) * 100) + (startM / 60 * 100);
                              const duration = ((endH - startH) * 60 + (endM - startM)) / 60;
                              
                              return (
                                <motion.div 
                                  layout
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  whileHover={{ scale: 1.02 }}
                                  key={event.id}
                                  onClick={() => setEditingEvent(event)}
                                  style={{ 
                                    top: `${startOffset}px`, 
                                    height: `${duration * 100 - 4}px`,
                                    left: '4px',
                                    right: '4px'
                                  }}
                                  className={`absolute rounded-xl p-3 flex flex-col gap-1 transition-all group/item shadow-xl border cursor-pointer backdrop-blur-md
                                    ${event.type === 'smart' ? 'bg-primary/20 border-primary/40 text-primary hover:bg-primary/30' : 
                                      event.type === 'priority' ? 'bg-warning/20 border-warning/40 text-warning hover:bg-warning/30' : 
                                      'bg-surface-container/80 border-outline text-on-surface hover:bg-surface-container'}
                                    z-10
                                  `}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-1">
                                      {event.type === 'smart' && <span className="material-symbols-outlined text-[14px]">psychology</span>}
                                      <span className="text-[9px] font-black uppercase tracking-widest truncate">
                                        {event.type === 'smart' ? 'Smart' : event.type}
                                      </span>
                                    </div>
                                    <div className={`flex gap-1 items-center transition-opacity ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`}>
                                      <div className="flex -space-x-1 mr-2">
                                        <div className="w-4 h-4 rounded-full bg-outline border border-surface flex items-center justify-center text-[6px] font-black">AM</div>
                                      </div>
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} 
                                        className="p-0.5 hover:bg-red-500/20 text-red-500 rounded"
                                      >
                                        <span className="material-symbols-outlined text-[12px]">delete</span>
                                      </button>
                                    </div>
                                  </div>
                                  <span className="text-xs font-black text-on-surface line-clamp-1">{event.title}</span>
                                  <div className="flex items-center justify-between mt-auto">
                                    {duration >= 0.5 && (
                                      <span className="text-[8px] font-bold opacity-60 uppercase">{event.start} - {event.end}</span>
                                    )}
                                    <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                      <span className="material-symbols-outlined text-[10px]">chat</span>
                                      <span className="text-[8px] font-black text-on-surface">2</span>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>

                          {/* Clickable Background for adding new slots */}
                          {times.map((time) => (
                            <button 
                              key={`add-${time}`}
                              onClick={() => handleSlotClick(dayIdx, time)}
                              style={{ top: `${(parseInt(time.split(':')[0]) - 9) * 100}px` }}
                              className={`absolute left-0 right-0 h-[100px] flex items-center justify-center transition-all bg-primary/5 opacity-0 hover:opacity-100 z-0
                                ${isEditMode ? 'opacity-100' : ''}`}
                            >
                              <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSlotClick(0, "14:00")} 
                className="w-full bg-primary text-white hover:opacity-90 transition-all py-4 px-6 rounded-3xl flex items-center justify-center gap-2 font-black shadow-xl shadow-primary/20"
              >
                <span className="material-symbols-outlined text-[24px]">add</span>
                <span className="text-lg">Quick Add Slot</span>
              </motion.button>

              <div className="bg-surface border border-outline rounded-3xl p-8 flex-1 shadow-2xl flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <div className="flex items-center justify-between mb-8 border-b border-outline pb-4 shrink-0">
                  <h3 className="text-lg font-black text-on-surface">Reminders</h3>
                  <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-full border border-primary/20">3 Active</span>
                </div>
                <div className="flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar pr-2">
                  {[
                    { title: "Weekly Report", time: "5:00 PM", status: "pending", color: "bg-primary" },
                    { title: "Review PR #402", time: "Overdue", status: "overdue", color: "bg-error" },
                    { title: "Team Capacity", time: "EOD", status: "pending", color: "bg-warning" }
                  ].map((reminder, idx) => (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      key={idx} 
                      className="group flex gap-4 items-start cursor-pointer"
                    >
                      <div className={`mt-1.5 w-2 h-2 rounded-full ${reminder.color} shadow-sm group-hover:scale-150 transition-transform`}></div>
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-bold ${reminder.status === 'overdue' ? 'text-error' : 'text-on-surface group-hover:text-primary'} transition-colors`}>{reminder.title}</span>
                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{reminder.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-outline shrink-0">
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <div key={`${d}-${i}`} className="text-[9px] font-black text-on-surface-variant mb-2">{d}</div>
                    ))}
                    {[...Array(14)].map((_, i) => {
                      const dayNumber = 17 + i;
                      const isSelected = dayNumber === selectedDate;
                      return (
                        <button 
                          key={i} 
                          onClick={() => setSelectedDate(dayNumber)}
                          className={`w-8 h-8 mx-auto rounded-xl flex items-center justify-center text-[10px] font-black transition-all
                          ${isSelected ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:bg-surface-container'}`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <AnimatePresence>
          {editingEvent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-surface border border-outline w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <button 
                  onClick={() => setEditingEvent(null)}
                  className="absolute right-6 top-6 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                
                <h3 className="text-2xl font-black mb-8 tracking-tight text-on-surface">{editingEvent.id ? 'Edit Slot' : 'New Slot'}</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Title</label>
                    <input 
                      autoFocus
                      className="w-full bg-surface-container border border-outline rounded-2xl p-4 text-on-surface focus:border-primary outline-none transition-colors font-bold" 
                      placeholder="Slot title..."
                      value={editingEvent.title}
                      onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Start</label>
                      <input 
                        type="time"
                        className="w-full bg-surface-container border border-outline rounded-2xl p-4 text-on-surface focus:border-primary outline-none font-bold" 
                        value={editingEvent.start}
                        onChange={(e) => setEditingEvent({...editingEvent, start: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">End</label>
                      <input 
                        type="time"
                        className="w-full bg-surface-container border border-outline rounded-2xl p-4 text-on-surface focus:border-primary outline-none font-bold" 
                        value={editingEvent.end}
                        onChange={(e) => setEditingEvent({...editingEvent, end: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['meeting', 'smart', 'priority'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setEditingEvent({...editingEvent, type})}
                          className={`py-3 px-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all
                            ${editingEvent.type === type 
                              ? 'bg-primary border-primary text-white shadow-lg' 
                              : 'bg-surface-container border-outline text-on-surface-variant hover:border-on-surface-variant'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button 
                      onClick={() => setEditingEvent(null)}
                      className="flex-1 py-4 text-on-surface-variant font-black text-sm uppercase tracking-widest hover:text-on-surface transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => saveEvent(editingEvent)}
                      className="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
                    >
                      {editingEvent.id ? 'Update' : 'Create'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <MobileNav />
    </div>
  );
}
