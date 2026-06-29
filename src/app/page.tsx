import { redirect } from 'next/navigation';

// Root path: next-intl middleware handles /→/fr redirect.
// This fallback covers any edge case.
export default function RootPage() {
  redirect('/fr');
}
