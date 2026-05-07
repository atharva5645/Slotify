"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { prototypeStore } from "@/lib/prototypeStore";

export default function Discussion() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = () => {
      setMessages(prototypeStore.getDiscussions());
    };

    loadMessages();
    window.addEventListener('slotify-discussion-added', loadMessages);
    
    return () => window.removeEventListener('slotify-discussion-added', loadMessages);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      user: "You",
      avatar: "Y",
      time: "JUST NOW",
      content: newMessage,
      color: "bg-primary text-white"
    };
    prototypeStore.addDiscussion(msg);
    const userText = newMessage.toLowerCase();
    setNewMessage("");

    // Detect if this is a scheduling request
    const isScheduling = userText.includes("schedule") || userText.includes("meeting") || userText.includes("link");

    if (isScheduling) {
      // Trigger Advanced Multi-Agent Negotiation & Quorum Check
      const agents = [
        { 
          name: "Alex's AI Agent", 
          avatar: "A", 
          delay: 1500, 
          content: "Scanning workspace availability for 20 members... I see 12 members are free at 3:00 PM, but 16 are available at 4:30 PM. Proposing 4:30 PM to maximize attendance (80% quorum).",
          color: "bg-primary/10 text-primary border-primary/20"
        },
        { 
          name: "Sarah's AI Agent", 
          avatar: "S", 
          delay: 4000, 
          content: "Agreed. 4:30 PM works for the Design and Engineering sub-teams (10/10 members free). I'm locking this slot for the majority.",
          color: "bg-success/10 text-success border-success/20"
        },
        { 
          name: "John's AI Agent", 
          avatar: "J", 
          delay: 6500, 
          content: "Quorum reached (16/20). I've notified the remaining 4 members about the priority conflict. Proceeding with scheduling.",
          color: "bg-warning/10 text-warning border-warning/20"
        },
        { 
          name: "Slotify Bot", 
          avatar: "🤖", 
          delay: 9000, 
          content: `✅ **Meeting Confirmed: Team Strategy Sync**\n⏰ **Time:** 4:30 PM Today\n👥 **Attendance:** 16/20 Confirmed\n\n🔗 **Join Link:** https://meet.jit.si/Slotify-Strategy-Sync-${Math.random().toString(36).substring(7)}\n\n*The link has also been added to your Dashboard.*`,
          color: "bg-surface-container-highest border-primary text-on-surface shadow-md"
        }
      ];

      agents.forEach(agent => {
        setTimeout(() => {
          prototypeStore.addDiscussion({
            id: Date.now() + Math.random(),
            user: agent.name,
            avatar: agent.avatar,
            time: "AUTO-SYNCED",
            content: agent.content,
            color: agent.color
          });

          // If it's the final bot message, also add to the official meeting store
          if (agent.name === "Slotify Bot") {
             prototypeStore.addMeeting({
               id: `m-${Date.now()}`,
               title: "Team Strategy Sync",
               startTime: "4:30 PM Today",
               priority: "High",
               type: "Video"
             });
          }
        }, agent.delay);
      });
    } else {
      // Regular response for non-scheduling messages
      setTimeout(() => {
        const responses = [
          "Got it, thanks for the update!",
          "I'll take a look at this later.",
          "Acknowledged.",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        prototypeStore.addDiscussion({
          id: Date.now() + 1,
          user: "Alex Mercer",
          avatar: "A",
          time: "JUST NOW",
          content: randomResponse,
          color: "bg-surface-container-high text-on-surface-variant"
        });
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2 mb-6 flex flex-col-reverse">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${msg.user === "You" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm ${
              msg.user === "You" ? "bg-primary text-white" : "bg-surface-container border border-outline text-on-surface"
            }`}>
              {msg.avatar}
            </div>
            <div className={`flex-1 max-w-[80%] ${msg.user === "You" ? "text-right" : ""}`}>
              <div className={`flex items-center gap-2 mb-1.5 ${msg.user === "You" ? "justify-end" : ""}`}>
                <span className="text-xs font-black text-on-surface uppercase tracking-wider">{msg.user}</span>
                <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest opacity-50">{msg.time}</span>
              </div>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.user === "You" 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-surface-container-high border border-outline text-on-surface rounded-tl-none"
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative pt-4 border-t border-outline">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message to the workspace..." 
          className="w-full bg-surface-container border border-outline rounded-2xl py-4 pl-6 pr-14 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40 text-on-surface"
        />
        <button 
          onClick={handleSendMessage}
          className="absolute right-4 top-[calc(50%+8px)] -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </div>
    </div>
  );
}
