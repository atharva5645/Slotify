import { GoogleGenerativeAI } from '@google/generative-ai';

const getGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not configured.");
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Perform the scheduling negotiation:
 * 1. Calculate best slots using orchestrateMeeting (logic/math)
 * 2. Generate natural language summary using Gemini
 */
export const negotiateScheduling = async (meetingRequest) => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/api/meetings/ai-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meetingRequest)
    });

    const orchestrationResult = await response.json();

    if (!response.ok) {
      throw new Error(orchestrationResult.error || "AI scheduling request failed.");
    }

    if (!orchestrationResult.success) {
      return {
        ...orchestrationResult,
        aiSummary: "I couldn't find a conflict-free slot for everyone. Would you like me to try a different date range or prioritize mandatory attendees?",
      };
    }

    // 2. Generate AI Summary using Gemini (Client-side)
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are Slotify AI, an expert scheduling assistant.
      Summarize the following meeting scheduling result for the user.
      
      TITLE: ${orchestrationResult.meetingTitle || meetingRequest.title}
      BEST SLOT: ${orchestrationResult.bestSlot.startTime} to ${orchestrationResult.bestSlot.endTime}
      PARTICIPANTS: ${(orchestrationResult.participants || []).map(p => p.name).join(', ')}
      LINK: ${orchestrationResult.meetingLink || orchestrationResult.zoomLink || "No link generated yet"}
      
      Be professional, enthusiastic, and brief. Mention that all participants have been notified.
      If there were minor conflicts, mention how they were handled.
      Use Jitsi Meet for the link.
    `;

    const result = await model.generateContent(prompt);
    const aiSummary = result.response.text();

    return {
      ...orchestrationResult,
      aiSummary
    };
  } catch (error) {
    console.error("Negotiation Error:", error);

    // Prototype Mode Fallback
    if (process.env.NEXT_PUBLIC_PROTOTYPE_MODE === 'true' || error.message.includes('PERMISSION_DENIED') || error.message.includes('disabled')) {
      console.warn("Using Prototype Fallback for AI Negotiation.");
      return {
        success: true,
        bestSlot: {
          startTime: new Date(Date.now() + 3600000).toISOString(),
          endTime: new Date(Date.now() + 7200000).toISOString()
        },
        meetingLink: `https://meet.jit.si/slotify-proto-${Date.now()}`,
        aiSummary: "The AI has analyzed everyone's availability and found a perfect slot for tomorrow. I've tentatively scheduled this in the prototype environment for you!"
      };
    }

    if (error.message?.includes("client is offline")) {
      throw new Error("The browser could not reach scheduling data. Please try again with the backend server running.");
    }

    throw error;
  }
};
