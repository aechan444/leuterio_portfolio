import type Lenis from '@studio-freight/lenis';

const HEADER_OFFSET = -84;

export function scrollToHash(lenis: Lenis | null, hash: string, reducedMotion: boolean) {
  if (!hash || hash === '#') return false;
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return false;

  if (reducedMotion || !lenis) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
    return true;
  }

  lenis.scrollTo(el, { offset: HEADER_OFFSET, lerp: 0.12 });
  return true;
}

export function handleInPageAnchorClick(e: MouseEvent, lenis: Lenis | null, reducedMotion: boolean) {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
  if (!a) return;

  const href = a.getAttribute('href');
  if (!href || href === '#') return;

  const el = document.querySelector(href);
  if (!el) return;

  e.preventDefault();
  scrollToHash(lenis, href, reducedMotion);
}
