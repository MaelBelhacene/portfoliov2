import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

// Convention Next.js 16 : `proxy` remplace `middleware` (runtime nodejs).
export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
