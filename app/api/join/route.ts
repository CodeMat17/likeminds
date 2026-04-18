import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ApplicationEmail } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      dateOfBirth,
      fathersName,
      familyName,
      quartersInNomeh,
      phone,
      residentialAddress,
      city,
      stateOfResidence,
      occupation,
    } = body;

    const submittedAt = new Date().toLocaleString("en-NG", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Africa/Lagos",
    });

    const html = await render(
      ApplicationEmail({
        logoUrl: `/logo.png`,
        fullName,
        dateOfBirth: new Date(dateOfBirth).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        fathersName,
        familyName,
        quartersInNomeh,
        phone,
        residentialAddress,
        city,
        stateOfResidence,
        occupation,
        submittedAt,
      })
    );

    const { error } = await resend.emails.send({
      from: "LikeMinds Website <onboarding@resend.dev>",
      to: ["info@likemindsofficial.org"],
      subject: `New Membership Application – ${fullName}`,
      html,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json({ error: error.message ?? "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
