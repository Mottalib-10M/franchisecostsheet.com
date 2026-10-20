/** Registry: every file of src/content/{guides,brands} is loaded here. */
import type { GuideDef, BrandDef } from './page-types';
import { BRANDS } from './tool-specs';

const base = (file: string) => file.split('/').pop()!.replace(/\.ts$/, '');
const g = import.meta.glob<{ default: GuideDef }>(['../content/guides/*.ts', '!../content/guides/_*.ts'], { eager: true });
export const GUIDES: GuideDef[] = Object.entries(g).map(([f, m]) => {
  if (m.default.id !== base(f)) throw new Error(`${f}: id "${m.default.id}" differs from the file name`);
  return m.default;
}).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const guideById = (id: string) => GUIDES.find((p) => p.id === id);

const s = import.meta.glob<{ default: BrandDef }>(['../content/brands/*.ts', '!../content/brands/_*.ts'], { eager: true });
export const BRAND_PAGES: BrandDef[] = Object.entries(s).map(([f, m]) => {
  if (m.default.slug !== base(f)) throw new Error(`${f}: slug "${m.default.slug}" differs from the file name`);
  if (!BRANDS.some((x) => x.slug === m.default.slug)) throw new Error(`${f}: unknown brand`);
  return m.default;
}).sort((a, b) => a.slug.localeCompare(b.slug));
export const brandId = (slug: string) => `brand:${slug}`;
export const brandPageById = (id: string) => BRAND_PAGES.find((p) => brandId(p.slug) === id);
/** First guide that carries a calculator: the target of a mini-simulator's link. */
export const pageOfTool = (kind: string) => (kind === 'roi' ? 'home' : GUIDES.find((p) => p.tool === kind)?.id);
