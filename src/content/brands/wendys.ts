import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('wendys');
const mc = K.B('mcdonalds');
const sn = K.B('sonic');
const avg = K.i19(b)!;
const e = K.eco('wendys');

export default defineBrand({
  slug: 'wendys',
  title: `Wendy's Franchise Cost: ${K.usd(b.feeLow)} Fee and Yearly Charges`,
  description: `Wendy's franchise cost, 2025 FDD: ${K.range(b)} without land, a ${K.usd(b.feeLow)} technical assistance fee, ${r(b.royPct)} royalty and ${K.usd(avg)} in average sales.`,
  intro: `Wendy's royalty is among the lowest of the burger brands, but a list of flat yearly charges, led by a FreshAi service fee, sits on top of it.`,
  resume: `Wendy's disclosure document issued on ${K.day(b.issued)} and amended on ${K.day(b.amended!)} estimates ${K.range(b)} to build a new traditional restaurant, paid in cash and excluding the land. The initial fee is called a technical assistance fee: ${K.usd(b.feeLow)}, with a $5,000 training fee for new franchisees. The standard royalty is ${r(b.royPct)} of gross sales and the required advertising contribution 4 %, split between ${r(b.adPct)} for the national program and 0.50 % for local advertising. Flat charges paid to Wendy's add ${K.usd(b.fixedYear)} a year before the technology fee, mostly the FreshAi service fee for restaurants opening on or after August 1, 2025. In fiscal 2024, ${K.num(b.i19.count!)} franchise restaurants averaged ${K.usd(avg)} in gross sales, with a median of ${K.usd(b.i19.median!)}. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(-b.units.franchisedNetChange!)} fewer franchised ones than a year before.`,
  body: (h) => `
<h2>Land comes on top of ${K.usd(b.invHigh)}</h2>
<p>The Item 7 table describes a new-build traditional restaurant under a franchise agreement, all expenditures paid in cash and real estate left out. A note adds that buying land for a company restaurant can cost a further $500,000 to $1,500,000 or more. Wendy's also offers sites it develops, under Build-to-Suit and REPP arrangements, which bring real estate service fees of $12,500, $17,500 or $40,000 and a $35,000 project fee. In a Build-to-Suit sublease the royalty is 6 % and the rent follows Wendy's own lease, or a fixed market rent if Wendy's buys the land, plus a monthly percentage rent the document does not quantify and a lease administration fee of at least $6,000 a year.</p>
<h2>The technical assistance fee and its variants</h2>
<p>What other brands call a franchise fee is, at Wendy's, a technical assistance fee of ${K.usd(b.feeLow)}. New franchisees add a $5,000 training fee and $500 per background investigation. The fee is generally $25,000 for a non-traditional site or under the Franchise Flip program, and $12,500 for a Frosty Cart. It is waived under Pacesetter agreements and may be waived under New Groundbreaker agreements when a restaurant opens early. Of the investment, up to ${K.usd(b.toFrHigh!)} is paid to Wendy's or its affiliates.</p>
<h2>Charges that do not move with sales</h2>
<p>Item 6 lists a FreshAi service fee of $20,004 a year ($1,667 a month) for restaurants opening on or after August 1, 2025, a cyber insurance premium of about $889 and a customer care fee of $95 a month. Those three make the ${K.usd(b.fixedYear)} the calculator adds each year. The technology fee comes besides: $6,620 to $15,000 in the Item 6 table, while its footnote prints $7,620, $10,600 or $14,200 depending on the prior year's sales, and $14,200 for a newly built restaurant. The two do not agree, so the calculator leaves the technology fee out; add it to your costs. In-app delivery orders carry a fee of 3.0 % of each transaction.</p>
${h.mini('breakeven', { t: "Wendy's: sales needed to cover the fees and a loan", p: ['m', 'lf'], d: { b: 'wendys', lf: 70 } })}
<p>The local share of advertising (0.50 %) is not in the calculator either, and a local cooperative may vote more; the document gives 1.00 % as an example, for a total of 4.50 %. Development incentives temporarily reduce the royalty and the national advertising rate for some new restaurants.</p>
<h2>Sales, and the only cost figures</h2>
<p>The fiscal 2024 table covers ${K.num(b.i19.count!)} franchise restaurants with 52 weeks of sales: an average of ${K.usd(avg)}, a median of ${K.usd(b.i19.median!)}, and a range from $345,222 to $8,344,302; 42.4 % reached the average. The 370 company restaurants averaged $2,326,904. The 122 new traditional franchise restaurants opened in fiscal 2023 and 2024 averaged $39,853 a week. Costs appear only for 362 company restaurants: an average restaurant EBITDA before rent of $425,995, or 18.2 % of revenue, before royalty and before rent. A franchisee pays royalty, advertising and usually rent, so that percentage is not a franchisee margin. The calculator starts at ${r(K.P.calc.defaultMarginPct)}, your estimate to replace; at that value the Item 19 average leaves ${K.usd(e.y.cashBeforeDebt)} a year after fees.</p>
<h2>Compared with McDonald's and Sonic</h2>
<p>${h.a('brand:mcdonalds', "McDonald's")} costs ${K.range(mc)} to open and reports ${K.usd(K.i19(mc)!)} in average sales, but adds a percentage rent of 10.00 % or more paid to McDonald's. ${h.a('brand:sonic', 'Sonic')} costs ${K.range(sn)} and reports ${K.usd(K.i19(sn)!)}. Wendy's sits between them in sales, with the lowest royalty of the three. The network shrank in ${b.units.year}: ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company restaurants at year end.</p>
`,
  faqs: [
    { q: "What is the Wendy's technical assistance fee?", a: `It is Wendy's name for the initial franchise fee: ${K.usd(b.feeLow)} for a standard restaurant in Item 5. A new franchisee also pays a $5,000 training fee and $500 per background investigation. Non-traditional sites and the Franchise Flip program generally pay $25,000, a Frosty Cart $12,500, and Pacesetter agreements waive the fee.` },
    { q: "Does the Wendy's franchise cost include buying the land?", a: `No. The Item 7 range of ${K.range(b)} assumes a new restaurant built with cash and excludes real estate. A note estimates that buying land for a company restaurant can cost an additional $500,000 to $1,500,000 or more. Leasing instead turns that into rent, which belongs in your margin estimate.` },
    { q: "What flat fees does a Wendy's franchisee pay every year?", a: `Item 6 lists a FreshAi service fee of $20,004 a year for restaurants opening on or after August 1, 2025, a cyber insurance premium of about $889 and a customer care fee of $95 a month. A technology fee of $6,620 to $15,000 a year comes on top, with different amounts in its footnote.` },
    { q: "How much does an average Wendy's franchise restaurant sell?", a: `In fiscal 2024, ${K.num(b.i19.count!)} franchise restaurants with a full 52 weeks of sales averaged ${K.usd(avg)} and had a median of ${K.usd(b.i19.median!)}. Company restaurants averaged $2,326,904. Wendy's prints costs only for its own restaurants, so franchise profit has to be estimated by the buyer.` },
  ],
  related: ['brand:mcdonalds', 'brand:sonic', 'franchise-fee', 'franchise-break-even'],
});
