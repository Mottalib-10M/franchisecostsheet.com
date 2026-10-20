import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('marcos-pizza');
const e = K.eco('marcos-pizza');
const pj = K.B('papa-johns');
const dom = K.B('dominos');

export default defineBrand({
  slug: 'marcos-pizza',
  title: "Marco's Pizza Franchise Cost 2026: Fees and Item 19 Sales",
  description: `Marco's Pizza franchise cost in 2026: ${K.range(b)} for a leased store, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} to two funds and average Item 19 sales.`,
  intro: `Marco's Pizza asks for a total marketing effort of at least 7 % of sales, more than its two fund contributions alone. Item 19 shows the full spread of its stores, from bottom quarter to top.`,
  resume: `A single Marco's Pizza store in about 1,200 to 1,600 square feet of leased space costs ${K.range(b)} under Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)}. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to the franchisor or an affiliate, including the ${K.usd(b.feeLow)} franchise fee and a $15,500 Brand Launch Program. The royalty is ${K.rate(b.royPct)} of net royalty sales, adjustable up to ${K.rate(b.royPctHigh!)}, and the two marketing funds currently take ${K.rate(b.adPct)}: 1 % to the Brand Development Fund and 4 % to the National Advertising Fund. Item 19 reports that ${K.num(b.i19.count!)} franchised stores open all 52 weeks of fiscal 2025 averaged ${K.usd(K.i19(b)!)} in net royalty sales, with a median of ${K.usd(b.i19.median!)}. Item 20 counts ${K.num(b.units.total!)} stores at the end of ${b.units.year}, ${K.num(b.units.franchised!)} of them franchised, up ${K.num(b.units.franchisedNetChange!)}.`,
  body: (h) => `
<h2>Paid to Marco's before the doors open</h2>
<p>The franchisor's share of the ${K.usd(b.invLow)} to ${K.usd(b.invHigh)} budget, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} for one store, rises to $66,336 to $124,886 under a two-store development agreement. Besides the fee, it includes the Brand Launch Program of $15,500, paid when construction starts, which can reach $25,500 if performance goals are missed. Two affiliates are sole suppliers: MPD is the exclusive approved seller of new ovens and MTS supplies the only approved point of sale system. The site is leased, so no property purchase is in the range.</p>
<h2>A list of fee discounts</h2>
<p>The ${K.usd(b.feeLow)} fee falls to $20,000 for first responders with five years of service and to $15,000 for veterans, and is waived for veterans with a service-connected disability of 50 % or more. Key management employees pay 60 % of the standard fee, or $10,000 or $5,000 depending on the program. Existing franchisees can have it waived under the Equipment Incentive Program, with up to $75,000 toward equipment. In 2025 the fees collected ran from $1,000 to $25,000. A 2026 Royalty Incentive Program for three to five stores, with all fees paid upfront, sets the royalty at 0 % for the first six accounting periods and 2.5 % for periods 7 to 18.</p>
<h2>Marketing beyond the ${K.rate(b.adPct)}</h2>
<p>The calculator counts the ${K.rate(b.adPct)} paid to the two funds, and the Brand Development Fund may rise by 0.5 %. Some markets add a Regional Advertising Fund of 0.5 % to 1.20 %, with national and regional together capped at 5.5 %. The total marketing obligation is at least 7 % of net royalty sales: where there is no regional fund or cooperative, the remaining 2 % must be spent on local store marketing. On a store selling the average, that extra spending is real money the model leaves out. Fixed fees counted are ${K.usd(b.fixedYear)} a year of software maintenance, $430 for each of 13 accounting periods; a technology fee of $27.96 a week is not in the total.</p>
${h.mini('breakeven', { t: "Marco's Pizza: break-even against the Item 19 average", p: ['m', 'lf'], d: { b: 'marcos-pizza' } })}
<h2>The spread behind the average</h2>
<p>Of the ${K.num(b.i19.count!)} franchised stores behind the ${K.usd(K.i19(b)!)} average, 44 % met or beat it. The top quarter averaged $1,288,466, the bottom quarter $543,668, and individual stores ranged from $289,736 to $2,052,737; 297 sold more than $1,000,000. The count excludes stores not open the full year, special venues, company-owned stores and 28 stores that closed in 2025. Two small inconsistencies: Item 19 counts 1,141 franchised stores at year end against 1,139 in Item 20, and it mentions 582 new stores where its own footnote totals 58. The default margin of ${K.rate(K.P.calc.defaultMarginPct)} is a starting point for your own estimate; with it, the middle of the range pays back in ${K.dec(e.pay!)} years.</p>
<h2>Against Papa Johns and Domino's</h2>
<p>${h.a('brand:papa-johns', 'Papa Johns')} quotes ${K.range(pj)} and an average of ${K.usd(K.i19(pj)!)}, ${h.a('brand:dominos', "Domino's")} ${K.range(dom)} and ${K.usd(K.i19(dom)!)} once its weekly figure is annualized. Marco's has the smallest network of the three and the lowest printed average.</p>
`,
  faqs: [
    { q: "How much does a Marco's Pizza franchise cost to open?", a: `Item 7 estimates ${K.range(b)} for one store in leased space of about 1,200 to 1,600 square feet. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to the franchisor or its affiliates, including the ${K.usd(b.feeLow)} fee and the $15,500 Brand Launch Program. No real estate purchase is included.` },
    { q: "What is the total marketing spend required at Marco's Pizza?", a: `At least 7 % of net royalty sales. Today ${K.rate(b.adPct)} goes to the Brand Development Fund and National Advertising Fund; a regional fund of 0.5 % to 1.20 % applies in some markets. Whatever is left to reach 7 % must be spent on local store marketing. The calculator includes only the ${K.rate(b.adPct)}.` },
    { q: "Do Marco's Pizza stores make over a million dollars in sales?", a: `Some do. Item 19 reports that 297 of ${K.num(b.i19.count!)} franchised stores open the full 2025 fiscal year had net royalty sales above $1,000,000. The average was ${K.usd(K.i19(b)!)} and the median ${K.usd(b.i19.median!)}. These are sales before any cost, not profit, and they say nothing certain about a new store.` },
  ],
  related: ['brand:papa-johns', 'brand:dominos', 'brand:little-caesars', 'franchise-break-even'],
});
