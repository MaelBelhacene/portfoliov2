/** Source unique de vérité pour l'identité du site — ne rien dupliquer ailleurs. */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maelbelhacene.fr',
  name: 'Mael Belhacene',
  handle: 'ghst.sec',
  jobTitle: 'IT Security Assistant',
  organization: 'DOMPLUS Groupe',
  city: 'Grenoble',
  country: 'FR',
  github: 'https://github.com/MaelBelhacene',
  linkedin: 'https://linkedin.com/in/mael-belhacene-89545b294',
  cvPath: '/cv.pdf',
  knowsAbout: ['Cybersecurity', 'GRC', 'GDPR', 'EDR/XDR', 'Laravel', 'Node.js', 'ANSSI'],
} as const;
