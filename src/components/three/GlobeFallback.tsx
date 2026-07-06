/**
 * Fallback statique du globe : rendu SSR, affiché pendant le chargement de la
 * scène 3D, si WebGL est indisponible, ou si prefers-reduced-motion est actif.
 */
export function GlobeFallback() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full text-terminal-green"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      aria-hidden="true"
    >
      {/* Sphère */}
      <circle cx="100" cy="100" r="80" opacity="0.5" />
      {/* Parallèles */}
      <ellipse cx="100" cy="100" rx="80" ry="20" opacity="0.3" />
      <ellipse cx="100" cy="62" rx="70" ry="16" opacity="0.22" />
      <ellipse cx="100" cy="138" rx="70" ry="16" opacity="0.22" />
      {/* Méridiens */}
      <ellipse cx="100" cy="100" rx="26" ry="80" opacity="0.3" />
      <ellipse cx="100" cy="100" rx="55" ry="80" opacity="0.22" />
      {/* Arcs */}
      <path d="M 42 74 Q 100 6 158 80" opacity="0.45" strokeDasharray="3 5" />
      <path d="M 55 148 Q 120 190 164 118" opacity="0.35" strokeDasharray="3 5" />
      {/* Points */}
      <g fill="currentColor" stroke="none" opacity="0.8">
        <circle cx="42" cy="74" r="1.8" />
        <circle cx="158" cy="80" r="1.8" />
        <circle cx="55" cy="148" r="1.8" />
        <circle cx="164" cy="118" r="1.8" />
        <circle cx="112" cy="46" r="1.4" />
        <circle cx="78" cy="112" r="1.4" />
        <circle cx="134" cy="96" r="1.4" />
      </g>
    </svg>
  );
}
