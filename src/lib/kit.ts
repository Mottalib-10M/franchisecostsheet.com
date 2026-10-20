/**
 * Writing kit (CONTRIBUTING-PAGES.md): every figure written in a page comes from here, never typed by hand.
 *   K.P                  params-2026.json (calculator settings, prime rate, SBA spreads, categories, sources)
 *   K.BRANDS, K.B(slug)  the brands whose disclosure document was read (src/data/brands.json)
 *   K.CATS, K.inCat(c)   categories and their brands
 *   K.i19(b)             Item 19 sales figure of a brand (average, else median) or null
 *   K.eco(slug, v)       year-one economics of a brand (same function as the calculator), v = calculator values
 *   K.tool(kind, args)   runs a calculator of tool-specs.ts and returns its result card
 *   formats              K.usd, K.pct (share), K.rate (6 -> "6 %"), K.num, K.dec, K.day (2026-04-30 -> April 30, 2026),
 *                        K.range(b) ("$263,000 to $630,000"), K.fee(b)
 */
import P from '../data/params-2026.json';
import { BRANDS, CATS, usd, pct, rate, getTool, longDate, i19, catSales, economics, invAt, pctFees, median } from './tool-specs';
import { formatNumber, formatDecimal } from './format';
import { unitYear, loanPayment, paybackYears, breakEvenSales } from './engine/franchise';
import type { V } from './tool-types';
import type { Brand, Category } from './brand-types';

function tool(kind: string, args: V = {}) {
  const spec = getTool(kind);
  const v: V = { ...Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), ...args };
  return spec.run(v);
}
const B = (slug: string): Brand => { const b = BRANDS.find((x) => x.slug === slug); if (!b) throw new Error(`Unknown brand ${slug}`); return b; };
const DEF: V = { at: 'mid', sb: 'auto', so: 1000000, m: P.calc.defaultMarginPct, lf: 0, lr: P.finance.primeRate + P.finance.sbaSpreadOver350k, ly: 10 };

export const KIT = {
  P, BRANDS, CATS, B, i19, catSales, invAt, pctFees, median,
  inCat: (c: Category) => BRANDS.filter((b) => b.category === c),
  eco: (slug: string, v: V = {}) => economics(B(slug), { ...DEF, ...v }),
  tool, unitYear, loanPayment, paybackYears, breakEvenSales,
  usd, pct, rate, num: (x: number) => formatNumber(x, 0), dec: (x: number, d = 1) => formatDecimal(x, d), day: longDate,
  range: (b: Brand) => `${usd(b.invLow)} to ${usd(b.invHigh)}`,
  fee: (b: Brand) => (b.feeLow === b.feeHigh ? usd(b.feeLow) : `${usd(b.feeLow)} to ${usd(b.feeHigh)}`),
};
export type Kit = typeof KIT;
