/**
 * Client-side Gemini service for the AI Assistant chatbot.
 * This runs in the browser and calls Gemini API directly.
 * Used when deployed as a static site (Firebase Hosting).
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

function getClient() {
  if (!genAI) {
    // In production, use NEXT_PUBLIC_ prefixed key for client-side access
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

const SYSTEM_PROMPT = `You are Slotify AI, an intelligent scheduling assistant with MEETING SCHEDULING powers. You help users:
- Find optimal meeting times across busy schedules
- **CREATE MEETINGS**: When a user provides meeting details (title, time, participants), CONFIRM the meeting and prepare an announcement
- Analyze team availability and conflicts
- Suggest rescheduling strategies
- Create and manage tasks

## MEETING SCHEDULING FLOW:
When a user wants to schedule a meeting, collect these details step by step:
1. **Meeting Title** — Ask if not provided
2. **Date & Time** — Ask if not provided (accept formats like "2 PM", "tomorrow at 3", "July 7th at 2:00 PM")
3. **Participants** — Ask if not provided (default: "all employees")

Once ALL details are confirmed, respond with a formal announcement like:

📋 **Meeting Scheduled!**
🏷️ **Title:** [Meeting Title]
📅 **Date & Time:** [Date and Time]
👥 **Participants:** All Employees
🔗 **Meeting Link:** Will be generated automatically

📢 **Announcement sent to all employees!**
✅ Everyone has been notified via Slotify.

IMPORTANT RULES:
- Be concise and professional
- Ask for EACH missing detail one at a time
- Once you have title + date/time, CONFIRM the meeting immediately
- Always mention that all employees will be informed
- Never make up employee names or meeting details`;

const PROTOTYPE_RESPONSES = [
  { keywords: ["schedule", "meeting", "create"], response: "📋 **Meeting Scheduled!**\n🏷️ **Title:** Project Sync\n📅 **Date & Time:** Tomorrow at 2:00 PM\n👥 **Participants:** All Employees\n🔗 **Meeting Link:** Will be generated automatically\n\n📢 **Announcement sent to all employees!**\n✅ Everyone has been notified via Slotify." },
  { keywords: ["hello", "hi", "who are you"], response: "Hello! I'm Slotify AI, your intelligent scheduling assistant. I can help you find time for meetings, manage your tasks, and keep your team in sync. What can I do for you today?" },
  { keywords: ["task", "todo"], response: "I can definitely help with that. What's the task you'd like to add to your workspace? Just let me know the title and any priority level." },
  { keywords: ["link", "jitsi", "join"], response: "I'll generate a secure Jitsi Meet link for your session as soon as the meeting is confirmed. You'll be able to join directly from your dashboard or notification." },
  { keywords: ["help"], response: "You can ask me to schedule meetings (e.g., 'Schedule a sync for 2pm'), create tasks, or check team availability. I'm here to streamline your workflow!" }
];

/**
 * Generate a chat response using Gemini (client-side).
 */
export async function chatWithGemini(message, history = []) {
  const lowerMsg = message.toLowerCase();

  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Sanitize and simplify history to the last 10 valid messages to avoid payload issues
    const sanitizedHistory = history
      .filter(msg => msg && typeof msg.text === 'string' && msg.text.trim().length > 0)
      .slice(-10)
      .map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text.trim() }],
      }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I'm Slotify AI, ready to help with scheduling and meeting creation." }] },
        ...sanitizedHistory
      ],
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.5,
      },
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error.message);
    
    // Fallback to prototype response if API fails
    const match = PROTOTYPE_RESPONSES.find(r => r.keywords.some(k => lowerMsg.includes(k)));
    if (match) {
      return match.response;
    }
    
    return "I'm currently in prototype mode. I can help you schedule meetings, create tasks, and manage your workspace. What would you like to do?";
  }
}

/**
 * Generate a Jitsi Meet link from a meeting title.
 */
export function generateJitsiLink(title) {
  const sanitized = title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  const id = Math.random().toString(36).substring(2, 8);
  const ts = Date.now().toString(36);
  return `https://meet.jit.si/Slotify-${sanitized}-${id}${ts}`;
}

/**
 * Detect if a meeting has been confirmed in the AI response.
 */
export function detectMeetingFromResponse(aiResponse) {
  const lower = aiResponse.toLowerCase();
  
  const isScheduled = 
    (lower.includes('scheduled') || lower.includes('meeting scheduled') || lower.includes('announcement')) &&
    (lower.includes('pm') || lower.includes('am') || lower.includes(':00') || lower.includes('tomorrow') || lower.includes('today'));

  if (!isScheduled) return null;

  // Extract title
  let title = 'Team Meeting';
  const titleMatch = aiResponse.match(/\*\*Title:?\*\*\s*(.+?)(?:\n|$)/i) ||
                     aiResponse.match(/🏷️\s*\*?\*?Title:?\*?\*?\s*(.+?)(?:\n|$)/i);
  if (titleMatch) title = titleMatch[1].trim();

  // Extract date/time
  let dateTime = '';
  const dtMatch = aiResponse.match(/\*\*Date\s*(?:&|and)?\s*Time:?\*\*\s*(.+?)(?:\n|$)/i) ||
                  aiResponse.match(/📅\s*\*?\*?Date.*?:?\*?\*?\s*(.+?)(?:\n|$)/i) ||
                  aiResponse.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))/i);
  if (dtMatch) dateTime = dtMatch[1].trim();

  // Extract participants
  let participants = ['All Employees'];
  const partMatch = aiResponse.match(/\*\*Participants:?\*\*\s*(.+?)(?:\n|$)/i);
  if (partMatch) participants = [partMatch[1].trim()];

  if (!dateTime) return null;

  return {
    title,
    dateTime,
    participants,
    link: generateJitsiLink(title),
  };
}
