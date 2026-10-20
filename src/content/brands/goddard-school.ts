import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('goddard-school');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const avg = K.i19(b)!;
const e = K.eco('goddard-school');
const pr = K.B('primrose');
const ma = K.B('mathnasium');

export default defineBrand({
  slug: 'goddard-school',
  title: `Goddard School Franchise Cost 2026: $${b.feeLow / 1000}K Fee and EBITDA`,
  description: `Goddard School franchise cost in 2026: ${K.range(b)} in a leased building, ${K.usd(b.toFrLow!)} or more paid to the franchisor, ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} marketing.`,
  intro: `The Goddard School range assumes a landlord builds the school; buying the land and building moves the estimate into the millions.`,
  resume: `Goddard Franchisor LLC estimates ${K.range(b)} to open one Goddard School of 10,000 to 12,500 square feet when the franchisee leases the building and the landlord constructs the improvements, in the disclosure document issued ${K.day(b.issued)}. A large part goes to the franchisor before the first child enrolls: ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, including the ${K.usd(b.feeLow)} initial license fee, an opening support fee, an initial marketing fee and a site development fee. The school then pays a royalty of ${K.rate(b.royPct)} and a marketing fee of ${K.rate(b.adPct)} of gross receipts, plus a curriculum fee of ${K.usd(b.fixedYear)} a year. Item 19 reports average gross revenue of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} schools open more than 18 months in ${b.i19.period}, with average EBITDA of ${K.rate(b.i19.profitPct)}. All ${K.num(b.units.total!)} schools in Item 20 are franchised.`,
  body: (h) => `
<h2>Three ways to house a school</h2>
<p>Item 7 gives three totals. The one on this page, ${K.range(b)}, is for a leased building whose landlord pays for the improvements. If the franchisee leases a building that needs work, the estimate is $1,736,500 to $5,032,000. Buying the land and putting up the building runs $5,493,500 to $8,908,000. The franchisor or an affiliate may also lease or sublease the premises to the franchisee, and the document says that rent may be higher than what it pays the main landlord. That arrangement is optional, but a buyer offered it should compare the two rents.</p>
<h2>Paid to Goddard before opening</h2>
<p>The license fee of ${K.usd(b.feeLow)} starts with a $30,000 deposit at the preliminary agreement. Three more payments follow: $35,000 to $42,000 for initial training and opening support, $55,000 to $75,000 as an initial marketing fee, and a $35,000 site development fee, with background checks at $1,500 a person. The fee is lower in some cases: $115,000 for veterans, $60,000 for an existing franchisee adding a new school, which also pays a reduced royalty of 2 %, 4 % and then 6 % during its first year, and $40,000 for a buyer of an existing school.</p>
<h2>Fees once the doors open</h2>
<p>The ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} marketing fee apply to gross receipts each month, including any annex. On the Item 19 average that is ${K.usd(e.y.royalty + e.y.ad)} a year, plus ${K.usd(b.fixedYear)} for the Wonder of Learning curriculum ($700 a month). Local marketing is extra and has no fixed amount. The franchisor estimates insurance at about $13,300 to $65,800 a year, workers' compensation not included, and a required convention costs $2,000 per person.</p>
${h.mini('compare', { t: 'Goddard School next to Mathnasium at the same margin', p: ['m', 'at'], d: { a: 'goddard-school', c2: 'mathnasium', c3: 'none' } })}
<h2>Item 19: revenue and EBITDA of mature schools</h2>
<p>The table covers the ${K.num(b.i19.count!)} schools open more than 18 months with usable data; 270 of them, 43.5 %, beat the average of ${K.usd(avg)}. Revenue ran from ${K.usd(o('Lowest Gross'))} to ${K.usd(o('Highest Gross'))}, and the 2024 average was ${K.usd(o('596 Mature'))}. Average EBITDA was ${K.usd(o('Average EBITDA (dollar'))}, ${K.rate(b.i19.profitPct)} of revenue, and the median ${K.usd(o('Median EBITDA (dollar'))}. Payroll took ${K.rate(o('Payroll'))} and occupancy ${K.rate(o('Occupancy'))}. Royalties and marketing fees sit inside a miscellaneous line, so EBITDA is after them; it is before interest and depreciation, which on a seven-figure build-out can be large. The 37 newer schools are shown apart, many with negative EBITDA. The calculator's margin is before franchise fees and is your own estimate, ${K.rate(K.P.calc.defaultMarginPct)} by default, which gives ${K.usd(e.y.cashBeforeDebt)} a year at the middle of the range.</p>
<h2>Other childcare and education brands</h2>
<p>Primrose Schools estimates ${K.range(pr)} for a new ground-up school, land excluded, with a fee of ${K.usd(pr.feeLow)}, and prints no all-school sales average. ${h.a('brand:mathnasium', 'Mathnasium')}, a tutoring center, costs ${K.range(ma)} and averages ${K.usd(K.i19(ma)!)} in receipts. Selling a Goddard School costs the seller $5,000; the buyer pays $40,000, $25,000 for training and $15,000 for marketing.</p>
`,
  faqs: [
    { q: 'How much is paid to Goddard before a new school opens?', a: `Item 7 puts the payments to the franchisor or an affiliate at ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}. They include the ${K.usd(b.feeLow)} license fee, $35,000 to $42,000 for training and opening support, an initial marketing fee of $55,000 to $75,000 and a $35,000 site development fee. Background checks cost $1,500 per person.` },
    { q: 'What does it cost to buy the land and build a Goddard School?', a: `When the franchisee buys the land and constructs the building, Item 7 estimates $5,493,500 to $8,908,000. Leasing a building that needs improvements is estimated at $1,736,500 to $5,032,000. The lowest option, ${K.range(b)}, assumes a lease where the landlord pays for the construction of the school.` },
    { q: 'Is the Goddard School EBITDA in Item 19 after royalties?', a: `Yes. Royalties and marketing fees are included in a miscellaneous expense line, so the average EBITDA of ${K.usd(o('Average EBITDA (dollar'))}, ${K.rate(b.i19.profitPct)} of revenue, is after them. It is before interest, taxes, depreciation and amortization, so loan payments on the build-out are not deducted. Expenses are reported on a cash basis and are not audited.` },
  ],
  related: ['brand:mathnasium', 'franchise-loan', 'item-19-franchise-earnings', 'best-franchises-to-own'],
});
