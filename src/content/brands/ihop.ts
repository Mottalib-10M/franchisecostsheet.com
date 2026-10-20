import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('ihop');
const dn = K.B('dennys');
const ab = K.B('applebees');
const o = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const hi = o('Highest');
const lo = o('Lowest');
const prev = o('2024');
const mw = o('Midwest');
const ne = o('Northeast');
const sales = Math.round(K.i19(b)!);
const ten = K.tool('fees', { sales, roy: b.royPct!, ad: b.adPct!, fee: b.feeLow, yrs: 10 });

export default defineBrand({
  slug: 'ihop',
  title: 'IHOP Franchise Cost 2026: 2700 Prototype, Fees and Sales',
  description: `IHOP franchise cost in 2026: ${K.range(b)} for a 2700 prototype, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} ad fee and Item 19 sales by region and format.`,
  intro: `IHOP prices one freestanding prototype, publishes no all-unit average, and offers existing restaurants under a program where an affiliate is often the landlord.`,
  resume: `Building a single IHOP restaurant on the 2700 Prototype, a freestanding 2,700 square foot building, is estimated at ${K.range(b)} in the disclosure document issued ${K.day(b.issued)} and amended ${K.day(b.amended!)}. Real estate is not included. Initial payments to IHOP under a Single Store Development Agreement come to ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, of which the franchise fee is ${K.usd(b.feeLow)}. Once open, the restaurant is billed every week for a royalty of ${K.rate(b.royPct)} and a national advertising fee of ${K.rate(b.adPct)} of total gross sales, ${K.rate(K.pctFees(b))} together, and no local advertising fee is currently required. Item 19 gives no single average for all restaurants; its freestanding row shows annualized average sales of ${K.usd(K.i19(b)!)} for ${K.num(b.i19.count!)} franchised restaurants in 2025, against ${K.usd(prev)} the year before. Item 20 lists ${K.num(b.units.total!)} traditional restaurants at the end of ${b.units.year}.`,
  body: (h) => `
<h2>Initial payments beyond the ${K.usd(b.feeLow)} fee</h2>
<p>The gap between the fee and the ${K.usd(b.toFrHigh!)} that may go to IHOP before opening comes from other charges. A $15,000 Location Fee is credited against the franchise fee. The franchisor also bills an Opening Training Support Fee of $0 to $65,000 and $3,500 to $9,000 to set up the point of sale. Other paths carry other prices: a Dual Branded restaurant pays a $35,000 fee, a multi-store developer pays a $20,000 development fee per restaurant plus a $40,000 franchise fee, and taking over an existing IHOP under the Purchase Program costs $0 to $300,000 up front. The document says IHOP may reduce or waive these fees.</p>
<h2>When an IHOP affiliate is the landlord</h2>
<p>Under the Purchase Program the franchisee usually subleases the land and the building from an IHOP affiliate and leases the equipment from IHOP. The document states that it is the custom of the affiliates to charge rentals exceeding both the base rent and the percentage rent they pay to the master landlord. That rent is not part of the royalty, so the calculator does not see it; a buyer of an existing restaurant should add it to the fixed costs in the margin field. Non-traditional venues, 51 of them franchised in 2025, are sold under a separate disclosure document.</p>
<h2>Ten years of fees at the average</h2>
<p>At the freestanding average of ${K.usd(sales)} and flat sales, royalty and advertising come to ${ten.sub.replace(', at flat sales.', '')}; with the fee, that is ${ten.value} over ten years. Item 6 adds technology lines on top: a help desk at $1,900 to $2,500 a year, Tray POS software at $2,900 to $4,000, encryption services at $1,300 to $4,500, and 15 % of the redeemed value of national gift cards.</p>
${h.mini('fees', { t: 'IHOP: royalty and advertising over the years', p: ['sales', 'yrs'], d: { sales, roy: b.royPct!, ad: b.adPct!, fee: b.feeLow, yrs: 10 } })}
<h2>How Item 19 is cut</h2>
<p>The figures are annualized, include the 33 restaurants opened in 2025 and exclude the 145 restaurants subfranchised to Sunshine Restaurant Partners, LP, as well as non-traditional and Dual Branded units. Freestanding sales ranged from ${K.usd(lo)} to ${K.usd(hi)}. By region, the Northeast averaged ${K.usd(ne)} and the Midwest ${K.usd(mw)}. The sales are taken from unaudited royalty reports and say nothing about costs.</p>
<h2>IHOP beside two other breakfast and dining chains</h2>
<p>${h.a('brand:dennys', "Denny's")} needs ${K.range(dn)} and charges ${K.rate(dn.royPct)} plus ${K.rate(dn.adPct)}, while ${h.a('brand:applebees', "Applebee's")} asks ${K.range(ab)} with ${K.rate(ab.royPct)} plus ${K.rate(ab.adPct)}. IHOP lost ${K.num(-b.units.franchisedNetChange!)} franchised restaurants in 2025 and now runs ${K.num(b.units.company!)} itself, up from none. Read the ${h.fdd('ihop')} before signing.</p>
`,
  faqs: [
    { q: 'What is the total investment for an IHOP restaurant?', a: `Item 7 estimates ${K.range(b)} for a single 2700 Prototype restaurant, a ground-up freestanding building of about 2,700 square feet, without real estate. That total includes ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of initial fees paid to IHOP, among them the ${K.usd(b.feeLow)} franchise fee and an opening training support fee of up to $65,000.` },
    { q: 'How much are IHOP royalty and advertising fees?', a: `IHOP bills a royalty of ${K.rate(b.royPct)} and a national advertising fee of ${K.rate(b.adPct)} of total gross sales each week, ${K.rate(K.pctFees(b))} in all. There is currently no required local advertising fee, and joining a cooperative is optional. Help desk, point of sale and encryption services are billed separately every year.` },
    { q: 'Does IHOP publish average restaurant sales?', a: `Yes, but split by format and region rather than as one figure. Franchised freestanding restaurants averaged ${K.usd(K.i19(b)!)} in annualized gross sales in 2025, down from ${K.usd(prev)} in 2024, with a median of ${K.usd(b.i19.median!)}. The lowest freestanding restaurant sold ${K.usd(lo)} and the highest ${K.usd(hi)}.` },
    { q: 'Can I buy an existing IHOP instead of building one?', a: 'Yes, through the Purchase Program, where the up-front fee ranges from $0 to $300,000. In that case the franchisee typically subleases the land and building from an IHOP affiliate and leases equipment from IHOP, and the document says the affiliates customarily charge rent above what they themselves pay to the master landlord.' },
  ],
  related: ['brand:dennys', 'brand:applebees', 'franchise-for-sale', 'franchise-disclosure-document'],
});
