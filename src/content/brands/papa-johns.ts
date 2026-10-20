import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('papa-johns');
const e = K.eco('papa-johns');
const dom = K.B('dominos');
const mp = K.B('marcos-pizza');

export default defineBrand({
  slug: 'papa-johns',
  title: 'Papa Johns Franchise Cost 2026: Fees, Dough and Sales',
  description: `Papa Johns franchise cost in 2026: ${K.range(b)} for a standard restaurant, a fee of ${K.fee(b)}, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} marketing fund, sales.`,
  intro: `Papa Johns charges one of the higher marketing contributions in pizza until the end of 2029 and requires its dough and sauce to come from its own food service affiliate. Its Item 19 reports sales by quartile.`,
  resume: `A standard Papa Johns restaurant in leased space in a shopping or strip center costs ${K.range(b)} under Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)}, the same range as a Small-Town restaurant. For a standard unit, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} is paid to Papa Johns or its affiliate. The initial fee runs from ${K.fee(b)} depending on incentives, and a development agreement is required even for one restaurant. Each month the restaurant pays a royalty of ${K.rate(b.royPct)} of net sales, which Papa Johns may raise to ${K.rate(b.royPctHigh!)}, and ${K.rate(b.adPct)} to the marketing fund until December 30, 2029. Item 19 reports that ${K.num(b.i19.count!)} standard franchised restaurants open all of 2025 averaged ${K.usd(K.i19(b)!)} in net sales, median ${K.usd(b.i19.median!)}. Item 20 counts ${K.num(b.units.franchised!)} franchised restaurants at the end of ${b.units.year}, up ${K.num(b.units.franchisedNetChange!)}.`,
  body: (h) => `
<h2>One range for two formats</h2>
<p>Papa Johns prints a single estimate, ${K.usd(b.invLow)} to ${K.usd(b.invHigh)}, for both its Standard and Small-Town restaurants, so the range does not tell you which end belongs to which. The amounts are net of an average tenant improvement allowance of $42,000 from the landlord: a site without one costs more. Non-Traditional and Small-Town restaurants carry a $5,000 fee. For a standard unit, the fee depends on how many restaurants you commit to, your finances, experience and negotiation; the development fee deposit of $5,000 to $25,000 per restaurant is credited against it.</p>
<h2>Supplies you must buy from Papa Johns</h2>
<p>Pizza dough and pizza sauce must come from the affiliate PJ Food Service, and the information system and designated software from Papa Johns itself. Other food items may also be bought from affiliates. Part of the margin on these supplies stays with the franchisor, which the calculator cannot see.</p>
<h2>Royalty, marketing and the 2029 date</h2>
<p>The royalty is ${K.rate(b.royPct)} of net sales, paid on the 10th of each month, and may be raised to ${K.rate(b.royPctHigh!)}. The marketing fund takes ${K.rate(b.adPct)} under what the document calls the NMF Initiative, from April 1, 2024 until December 30, 2029; it reverts to 5 % if the standard royalty is raised before then. Cooperative contributions and local advertising are voluntary until that date. A later Mandatory Period (to come, after December 30, 2029) sets a minimum co-op contribution of 2 % and a minimum combined marketing spend of 8 % of net sales. Grand opening spending is at least $10,000.</p>
<p>The calculator counts ${K.usd(b.fixedYear)} a year of fixed fees: software maintenance at $375 a month, help desk at $80 a month and $150 for training. Several other lines are left out because they vary: a digital fee of 1.75 % of online net sales, PapaNet at $400 to $450 a month and scheduling software at $33 to $55 a month.</p>
${h.mini('fees', { t: 'Papa Johns: royalty and marketing over the agreement', p: ['roy', 'sales', 'yrs'], d: { sales: K.i19(b)!, roy: b.royPct!, ad: b.adPct!, fee: b.feeHigh, yrs: 10, fx: b.fixedYear } })}
<h2>Sales by quartile</h2>
<p>The ${K.usd(K.i19(b)!)} average comes from ${K.num(b.i19.count!)} standard franchised restaurants in the United States open the whole of fiscal 2025, and 43.8 % reached or exceeded it. The top quarter averaged $1,619,518 and the bottom quarter $675,314, more than a two to one spread. The 448 standard company-owned restaurants averaged $1,264,646. Non-Traditional and Small-Town restaurants have no Item 19 data at all. The notes exclude 52 standard franchised restaurants in one place and 137 in another, without reconciling the two. At the default margin of ${K.rate(K.P.calc.defaultMarginPct)}, a starting value you should replace, payback on the middle of the range is ${K.dec(e.pay!)} years.</p>
<h2>How it compares</h2>
<p>${h.a('brand:dominos', "Domino's")} costs ${K.range(dom)} with ${K.rate(K.pctFees(dom))} of sales in royalty and ad fund against ${K.rate(K.pctFees(b))} here. ${h.a('brand:marcos-pizza', "Marco's Pizza")} quotes ${K.range(mp)} and an average of ${K.usd(K.i19(mp)!)}. Company-owned Papa Johns units fell by 77 in ${b.units.year}, while franchised units grew.</p>
`,
  faqs: [
    { q: 'What is the initial franchise fee for a Papa Johns restaurant?', a: `For a standard restaurant Item 5 gives ${K.fee(b)}, depending on incentives, the number of restaurants, experience and negotiation. Non-Traditional and Small-Town restaurants pay $5,000. A development agreement is required even for one unit, and its deposit of $5,000 to $25,000 per restaurant is credited against the fee.` },
    { q: 'How long will the Papa Johns marketing fund stay at 6 percent?', a: `The document sets the marketing fund contribution at ${K.rate(b.adPct)} of net sales from April 1, 2024 until December 30, 2029, unless the standard royalty is raised before then, in which case it returns to 5 %. After 2029, a Mandatory Period would require at least 8 % of net sales on combined marketing.` },
    { q: 'What do Papa Johns franchisees have to buy from the company?', a: `Pizza dough and pizza sauce must be bought from the affiliate PJ Food Service, and the information system and designated software from Papa Johns. Other food items may be purchased from affiliates too. These purchases are part of operating costs, not of the royalty, so they do not appear in the fee lines of Item 6.` },
    { q: 'What were Papa Johns restaurant sales in 2025?', a: `Item 19 reports average net sales of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} standard franchised restaurants open the full year. The top quarter averaged $1,619,518 and the bottom quarter $675,314. These are sales only; the document prints no costs or profits for franchised restaurants.` },
  ],
  related: ['brand:dominos', 'brand:marcos-pizza', 'brand:pizza-hut', 'compare-franchises'],
});
