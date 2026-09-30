import type { SiteContent } from './types';
import { zanaat } from './zanaat';
import { meraki } from './meraki';

export const sites: Record<string, SiteContent> = { zanaat, meraki };

/** ?tema=meraki ile demo değiştirilir; varsayılan ZANAAT. */
export function resolveSite(): SiteContent {
  const key = new URLSearchParams(window.location.search).get('tema');
  return (key && sites[key]) || zanaat;
}

export type { SiteContent };
