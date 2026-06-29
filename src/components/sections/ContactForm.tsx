'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('contact');

  const [state, setState]     = useState<FormState>('idle');
  const [errorMsg, setError]  = useState('');

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
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

  const inputClass =
    'w-full bg-transparent border border-terminal-border text-terminal-text font-mono text-sm px-3 py-2 focus:outline-none focus:border-terminal-green transition-colors placeholder:text-terminal-border';

  const labelClass = 'font-mono text-xs text-terminal-muted mb-1 block';

  if (state === 'success') {
    return (
      <div className="border border-terminal-green p-6 text-center">
        <div className="font-mono text-terminal-green text-lg mb-2">{t('successTitle')}</div>
        <p className="font-mono text-terminal-muted text-sm">{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {t('nameLabel')} *
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
            {t('emailLabel')} *
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
          {t('messageLabel')} *
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

      {state === 'error' && (
        <p className="font-mono text-xs text-red-400" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="font-mono text-sm px-6 py-3 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-terminal-green focus:ring-offset-2 focus:ring-offset-terminal-bg"
      >
        {state === 'sending' ? t('sending') : `[ ${t('sendButton')} ]`}
      </button>
    </form>
  );
}
