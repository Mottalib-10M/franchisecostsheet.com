/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md):
 *  - a brand page: `src/content/brands/<slug>.ts` (BrandDef), slug = a slug of src/data/brands.json;
 *  - a topic page with its calculator: `src/content/guides/<id>.ts` (GuideDef).
 * Routes, menus, footer, sitemap, schemas and internal links read these files alone.
 */
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }
export interface MiniOpts { /** title */ t?: string; /** ids of the fields shown */ p?: string[]; /** default values */ d?: Record<string, number | string>; /** link text */ c?: string }

export interface Helpers extends Kit {
  /** Internal link by page id ("franchise-royalty-fees", "brand:subway", "method"). Unknown id = failed test. */
  a: (id: string, text: string) => string;
  /** Table; numbers are formatted, strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to a source of params-2026.json (key), with optional text. */
  src: (key: string, text?: string) => string;
  /** Link to the FDD of a brand on the Minnesota CARDS portal. */
  fdd: (slug: string, text?: string) => string;
  /** Link to any official URL already read. */
  ext: (url: string, text: string) => string;
  /** Ruled note. */
  box: (title: string, html: string) => string;
  /** Inline mini-simulator built on a calculator of tool-specs.ts: `${h.mini('roi', { t, p: ['m'], d: { b: 'subway' } })}`. */
  mini: (kind: string, opts?: MiniOpts) => string;
}

export type Group = 'costs' | 'compare' | 'money';

export interface GuideDef {
  id: string; group: Group; order: number;
  /** URL segment, lowercase and dashes, no year. */
  slug: string;
  nav: string; card: string;
  /** 50 to 60 characters, key term first, year included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, year included. */
  description: string;
  h1: string; intro: string;
  /** ONE paragraph of 120 words or more: the direct answer with the figures (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  /** Calculator at the top: a key of tool-specs.ts. */
  tool: string;
  /** Default values of that calculator for this page. */
  toolArg?: Record<string, number | string>;
  related: string[];
  /** Keys of params-2026.json > sources. */
  sources: string[];
}
export const defineGuide = (p: GuideDef): GuideDef => p;

export interface BrandDef {
  /** = file name = slug of src/data/brands.json ("chick-fil-a"). */
  slug: string;
  title: string; description: string; intro: string; resume: string;
  body: (h: Helpers) => string;
  faqs: FAQ[];
  related: string[];
  /** Default values of the payback calculator on this page (the brand is set by the page). */
  toolArg?: Record<string, number | string>;
}
export const defineBrand = (s: BrandDef): BrandDef => s;
