"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light-theme");
    } else {
      setIsLight(false);
      document.documentElement.classList.remove("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLight;
    setIsLight(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) return <div className="w-[160px] h-[60px]" />; // Prevent layout shift

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-[160px] h-[60px] rounded-full transition-colors duration-500 overflow-hidden cursor-pointer shadow-md ${
        isLight ? "bg-[#e0e0e0]" : "bg-black"
      }`}
      aria-label="Toggle Theme"
    >
      {/* Background Text Container */}
      <div className="absolute inset-0 flex items-center w-full h-full pointer-events-none">
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div
              key="day-text"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 64 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center"
            >
              <span className="text-[12px] font-[900] tracking-[0.05em] text-black">
                DAY MODE
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="night-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 20 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center"
            >
              <span className="text-[12px] font-[900] tracking-[0.05em] text-white">
                NIGHT MODE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The Sliding Circle */}
      <motion.div
        animate={{ 
          x: isLight ? 6 : 102,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25 
        }}
        className="relative z-10 w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
      >
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.span
              key="sun-icon"
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              className="material-symbols-outlined text-black text-[32px]"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
            >
              sunny
            </motion.span>
          ) : (
            <motion.span
              key="moon-icon"
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              className="material-symbols-outlined text-black text-[28px]"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
            >
              bedtime
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
