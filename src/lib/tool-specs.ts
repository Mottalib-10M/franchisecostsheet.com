/**
 * The calculators of the site, rendered by components/calc/SpecTool.tsx (full tool) and MiniSim.tsx (mini).
 * Brand figures come from src/data/brands.json (one Franchise Disclosure Document each), the economics from
 * lib/engine/franchise.ts, every default from params-2026.json. This file ships to the browser.
 */
import P from '../data/params-2026.json';
import BRANDS_RAW from '../data/brands.json';
import type { ToolSpec, V, Input, ToolOut } from './tool-types';
import type { Brand, Category } from './brand-types';
import { formatMoney, formatPercent, formatNumber } from './format';
import { unitYear, loanPayment, paybackYears, breakEvenSales, paidToFranchisor, inRange } from './engine/franchise';

export const usd = (x: number) => `${x < -0.5 ? '-' : ''}${formatMoney(Math.abs(Math.round(x)), 0)}`;
export const pct = (x: number, d = 1) => formatPercent(x, d);
/** 6 -> "6 %", 4.5 -> "4.5 %" (a rate as printed in the FDD). */
export const rate = (x: number | null) => (x === null ? 'n/a' : `${formatNumber(x, Number.isInteger(x) ? 0 : Number.isInteger(Math.round(x * 1000) / 100) ? 1 : 2)} %`);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k]);

export const BRANDS = (BRANDS_RAW as unknown as Brand[]).slice().sort((a, b) => a.brand.localeCompare(b.brand));
export const CATS = P.categories as Record<Category, { label: string; short: string }>;
const B = (slug: string) => BRANDS.find((x) => x.slug === slug) ?? BRANDS[0];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}, ${iso.slice(0, 4)}`;
export const median = (xs: number[]) => { const a = xs.slice().sort((x, y) => x - y); const m = a.length >> 1; return a.length ? (a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2) : 0; };

/** Royalty + ad fund as printed (low end of a range); a flat royalty counts in fixedYear. */
export const pctFees = (b: Brand) => (b.royPct ?? 0) + (b.adPct ?? 0);
/** Item 19 average (or median when no average) of a brand, or null. */
export const i19 = (b: Brand) => (b.i19.published ? b.i19.value ?? b.i19.median : null);
/** Brands of a category with a published sales figure, and their median: the default when a brand publishes none. */
export function catSales(cat: Category) {
  const xs = BRANDS.filter((b) => b.category === cat && i19(b) !== null).map((b) => i19(b)!);
  return { n: xs.length, median: xs.length >= P.calc.minBrandsForCategoryMedian ? median(xs) : null };
}
/** Default margin before franchise fees: the reader's estimate (params-2026.json > calc). */
const MARGIN = P.calc.defaultMarginPct;
const SBA_RATE = P.finance.primeRate + P.finance.sbaSpreadOver350k;

const brandIn = (def: string, id = 'b', label = 'Franchise brand'): Input => ({ kind: 'select', id, label, def, options: BRANDS.map((x) => ({ value: x.slug, label: x.brand })) });
const AT: Input = { kind: 'choice', id: 'at', label: 'Investment (Item 7)', def: 'mid', options: [{ value: 'low', label: 'Low' }, { value: 'mid', label: 'Middle' }, { value: 'high', label: 'High' }] };
const SALES_BASIS: Input = { kind: 'select', id: 'sb', label: 'Yearly sales used', def: 'auto', options: [{ value: 'auto', label: 'Item 19 figure (or category median)' }, { value: 'own', label: 'My own figure, below' }], help: 'Item 19 is the only sales figure a franchisor may give you' };
const SALES_OWN: Input = { id: 'so', label: 'My own yearly sales figure', def: 1000000, unit: "$", max: 50000000 };
const MARGIN_IN: Input = { id: 'm', label: 'Margin before franchise fees', def: MARGIN, unit: '%', max: 90, decimals: 1, help: 'Your estimate: sales minus goods, labor, rent and overhead' };
const LOAN: Input[] = [
  { id: 'lf', label: 'Share of the investment borrowed', def: 0, unit: '%', max: 100, adv: true },
  { id: 'lr', label: 'Loan rate', def: SBA_RATE, unit: '%', max: 30, decimals: 2, adv: true, help: `Prime ${formatNumber(P.finance.primeRate, 2)} % + ${formatNumber(P.finance.sbaSpreadOver350k, 1)} %, the SBA 7(a) ceiling above $350,000` },
  { id: 'ly', label: 'Loan term', def: 10, unit: 'yr', max: 25, adv: true },
];

export const invAt = (b: Brand, at: string) => inRange(b.invLow, b.invHigh, at === 'low' ? 0 : at === 'high' ? 1 : 0.5);
/** The sales figure the calculator uses for a brand, and where it comes from. */
export function salesOf(b: Brand, basis: string, own: number): { sales: number; from: string } {
  if (basis === 'own') return { sales: own, from: 'your own figure' };
  const x = i19(b);
  if (x !== null) return { sales: x, from: `${b.brand} Item 19: ${b.i19.label ?? 'published sales'}${b.i19.period ? `, ${b.i19.period}` : ''}` };
  const c = catSales(b.category);
  if (c.median !== null) return { sales: c.median, from: `${b.brand} publishes no sales figure; median of the Item 19 figures of ${c.n} ${CATS[b.category].short} brands on this site` };
  return { sales: own, from: `${b.brand} publishes no sales figure; your own figure` };
}

/** Year-one economics of a brand for a reader's settings: the core of every brand calculator. */
export function economics(b: Brand, v: V) {
  const inv = invAt(b, s(v, 'at'));
  const { sales, from } = salesOf(b, s(v, 'sb'), n(v, 'so'));
  const debt = loanPayment({ principal: (inv * n(v, 'lf')) / 100, ratePct: n(v, 'lr'), years: n(v, 'ly') });
  const u = { sales, royaltyPct: b.royPct ?? 0, adPct: b.adPct ?? 0, fixedFees: b.fixedYear, marginPct: n(v, 'm'), profitSharePct: b.profitSharePct };
  const y = unitYear(u, debt);
  return { inv, sales, from, debt, y, pay: paybackYears(inv, y.cashBeforeDebt), be: breakEvenSales(u, debt) };
}
const yrs = (x: number | null) => (x === null ? 'never' : x > 50 ? 'over 50 years' : `${formatNumber(x, 1)} years`);

function roiCard(v: V): ToolOut {
  const b = B(s(v, 'b'));
  const e = economics(b, v);
  const rows: ToolOut['rows'] = [
    [`Investment, ${s(v, 'at') === 'mid' ? 'middle of' : s(v, 'at') === 'low' ? 'low end of' : 'high end of'} Item 7`, usd(e.inv)],
    ['Yearly sales used', usd(e.sales), e.sales],
    [`Margin before franchise fees (${formatNumber(n(v, 'm'), 1)} %)`, usd(e.y.operating), Math.max(0, e.y.operating)],
    [`Royalty ${rate(b.royPct)}${b.royFlat ? ' + flat fees' : ''} and ad fund ${rate(b.adPct)}`, usd(e.y.fees), e.y.fees],
  ];
  if (e.y.share > 0.5) rows.push([`Profit share to ${b.brand} (${b.profitSharePct} %)`, usd(e.y.share), e.y.share]);
  if (e.debt > 0.5) rows.push(['Loan payments', usd(e.debt), e.debt]);
  rows.push(['Cash flow after fees' + (e.debt > 0.5 ? ' and loan' : ''), usd(e.y.cashAfterDebt), Math.max(0, e.y.cashAfterDebt)]);
  rows.push(['Break-even yearly sales', e.be === null ? 'none: margin below fees' : usd(e.be)]);
  return {
    label: `Payback of a ${b.brand} franchise`, value: yrs(e.pay),
    sub: e.y.cashBeforeDebt > 0 ? `${usd(e.y.cashBeforeDebt)} a year before any loan, on ${usd(e.inv)} invested.` : 'At this margin the unit does not cover its franchise fees.',
    rows,
    note: `Sales: ${e.from}. Fees: ${b.brand} FDD issued ${longDate(b.issued)}${b.amended ? `, amended ${longDate(b.amended)}` : ''}${b.fixedYear ? `; ${usd(b.fixedYear)} of fixed yearly fees (${b.fixedNote})` : ''}. Margin and loan are your inputs, not the franchisor's.`,
  };
}

export const SPECS: Record<string, (arg?: Record<string, number | string>) => ToolSpec> = {
  /* Brand -> payback, cash flow, break-even (home page and brand pages) */
  roi: (arg) => ({ inputs: [brandIn(String(arg?.b ?? 'jersey-mikes')), AT, SALES_BASIS, SALES_OWN, MARGIN_IN, ...LOAN], run: roiCard }),

  /* Two or three brands side by side, same margin */
  compare: (arg) => ({
    inputs: [brandIn(String(arg?.a ?? 'subway'), 'a', 'First brand'), brandIn(String(arg?.c2 ?? 'jersey-mikes'), 'c2', 'Second brand'), { ...brandIn(String(arg?.c3 ?? 'jimmy-johns'), 'c3', 'Third brand'), options: [{ value: 'none', label: 'None' }, ...BRANDS.map((x) => ({ value: x.slug, label: x.brand }))] } as Input, MARGIN_IN, AT],
    run: (v) => {
      const list = [s(v, 'a'), s(v, 'c2'), s(v, 'c3')].filter((x) => x !== 'none').map(B);
      const res = list.map((b) => ({ b, e: economics(b, { ...v, sb: 'auto', so: 0, lf: 0, lr: 0, ly: 0 }) }));
      const best = res.filter((r) => r.e.pay !== null).sort((x, y) => x.e.pay! - y.e.pay!)[0];
      return {
        label: best ? `Shortest payback at ${formatNumber(n(v, 'm'), 1)} % margin` : 'No brand pays back at this margin', value: best ? best.b.brand : 'None',
        sub: best ? `${yrs(best.e.pay)} on ${usd(best.e.inv)} invested.` : 'Raise the margin or check the fees.',
        rows: res.map((r) => [`${r.b.brand}: payback`, yrs(r.e.pay)] as [string, string]),
        table: {
          headers: ['', ...res.map((r) => r.b.brand)],
          rows: [
            ['Investment (Item 7)', ...res.map((r) => `${usd(r.b.invLow)} to ${usd(r.b.invHigh)}`)],
            ['Initial fee (Item 5)', ...res.map((r) => (r.b.feeLow === r.b.feeHigh ? usd(r.b.feeLow) : `${usd(r.b.feeLow)} to ${usd(r.b.feeHigh)}`))],
            ['Royalty (Item 6)', ...res.map((r) => (r.b.royFlat && r.b.royPct === null ? 'flat fee' : rate(r.b.royPct)))],
            ['Ad fund (Item 6)', ...res.map((r) => rate(r.b.adPct))],
            ['Sales used', ...res.map((r) => usd(r.e.sales))],
            ['Cash flow, year one', ...res.map((r) => usd(r.e.y.cashBeforeDebt))],
            ['Paid to the franchisor, year one', ...res.map((r) => usd(r.e.y.toFranchisor))],
          ],
          align: ['l', ...res.map(() => 'r' as const)],
        },
        note: 'Sales: each brand\'s Item 19 figure, or the median of its category when it publishes none. No loan. Same margin for all, which real units do not share.',
      };
    },
  }),

  /* What a royalty and ad fund cost over the years (any brand) */
  fees: (arg) => ({
    inputs: [
      { id: 'sales', label: 'Yearly sales', def: Number(arg?.sales ?? 1000000), unit: "$", max: 50000000 },
      { id: 'roy', label: 'Royalty', def: Number(arg?.roy ?? 6), unit: '%', max: 50, decimals: 2 },
      { id: 'ad', label: 'Ad fund', def: Number(arg?.ad ?? 4), unit: '%', max: 30, decimals: 2 },
      { id: 'fee', label: 'Initial franchise fee', def: Number(arg?.fee ?? 40000), unit: '$', max: 1000000 },
      { id: 'yrs', label: 'Years of the agreement', def: Number(arg?.yrs ?? 10), unit: 'yr', max: 50 },
      { id: 'fx', label: 'Fixed yearly fees (technology...)', def: 0, unit: '$', max: 1000000, adv: true },
    ],
    run: (v) => {
      const yearly = (n(v, 'sales') * (n(v, 'roy') + n(v, 'ad'))) / 100 + n(v, 'fx');
      const total = paidToFranchisor(n(v, 'fee'), yearly, n(v, 'yrs'));
      return {
        label: `Paid to the franchisor over ${formatNumber(n(v, 'yrs'), 0)} years`, value: usd(total), sub: `${usd(yearly)} a year, at flat sales.`,
        rows: [['Royalty per year', usd((n(v, 'sales') * n(v, 'roy')) / 100), (n(v, 'sales') * n(v, 'roy')) / 100], ['Ad fund per year', usd((n(v, 'sales') * n(v, 'ad')) / 100), (n(v, 'sales') * n(v, 'ad')) / 100], ['Fixed fees per year', usd(n(v, 'fx'))], ['Initial fee, once', usd(n(v, 'fee'))]],
        note: 'Percentages apply to gross sales as the FDD defines them. Sales held flat: no growth is assumed.',
      };
    },
  }),

  /* Break-even sales of a brand against its Item 19 figure */
  breakeven: (arg) => ({
    inputs: [brandIn(String(arg?.b ?? 'subway')), MARGIN_IN, { id: 'lf', label: 'Share of the investment borrowed', def: Number(arg?.lf ?? 70), unit: '%', max: 100 }, AT, { ...LOAN[1], adv: false }, { ...LOAN[2], adv: true }],
    run: (v) => {
      const b = B(s(v, 'b'));
      const e = economics(b, { ...v, sb: 'auto', so: 0 });
      const x = i19(b);
      return {
        label: `Break-even sales for a ${b.brand} unit`, value: e.be === null ? 'None' : usd(e.be),
        sub: e.be === null ? 'The margin does not cover the royalty and ad fund.' : x !== null ? `${b.brand} Item 19 figure: ${usd(x)}, ${pct(x / e.be - 1, 0)} ${x >= e.be ? 'above' : 'below'} break-even.` : `${b.brand} publishes no sales figure to compare.`,
        rows: [['Loan payments per year', usd(e.debt), e.debt], ['Fixed yearly fees', usd(b.fixedYear)], ['Royalty + ad fund', rate(pctFees(b))], ['Margin left per dollar of sales', pct(Math.max(0, n(v, 'm') - pctFees(b)) / 100, 1)]],
        note: `Break-even = (loan payments + fixed fees) / (margin - royalty - ad fund). Owner salary not included. Investment: ${usd(e.inv)}.`,
      };
    },
  }),

  /* A franchise loan */
  loan: (arg) => ({
    inputs: [
      { id: 'amt', label: 'Amount borrowed', def: Number(arg?.amt ?? 500000), unit: '$', max: 50000000 },
      { ...LOAN[1], adv: false },
      { ...LOAN[2], adv: false, def: Number(arg?.ly ?? 10) },
    ],
    run: (v) => {
      const yearly = loanPayment({ principal: n(v, 'amt'), ratePct: n(v, 'lr'), years: n(v, 'ly') });
      const total = yearly * n(v, 'ly');
      return {
        label: 'Monthly loan payment', value: usd(yearly / 12), sub: `${usd(yearly)} a year to cover before any profit.`,
        rows: [['Total repaid', usd(total), total], ['Interest', usd(total - n(v, 'amt')), total - n(v, 'amt')], ['Payments per year', usd(yearly)]],
        note: 'Level monthly payments at a fixed rate. SBA 7(a) rates are usually variable: the payment moves with prime.',
      };
    },
  }),

  /* The brands of a category, sorted */
  list: (arg) => ({
    inputs: [
      { kind: 'select', id: 'cat', label: 'Category', def: String(arg?.cat ?? 'all'), options: [{ value: 'all', label: 'All brands' }, ...Object.entries(CATS).filter(([k]) => BRANDS.some((b) => b.category === k)).map(([k, c]) => ({ value: k, label: c.label }))] },
      { kind: 'select', id: 'sort', label: 'Sort by', def: String(arg?.sort ?? 'low'), options: [{ value: 'low', label: 'Lowest investment' }, { value: 'ratio', label: 'Item 19 sales per $ invested' }, { value: 'fees', label: 'Lowest royalty + ad fund' }, { value: 'sales', label: 'Highest Item 19 sales' }] },
    ],
    run: (v) => {
      const rows = BRANDS.filter((b) => s(v, 'cat') === 'all' || b.category === s(v, 'cat'));
      const key = s(v, 'sort');
      const ratio = (b: Brand) => (i19(b) === null ? -1 : i19(b)! / invAt(b, 'mid'));
      const sorted = rows.slice().sort((a, b) => key === 'low' ? a.invLow - b.invLow : key === 'fees' ? pctFees(a) - pctFees(b) : key === 'sales' ? (i19(b) ?? -1) - (i19(a) ?? -1) : ratio(b) - ratio(a));
      const top = sorted[0];
      return {
        label: key === 'low' ? 'Lowest starting investment' : key === 'fees' ? 'Lowest royalty + ad fund' : key === 'sales' ? 'Highest published sales' : 'Most sales per dollar invested',
        value: top ? top.brand : 'None',
        sub: top ? (key === 'low' ? `From ${usd(top.invLow)} (Item 7).` : key === 'fees' ? `${rate(pctFees(top))} of sales.` : key === 'sales' ? `${usd(i19(top) ?? 0)} a year (Item 19).` : `${formatNumber(ratio(top), 2)} dollars of yearly sales per dollar invested.`) : '',
        rows: sorted.slice(1, 4).map((b) => [b.brand, key === 'low' ? usd(b.invLow) : key === 'fees' ? rate(pctFees(b)) : key === 'sales' ? (i19(b) === null ? 'none' : usd(i19(b)!)) : (ratio(b) < 0 ? 'n/a' : formatNumber(ratio(b), 2))] as [string, string]),
        table: { headers: ['Brand', 'Investment', 'Fee', 'Royalty + ad', 'Item 19 sales'], rows: sorted.map((b) => [b.brand, `${usd(b.invLow)} to ${usd(b.invHigh)}`, usd(b.feeLow), b.royFlat && b.royPct === null ? 'flat + ' + rate(b.adPct) : rate(pctFees(b)), i19(b) === null ? 'not published' : usd(i19(b)!)]), align: ['l', 'r', 'r', 'r', 'r'] },
        note: 'Each figure from the brand\'s latest FDD on file in Minnesota. Item 19 figures differ in scope between brands (average or median, all units or a subset).',
      };
    },
  }),
};

/** A spec with its defaults overridden by `arg` (same keys as the input ids). */
export function getTool(kind: string, arg?: Record<string, number | string>): ToolSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown tool ${kind}`);
  const spec = f(arg);
  if (!arg) return spec;
  return { ...spec, inputs: spec.inputs.map((i) => (arg[i.id] === undefined ? i : ({ ...i, def: arg[i.id] } as typeof i))) };
}
export const TOOL_KINDS = Object.keys(SPECS);
