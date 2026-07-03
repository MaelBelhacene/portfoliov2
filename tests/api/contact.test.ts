// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { POST } from '@/app/api/contact/route';

function jsonRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const VALID = {
  name: 'Jean Dupont',
  email: 'jean@exemple.fr',
  subject: 'Opportunité',
  message: 'Bonjour Mael, on recrute.',
};

function configureResend() {
  vi.stubEnv('RESEND_API_KEY', 'test-key');
  vi.stubEnv('CONTACT_TO_EMAIL', 'mael@test.fr');
}

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ id: 'email-id' });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('POST /api/contact — validation (spec)', () => {
  it.each([
    ['name', { ...VALID, name: '' }],
    ['email', { ...VALID, email: '  ' }],
    ['message', { ...VALID, message: undefined }],
  ])('400 si %s manquant', async (_field, body) => {
    const res = await POST(jsonRequest(body));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBeTruthy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('400 si email invalide', async () => {
    const res = await POST(jsonRequest({ ...VALID, email: 'pas-un-email' }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('400 si le corps n’est pas du JSON valide', async () => {
    const res = await POST(
      new Request('http://localhost/api/contact', { method: 'POST', body: '{oops' }),
    );
    expect(res.status).toBe(400);
  });
});

describe('POST /api/contact — service non configuré (spec)', () => {
  it('503 sans clé Resend', async () => {
    const res = await POST(jsonRequest(VALID));
    expect(res.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });
});

describe('POST /api/contact — envoi (spec)', () => {
  it('200 {success:true} et envoie avec replyTo = visiteur', async () => {
    configureResend();
    const res = await POST(jsonRequest(VALID));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });

    expect(sendMock).toHaveBeenCalledTimes(1);
    const sent = sendMock.mock.calls[0][0];
    expect(sent.to).toBe('mael@test.fr');
    expect(sent.replyTo).toBe(VALID.email);
    expect(sent.subject).toBe('Opportunité');
    expect(sent.text).toContain(VALID.name);
    expect(sent.text).toContain(VALID.message);
  });

  it('sujet par défaut "[Portfolio] Message de {name}" si absent', async () => {
    configureResend();
    await POST(jsonRequest({ ...VALID, subject: '' }));
    expect(sendMock.mock.calls[0][0].subject).toBe('[Portfolio] Message de Jean Dupont');
  });

  it('500 si l’envoi échoue', async () => {
    configureResend();
    sendMock.mockRejectedValueOnce(new Error('boom'));
    const res = await POST(jsonRequest(VALID));
    expect(res.status).toBe(500);
  });
});

describe('POST /api/contact — anti-spam (v3)', () => {
  it('honeypot rempli → 200 silencieux sans envoi', async () => {
    configureResend();
    const res = await POST(jsonRequest({ ...VALID, website: 'https://spam.example' }));
    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('400 si message démesuré', async () => {
    configureResend();
    const res = await POST(jsonRequest({ ...VALID, message: 'x'.repeat(6000) }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });
});
