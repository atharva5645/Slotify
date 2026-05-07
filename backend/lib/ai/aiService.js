import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function optimizeSlots(tasks, availability) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    As an AI scheduling assistant, optimize these tasks into the available time slots.
    Tasks: ${JSON.stringify(tasks)}
    Availability: ${JSON.stringify(availability)}
    
    Return a JSON array of scheduled items with { taskId, startTime, duration }.
    Prioritize urgent tasks and group related categories.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    return JSON.parse(text);
  } catch (e) {
    // Fallback if AI output is not clean JSON
    return tasks.map((t, i) => ({ taskId: t.id, startTime: availability[i]?.start, duration: "1h" }));
  }
}
