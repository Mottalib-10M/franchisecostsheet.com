import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { getTool } from '../../lib/tool-specs';
import type { Brand } from '../../lib/brand-types';

const spec = getTool('breakeven');
const LF = Number(spec.inputs.find((i) => i.id === 'lf')!.def);
const LY = Number(spec.inputs.find((i) => i.id === 'ly')!.def);
const DM = K.P.calc.defaultMarginPct;
const RATE = K.P.finance.primeRate + K.P.finance.sbaSpreadOver350k;
const n = K.BRANDS.length;
const pub = K.BRANDS.filter((b) => K.i19(b) !== null);
type Row = { b: Brand; e: ReturnType<typeof K.eco>; x: number };
const rows = (v: Record<string, number | string>): Row[] => pub.map((b) => ({ b, e: K.eco(b.slug, { lf: LF, ...v }), x: K.i19(b)! }));
const base = rows({});
const covered = (rs: Row[]) => rs.filter((r) => r.e.be !== null && r.x >= r.e.be);
const noBe = base.filter((r) => r.e.be === null);
const okBase = covered(base);
const DM2 = DM + 5;
const okHigher = covered(rows({ m: DM2 }));
const okNoLoan = covered(rows({ lf: 0 }));
const okLow = covered(rows({ at: 'low' }));
const ratio = (r: Row) => (r.e.be ? r.x / r.e.be : 0);
const sorted = base.filter((r) => r.e.be !== null).sort((a, b) => ratio(b) - ratio(a));
const best = sorted[0];
const medRatio = K.median(sorted.map(ratio));
const cul = K.B('culvers');
const culShort = K.eco(cul.slug, { lf: LF });
const culLong = K.eco(cul.slug, { lf: LF, ly: K.P.finance.sbaMaxYearsRealEstate });
const jm = K.B('jersey-mikes');
const jmE = K.eco(jm.slug, { lf: LF });
const jmNoLoan = K.eco(jm.slug, { lf: 0 });
const cfa = K.B('chick-fil-a');
const list = (rs: Row[]) => rs.map((r) => r.b.brand).join(', ').replace(/, ([^,]*)$/, ' and $1');

export default defineGuide({
  id: 'franchise-break-even',
  group: 'money',
  order: 20,
  slug: 'franchise-break-even',
  nav: 'Break-even sales',
  card: 'The yearly sales a unit needs to cover its loan, fixed fees and royalty, set against each brand\'s Item 19 figure.',
  title: 'Franchise Break-Even 2026: Sales Needed by Brand vs Item 19',
  description: `Franchise break-even in 2026: the yearly sales each of ${n} brands needs to cover its loan, royalty and fixed fees, set against the sales its Item 19 publishes.`,
  h1: 'Franchise break-even sales: what a unit must sell before the owner earns a dollar',
  intro: `Pick a brand, set your margin and the share you borrow: the calculator gives the yearly sales that cover the loan, the fixed fees and the percentage fees, next to the brand's Item 19 figure.`,
  resume: `Break-even sales are the yearly sales at which a franchised unit covers its loan payments, its fixed franchise fees and its royalty and ad fund, leaving nothing for the owner. The formula is simple: loan payments plus fixed yearly fees, divided by what is left of each dollar after your margin pays the percentage fees. With a ${DM} % margin before franchise fees, ${LF} % of the middle of the Item 7 investment borrowed over ${LY} years at ${K.rate(RATE)}, the published Item 19 sales reach break-even for ${okBase.length} of the ${pub.length} brands that publish a figure. Without a loan the picture flips: ${okNoLoan.length} of them clear it, because fixed fees alone are small. A margin of ${DM2} % instead of ${DM} % brings the count with a loan to ${okHigher.length}. The loan, not the royalty, decides break-even for most brands, and the owner's salary is not even in it yet.`,
  body: (h) => `
<h2>How the calculator works it out</h2>
<p>Your margin is what is left of a dollar of sales after food or goods, labor, rent, utilities and insurance, before the franchise fees. From it the calculator subtracts the royalty and the ad fund printed in Item 6, which are taken on every sale; what remains is the contribution of each dollar. Break-even sales are then the yearly loan payments plus the fixed fees printed in Item 6 in dollars, divided by that contribution. At a ${DM} % margin and a brand charging ${K.rate(K.pctFees(jm))} in royalty and ad fund, as ${h.fdd(jm.slug, jm.brand)} does, each dollar of sales leaves ${K.pct((DM - K.pctFees(jm)) / 100, 1)} to cover the fixed costs. When the percentage fees equal or exceed the margin, no level of sales breaks even: that is the case of ${noBe.length ? list(noBe) : 'no brand here'} at ${DM} %${noBe.some((r) => r.b.slug === cfa.slug) ? `, whose ${K.rate(cfa.royPct)} operating fee absorbs the whole default margin` : ''}.</p>
<p>Two things are left out on purpose. The owner's own pay is not a cost in the formula, so break-even means the unit pays its debts, not that it pays you; a working owner should add a salary to the fixed costs. Depreciation and replacement of equipment are not counted either. The result is a floor, not a comfortable level.</p>
<p>How large can the missing salary be? Few documents say, but ${h.fdd('nothing-bundt-cakes', 'Nothing Bundt Cakes')} does: its Item 19 profit figure excludes owner payroll, which averaged $80,457 among the 190 bakeries that reported it. Dividing such a salary by the contribution per dollar shows the extra sales it requires; at a few cents per dollar, a modest salary adds hundreds of thousands of dollars of sales to break-even. ${cfa.brand} is the opposite case: the document names the ${K.usd(cfa.feeLow)} fee as the operator's only required initial investment, so there is no building loan to carry, but the ${K.rate(cfa.royPct)} operating fee and the ${cfa.profitSharePct} % profit share leave the operator a thin slice of a very large sales figure.</p>
${h.mini('breakeven', { t: 'Break-even with less borrowed', p: ['b', 'lf', 'm'], d: { b: jm.slug, lf: Math.round(LF / 2), m: DM } })}
<h2>The loan does most of the work</h2>
<p>For ${jm.brand}, with ${LF} % of ${K.usd(jmE.inv)} borrowed, the loan costs ${K.usd(jmE.debt)} a year and break-even sales come to ${jmE.be === null ? 'nothing reachable' : K.usd(jmE.be)}; its Item 19 average is ${K.usd(K.i19(jm)!)}. With no loan the same unit breaks even at ${jmNoLoan.be === null ? 'no level of sales' : K.usd(jmNoLoan.be)}, because only ${K.usd(jm.fixedYear)} of fixed yearly fees remain to cover. Across the brands that publish sales, the median Item 19 figure stands at ${K.pct(medRatio, 0)} of break-even under the default settings, and ${okBase.length ? `${list(okBase)} ${okBase.length === 1 ? 'is' : 'are'} the only ${okBase.length === 1 ? 'one' : 'ones'} at or above it` : 'none reaches it'}. That does not mean the others lose money: it means a ${LY}-year repayment of ${LF} % of the investment takes more than a ${DM} % margin can give at typical sales, so owners borrow less, stretch the term, start from the low end of Item 7 or run above-average units.</p>
<p>The repayment term is another lever. ${h.fdd(cul.slug, cul.brand)} prints an Item 7 that includes buying land, which is what a longer real estate term exists for. Borrowing ${LF} % of the middle of its range over ${LY} years costs ${K.usd(culShort.debt)} a year and puts break-even at ${culShort.be === null ? 'no reachable level' : K.usd(culShort.be)}; over ${K.P.finance.sbaMaxYearsRealEstate} years, the longest SBA 7(a) term for real estate, the payment falls to ${K.usd(culLong.debt)} and break-even to ${culLong.be === null ? 'no reachable level' : K.usd(culLong.be)}, against Item 19 sales of ${K.usd(K.i19(cul)!)}. The ${h.a('franchise-loan', 'franchise loan page')} gives the rates and terms in detail.</p>
<h2>Brand by brand at the default settings</h2>
<p>The table applies the same settings to every brand with an Item 19 figure: a ${DM} % margin, ${LF} % of the middle of Item 7 borrowed at ${K.rate(RATE)} over ${LY} years, and each brand's own percentage and fixed fees. Read the last column as a distance, not a verdict. Starting from the low end of Item 7 instead, ${okLow.length} brands clear break-even. Each brand's own margin is unknown: a unit with cheap rent or a family workforce may run well above ${DM} %, and one in an expensive city below.</p>
${h.table(['Brand', 'Investment, middle', 'Loan payments a year', 'Royalty + ad fund', 'Break-even sales', 'Item 19 sales', 'Item 19 / break-even'], sorted.map((r) => [h.fdd(r.b.slug, r.b.brand), K.usd(r.e.inv), K.usd(r.e.debt), K.rate(K.pctFees(r.b)), K.usd(r.e.be!), K.usd(r.x), K.pct(ratio(r), 0)]), `Margin ${DM} %, ${LF} % of the middle of Item 7 borrowed at ${K.rate(RATE)} over ${LY} years. Owner salary not included.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<h2>Reading break-even against Item 19</h2>
<p>An Item 19 average is not your unit's sales. It describes established units, often after excluding new openings and closures, and many documents state that fewer than half of their units reached the average. Compare break-even with the median when the document prints one, and with the bottom quartile when it does, as many do. ${best ? `${best.b.brand} shows the widest cushion here, with Item 19 sales at ${K.pct(ratio(best), 0)} of break-even, partly because its investment is ${best.e.inv < K.median(sorted.map((r) => r.e.inv)) ? 'below' : 'above'} the median of the table.` : ''} The ${h.a('item-19-franchise-earnings', 'Item 19 page')} explains which units each figure covers, and the ${h.a('franchise-royalty-fees', 'royalty page')} what the percentage fees add up to over the years.</p>
`,
  faqs: [
    { q: 'How do you calculate franchise break-even sales?', a: `Add the yearly loan payments and the fixed fees printed in Item 6, then divide by your margin minus the royalty and ad fund percentages. With a ${DM} % margin and ${K.rate(K.pctFees(jm))} of percentage fees, each dollar of sales leaves ${K.pct((DM - K.pctFees(jm)) / 100, 1)} for fixed costs. Add your own salary to the fixed costs if you will work in the unit.` },
    { q: 'Why does borrowing change break-even so much?', a: `Because loan payments are usually by far the largest fixed cost. Repaying ${LF} % of an investment over ${LY} years at ${K.rate(RATE)} takes a large share of yearly sales, while fixed franchise fees are often a few thousand dollars. A longer term, a smaller loan or the low end of Item 7 are the levers a buyer controls; the royalty is set by the document.` },
    { q: 'Is the break-even point the same as profitability?', a: 'No. At break-even the unit pays its loan, its fixed fees and its percentage fees and leaves nothing: no salary for a working owner, no reserve for repairs or remodeling, no return on the cash you put in. Treat it as the floor below which the business consumes money, and plan for sales well above it.' },
  ],
  tool: 'breakeven',
  toolArg: { b: jm.slug },
  related: ['franchise-loan', 'item-19-franchise-earnings', 'franchise-royalty-fees', 'franchise-cost'],
  sources: ['sba_terms', 'fed_h15', 'ftc_436_5', 'mn_cards'],
});
