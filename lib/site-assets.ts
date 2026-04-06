/** Public URLs only — Next.js serves `/public` at site root. */

export const SITE_LOGO = '/imgs/LT.svg';

/** Full-bleed hero (composite stage + speaker — text overlays left). */
export const HERO_BG_IMAGE = '/imgs/bossing-blended.jpg';

/**
 * Focal point for the hero photo (`background-position`).
 * Tweak the first value (e.g. `52%`, `58%`) until your face lines up like the Tom Ferry crop.
 */
export const HERO_BG_POSITION = '56% center';

/** Narrow screens — often nudge right so you stay framed when the stack goes single-column. */
export const HERO_BG_POSITION_MOBILE = '62% center';

/** Drop a PNG (transparent) of your #1 seal here — e.g. export from design. Falls back to CSS badge if missing or broken. */
export const HERO_SEAL_IMAGE = '/imgs/hero-seal.png';

/** Promo row thumbnails (`/public/imgs/…`). Swap paths when you have final event art. */
export const PROMO_WEBINAR_THUMB = '/imgs/promo-card-webinar.jpg';
export const PROMO_EXCLUSIVE_THUMB = '/imgs/promo-card-exclusive.jpg';

/** Goals grid — agent portraits (`/public/imgs/agents/…`). */
export const AGENT_IMG_SARMAGO = '/imgs/agents/george-ryan-sarmago.png';
export const AGENT_IMG_MONECILLO = '/imgs/agents/gilbert-generale-monecillo.png';
export const AGENT_IMG_HONOR = '/imgs/agents/azela-honor.png';

export const TRUST_NAMES = [
  'Leuterio Realty',
  'Filipino Homes',
  'Global Realty',
  'FH Global',
  'Bayanihan',
];
