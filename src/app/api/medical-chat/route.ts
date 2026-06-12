import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the Emergency Guidance AI for "My Doctor Hospital".
Your role is to provide quick, reliable first-aid instructions and symptom assessment.

CRITICAL RULES:
1. ALWAYS begin your response with a disclaimer if the query sounds even slightly serious: "DISCLAIMER: I am an AI, not a doctor. Seek professional medical help."
2. If the user mentions symptoms of a heart attack (chest pain, left arm pain, shortness of breath), stroke (face drooping, arm weakness, speech difficulty), severe bleeding, loss of consciousness, poisoning, or severe burns, IMMEDIATELY instruct them to CALL EMERGENCY SERVICES (911 or 1-800-EMERGENCY) and go to the nearest hospital. Provide ONLY life-saving first aid steps while they wait.
3. Keep your instructions structured, using bullet points for steps.
4. Keep responses concise (under 150 words). Do not overwhelm the user.
5. Be calm, clear, and reassuring.
6. Do not diagnose conditions. Only provide immediate first-aid guidance.
`;

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "I'm sorry, our AI systems are offline. Please call 1-800-EMERGENCY for immediate assistance." },
        { status: 500 }
      );
    }

    let formattedHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Gemini API requires the conversation to start with a 'user' message
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

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
          maxOutputTokens: 300,
          temperature: 0.2, // Low temperature for factual, consistent advice
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error details:", errorData);
      throw new Error(`Gemini API returned ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request. Call 1-800-EMERGENCY if this is a serious condition.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Medical Chat Route Error:", error);
    return NextResponse.json({ reply: "I'm having trouble connecting. If this is an emergency, please call 1-800-EMERGENCY." }, { status: 500 });
  }
}
