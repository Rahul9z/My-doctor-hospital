import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, name, department, date, time } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Meta WhatsApp Cloud API Credentials
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.warn("WhatsApp credentials not configured. Skipping WhatsApp message.");
      // Return success anyway so we don't break the frontend if env vars are missing during setup
      return NextResponse.json({ success: true, warning: "Credentials missing, message not sent" });
    }

    // For the college demo, we are overriding the patient's phone number and ALWAYS sending the WhatsApp message to the student's verified Meta phone number.
    // 91 is the country code for India, followed by the user's number.
    const demoVerifiedNumber = "919347756793"; 
    const formattedPhone = demoVerifiedNumber;
    // Send using Meta Cloud API
    const response = await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "template",
        template: {
          name: "hello_world", // Using the default pre-approved Meta template for testing
          language: { code: "en_US" }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", data);
      return NextResponse.json({ error: "Failed to send WhatsApp message", details: data }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("WhatsApp Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
