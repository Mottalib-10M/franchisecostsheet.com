import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('freddys');
const cu = K.B('culvers');
const so = K.B('sonic');
const o = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const stand = o('435 franchised Stand Alone');
const co = o('35 company-owned Restaurants, 2025');
const ebitdaFr = o('4-Wall EBITDA in dollars, average of 42 franchised');
const pctCo = o('4-Wall EBITDA as % of gross receipts, average of 7 company-owned');
const e = K.eco('freddys');

export default defineBrand({
  slug: 'freddys',
  title: "Freddy's Franchise Cost 2026: Standalone Unit, Fees, Sales",
  description: `Freddy's franchise cost in 2026: ${K.range(b)} for a standalone drive-thru, a ${K.usd(b.feeLow)} license fee, ${K.rate(b.royPct)} royalty, a marketing fund of 2.5 % then ${K.rate(b.adPct)}.`,
  intro: `Freddy's Frozen Custard & Steakburgers offers three building types, charges a construction advisory fee on the first restaurant, and raised its marketing fund rate in October 2026.`,
  resume: `Freddy's, L.L.C. estimates in its disclosure document of ${K.day(b.issued)} that a standalone Freddy's Frozen Custard & Steakburgers restaurant, freestanding with a drive-thru and about 3,000 square feet, costs ${K.range(b)} to open, land purchase excluded. The cover page states that ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of the investment is paid to the franchisor, starting with the ${K.usd(b.feeLow)} license fee. The restaurant pays a royalty of ${K.rate(b.royPct)} of gross receipts weekly, plus ${K.rate(b.adPct)} to the national marketing fund at issuance, a rate the document raises to ${K.rate(b.adPctHigh)} as of October 8, 2026. Item 19 reports average annual gross receipts of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised restaurants open all of fiscal 2025, and a profit figure only for in-line and end-cap units. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(b.units.franchised!)} of them franchised.`,
  body: (h) => `
<h2>Standalone, end-cap or in-line</h2>
<p>The page uses the standalone range, the format with a drive-thru. Item 7 also prices an end-cap restaurant at $1,026,334 to $2,361,000 and an in-line restaurant at $854,834 to $1,301,000, though the Item 7 table itself totals the in-line high end at $1,302,000. All three leave out the purchase of land. Of the ${K.num(b.i19.count!)} restaurants in Item 19, 435 are standalone, and they averaged ${K.usd(stand)}, close to the overall figure.</p>
<h2>The construction advisory fee</h2>
<p>For a first restaurant, Freddy's requires a $35,000 non-refundable Construction Advisory Services fee. Item 7 places it within construction costs, and the cover statement of ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} paid to the franchisor appears not to include it, so the real amount paid to Freddy's before opening can be higher than that line suggests. Grand opening training adds an estimated $20,000 to $60,000. Veterans get 25 % off the license fee for their first restaurant only, and a development agreement costs $15,000 per restaurant plus a $20,000 license fee deposit.</p>
<h2>Fees after opening</h2>
<p>The royalty of ${K.rate(b.royPct)} is paid weekly within 28-day operating periods, as is a technology support fee of $100 per period, ${K.usd(b.fixedYear)} a year. The national marketing fund moves from 2.5 % to ${K.rate(b.adPct)} as of October 8, 2026, so a restaurant opening now pays the higher rate, and the calculator uses it. Local advertising of up to 2 % of gross receipts may be required, and a cooperative could take up to 2 % more if one is set up; none exists yet.</p>
${h.mini('compare', { t: "Freddy's against two other drive-thru brands", p: ['m'], d: { a: 'freddys', c2: 'culvers', c3: 'sonic' } })}
<h2>A margin printed for the smaller formats only</h2>
<p>The 42 franchised end-cap and in-line restaurants that supplied profit and loss statements averaged ${K.usd(ebitdaFr)} of 4-wall EBITDA, ${K.dec(b.i19.profitPct!)} % of gross receipts, with royalty and marketing included in costs. Seven company end-cap and in-line restaurants reached ${K.dec(pctCo)} %, and the 35 company restaurants averaged ${K.usd(co)} in gross receipts, more than franchised ones. No profit line is published for franchised standalone restaurants, the format priced above. The ${K.rate(K.P.calc.defaultMarginPct)} starting margin in the calculator is measured before fees and is your estimate to change; with it, the average gives ${K.usd(e.y.cashBeforeDebt)} a year.</p>
<h2>Compared with Culver's and Sonic</h2>
<p>Culver's prices a restaurant with land and building at ${K.range(cu)}; Sonic asks ${K.range(so)} in a leased scenario, with ${K.rate(so.royPct)} plus ${K.rate(so.adPct)}. Freddy's added ${K.num(b.units.franchisedNetChange!)} franchised restaurants in ${b.units.year}. Item 19 counts 475 franchised restaurants open the full year in its text and 477 in its tables. The ${h.fdd('freddys')} has the detail by format, and ${h.a('fast-food-franchise-cost', 'the fast food cost page')} sets the burger brands side by side.</p>
`,
  faqs: [
    { q: "What does it cost to open a Freddy's Frozen Custard & Steakburgers?", a: `Item 7 estimates ${K.range(b)} for a standalone restaurant with a drive-thru, $1,026,334 to $2,361,000 for an end-cap unit and $854,834 to $1,301,000 for an in-line unit, land excluded in every case. A first restaurant also requires a $35,000 construction advisory fee paid to the franchisor.` },
    { q: "Is there a veteran discount on the Freddy's license fee?", a: `Yes. Under the Freddy Simon Salute to Veterans Program, a veteran pays 25 % less than the standard ${K.usd(b.feeLow)} license fee, for the first restaurant only. The program is written for the license fee; the document lists the construction advisory fee and grand opening training costs of $20,000 to $60,000 without a veteran discount.` },
    { q: "What is the Freddy's marketing fund rate in 2026?", a: `The national marketing and advertising fund took 2.5 % of gross receipts when the document was issued and ${K.rate(b.adPct)} as of October 8, 2026. Local advertising may be required up to 2 %, and a cooperative could add up to 2 % if one is created. The royalty stays at ${K.rate(b.royPct)}.` },
    { q: "How much profit do Freddy's restaurants report?", a: `Only the 42 franchised end-cap and in-line restaurants that sent profit and loss statements are covered: their average 4-wall EBITDA was ${K.usd(ebitdaFr)}, ${K.dec(b.i19.profitPct!)} % of gross receipts, in 2025. The document publishes no profit for franchised standalone restaurants, and the figure excludes interest, depreciation and above-restaurant management.` },
  ],
  related: ['fast-food-franchise-cost', 'compare-franchises', 'franchise-fee', 'brand:buffalo-wild-wings'],
});
