# Plan de reconstruction — Portfolio v2 → v3

> L'ancienne version est la **spécification**. Ce document liste les invariants capturés
> par les tests (`tests/`), puis l'architecture et le design de la reconstruction.

## 1. Invariants (capturés par les tests)

### Routes & i18n
- `/` → redirige vers `/fr` (locale par défaut) ; `/fr` et `/en` générés en SSG.
- Locales : `fr` (défaut), `en` — structure de clés **strictement identique** entre `messages/fr.json` et `messages/en.json`.
- Le switch de langue préserve le chemin courant.
- Exclusion du routage i18n : `api`, `_next`, `_vercel`, fichiers statiques.

### Structure de page (ordre et ancres)
`Navbar → Hero(#whoami) → About(#wh0am1) → Services(#s3rv1c3s) → Skills(#sk1lls) →
Tools(#t00ls) → Experience(#xp3r13nc3) → Education(#f0rm4t10n) → Projects(#pr0j3ts) →
Contact(#c0nt4ct) → Footer`

### Comportements
- **Navbar** : 8 liens d'ancre, toggle FR/EN, lien CV `/cv.pdf`, menu mobile (aria-expanded),
  suivi de section active (aria-current), fond au scroll.
- **Hero** : prompt `whoami`, `<h1>` = nom, handle `@ghst.sec`, rôle, localisation,
  tagline en effet machine à écrire (sautée si `prefers-reduced-motion`), CTA CV + contact.
- **Formulaire de contact** : champs name/email/subject/message, états
  `idle → sending → success | error`, POST JSON vers `/api/contact`, reset après succès.
- **API `/api/contact`** : `400` champs manquants ou email invalide, `503` si Resend non
  configuré, `200 {success:true}` après envoi, `500` si l'envoi échoue, `replyTo` = email
  du visiteur, sujet par défaut `[Portfolio] Message de {name}`.
- **TypingEffect** : affiche progressivement le texte, curseur clignotant à la fin,
  texte complet immédiat si reduced-motion, `aria-label` = texte complet.

### SEO / Metadata
- `generateMetadata` par locale : title, description, OG (image `/og` 1200×630), Twitter card,
  canonical + hreflang (`fr`, `en`, `x-default` → fr), keywords, robots index/follow.
- JSON-LD `Person` (nom, jobTitle, GitHub, LinkedIn, DOMPLUS, Grenoble).
- `sitemap.xml` : 2 entrées (fr prio 1, en prio 0.9) avec alternates ; `robots.txt` : allow all + sitemap.
- Image OG dynamique (terminal, nom, handle, rôle, Grenoble).

### Design tokens (conservés)
Palette terminal : bg `#000`, surface `#0a0a0a`, border `#1a1a1a`, green `#00ff41`,
amber `#ffb300`, text `#c0c0c0`, muted `#888`. Fonte JetBrains Mono. Reduced-motion respecté.

## 2. Architecture v3 (les « 10x » structurels)

| Avant | Après |
|---|---|
| `middleware.ts` (déprécié en Next 16) | `proxy.ts` avec export nommé `proxy` |
| URLs/socials/email dupliqués dans 4 fichiers | `src/config/site.ts` — source unique |
| En-tête de section copié-collé ×8 | Primitives UI : `Section`, `SectionHeader`, `Reveal`, `TerminalWindow` |
| Sections async (`getTranslations`) non testables | Sections **synchrones** (`useTranslations`) → testables en RTL |
| Validation inline dans la route API | `src/lib/contact.ts` pur + testé, honeypot anti-spam, bornes de taille |
| `runtime = 'edge'` sur `/og` | runtime nodejs par défaut (recommandation Next 16) |
| Pas de 404 | `[locale]/not-found.tsx` + catch-all (pattern next-intl) |
| Pas de tests | Vitest + Testing Library : 8 fichiers de tests, ~60 assertions |
| — | `manifest.ts` (PWA de base) |

```
proxy.ts
src/config/site.ts            # URL, handle, socials, email — source unique
src/lib/{fonts,contact}.ts
src/i18n/{routing,request,navigation}.ts
src/app/{layout,page}.tsx     # root minimal + redirect /fr
src/app/[locale]/{layout,page,not-found}.tsx + [...rest]/page.tsx
src/app/api/contact/route.ts
src/app/{og/route.tsx,robots.ts,sitemap.ts,manifest.ts,globals.css}
src/components/ui/{TypingEffect,SectionHeader,Reveal,TerminalWindow}.tsx
src/components/layout/{Navbar,Footer}.tsx
src/components/sections/{Hero,About,Services,Skills,Tools,Experience,Education,Projects,Contact,ContactForm}.tsx
tests/                        # capture de la spec ci-dessus
```

## 3. Design v3 (les « 10x » visuels)

Identité : **session de terminal habitée**, pas une page sombre avec du texte vert.

1. **Atmosphère CRT globale** — scanlines + vignette en overlay fixe (CSS pur, ~3 % d'opacité),
   flicker désactivé en reduced-motion.
2. **Hero = vraie fenêtre de terminal** — barre de titre `mael@ghst-sec:~`, feux tricolores,
   session `$ whoami` → nom, `$ cat mission.txt` → tagline tapée au clavier, CTAs `[ ./cv.pdf ]`.
3. **En-têtes de section unifiés** — `$ commande` + titre avec soulignement lumineux +
   index `01…08` en filigrane géant.
4. **Expérience façon `git log`** — ligne de commits, `HEAD → now` lumineux sur le poste actuel.
5. **Projets = exécutables** — permissions `-rwxr-xr-x`, hover avec glow et élévation.
6. **Contact façon CLI** — labels `--name`, bouton `[ ./send.sh ]`, succès `[✓]`, erreur `[✗]`.
7. **Navbar** — barre de progression de scroll verte au ras du haut, liens indexés `01.`,
   glow sur la section active.
8. **Footer = status bar tmux** — segments `[ghst.sec] · © · rights` / `built with`.
9. **Reveal au scroll** — apparition fade-up par IntersectionObserver, inerte en reduced-motion.
10. **404 terminal** — `bash: 404: command not found`.

## 4. Boucle de validation

1. `npm run test` (Vitest) — tous les invariants §1.
2. `npx tsc --noEmit` — zéro erreur de type.
3. `npm run lint` — zéro erreur.
4. `npm run build` — build SSG propre (`/fr`, `/en` prérendus).

Itérer jusqu'au vert complet sur les quatre.
