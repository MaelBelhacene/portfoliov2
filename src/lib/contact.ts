export const MAX_FIELD_LENGTH = 200;
export const MAX_MESSAGE_LENGTH = 5000;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactValidation =
  | { ok: true; data: ContactData }
  | { ok: false; error: string };

function asTrimmedString(value: unknown): string | null {
  return typeof value === 'string' ? value.trim() : null;
}

export function validateContact(input: unknown): ContactValidation {
  if (typeof input !== 'object' || input === null) {
    return { ok: false, error: 'Invalid payload.' };
  }
  const record = input as Record<string, unknown>;
  const name = asTrimmedString(record.name);
  const email = asTrimmedString(record.email);
  const subject = asTrimmedString(record.subject) ?? '';
  const message = asTrimmedString(record.message);

  if (!name || !email || !message) {
    return { ok: false, error: 'Missing required fields.' };
  }
  if (name.length > MAX_FIELD_LENGTH || email.length > MAX_FIELD_LENGTH || subject.length > MAX_FIELD_LENGTH) {
    return { ok: false, error: 'Field too long.' };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: 'Message too long.' };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'Invalid email address.' };
  }
  return { ok: true, data: { name, email, subject, message } };
}

/** Champ leurre « website » : rempli uniquement par les bots. */
export function isHoneypotTripped(input: unknown): boolean {
  if (typeof input !== 'object' || input === null) return false;
  const website = (input as Record<string, unknown>).website;
  return typeof website === 'string' && website.trim().length > 0;
}
