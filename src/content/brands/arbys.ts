import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('arbys');
const e = K.eco('arbys');
const jm = K.B('jersey-mikes');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;

export default defineBrand({
  slug: 'arbys',
  title: "Arby's Franchise Cost 2026: Fees, Incentives and Sales",
  description: `Arby's franchise cost in 2026: ${K.range(b)} for a free-standing unit, a ${K.usd(b.feeLow)} fee plus a development fee, a ${K.rate(b.royPct)} royalty and ${K.usd(x19)} AUV.`,
  intro: `Arby's has the highest Item 7 range of the sandwich brands on this site, a low royalty on paper, and an incentive that waives the fee and phases the royalty in over five years.`,
  resume: `Arby's Franchisor, LLC estimates in its disclosure document of ${K.day(b.issued)} that a free-standing Arby's restaurant in leased premises costs ${K.range(b)} to open, land and building purchase excluded; a non-free-standing restaurant is estimated at $651,550 to $1,379,600. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} goes to the franchisor or an affiliate. The standard fee is ${K.usd(b.feeLow)}, plus a separate $12,500 development fee per restaurant. The royalty is ${K.rate(b.royPct)} of gross sales, paid monthly, and the advertising and marketing service fee ranges from ${K.rate(b.adPct)} to ${K.rate(b.adPctHigh)} inside a minimum total advertising spend of 5.2 %. Item 19 reports average sales of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised traditional restaurants open all of 2025. Item 20 counts ${K.num(b.units.total!)} restaurants in the United States at the end of ${b.units.year}.`,
  body: (h) => `
<h2>Two formats, both on leased land</h2>
<p>The ${K.range(b)} assumes a free-standing restaurant in the Inspire image on a leased site. The non-free-standing version, inside or attached to another building, is estimated at $651,550 to $1,379,600. Neither includes buying land or a building. The calculator uses the free-standing range, the one the H1 above shows.</p>
<h2>Fee, development fee and the Standard incentive</h2>
<p>A development agreement is required even for one restaurant, with a non-refundable $12,500 development fee per restaurant that is not credited toward the ${K.usd(b.feeLow)} franchise fee. Non-traditional restaurants pay up to $18,750. The Standard incentive changes the picture for a new development agreement signed by March 31, 2027: the franchise fee is waived, a $7,500 royalty credit applies, and the royalty steps up from 0.5 % in year one to 1.0 % in years two to four, 2.0 % in year five and the full 4.0 % after that. The advertising service fee is cut by 75 % for three years and 50 % in year four, with a floor of 0.85 %. Training costs $2,100 per attendee today, expected to reach $4,000 mid-year, and is waived for two managers of the first restaurant.</p>
${h.mini('fees', { t: "Arby's: royalty and advertising over the agreement", p: ['roy', 'ad', 'yrs'], d: { sales: x19, roy: b.royPct!, ad: 5.2, fee: b.feeLow + 12500, yrs: 20, fx: b.fixedYear } })}
<h2>The advertising rate the calculator uses</h2>
<p>Item 6 sets a minimum total advertising spend of 5.2 % of gross sales, made of the service fee paid to the advertising entity (${K.rate(b.adPct)} to ${K.rate(b.adPctHigh)}, tiered) and local market or cooperative spending of 0.2 % to 1.98 %. The payback calculator takes ${K.rate(b.adPct)}, the low end of the service fee, so it understates advertising by up to about two points; the fee simulator above starts from the full 5.2 %. Local cooperatives can run from 3 % to 7 %. The fixed fees are light: a learning management system fee of ${K.usd(b.fixedYear)} a year. On the Item 19 average, the payback calculator shows ${K.usd(e.y.fees)} a year in royalty and advertising and, at the starting margin of ${K.rate(K.P.calc.defaultMarginPct)}, a payback of ${K.dec(e.pay!)} years. That margin is your input, not a figure from Arby's.</p>
<h2>Who is in the ${K.usd(x19)}</h2>
<p>The Item 19 group is ${K.num(b.i19.count!)} franchised traditional restaurants open all of 2025. Free-standing units (1,858) averaged ${K.usd(oth(/Average AUV, free-standing/))}, travel plaza units (177) ${K.usd(oth(/travel plaza/))} and other non-free-standing units (147) ${K.usd(oth(/other non-free-standing/))}. The top quartile averaged ${K.usd(oth(/1st/))}, the bottom ${K.usd(oth(/4th/))}; 939 restaurants, 43 %, beat the average. Company restaurants, 2025 openings, closures and the 115 restaurants transferred from the company in December 2025 are excluded. Only sales are printed.</p>
<h2>A system changing hands</h2>
<p>Franchised units rose by ${K.num(b.units.franchisedNetChange!)} to ${K.num(b.units.franchised!)} while company units fell to ${K.num(b.units.company!)}, largely through those December transfers. Item 20 starts its 2025 total at 3,413 although 2024 ended at 3,365, and Item 19 lists 2,325 traditional plus 184 travel plaza units out of ${K.num(b.units.franchised!)} franchised: neither gap is explained. For a sandwich comparison, ${h.a('brand:jersey-mikes', "Jersey Mike's")} reports ${K.usd(K.i19(jm)!)} on ${K.range(jm)}, a fraction of the Arby's building budget, with a higher royalty.</p>
`,
  faqs: [
    { q: "What does it cost to build a free-standing Arby's restaurant?", a: `Item 7 estimates ${K.range(b)} for a free-standing restaurant on a leased site, land and building purchase excluded. A non-free-standing restaurant is estimated at $651,550 to $1,379,600. The franchisor or an affiliate receives ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of the total.` },
    { q: "Is the Arby's franchise fee waived in 2026?", a: `Under the Standard incentive, for a new development agreement signed by March 31, 2027, the ${K.usd(b.feeLow)} franchise fee is waived and a $7,500 royalty credit applies. The separate $12,500 development fee per restaurant remains. The royalty then rises in steps from 0.5 % to 4.0 % by year six.` },
    { q: "How much does an Arby's franchisee spend on advertising?", a: `At least 5.2 % of gross sales in total: a service fee of ${K.rate(b.adPct)} to ${K.rate(b.adPctHigh)} depending on the tier, plus local market or cooperative spending to reach the minimum. Local cooperatives can set rates from 3 % to 7 %. The royalty of ${K.rate(b.royPct)} is separate.` },
    { q: "What are average annual sales at a franchised Arby's?", a: `Item 19 reports ${K.usd(x19)} on average and ${K.usd(b.i19.median!)} at the median for ${K.num(b.i19.count!)} franchised traditional restaurants open all of 2025. Travel plaza restaurants averaged more, ${K.usd(oth(/travel plaza/))}, and the top quartile ${K.usd(oth(/1st/))}. No cost or profit figure is published, so the margin you apply remains your own estimate.` },
  ],
  related: ['brand:jersey-mikes', 'brand:panera', 'fast-food-franchise-cost', 'franchise-fee'],
});
