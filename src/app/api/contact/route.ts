import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    // Service not configured yet — acknowledge without sending
    return NextResponse.json(
      { error: 'Contact service not configured. Please reach out by email directly.' },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      // IMPORTANT: replace with your verified Resend sender domain
      // Until then, use: onboarding@resend.dev (only delivers to your Resend account email)
      from: process.env.RESEND_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: subject?.trim() || `[Portfolio] Message de ${name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
