import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('dominos');
const e = K.eco('dominos');
const pj = K.B('papa-johns');
const ph = K.B('pizza-hut');
const shareLow = b.toFrLow! / b.invLow;

export default defineBrand({
  slug: 'dominos',
  title: "Domino's Franchise Cost 2026: Fees, Royalty and Weekly Sales",
  description: `Domino's franchise cost in 2026: ${K.range(b)} for a leased store, a fee of ${K.fee(b)}, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} ad fund and weekly sales in Item 19.`,
  intro: `Domino's publishes its sales per week, not per year, along with profit margins by sales band. The calculator turns the weekly average into a yearly figure by multiplying it by 52.`,
  resume: `A Domino's Pizza Traditional Store, a leased delivery and carry-out shop, costs ${K.range(b)} under Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)} and amended on ${K.day(b.amended!)}. An unusually large part, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, is paid to Domino's and its affiliates, because equipment, the opening inventory and the store's point of sale system come from them. The initial fee itself ranges from ${K.fee(b)} and is often reduced or waived. Every week the store pays a royalty of ${K.rate(b.royPct)} of royalty sales and ${K.rate(b.adPct)} to the national advertising fund. Item 19 reports average weekly unit sales of $27,267 for franchised stores open all of 2025, which comes to ${K.usd(K.i19(b)!)} over 52 weeks. Item 20 counts ${K.num(b.units.franchised!)} franchised traditional stores at the end of ${b.units.year}, ${K.num(b.units.franchisedNetChange!)} more than a year earlier.`,
  body: (h) => `
<h2>Most of the money stays in the system</h2>
<p>For a store at the low end of the range, about ${K.pct(shareLow, 0)} of the investment goes to Domino's or an affiliate. The supply chain arm, DPD, sells most of the equipment, inventory and supplies, and the affiliate DPL licenses the required Domino's PULSE point of sale: $4,200 for the initial license and $15,000 to $25,000 for hardware and software. The site is leased, so the range contains no real estate. A franchisee building a store pays an initial fee of up to $10,000, generally not billed until the store is operating and open to incentive waivers; training costs up to $1,250. Buying an existing store instead carries a $1,500 transfer fee.</p>
<h2>Weekly fees, weekly sales</h2>
<p>The royalty of ${K.rate(b.royPct)} and the advertising fund contribution of ${K.rate(b.adPct)} are both computed on each week's royalty sales, which exclude sales taxes and approved discounts. Local advertising cooperatives can add 1 % to 4 %, and Domino's may require at least 2 %; national and local together are capped at 9 %. The calculator counts ${K.usd(b.fixedYear)} of fixed yearly fees: the PULSE software enhancement fee of $819.25 after the first year, $432 for recruiting software and $280 for network licensing. Per-order charges, $0.385 per digital order and $0.0525 per card transaction, are not in it, nor the PULSE maintenance estimate of up to $7,000 a year on average.</p>
${h.mini('compare', { t: "Domino's next to two other pizza brands", p: ['m', 'at'], d: { a: 'dominos', c2: 'papa-johns', c3: 'pizza-hut' } })}
<h2>Reading the weekly Item 19</h2>
<p>The document prints no annual figure. Franchised traditional stores open the full twelve months of 2025 averaged $27,267 a week and the median store $26,059; ${K.num(b.i19.count!)} stores are behind the average and half of franchised stores met or beat it. Company-owned stores averaged $26,728. Times 52, the average becomes the ${K.usd(K.i19(b)!)} used by the calculator and the median ${K.usd(b.i19.median!)}. The weekly average has risen from $26,004 in 2021 to $27,267, with $26,467 in 2024.</p>
<p>Domino's also prints EBITDA as a share of royalty sales, from franchisee profit and loss statements, after royalty and advertising and including supply chain profit sharing rebates. Stores selling $25,001 to $30,000 a week earned 11.8 %; those above $30,000, 14.4 %; those under $15,000, 1.5 %. The ${K.rate(K.P.calc.defaultMarginPct)} default margin in the calculator is measured before franchise fees and is only a starting point you set. With it, the payback on a mid-range store reads ${K.dec(e.pay!)} years.</p>
<h2>Counts that do not quite match</h2>
<p>Item 20 lists traditional stores only, ${K.num(b.units.total!)} in all with ${K.num(b.units.company!)} company-owned, plus 26 franchised non-traditional outlets. The EBITDA section refers to 6,896 franchised stores at the end of 2025, a figure that matches neither count. Against ${h.a('brand:papa-johns', 'Papa Johns')}, which quotes ${K.range(pj)}, and ${h.a('brand:pizza-hut', 'Pizza Hut')}, at ${K.range(ph)}, Domino's has the lowest entry point of the three and the highest printed sales.</p>
`,
  faqs: [
    { q: "How much does it cost to open a Domino's store?", a: `Item 7 estimates ${K.range(b)} for a Traditional Store in leased space. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of it is paid to Domino's and its affiliates for equipment, inventory, the point of sale system and the initial fee. No land or building purchase is included.` },
    { q: "Why are Domino's sales printed per week?", a: `Domino's reports average weekly unit sales, or AWUS, in Item 19, the way it tracks its stores. The 2025 average for franchised traditional stores open all year was $27,267 and the median $26,059. This site multiplies by 52 to compare with brands that print a yearly figure, giving ${K.usd(K.i19(b)!)}.` },
    { q: "What profit margin do Domino's franchisees report?", a: `Item 19 gives EBITDA as a share of royalty sales by sales band for 2025: 11.8 % for stores selling $25,001 to $30,000 a week, 14.4 % above $30,000 and 1.5 % below $15,000. That is after royalty and advertising and includes supply chain rebates. It is not a promise for any new store.` },
    { q: "Is the Domino's franchise fee ever zero?", a: `Yes. Item 5 prints an initial fee of ${K.fee(b)}: up to $10,000 when you build a store, and it may be waived in whole or in part under incentive programs. It is generally billed only once the store is operating. A training fee of up to $1,250 is separate.` },
  ],
  related: ['brand:papa-johns', 'brand:pizza-hut', 'item-19-franchise-earnings', 'cheapest-franchises'],
});
