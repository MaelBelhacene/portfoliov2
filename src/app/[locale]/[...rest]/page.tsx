import { notFound } from 'next/navigation';

// Toute URL inconnue sous /[locale] rend la 404 localisée.
export default function CatchAllPage() {
  notFound();
}
