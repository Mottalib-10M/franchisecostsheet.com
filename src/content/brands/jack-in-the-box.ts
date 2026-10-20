import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('jack-in-the-box');
const bk = K.B('burger-king');
const ca = K.B('carls-jr');
const avg = K.i19(b)!;
const om = b.i19.profitPct!;
const before = om + K.pctFees(b);
const e = K.eco('jack-in-the-box', { m: before });

export default defineBrand({
  slug: 'jack-in-the-box',
  title: `Jack in the Box Franchise Cost 2026: Fee and Margins`,
  description: `Jack in the Box franchise cost in 2026: ${K.range(b)} to build, a ${K.usd(b.feeLow)} fee, ${r(K.pctFees(b))} of sales in fees and a ${r(om)} average franchisee margin.`,
  intro: `Jack in the Box is one of the few burger franchisors that prints the operating margin of its franchisees, after rent, royalty and advertising.`,
  resume: `The Jack in the Box disclosure document issued on ${K.day(b.issued)} estimates ${K.range(b)} for a new prototypical restaurant built by the franchisee, land excluded, of which ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} is paid to the company. The franchise fee is ${K.usd(b.feeLow)}, or $37,500 for a veteran's first restaurant. The standard royalty is ${r(b.royPct)} and the advertising contribution ${r(b.adPct)} of gross sales, ${r(K.pctFees(b))} together, though royalties actually paid range from 0 % to 12.5 % depending on negotiated terms and incentives. For the twelve months ended September 30, 2025, ${K.num(b.i19.count!)} franchised restaurants averaged ${K.usd(avg)} in gross sales, with a median of ${K.usd(b.i19.median!)}, and an average operating margin of ${r(om)} of sales. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(-b.units.franchisedNetChange!)} fewer franchised ones than a year before.`,
  body: (h) => `
<h2>A franchisee profit figure, read correctly</h2>
<p>Item 19 gives, for the same ${K.num(b.i19.count!)} franchised restaurants in the continental United States, a full cost breakdown as a share of sales: cost of sales 27.1 %, total labor 31.2 %, gross profit 41.7 %, other occupancy (rent, building depreciation, taxes and licenses) 11.8 %, EBITDAR 17.7 %, and an average operating margin of ${r(om)}, with a median of 6.3 %. The operating margin is struck after rent, royalty and advertising, and before interest, income taxes, general and administrative costs, officer pay and other income. A year earlier, for 1,786 restaurants, it was 9.6 %. The figures come from franchisees and are unaudited.</p>
<p>The calculator here asks for a margin before franchise fees. Adding the ${r(K.pctFees(b))} of royalty and advertising back to the ${r(om)} average gives ${r(Number(K.dec(before, 1)))}, which is the value this page opens with. At that setting the Item 19 average leaves ${K.usd(e.y.cashBeforeDebt)} a year before any loan, roughly the printed margin in dollars. The site default of ${r(K.P.calc.defaultMarginPct)} would be your own estimate; here the document gives a better starting point, though it remains an average that only 789 restaurants, 45.0 %, reached.</p>
${h.mini('breakeven', { t: 'Jack in the Box: break-even sales at the printed margin', p: ['m', 'lf', 'at'], d: { b: 'jack-in-the-box', m: Number(K.dec(before, 1)), lf: 70 } })}
<h2>The fee, the development fee and the IT bill</h2>
<p>The ${K.usd(b.feeLow)} fee falls to $25,000 for nontraditional locations and by $2,500 for each year a term is shorter than the standard 20. A development fee, $50,000 for a single restaurant, is credited toward it; fees collected in the last fiscal year ranged from $0 to $50,000. Separately, the franchisee buys IT equipment that the company installs, $45,000 to $60,000, and pays an 8 % broker fee on technology procured through it. A grand opening advertising fee of $10,000 applies in select markets.</p>
<h2>Incentives and the royalty actually paid</h2>
<p>The select market incentive cuts the royalty to 2 % for five years, and the development incentive program lends $150,000 per restaurant at 0 %, repaid by crediting all royalties to the loan. These explain the 0 % to 12.5 % range of royalties paid. The advertising rate can rise by majority vote, by no more than 0.5 % every 24 months; there are no cooperatives. Monthly charges counted by the calculator, ${K.usd(b.fixedYear)} a year, cover online ordering, labor management, a digital checklist and the loyalty program. The technology fee of $350 to $500 a month is anticipated to rise to $500 to $675, with a digital fee of $105 and a charge of $0.14 to $0.30 per digital transaction, without a date in the document. Games and devices in the restaurant pay 40 % of their net revenue as royalty.</p>
<h2>Renting from the company</h2>
<p>A franchisee who leases the site from Jack in the Box, which is required when buying a company-operated restaurant, pays a minimum rent and a percentage rent, typically 9.5 % of gross sales, plus common area charges and property taxes. The occupancy line of 11.8 % in Item 19 shows what that kind of cost does to the margin.</p>
<h2>Item 19 in thirds, Item 20 in decline</h2>
<p>The top third of restaurants averaged $2,632,491 and the bottom third $1,266,871; the 80 restaurants in convenience stores and travel plazas averaged $1,671,505 with a margin of 4.0 %. The period is the twelve months ended September 30, 2025, not a calendar year. ${h.a('brand:burger-king', 'Burger King')} reports ${K.usd(K.i19(bk)!)} for ${K.range(bk)}, without any margin, and Carl's Jr. ${K.usd(K.i19(ca)!)} for ${K.range(ca)}. Item 20 shows ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company restaurants at the end of ${b.units.year}.</p>
`,
  faqs: [
    { q: 'What operating margin do Jack in the Box franchisees make?', a: `Item 19 reports an average operating margin of ${r(om)} of sales and a median of 6.3 % for ${K.num(b.i19.count!)} franchised restaurants over the twelve months ended September 30, 2025, after rent, royalty and advertising but before interest, taxes and overhead. The year before, the average was 9.6 %.` },
    { q: 'How much is the Jack in the Box franchise fee for a veteran?', a: `The veterans program cuts the ${K.usd(b.feeLow)} fee by 25 %, or $12,500, to $37,500 for a first new restaurant. Nontraditional locations pay $25,000. A development fee, $50,000 for a single restaurant, is credited toward the franchise fee rather than added to it.` },
    { q: 'Why do Jack in the Box royalties range from 0 % to 12.5 %?', a: `The standard rate is ${r(b.royPct)}, but the document says rates actually paid vary with negotiated terms: nontraditional sites, new markets, incentives and settlements. The select market incentive sets 2 % for five years, and the development incentive loan is repaid by crediting all royalties to it.` },
  ],
  related: ['brand:burger-king', 'item-19-franchise-earnings', 'franchise-break-even', 'franchise-royalty-fees'],
  toolArg: { m: Number(K.dec(before, 1)) },
});
