import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/ai/geminiService';

/**
 * POST /api/ai/chat
 * 
 * AI Assistant chat endpoint with meeting scheduling capability.
 * Detects meeting intent, generates Jitsi links, and announces to employees.
 */
export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured. Add it to frontend/.env.local" }, { status: 500 });
    }

    const aiResponse = await generateChatResponse(message, history);

    // Detect if the AI response contains a confirmed meeting (title + date/time present)
    const meetingDetected = detectMeetingConfirmation(aiResponse, message, history);

    if (meetingDetected) {
      // Generate a Jitsi Meet link
      const jitsiLink = generateJitsiLink(meetingDetected.title);

      // Build the enhanced response with meeting card
      const meetingCard = {
        type: 'meeting_created',
        title: meetingDetected.title,
        dateTime: meetingDetected.dateTime,
        link: jitsiLink,
        participants: meetingDetected.participants || ['All team members'],
      };

      // Append meeting info to the AI response
      const enhancedResponse = `${aiResponse}

---MEETING_CARD---
${JSON.stringify(meetingCard)}`;

      return NextResponse.json({ 
        text: enhancedResponse,
        meetingCard,
      });
    }

    return NextResponse.json({ text: aiResponse });
  } catch (error) {
    console.error("API Chat Error:", error.message);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Detect if a meeting has been fully confirmed in the conversation.
 * Looks for title + date/time indicators in the AI response.
 */
function detectMeetingConfirmation(aiResponse, userMessage, history = []) {
  const lowerResponse = aiResponse.toLowerCase();
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for meeting scheduling indicators in AI's response
  const hasSchedulingContext = 
    (lowerResponse.includes('scheduled') || lowerResponse.includes('meeting') || lowerResponse.includes('announcement')) &&
    (lowerResponse.includes('pm') || lowerResponse.includes('am') || lowerResponse.includes(':00') || 
     lowerResponse.includes('o\'clock') || lowerResponse.includes('tomorrow') || lowerResponse.includes('today'));

  if (!hasSchedulingContext) return null;

  // Extract meeting title from conversation context
  let title = 'Team Meeting';
  const allText = [...(history || []).map(h => h.text), userMessage, aiResponse].join(' ');
  
  // Try to extract a meeting title from quotes or after "titled/called/named"
  const titleMatch = allText.match(/(?:titled?|called?|named?|meeting:?)\s*["']([^"']+)["']/i) ||
                     allText.match(/["']([^"']{3,40})["']\s*(?:meeting|session|call)/i);
  if (titleMatch) {
    title = titleMatch[1];
  }

  // Extract date/time
  let dateTime = '';
  const dateMatch = aiResponse.match(/(\w+day,?\s+\w+\s+\d+(?:th|st|nd|rd)?(?:\s+\d{4})?(?:\s+at)?\s+\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)/i) ||
                    aiResponse.match(/((?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(?:th|st|nd|rd)?\s*(?:,?\s*\d{4})?\s*(?:at\s+)?\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)/i) ||
                    aiResponse.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))/i);
  if (dateMatch) {
    dateTime = dateMatch[1].trim();
  }

  // Extract participant names
  const participants = [];
  const namePatterns = aiResponse.match(/(?:inform|notify|announce|tell|send to|all employees|all team|everyone|the team)/i);
  if (namePatterns) {
    participants.push('All Employees');
  }

  // Only return if we have at least a time
  if (!dateTime) return null;

  return { title, dateTime, participants };
}

/**
 * Generate a Jitsi Meet link from a meeting title.
 */
function generateJitsiLink(title) {
  const sanitized = title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 30);
  const id = Math.random().toString(36).substring(2, 8);
  const ts = Date.now().toString(36);
  return `https://meet.jit.si/Slotify-${sanitized}-${id}${ts}`;
}
