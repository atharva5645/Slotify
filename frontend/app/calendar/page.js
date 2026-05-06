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
    <div className="flex min-h-screen bg-[#0b1026] text-white font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen">
        <Header title="Calendar" />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar pb-24 md:pb-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-7xl mx-auto h-full flex flex-col xl:flex-row gap-6"
          >
            
            <div className="flex-1 flex flex-col bg-[#0f1419] border border-[#2d3656] rounded-3xl p-6 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#1197e8]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex justify-between items-center mb-8 shrink-0 relative z-10">
                <div className="flex items-center gap-2 bg-[#1c2025] border border-[#2d3656] rounded-xl p-1">
                  <button 
                    onClick={() => shiftWeek(-1)}
                    className="p-1 text-[#bfc7d3] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <span className="text-sm font-black px-4 min-w-[180px] text-center tracking-tight">
                    {formatRange(currentWeekStart)}
                  </span>
                  <button 
                    onClick={() => shiftWeek(1)}
                    className="p-1 text-[#bfc7d3] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`px-6 py-2 border rounded-xl text-sm font-bold transition-all flex items-center gap-2 group shadow-sm
                      ${isEditMode ? 'bg-[#1197e8] border-[#1197e8] text-white' : 'bg-[#1c2025] border-[#2d3656] text-[#bfc7d3] hover:bg-[#31353b]'}`}
                  >
                    <span className={`material-symbols-outlined text-[18px] transition-transform ${isEditMode ? 'rotate-0' : 'group-hover:rotate-12'}`}>
                      {isEditMode ? 'check_circle' : 'edit'}
                    </span>
                    {isEditMode ? 'Finish Editing' : 'Edit Mode'}
                  </button>
                  <button 
                    onClick={() => setCurrentWeekStart(new Date(2024, 9, 21))}
                    className="px-4 py-2 bg-[#1c2025] border border-[#2d3656] rounded-xl text-sm font-bold hover:bg-[#31353b] transition-colors"
                  >
                    Today
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-x-auto custom-scrollbar border border-[#2d3656] rounded-2xl bg-[#0b1026] relative z-10">
                {/* Header Grid */}
                <div className="grid grid-cols-[60px_repeat(5,1fr)] min-w-[800px] bg-[#0f1419] border-b border-[#2d3656]">
                  <div className="p-4 border-r border-[#2d3656] flex items-end justify-center">
                    <span className="text-[9px] font-black text-[#bfc7d3] uppercase tracking-widest">Time</span>
                  </div>
                  {days.map((day, idx) => {
                    const dateNum = getDayDate(idx);
                    return (
                      <div key={day} className="p-4 flex flex-col items-center justify-center gap-1 border-r border-[#2d3656] last:border-r-0">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${idx === 1 ? 'text-[#1197e8]' : 'text-[#bfc7d3]'}`}>{day}</span>
                        <span className={`text-2xl font-black ${idx === 1 ? 'text-[#1197e8]' : ''}`}>{dateNum}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#0b1026] min-w-[800px]">
                  <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-[1px] bg-[#2d3656]/30 relative">
                    {/* Time labels column */}
                    <div className="flex flex-col">
                      {times.map((time) => (
                        <div key={time} className="h-[100px] bg-[#0f1419] border-b border-[#2d3656]/50 flex items-start justify-center p-3">
                          <span className="text-[10px] font-black text-[#bfc7d3]">{time}</span>
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
                        <div key={dayIdx} className="relative h-[1000px] bg-[#0f1419] border-r border-[#2d3656]/50 last:border-r-0">
                          {/* Background Grid Lines */}
                          {times.map((t) => (
                            <div key={t} className="h-[100px] border-b border-[#2d3656]/10"></div>
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
                                    ${event.type === 'smart' ? 'bg-[#1197e8]/20 border-[#1197e8]/40 text-[#97cbff] hover:bg-[#1197e8]/30' : 
                                      event.type === 'priority' ? 'bg-[#ffb778]/20 border-[#ffb778]/40 text-[#ffb778] hover:bg-[#ffb778]/30' : 
                                      'bg-[#1c2025]/80 border-[#2d3656] text-white hover:bg-[#252a31]'}
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
                                    <div className={`flex gap-1 transition-opacity ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`}>
                                      <button className="p-0.5 hover:bg-white/10 rounded">
                                        <span className="material-symbols-outlined text-[12px]">edit</span>
                                      </button>
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} 
                                        className="p-0.5 hover:bg-red-500/20 text-red-400 rounded"
                                      >
                                        <span className="material-symbols-outlined text-[12px]">delete</span>
                                      </button>
                                    </div>
                                  </div>
                                  <span className="text-xs font-black text-white line-clamp-1">{event.title}</span>
                                  {duration >= 0.5 && (
                                    <span className="text-[8px] font-bold opacity-60 mt-auto">{event.start} - {event.end}</span>
                                  )}
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
                              className={`absolute left-0 right-0 h-[100px] flex items-center justify-center transition-all bg-[#1197e8]/5 opacity-0 hover:opacity-100 z-0
                                ${isEditMode ? 'opacity-100' : ''}`}
                            >
                              <span className="material-symbols-outlined text-[#1197e8] text-[20px]">add_circle</span>
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
                className="w-full bg-[#1197e8] text-white hover:bg-[#0088cc] transition-all py-4 px-6 rounded-3xl flex items-center justify-center gap-2 font-black shadow-xl shadow-[#1197e8]/20"
              >
                <span className="material-symbols-outlined text-[24px]">add</span>
                <span className="text-lg">Quick Add Slot</span>
              </motion.button>

              <div className="bg-[#0f1419] border border-[#2d3656] rounded-3xl p-8 flex-1 shadow-2xl flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1197e8]"></div>
                <div className="flex items-center justify-between mb-8 border-b border-[#2d3656] pb-4 shrink-0">
                  <h3 className="text-lg font-black">Reminders</h3>
                  <span className="bg-[#1197e8]/10 text-[#1197e8] text-[10px] font-black px-2 py-1 rounded-full border border-[#1197e8]/20">3 Active</span>
                </div>
                <div className="flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar pr-2">
                  {[
                    { title: "Weekly Report", time: "5:00 PM", status: "pending", color: "bg-[#a0d0c8]" },
                    { title: "Review PR #402", time: "Overdue", status: "overdue", color: "bg-red-400" },
                    { title: "Team Capacity", time: "EOD", status: "pending", color: "bg-[#ffb778]" }
                  ].map((reminder, idx) => (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      key={idx} 
                      className="group flex gap-4 items-start cursor-pointer"
                    >
                      <div className={`mt-1.5 w-2 h-2 rounded-full ${reminder.color} shadow-sm group-hover:scale-150 transition-transform`}></div>
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-bold ${reminder.status === 'overdue' ? 'text-red-400' : 'group-hover:text-[#1197e8]'} transition-colors`}>{reminder.title}</span>
                        <span className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">{reminder.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#2d3656] shrink-0">
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <div key={`${d}-${i}`} className="text-[9px] font-black text-[#bfc7d3] mb-2">{d}</div>
                    ))}
                    {[...Array(14)].map((_, i) => {
                      const dayNumber = 17 + i;
                      const isSelected = dayNumber === selectedDate;
                      return (
                        <button 
                          key={i} 
                          onClick={() => setSelectedDate(dayNumber)}
                          className={`w-8 h-8 mx-auto rounded-xl flex items-center justify-center text-[10px] font-black transition-all
                          ${isSelected ? 'bg-[#1197e8] text-white shadow-lg' : 'text-[#bfc7d3] hover:bg-[#161b33]'}`}
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
                className="bg-[#0f1419] border border-[#2d3656] w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#1197e8]"></div>
                <button 
                  onClick={() => setEditingEvent(null)}
                  className="absolute right-6 top-6 text-[#bfc7d3] hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                
                <h3 className="text-2xl font-black mb-8 tracking-tight">{editingEvent.id ? 'Edit Slot' : 'New Slot'}</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">Title</label>
                    <input 
                      autoFocus
                      className="w-full bg-[#1c2025] border border-[#2d3656] rounded-2xl p-4 text-white focus:border-[#1197e8] outline-none transition-colors font-bold" 
                      placeholder="Slot title..."
                      value={editingEvent.title}
                      onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">Start</label>
                      <input 
                        type="time"
                        className="w-full bg-[#1c2025] border border-[#2d3656] rounded-2xl p-4 text-white focus:border-[#1197e8] outline-none font-bold" 
                        value={editingEvent.start}
                        onChange={(e) => setEditingEvent({...editingEvent, start: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">End</label>
                      <input 
                        type="time"
                        className="w-full bg-[#1c2025] border border-[#2d3656] rounded-2xl p-4 text-white focus:border-[#1197e8] outline-none font-bold" 
                        value={editingEvent.end}
                        onChange={(e) => setEditingEvent({...editingEvent, end: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#bfc7d3] uppercase tracking-widest">Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['meeting', 'smart', 'priority'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setEditingEvent({...editingEvent, type})}
                          className={`py-3 px-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all
                            ${editingEvent.type === type 
                              ? 'bg-[#1197e8] border-[#1197e8] text-white shadow-lg' 
                              : 'bg-[#1c2025] border-[#2d3656] text-[#bfc7d3] hover:border-[#3f4851]'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button 
                      onClick={() => setEditingEvent(null)}
                      className="flex-1 py-4 text-[#bfc7d3] font-black text-sm uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => saveEvent(editingEvent)}
                      className="flex-1 bg-[#1197e8] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#1197e8]/20 active:scale-95 transition-all"
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
