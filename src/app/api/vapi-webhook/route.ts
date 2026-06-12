import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Using Anon key for server-side (normally you'd use Service Role Key for webhooks)
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Vapi sends different types of messages. We are interested in the 'end-of-call-report'
    if (payload.message.type === "end-of-call-report") {
      const call = payload.message.call;
      const recordingUrl = call.recordingUrl;
      const transcript = payload.message.transcript;
      const startedAt = call.startedAt;
      const endedAt = call.endedAt;

      // Ensure the call_logs table exists in Supabase first (from our schema)
      const { error } = await supabase
        .from('call_logs')
        .insert([
          {
            vapi_call_id: call.id,
            recording_url: recordingUrl,
            transcript: transcript,
            started_at: startedAt,
            ended_at: endedAt,
          }
        ]);

      if (error) {
        console.error("Supabase Insertion Error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      console.log("Vapi Call Logged Successfully:", call.id);
      return NextResponse.json({ success: true, message: "Call logged to Supabase" });
    }

    return NextResponse.json({ success: true, message: "Ignored non-end-of-call message" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
