import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactEmail } from "@/components/contact-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const sentAt = new Date().toLocaleString("en-NG", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    });

    const html = await render(ContactEmail({ name, email, subject, message, sentAt }));

    const { data, error } = await resend.emails.send({
      from: "LikeMinds Website <info@likemindsofficial.org>",
      to: ["info@likemindsofficial.org"],
      replyTo: email,
      subject: `Contact: ${subject}`,
      html,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: error.message ?? "Failed to send email" }, { status: 500 });
    }

    console.log("Resend success — email ID:", data?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Contact API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
