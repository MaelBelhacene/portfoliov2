# Portfolio — Mael Belhacene (`~/ghst.sec`)

Portfolio bilingue (FR/EN) à l'esthétique terminal : Next.js 16 (App Router, Turbopack),
Tailwind CSS v4, next-intl v4, envoi d'email via Resend.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr
```

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (SSG `/fr` + `/en`) |
| `npm start` | Serveur de production |
| `npm test` | Suite Vitest (spec complète du site) |
| `npm run test:watch` | Vitest en mode watch |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Architecture

```
proxy.ts                      # routage i18n (convention Next 16, ex-middleware)
src/config/site.ts            # identité du site — source unique (URL, socials, CV)
src/lib/contact.ts            # validation du formulaire (pure, testée)
src/i18n/                     # routing, request, navigation next-intl
src/app/[locale]/             # layout (metadata, JSON-LD), page, 404 localisée
src/app/api/contact/route.ts  # POST contact (validation + honeypot + Resend)
src/app/og/route.tsx          # image OpenGraph générée (1200×630)
src/components/ui/            # primitives : Section, SectionHeader, TerminalWindow,
                              # Reveal, TypingEffect
src/components/sections/      # Hero, About, Services, Skills, Tools, Experience,
                              # Education, Projects, Contact
messages/{fr,en}.json         # contenu i18n (structure vérifiée par les tests)
tests/                        # 74 tests — invariants du site (voir REBUILD.md)
```

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (défaut : `https://maelbelhacene.fr`) |
| `RESEND_API_KEY` | Clé API Resend (formulaire de contact) |
| `CONTACT_TO_EMAIL` | Destinataire des messages |
| `RESEND_FROM_EMAIL` | Expéditeur vérifié (défaut : `onboarding@resend.dev`) |

Sans configuration Resend, l'API `/api/contact` répond `503` proprement.

## À compléter

- `public/cv.pdf` (les liens de téléchargement pointent dessus)
- `contact.emailDisplay` dans `messages/*.json`
- Variables Resend en production
