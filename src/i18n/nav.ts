import { route, type Locale } from './routes';
import { GUIDES, guideById, brandPageById, BRAND_PAGES, brandId } from '../lib/pages';
import { BRANDS, CATS } from '../lib/tool-specs';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Franchise payback calculator', method: 'Where the figures come from', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'costs', label: 'What a franchise costs' },
  { id: 'compare', label: 'Compare franchises' },
  { id: 'money', label: 'Payback and financing' },
];
const brandName = (slug: string) => BRANDS.find((b) => b.slug === slug)?.brand ?? slug;
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const g = guideById(id); if (g) return g.nav;
  const s = brandPageById(id); if (s) return `${brandName(s.slug)} franchise cost`;
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => GUIDES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
// Methode : liee en bas de page, hors du menu du haut pour qu'il tienne sur une ligne.
export const navDirect = (_lang: Locale): NavLink[] => [];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Every brand page from the footer: one click from any page (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => BRAND_PAGES.map((s) => ({ href: route(brandId(s.slug), lang), label: brandName(s.slug) })).sort((a, b) => a.label.localeCompare(b.label));
export const catLabel = (c: keyof typeof CATS) => CATS[c].label;
