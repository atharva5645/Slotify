"use client";

import { useState, useRef, useEffect } from "react";
import { chatWithGemini, detectMeetingFromResponse, generateJitsiLink } from "@/lib/ai/geminiClient";
import { createMeeting } from "@/lib/scheduler/schedulingService";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: "Hello! I'm your Slotify AI assistant. I can help you schedule meetings, generate Jitsi Meet links, and notify your team — just tell me the details!" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Call Gemini directly from client-side
      const aiText = await chatWithGemini(currentInput, messages.slice(1));

      // Check if meeting was confirmed
      const meetingCard = detectMeetingFromResponse(aiText);

      if (meetingCard) {
        // ACTUALLY CREATE THE MEETING IN THE SYSTEM
        try {
          await createMeeting({
            title: meetingCard.title,
            startTime: meetingCard.dateTime,
            endTime: meetingCard.dateTime, // Mock for now
            organizerId: 'current-user-id',
            participants: (meetingCard.participants || []).map(name => ({ userId: name, mandatory: true })),
            minAttendees: 1
          });
        } catch (e) {
          console.error("AI Auto-create failed:", e);
        }

        // Add text response
        setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
        // Add meeting card
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          type: 'meeting_card', 
          meetingCard 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Sorry, I'm having trouble connecting right now. Please check your API key configuration." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render a meeting card
  const renderMeetingCard = (card) => (
    <div className="w-full bg-gradient-to-br from-emerald-500/20 to-primary/10 border border-emerald-500/30 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-emerald-400 text-[18px] icon-fill">event_available</span>
        <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Meeting Created</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[14px] mt-0.5">label</span>
          <div>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-bold">Title</p>
            <p className="text-sm font-bold text-on-surface">{card.title}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[14px] mt-0.5">schedule</span>
          <div>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-bold">Date & Time</p>
            <p className="text-sm font-bold text-on-surface">{card.dateTime}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[14px] mt-0.5">group</span>
          <div>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-bold">Participants</p>
            <p className="text-sm text-on-surface">{card.participants?.join(', ') || 'All Employees'}</p>
          </div>
        </div>
      </div>

      <a 
        href={card.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-[16px]">videocam</span>
        Join Jitsi Meeting
      </a>

      <div className="flex items-center gap-2 pt-1 border-t border-outline/30">
        <span className="material-symbols-outlined text-emerald-400 text-[14px]">campaign</span>
        <p className="text-[10px] text-emerald-400 font-bold">All employees have been notified via Slotify</p>
      </div>
    </div>
  );

  // Format message text with markdown-like rendering
  const renderMessageText = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, i) => {
      // Bold text
      let html = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Window */}
      <div 
        className={`absolute bottom-20 right-0 w-[380px] h-[550px] bg-surface/90 backdrop-blur-xl border border-outline rounded-2xl shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right overflow-hidden
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-outline bg-surface-container/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-[20px] icon-fill">psychology</span>
            </div>
            <div>
              <div className="text-sm font-bold text-on-surface">Slotify AI</div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                <span className="text-[10px] text-success font-bold uppercase tracking-wider">Active Scheduler</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-on-surface/5 flex items-center justify-center transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border 
                ${msg.role === 'assistant' ? 'bg-primary/20 border-primary/30' : 'bg-secondary/20 border-secondary/30'}`}>
                <span className="material-symbols-outlined text-[16px] text-on-surface">
                  {msg.role === 'assistant' ? 'psychology' : 'person'}
                </span>
              </div>
              <div className={`rounded-2xl text-sm max-w-[85%] shadow-sm border overflow-hidden
                ${msg.role === 'assistant' 
                  ? 'bg-surface-container border-outline rounded-tl-none text-on-surface' 
                  : 'bg-primary text-white border-primary rounded-tr-none'}`}>
                {msg.type === 'meeting_card' ? (
                  <div className="p-1">
                    {renderMeetingCard(msg.meetingCard)}
                  </div>
                ) : (
                  <div className="p-3">
                    {renderMessageText(msg.text)}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                <span className="material-symbols-outlined text-primary text-[16px]">psychology</span>
              </div>
              <div className="flex items-center gap-1.5 p-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-outline bg-surface-container/30">
          <div className="relative group">
            <input 
              type="text"
              placeholder="Schedule a meeting at 2 PM..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="w-full bg-surface border border-outline rounded-xl pl-4 pr-12 py-3 text-sm text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-on-surface-variant/30"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:opacity-90 transition-colors active:scale-90 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </form>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative group
          ${isOpen ? 'bg-on-surface/10 rotate-90 scale-90' : 'bg-primary hover:scale-110 active:scale-95 shadow-lg shadow-primary/40'}`}
      >
        <span className={`material-symbols-outlined text-white text-[28px] transition-all
          ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100 icon-fill'}`}>
          psychology
        </span>
        <span className={`material-symbols-outlined ${isOpen ? 'text-on-surface' : 'text-white'} text-[28px] absolute transition-all
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          close
        </span>
        
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none"></span>
        )}
      </button>
    </div>
  );
}
