"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";

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
  };

  const saveEvent = (eventData) => {
    if (eventData.id) {
      setEvents(events.map(e => e.id === eventData.id ? eventData : e));
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
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
          <div className="max-w-7xl mx-auto h-full flex flex-col xl:flex-row gap-6">
            
            <div className="flex-1 flex flex-col bg-[#0f1419] border border-[#2d3656] rounded-2xl p-6 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-8 shrink-0">
                <div className="flex items-center gap-2 bg-[#1c2025] border border-[#2d3656] rounded-lg p-1">
                  <button 
                    onClick={() => shiftWeek(-1)}
                    className="p-1 text-[#bfc7d3] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <span className="text-sm font-medium px-4 min-w-[160px] text-center">
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
                    className={`px-4 py-2 border rounded-lg text-sm transition-all flex items-center gap-2 group shadow-sm
                      ${isEditMode ? 'bg-[#1197e8] border-[#1197e8] text-white' : 'bg-[#1c2025] border-[#2d3656] text-[#bfc7d3] hover:bg-[#31353b]'}`}
                  >
                    <span className={`material-symbols-outlined text-[18px] transition-transform ${isEditMode ? 'rotate-0' : 'group-hover:rotate-12'}`}>
                      {isEditMode ? 'check_circle' : 'edit'}
                    </span>
                    {isEditMode ? 'Finish Editing' : 'Edit Mode'}
                  </button>
                  <button 
                    onClick={() => setCurrentWeekStart(new Date(2024, 9, 21))}
                    className="px-4 py-2 bg-[#1c2025] border border-[#2d3656] rounded-lg text-sm hover:bg-[#31353b] transition-colors"
                  >
                    Today
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-x-auto custom-scrollbar border border-[#2d3656] rounded-xl bg-[#3f4851]">
                {/* Header Grid */}
                <div className="grid grid-cols-[60px_repeat(5,1fr)] min-w-[800px] bg-[#0f1419] border-b border-[#2d3656]">
                  <div className="p-4 border-r border-[#2d3656] flex items-end justify-center">
                    <span className="text-[10px] font-bold text-[#bfc7d3] uppercase tracking-tighter">Time</span>
                  </div>
                  {days.map((day, idx) => {
                    const dateNum = getDayDate(idx);
                    return (
                      <div key={day} className="p-4 flex flex-col items-center justify-center gap-1 border-r border-[#2d3656] last:border-r-0">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${idx === 1 ? 'text-[#97cbff]' : 'text-[#bfc7d3]'}`}>{day}</span>
                        <span className={`text-xl font-bold ${idx === 1 ? 'text-[#97cbff]' : ''}`}>{dateNum}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#0f1419] min-w-[800px]">
                  <div className="grid grid-cols-[60px_repeat(5,1fr)] grid-rows-[repeat(10,100px)] gap-[1px] bg-[#2d3656]">
                    {times.map((time) => (
                      <div key={time} className="contents">
                        <div className="bg-[#0f1419] border-r border-[#2d3656] flex items-start justify-center p-2">
                          <span className="text-xs font-bold text-[#bfc7d3]">{time}</span>
                        </div>
                        {days.map((_, dayIdx) => {
                          const event = events.find(e => {
                            const eDate = new Date(e.date);
                            const currentDay = new Date(currentWeekStart);
                            currentDay.setDate(currentWeekStart.getDate() + dayIdx);
                            return eDate.toDateString() === currentDay.toDateString() && e.start === time;
                          });
                          return (
                            <div key={`${dayIdx}-${time}`} className="bg-[#0f1419] p-1 relative group h-[100px]">
                              {event ? (
                                <div 
                                  style={{ 
                                    height: event.span ? `calc(${event.span * 100}% + ${event.span - 1}px - 8px)` : 'calc(100% - 8px)' 
                                  }}
                                  className={`absolute inset-1 rounded-xl p-3 flex flex-col gap-1 transition-all group/item shadow-lg border
                                    ${event.type === 'smart' ? 'bg-[#22504b]/30 border-[#a0d0c8]/50 text-[#a0d0c8]' : 
                                      event.type === 'priority' ? 'bg-[#1197e8]/20 border-[#1197e8]/50 text-[#1197e8]' : 
                                      'bg-[#1c2025] border-[#2d3656] text-white hover:bg-[#252a31]'}
                                    ${event.span ? 'z-10' : ''}
                                  `}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-1">
                                      {event.type === 'smart' && <span className="material-symbols-outlined text-[14px]">psychology</span>}
                                      <span className="text-[10px] font-bold uppercase tracking-tighter truncate max-w-[80px]">
                                        {event.type === 'smart' ? 'Smart Slot' : event.title}
                                      </span>
                                    </div>
                                    <div className={`flex gap-1 transition-opacity ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`}>
                                      <button 
                                        onClick={() => setEditingEvent(event)}
                                        className="p-1 hover:bg-white/10 rounded"
                                      >
                                        <span className="material-symbols-outlined text-[14px]">edit</span>
                                      </button>
                                      <button onClick={() => deleteEvent(event.id)} className="p-1 hover:bg-red-500/20 text-red-400 rounded"><span className="material-symbols-outlined text-[14px]">delete</span></button>
                                    </div>
                                  </div>
                                  {event.type === 'smart' && <span className="text-sm font-bold text-white line-clamp-2">{event.title}</span>}
                                  <span className="text-[10px] opacity-60 font-medium">{event.start} - {event.end}</span>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => handleSlotClick(dayIdx, time)}
                                  className={`w-full h-full flex items-center justify-center transition-all bg-[#1197e8]/5 rounded-lg border-2 border-dashed border-[#1197e8]/20
                                    ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                >
                                  <span className="material-symbols-outlined text-[#1197e8] text-[20px]">add_circle</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6">
              <button onClick={() => handleSlotClick(0, "14:00")} className="w-full bg-[#1197e8] text-white hover:bg-[#0088cc] transition-all py-4 px-6 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-[0_10px_30px_rgba(17,151,232,0.3)] active:scale-95">
                <span className="material-symbols-outlined text-[24px]">add</span>
                <span className="text-lg">Quick Add Slot</span>
              </button>

              <div className="bg-[#0f1419] border border-[#2d3656] rounded-2xl p-6 flex-1 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between mb-6 border-b border-[#2d3656] pb-2 shrink-0">
                  <h3 className="text-lg font-bold">Today&apos;s Reminders</h3>
                  <span className="bg-[#1c2025] text-[#bfc7d3] text-xs px-2 py-1 rounded-full">3 Left</span>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto flex-1 custom-scrollbar pr-2">
                  {[
                    { title: "Submit Weekly Report", time: "5:00 PM", status: "pending" },
                    { title: "Review PR #402", time: "Overdue", status: "overdue" },
                    { title: "Check Team Capacity", time: "EOD", status: "pending" }
                  ].map((reminder, idx) => (
                    <div key={idx} className="group flex gap-4 items-start p-3 rounded-xl hover:bg-[#1c2025] transition-colors cursor-pointer border border-transparent hover:border-[#2d3656]">
                      <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors 
                        ${reminder.status === 'overdue' ? 'bg-red-500/10 border-red-500/50' : 'border-[#2d3656] group-hover:border-[#97cbff]'}`}>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`text-sm font-medium ${reminder.status === 'overdue' ? 'text-red-400' : 'group-hover:text-[#97cbff]'}`}>{reminder.title}</span>
                        <span className={`text-[10px] flex items-center gap-1 ${reminder.status === 'overdue' ? 'text-red-400/70' : 'text-[#bfc7d3]'}`}>
                          <span className="material-symbols-outlined text-[12px]">{reminder.status === 'overdue' ? 'warning' : 'schedule'}</span> {reminder.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#2d3656] shrink-0">
                  <span className="text-xs font-bold text-[#bfc7d3] uppercase tracking-wider block mb-4">Mini Map</span>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <div key={`${d}-${i}`} className="text-[10px] text-[#bfc7d3] mb-1 font-bold">{d}</div>
                    ))}
                    {[...Array(14)].map((_, i) => {
                      const dayNumber = 17 + i;
                      const isSelected = dayNumber === selectedDate;
                      return (
                        <button 
                          key={i} 
                          onClick={() => setSelectedDate(dayNumber)}
                          className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-xs transition-all duration-200 cursor-pointer hover:bg-[#161b33] active:scale-90
                          ${isSelected ? 'bg-[#1197e8] text-white font-bold shadow-lg shadow-[#1197e8]/40 scale-110' : 'text-[#bfc7d3]'}`}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {editingEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#0f1419] border border-[#2d3656] w-full max-w-md rounded-2xl p-8 shadow-2xl relative">
              <button 
                onClick={() => setEditingEvent(null)}
                className="absolute right-6 top-6 text-[#bfc7d3] hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <h3 className="text-xl font-bold mb-6">{editingEvent.id ? 'Edit Slot' : 'Create New Slot'}</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#bfc7d3] uppercase tracking-widest">Slot Title</label>
                  <input 
                    autoFocus
                    className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-white focus:border-[#1197e8] outline-none" 
                    placeholder="e.g. Design Review"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#bfc7d3] uppercase tracking-widest">Start Time</label>
                    <input 
                      type="time"
                      className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-white focus:border-[#1197e8] outline-none" 
                      value={editingEvent.start}
                      onChange={(e) => setEditingEvent({...editingEvent, start: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#bfc7d3] uppercase tracking-widest">End Time</label>
                    <input 
                      type="time"
                      className="w-full bg-[#1c2025] border border-[#2d3656] rounded-xl p-4 text-white focus:border-[#1197e8] outline-none" 
                      value={editingEvent.end}
                      onChange={(e) => setEditingEvent({...editingEvent, end: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#bfc7d3] uppercase tracking-widest">Slot Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['meeting', 'smart', 'priority'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setEditingEvent({...editingEvent, type})}
                        className={`py-3 px-2 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all
                          ${editingEvent.type === type 
                            ? 'bg-[#1197e8] border-[#1197e8] text-white shadow-lg shadow-[#1197e8]/20' 
                            : 'bg-[#1c2025] border-[#2d3656] text-[#bfc7d3] hover:border-[#3f4851]'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setEditingEvent(null)}
                    className="flex-1 py-4 text-[#bfc7d3] font-bold hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => saveEvent(editingEvent)}
                    className="flex-1 bg-[#1197e8] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#1197e8]/20 active:scale-95 transition-all"
                  >
                    {editingEvent.id ? 'Save Changes' : 'Create Slot'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  );
}
