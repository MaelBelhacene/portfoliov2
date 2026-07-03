import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContact, isHoneypotTripped } from '@/lib/contact';

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Bot détecté : on répond « succès » sans rien envoyer, pour ne pas l'informer.
  if (isHoneypotTripped(payload)) {
    return NextResponse.json({ success: true });
  }

  const result = validateContact(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { name, email, subject, message } = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    // Service non configuré : on l'assume plutôt que d'échouer silencieusement
    return NextResponse.json(
      { error: 'Contact service not configured. Please reach out by email directly.' },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      // Nécessite un domaine expéditeur vérifié chez Resend ;
      // onboarding@resend.dev ne délivre qu'à l'adresse du compte Resend.
      from: process.env.RESEND_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: subject || `[Portfolio] Message de ${name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
