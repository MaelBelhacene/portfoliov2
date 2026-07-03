// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { validateContact, isHoneypotTripped, MAX_MESSAGE_LENGTH } from '@/lib/contact';

const VALID = {
  name: '  Jean Dupont ',
  email: 'jean@exemple.fr',
  subject: '',
  message: 'Bonjour !',
};

describe('validateContact', () => {
  it('accepte un payload valide et normalise les espaces', () => {
    const result = validateContact(VALID);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe('Jean Dupont');
      expect(result.data.email).toBe('jean@exemple.fr');
    }
  });

  it.each([
    ['payload non-objet', null],
    ['name vide', { ...VALID, name: '' }],
    ['email vide', { ...VALID, email: '' }],
    ['message vide', { ...VALID, message: '   ' }],
    ['email sans @', { ...VALID, email: 'jeanexemple.fr' }],
    ['email sans TLD', { ...VALID, email: 'jean@exemple' }],
    ['name non-string', { ...VALID, name: 42 }],
    ['message trop long', { ...VALID, message: 'x'.repeat(MAX_MESSAGE_LENGTH + 1) }],
    ['name trop long', { ...VALID, name: 'x'.repeat(300) }],
  ])('rejette: %s', (_label, input) => {
    expect(validateContact(input).ok).toBe(false);
  });
});

describe('isHoneypotTripped', () => {
  it('false quand le champ website est vide ou absent', () => {
    expect(isHoneypotTripped(VALID)).toBe(false);
    expect(isHoneypotTripped({ ...VALID, website: '' })).toBe(false);
  });

  it('true quand un bot a rempli le champ website', () => {
    expect(isHoneypotTripped({ ...VALID, website: 'https://spam.example' })).toBe(true);
  });
});
