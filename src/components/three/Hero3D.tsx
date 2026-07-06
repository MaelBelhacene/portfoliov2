'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/components/ui/useReducedMotion';
import { GlobeFallback } from './GlobeFallback';

// three.js chargé uniquement côté client ; le fallback SVG part dans le HTML SSG
const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

type Hero3DProps = {
  className?: string;
};

export function Hero3D({ className }: Hero3DProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      {reducedMotion ? <GlobeFallback /> : <Hero3DScene />}
    </div>
  );
}
