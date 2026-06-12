import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the AI Receptionist for "My Doctor Hospital", a premium, futuristic, multi-specialty healthcare facility.
Your role is to assist patients with booking appointments, navigating departments, finding doctors, and answering basic hospital queries.
Be extremely polite, empathetic, and professional. 
If someone asks about an emergency (like bleeding, heart attack, stroke, burns), tell them to immediately call 1-800-EMERGENCY and visit the 'Care Before You Reach™' page for immediate first-aid instructions.
Keep your responses relatively concise (1-3 sentences) so they fit nicely in a chat widget.
Do not use markdown formatting like asterisks or bolding, just use plain text.
`;

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "I'm sorry, my systems are currently offline. Please try again later." },
        { status: 500 }
      );
    }

    // Map the frontend history (role: 'ai'|'user') to Gemini's format (role: 'model'|'user')
    let formattedHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Gemini API requires the conversation to start with a 'user' message
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    // Add the current user message to the end
    formattedHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: formattedHistory,
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error details:", errorData);
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't understand that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini Route Error:", error);
    return NextResponse.json({ reply: "I'm sorry, I am having trouble connecting right now. Please try again later." }, { status: 500 });
  }
}
