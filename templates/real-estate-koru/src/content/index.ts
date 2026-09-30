import type { SiteContent } from './types';
import { koru } from './koru';

export const sites: Record<string, SiteContent> = { koru };

/** ?proje=anahtar ile demo değiştirilir; varsayılan KORU №9. */
export function resolveSite(): SiteContent {
  const key = new URLSearchParams(window.location.search).get('proje');
  return (key && sites[key]) || koru;
}

export type { SiteContent };
