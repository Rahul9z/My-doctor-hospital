import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with Service Role Key to bypass RLS for server-side webhook
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// Fallback to anon key if service role is not available, though service role is recommended for webhooks
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; 
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
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
