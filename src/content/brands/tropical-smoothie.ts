import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('tropical-smoothie');
const e = K.eco('tropical-smoothie');
const cr = K.B('crumbl');
const du = K.B('dunkin');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;

export default defineBrand({
  slug: 'tropical-smoothie',
  title: 'Tropical Smoothie Cafe Franchise Cost 2026: Fees and Sales',
  description: `Tropical Smoothie Cafe franchise cost in 2026: ${K.range(b)} for a strip center cafe, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty and ${K.usd(x19)} average yearly sales.`,
  intro: `Tropical Smoothie Cafe has the lowest Item 7 range of the treat and coffee brands written up here, and its Item 19 goes back three years, which few documents do.`,
  resume: `TSC Franchisor, LLC estimates in its disclosure document of ${K.day(b.issued)}, amended ${K.day(b.amended!)}, that one Tropical Smoothie Cafe of 1,200 to 1,900 square feet, end-cap or in-line in a strip center, leased and without a drive-thru, costs ${K.range(b)} to open. ${K.usd(b.toFrLow!)} of that goes to the franchisor or its affiliate: the ${K.usd(b.feeLow)} franchise fee and a $10,000 grand opening marketing contribution. Each week the cafe pays a royalty of ${K.rate(b.royPct)} of gross sales and a national marketing fee of ${K.rate(b.adPct)}, which may rise to ${K.rate(b.adPctHigh)}. Item 19 reports average net revenue of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised traditional cafes open at least a full year in 2025. Item 20 counts ${K.num(b.units.total!)} cafes at the end of ${b.units.year}, all but ${K.num(b.units.company!)} franchised, ${K.num(b.units.franchisedNetChange!)} more than a year before.`,
  body: (h) => `
<h2>The cafe behind the estimate</h2>
<p>The ${K.range(b)} is a leased strip center cafe with no drive-thru. Adding a drive-thru costs approximately $40,000 to $60,000 more. Leasehold improvements in Item 7 are counted net of a tenant improvement allowance averaging $44,000, so a landlord who pays less pushes the real cost up. Self-service ordering kiosks are to come in the first quarter of 2027, at an estimated $10,000 to $15,000 up front and $200 to $300 a month, and they are not in the Item 7 total.</p>
<h2>Fee discounts</h2>
<p>The ${K.usd(b.feeLow)} fee applies to the first cafe; each additional one is $25,000, and qualified veterans pay $17,500 for the first and every later cafe. The document reports fees from $1.00 to $35,000 actually charged in 2025. The $10,000 grand opening contribution is required of first-time franchisees. A note in the record: the low end of the Item 7 table is built with the veterans' fee and the $5,000 grand opening spend of an existing franchisee, while the cover counts the full ${K.usd(b.toFrLow!)}; a first-time buyer should start from the cover figure.</p>
<h2>${K.rate(K.pctFees(b))} of sales, then the software</h2>
<p>Royalty and national marketing come to ${K.rate(K.pctFees(b))} of gross sales today. Part of the marketing fee may be routed to a local cooperative if one is required, rather than added on top. The calculator also counts ${K.usd(b.fixedYear)} a year of monthly subscriptions: back-of-house software at $179, digital ordering at $54 and the loyalty platform at $75, after a $145 implementation fee. Gift card transactions cost $0.16 each or $18 a month, whichever is less. The franchisor may raise technology fees to its cost plus up to 20 %.</p>
${h.mini('roi', { t: 'Tropical Smoothie Cafe: sales and margin', p: ['sb', 'so', 'm'], d: { b: 'tropical-smoothie', sb: 'own', so: oth(/bottom 25%/) } })}
<h2>Three years of revenue</h2>
<p>The 2025 average of ${K.usd(x19)} compares with ${K.usd(oth(/Average Net Revenue, all 1,268/))} across 1,268 cafes in 2024 and ${K.usd(oth(/2023/))} across 1,151 in 2023: flat in dollars while the network grew. The top tenth averaged ${K.usd(oth(/top 10%/))}, the top quarter ${K.usd(oth(/top 25%/))} and the bottom quarter ${K.usd(oth(/bottom 25%/))}; the simulator above starts from that bottom quarter so you can see the low side. Individual cafes ranged from $270,301 to $3,386,973, and 643, 45 %, reached the average. Non-traditional sites and cafes open less than a year are excluded, and no cost is printed. At the starting margin of ${K.rate(K.P.calc.defaultMarginPct)}, an assumption you should replace, the middle of the range pays back in ${K.dec(e.pay!)} years.</p>
<h2>Next to Crumbl and Dunkin'</h2>
<p>${h.a('brand:crumbl', 'Crumbl')} reports ${K.usd(K.i19(cr)!)} on a ${K.range(cr)} investment, with an ${K.rate(cr.royPct)} royalty. ${h.a('brand:dunkin', "Dunkin'")} reports ${K.usd(K.i19(du)!)} for a freestanding budget of ${K.range(du)}. Tropical Smoothie Cafe asks the least of the three to open.</p>
`,
  faqs: [
    { q: 'What is the total investment for a Tropical Smoothie Cafe?', a: `Item 7 estimates ${K.range(b)} for a leased end-cap or in-line cafe in a strip center, without a drive-thru. ${K.usd(b.toFrLow!)} of it goes to the franchisor: the ${K.usd(b.feeLow)} fee and a $10,000 grand opening contribution. A drive-thru adds about $40,000 to $60,000.` },
    { q: 'Do veterans get a lower Tropical Smoothie Cafe franchise fee?', a: `Yes. Qualified veterans pay $17,500 for the first cafe and for each later one, instead of ${K.usd(b.feeLow)} for a first cafe. Other franchisees pay $25,000 for each additional cafe. The document notes that fees charged in 2025 ranged from $1.00 to $35,000.` },
    { q: 'How much does a Tropical Smoothie Cafe make in revenue?', a: `Item 19 reports average net revenue of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} in 2025 for ${K.num(b.i19.count!)} franchised traditional cafes open at least a year. The bottom quarter averaged ${K.usd(oth(/bottom 25%/))}. Revenue is all the document gives: no costs and no profit, so the margin stays your estimate.` },
  ],
  related: ['brand:crumbl', 'brand:dunkin', 'cheapest-franchises', 'item-19-franchise-earnings'],
});
