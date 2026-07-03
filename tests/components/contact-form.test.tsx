import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl, fr } from '../utils';
import { ContactForm } from '@/components/sections/ContactForm';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(new RegExp(fr.contact.nameLabel)), 'Jean Dupont');
  await user.type(screen.getByLabelText(new RegExp(fr.contact.emailLabel)), 'jean@exemple.fr');
  await user.type(screen.getByLabelText(new RegExp(fr.contact.messageLabel)), 'Bonjour Mael');
  await user.click(screen.getByRole('button', { name: new RegExp(fr.contact.sendButton) }));
}

describe('ContactForm (spec)', () => {
  it('rend les 4 champs étiquetés', () => {
    renderWithIntl(<ContactForm />);
    for (const label of [
      fr.contact.nameLabel,
      fr.contact.emailLabel,
      fr.contact.subjectLabel,
      fr.contact.messageLabel,
    ]) {
      expect(screen.getByLabelText(new RegExp(label))).toBeInTheDocument();
    }
  });

  it('succès : POST /api/contact puis écran de confirmation', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fillAndSubmit(user);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      name: 'Jean Dupont',
      email: 'jean@exemple.fr',
      message: 'Bonjour Mael',
    });

    expect(await screen.findByText(fr.contact.successTitle)).toBeInTheDocument();
    expect(screen.getByText(fr.contact.successMessage)).toBeInTheDocument();
  });

  it('erreur serveur : message d’erreur dans role=alert', async () => {
    fetchMock.mockResolvedValue({ ok: false, json: async () => ({ error: 'Trop de requêtes' }) });
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fillAndSubmit(user);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Trop de requêtes');
  });

  it('erreur réseau : message d’erreur générique', async () => {
    fetchMock.mockRejectedValue(new TypeError('network down'));
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fillAndSubmit(user);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(fr.contact.errorMessage);
  });

  it('état "envoi en cours" : bouton désactivé', async () => {
    fetchMock.mockReturnValue(new Promise(() => {})); // ne résout jamais
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);
    await fillAndSubmit(user);

    const button = screen.getByRole('button', { name: new RegExp(fr.contact.sending) });
    expect(button).toBeDisabled();
  });
});
