import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    // Initialize Supabase inside the handler to prevent Next.js build errors when env vars are missing at build time
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''; 
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = await req.json();

    // Vapi sends a function call payload when the AI decides to trigger a tool
    if (payload.message.type === "tool-calls") {
      const toolCalls = payload.message.toolCalls;
      
      for (const toolCall of toolCalls) {
        if (toolCall.function.name === "book_appointment") {
          const args = toolCall.function.arguments;
          
          const patientName = args.patient_name;
          const phone = args.phone_number;
          const department = args.department || "General Practice";
          const date = args.date; // YYYY-MM-DD
          const time = args.time; // HH:MM

          console.log(`Vapi booking request: ${patientName} for ${department} on ${date} at ${time}`);

          // Insert into Supabase (as a guest since they are calling via phone)
          const { error } = await supabase.from('appointments').insert([
            {
              patient_name: patientName,
              patient_phone: phone,
              department: department,
              appointment_date: date,
              appointment_time: time,
              status: 'confirmed'
            }
          ]);

          if (error) {
            console.error("Vapi DB Insert Error:", error);
            // Return an error to Vapi so the AI knows it failed
            return NextResponse.json({ 
              results: [{
                toolCallId: toolCall.id,
                result: "Failed to book appointment due to database error."
              }]
            });
          }

          // Return success to Vapi so the AI can say "I have booked your appointment!"
          
          // BONUS: Trigger WhatsApp confirmation for the demo!
          try {
            const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
            const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

            if (WHATSAPP_TOKEN && PHONE_NUMBER_ID) {
              const demoVerifiedNumber = "919347756793"; // Hardcoded for demo
              
              await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  messaging_product: "whatsapp",
                  to: demoVerifiedNumber,
                  type: "template",
                  template: {
                    name: "hello_world", // Default pre-approved template
                    language: { code: "en_US" }
                  }
                })
              });
            }
          } catch (whatsappError) {
            console.error("Failed to trigger WhatsApp from Vapi webhook", whatsappError);
          }

          return NextResponse.json({ 
            results: [{
              toolCallId: toolCall.id,
              result: `Successfully booked appointment for ${patientName} on ${date} at ${time} in the ${department} department.`
            }]
          });
        }
      }
    }

    return NextResponse.json({ success: true, message: "Ignored message type" });
  } catch (error) {
    console.error("Vapi Webhook Error:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
