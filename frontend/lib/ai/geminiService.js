import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * GeminiService — handles all communication with Google Gemini API.
 * 
 * Responsibilities:
 * - Initialize Gemini client
 * - Send dynamic prompts
 * - Return AI-generated responses
 * - Handle errors safely
 * 
 * Model: gemini-2.5-flash
 */

let genAI = null;

function getClient() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Generate a single response from Gemini given a structured prompt.
 * Used by the negotiation/orchestration flow.
 */
export async function generateNegotiationResponse(prompt) {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 500,  // Keep responses short for speed
        temperature: 0.5,
      },
    });

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Negotiation Error:", error.message);
    throw new Error(`Gemini API failed: ${error.message}`);
  }
}

/**
 * Generate a chat response with conversation history.
 * Used by the AI Assistant chatbot.
 */
export async function generateChatResponse(message, history = []) {
  try {
    const client = getClient();
    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `You are Slotify AI, an intelligent scheduling assistant with MEETING SCHEDULING powers. You help users:
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
🔗 **Meeting Link:** A Jitsi Meet link will be generated automatically

📢 **Announcement sent to all employees!**
✅ Everyone has been notified via Slotify.

IMPORTANT RULES:
- Be concise and professional. Use emojis sparingly.
- Ask for EACH missing detail one at a time (don't ask for everything at once)
- Once you have title + date/time, CONFIRM the meeting immediately
- Always mention that all employees/participants will be informed
- Always say the meeting link will be generated automatically
- Never make up employee names or meeting details`;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I'm Slotify AI, ready to help with intelligent scheduling. How can I assist you?" }] },
        ...history.map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error.message);
    throw new Error(`Gemini Chat failed: ${error.message}`);
  }
}
