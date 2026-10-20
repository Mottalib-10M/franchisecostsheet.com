import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('pizza-hut');
const e = K.eco('pizza-hut');
const dom = K.B('dominos');
const lost = -(b.units.franchisedNetChange ?? 0);

export default defineBrand({
  slug: 'pizza-hut',
  title: 'Pizza Hut Franchise Cost 2026: Fees, Sales and Closures',
  description: `Pizza Hut franchise cost in 2026: ${K.range(b)} before real estate, a ${K.usd(b.feeLow)} fee, a ${K.rate(b.royPct)} service fee, ${K.rate(b.adPct)} ad fund and average Item 19 sales.`,
  intro: `Pizza Hut prices a full dine-in and delivery restaurant, not a small carry-out shop, and the franchise network shrank in 2025. Item 19 gives average sales for mature restaurants.`,
  resume: `Opening a new Pizza Hut, either a Restaurant Based Delivery unit or a Delivery Based Restaurant, costs ${K.range(b)} excluding real property, according to Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)}. Only ${K.usd(b.toFrLow!)} of that is paid to Pizza Hut: the initial franchise fee, which may rise each year with inflation. The restaurant then pays a Monthly Service Fee, the royalty, of ${K.rate(b.royPct)} of gross sales (${K.rate(b.royPctHigh!)} in some cases), ${K.rate(b.adPct)} to the System Advertising Fund and a ${K.usd(b.fixedYear)} technology fee each year. Item 19 reports that ${K.num(b.i19.count!)} mature franchised restaurants averaged ${K.usd(K.i19(b)!)} of gross sales in fiscal 2025, median ${K.usd(b.i19.median!)}. Franchised restaurants fell by ${K.num(lost)} during ${b.units.year} to ${K.num(b.units.franchised!)}, and more closures followed in early 2026 under the Hut Forward Agreement.`,
  body: (h) => `
<h2>A restaurant, not a counter</h2>
<p>The ${K.usd(b.invLow)} to ${K.usd(b.invHigh)} estimate covers a dine-in, delivery and carryout restaurant in one of two formats, RBD or DBR, and leaves real property out. Some restaurants are leased from the affiliate Pizza Hut of America, LLC, but the document prints no rent formula for them. Because only the ${K.usd(b.feeLow)} fee goes to Pizza Hut before opening, almost the whole budget is build-out, equipment and working capital bought from third parties. The fee, paid in full on signing and not refundable, includes initial training for the first qualified operator; existing franchisees in the ACE incentive program had it waived, but enrollment has closed.</p>
<h2>The Monthly Service Fee</h2>
<p>Pizza Hut's royalty goes by the name Monthly Service Fee: ${K.rate(b.royPct)} of gross sales, due by the 20th of the following month, or ${K.rate(b.royPctHigh!)} "under certain circumstances" that Item 6 does not spell out, and the document adds that the fee is not uniformly imposed. Advertising is ${K.rate(b.adPct)} of gross sales, paid as dues to the franchisee association IPHFHA and credited to the System Advertising Fund, so it is not paid twice. The ${K.usd(b.fixedYear)} technology fee may rise by up to 12 % a year. A digital innovation fee of $0.41 per digital transaction and a Dragontail delivery fee of $75 a month, suspended in the first quarter of 2026, are not in the calculator.</p>
<p>Two clauses matter if things go badly. Closing without authorization costs 24 times the average Monthly Service Fee. A transfer costs $2,500 plus $250 per restaurant.</p>
${h.mini('roi', { t: 'Pizza Hut: payback at your margin', p: ['m', 'at', 'lf'], d: { b: 'pizza-hut', at: 'low' } })}
<h2>Mature restaurants, three formats</h2>
<p>The Item 19 average of ${K.usd(K.i19(b)!)} covers mature franchised restaurants open at least a year in fiscal 2025, across the Dine-In or Red Roof, RBD and Delco formats; 43.4 % of them beat it and the range ran from $233,001 to $3,050,083. Dine-In and RBD restaurants averaged $1,037,823, delivery and carry-out Delco units $937,342. The year before, the average across 5,059 restaurants was $1,024,898. One gap matters: the figures exclude DBR units, so one of the two formats this range describes has no sales figure. At the calculator's ${K.rate(K.P.calc.defaultMarginPct)} default margin, your own estimate, the payback reads ${K.dec(e.pay!)} years on the middle of the range.</p>
<h2>A network in retreat</h2>
<p>Item 20 shows ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(lost)} fewer franchised units than a year before. Under the Hut Forward Agreement of January 5, 2026, qualified existing franchisees may close up to 10 % of their restaurants, and 127 franchised restaurants ceased operations between December 30, 2025 and March 6, 2026. The document also states that in November 2025 YUM said it was exploring strategic options for Pizza Hut, possibly a sale. ${h.a('brand:dominos', "Domino's")} costs ${K.range(dom)} for a leased delivery store and added franchised units over the same year. Restaurants for sale are covered on the ${h.a('franchise-for-sale', 'resale page')}.</p>
`,
  faqs: [
    { q: 'How much is a Pizza Hut franchise in 2026?', a: `Item 7 of the ${b.issued.slice(0, 4)} document estimates ${K.range(b)} for a new RBD or DBR restaurant, excluding the real estate. Of that, ${K.usd(b.toFrLow!)} goes to Pizza Hut as the initial fee. The rest pays for construction, equipment, signs, opening inventory and working capital bought from other suppliers.` },
    { q: 'What is the Pizza Hut Monthly Service Fee?', a: `It is the royalty: ${K.rate(b.royPct)} of gross sales, paid monthly by the 20th, or ${K.rate(b.royPctHigh!)} in circumstances the document does not detail. On top, franchisees pay ${K.rate(b.adPct)} of gross sales to the advertising fund through the IPHFHA association, plus a yearly technology fee of ${K.usd(b.fixedYear)}.` },
    { q: 'How many Pizza Hut restaurants closed recently?', a: `Franchised restaurants fell from 5,214 to ${K.num(b.units.franchised!)} during ${b.units.year}, according to Item 20. The document adds that 127 franchised restaurants ceased operations between December 30, 2025 and March 6, 2026, after the Hut Forward Agreement let qualified franchisees close up to 10 % of their units.` },
  ],
  related: ['brand:dominos', 'brand:papa-johns', 'franchise-for-sale', 'franchise-royalty-fees'],
});
