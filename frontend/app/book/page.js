"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getAvailableSlots } from "@/lib/booking/bookingService";
import { createMeeting } from "@/lib/scheduler/schedulingService";

function BookingContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"; // Fallback to demo user
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("idle"); // idle, processing, success

  useEffect(() => {
    if (selectedDate) {
      fetchSlots();
    }
  }, [selectedDate]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      // Direct call to client-side availability check
      const data = await getAvailableSlots(userId, selectedDate);
      setAvailableSlots(data);
    } catch (err) {
      console.error("Fetch slots error:", err);
      toast.error("Could not fetch availability");
      // Fallback slots for demo
      setAvailableSlots([
        { time: "09:00", available: true },
        { time: "10:00", available: false },
        { time: "11:00", available: true },
        { time: "14:00", available: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (time) => {
    setBookingStatus("processing");
    try {
      const startTime = `${selectedDate}T${time}:00Z`;
      const endTime = `${selectedDate}T${time.split(':')[0]}:45:00Z`;

      // Direct call to client-side meeting creation
      const result = await createMeeting({
        userId,
        title: "External Booking",
        organizerId: userId,
        startTime,
        endTime,
        participants: [{ userId, name: "Host", mandatory: true }],
        minAttendees: 1
      });

      if (result.success) {
        setBookingStatus("success");
        toast.success("Meeting booked!");
      } else {
        throw new Error(result.error || "Failed to book");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(err.message);
      setBookingStatus("idle");
    }
  };

  if (bookingStatus === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-success rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-white text-4xl">check</span>
        </motion.div>
        <h1 className="text-3xl font-black text-on-surface mb-2">Confirmed!</h1>
        <p className="text-on-surface-variant max-w-xs">The meeting has been added to the calendar and the team has been notified.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background font-sans p-6 md:p-12">
      <div className="max-w-xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-on-surface">Book a Slot</h1>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest">Select a time that works for you</p>
          </div>
        </header>

        <main className="bg-surface border border-outline rounded-3xl p-8 shadow-2xl space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">1. Choose Date</label>
            <input 
              type="date" 
              className="w-full bg-surface-container border border-outline rounded-xl p-4 text-on-surface font-bold outline-none focus:border-primary transition-all"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <AnimatePresence>
            {selectedDate && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">2. Available Times</label>
                {loading ? (
                  <div className="grid grid-cols-3 gap-2">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="h-12 bg-surface-container animate-pulse rounded-lg"></div>)}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => handleBook(slot.time)}
                        className={`py-3 rounded-xl text-xs font-black transition-all ${
                          slot.available 
                            ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white' 
                            : 'bg-surface-container text-on-surface-variant/30 border border-outline/50 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="text-center">
          <p className="text-[9px] text-on-surface-variant font-black uppercase tracking-widest">Powered by Slotify AI</p>
        </footer>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center p-6 text-on-surface font-black uppercase tracking-widest text-xs">Loading Booking System...</div>}>
      <BookingContent />
    </Suspense>
  );
}
