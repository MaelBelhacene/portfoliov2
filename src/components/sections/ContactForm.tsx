'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'w-full bg-transparent border border-terminal-border text-terminal-text font-mono text-sm px-3 py-2 focus:outline-none focus:border-terminal-green focus:shadow-[0_0_12px_rgba(0,255,65,0.12)] transition-all placeholder:text-terminal-faint';

const labelClass = 'font-mono text-xs text-terminal-muted mb-1 block';

export function ContactForm() {
  const t = useTranslations('contact');

  const [state, setState]     = useState<FormState>('idle');
  const [errorMsg, setError]  = useState('');

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — laissé vide par les humains

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? t('errorMessage'));
        setState('error');
      } else {
        setState('success');
        setName(''); setEmail(''); setSubject(''); setMessage('');
      }
    } catch {
      setError(t('errorMessage'));
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="border border-terminal-green bg-terminal-green/5 p-8 text-center shadow-[0_0_32px_rgba(0,255,65,0.1)]">
        <div className="glow-green mb-2 font-mono text-lg text-terminal-green">
          <span aria-hidden="true">[✓] </span>
          <span>{t('successTitle')}</span>
        </div>
        <p className="font-mono text-sm text-terminal-muted">{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {t('nameLabel')} <span className="text-terminal-green">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
            className={inputClass}
            disabled={state === 'sending'}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {t('emailLabel')} <span className="text-terminal-green">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            className={inputClass}
            disabled={state === 'sending'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className={labelClass}>
          {t('subjectLabel')}
        </label>
        <input
          id="cf-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t('subjectPlaceholder')}
          className={inputClass}
          disabled={state === 'sending'}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          {t('messageLabel')} <span className="text-terminal-green">*</span>
        </label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('messagePlaceholder')}
          className={`${inputClass} resize-none`}
          disabled={state === 'sending'}
        />
      </div>

      {/* Honeypot anti-spam : invisible et hors tabulation */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {state === 'error' && (
        <p className="font-mono text-xs text-red-400" role="alert">
          <span aria-hidden="true">[✗] </span>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="border border-terminal-green px-6 py-3 font-mono text-sm text-terminal-green transition-all hover:bg-terminal-green hover:text-black hover:shadow-[0_0_24px_rgba(0,255,65,0.35)] focus:ring-2 focus:ring-terminal-green focus:ring-offset-2 focus:ring-offset-terminal-bg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === 'sending' ? t('sending') : `[ ${t('sendButton')} ]`}
      </button>
    </form>
  );
}
