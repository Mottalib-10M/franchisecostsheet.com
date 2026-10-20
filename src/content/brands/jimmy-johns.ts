import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('jimmy-johns');
const e = K.eco('jimmy-johns');
const jm = K.B('jersey-mikes');
const fh = K.B('firehouse-subs');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;

export default defineBrand({
  slug: 'jimmy-johns',
  title: "Jimmy John's Franchise Cost 2026: Fee, Sales and Incentives",
  description: `Jimmy John's franchise cost in 2026: ${K.range(b)} with the lease included, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} ad fund and ${K.usd(x19)} average sales.`,
  intro: `Jimmy John's prints two layers of sales in Item 19, by drive-thru and by quartile, and its 2026 incentive programs can wipe out a large part of the royalty in the first years.`,
  resume: `The Jimmy John's disclosure document issued on ${K.day(b.issued)} by Jimmy John's Franchisor SPV, LLC estimates ${K.range(b)} to open a restaurant at a traditional location, a figure that includes the initial lease costs but no purchase of real estate. Only ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of it goes to the franchisor or an affiliate, the low end reflecting fee waivers. The standard franchise fee is ${K.usd(b.feeLow)}. Each week the restaurant pays a royalty of ${K.rate(b.royPct)} of gross sales and ${K.rate(b.adPct)} to the Advertising and Development Fund, with a cooperative of up to 2 % possible on top. Item 19 reports average yearly gross sales of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} across ${K.num(b.i19.count!)} franchised restaurants open all of 2025. At the end of ${b.units.year} the chain had ${K.num(b.units.total!)} restaurants, ${K.num(b.units.franchised!)} of them franchised.`,
  body: (h) => `
<h2>The range includes a lease, not a building</h2>
<p>The cover page describes the ${K.range(b)} as the cost of a traditional location "including initial real estate lease costs", while the Item 7 total is labeled as excluding real estate purchase. Read together, the two say the same thing: the estimate assumes rented premises and leaves out buying land or building from the ground up. Non-traditional sites have their own, lower fee of $17,500 and pay half the standard fund rate, 2.25 %.</p>
<h2>Fees that vary more than the headline</h2>
<p>The ${K.usd(b.feeLow)} standard fee drops to $12,500 for a traditional restaurant that was operated and closed within the last year, or $5,000 when the buyer is an existing franchisee in good standing. Under a development agreement, $10,000 per restaurant is paid up front and the balance when each franchise agreement is signed. Training for two people is included; each extra trainee costs $1,000 a week. The document reports fees actually charged in fiscal 2025 ranging from $0 to $35,000, a sign that discounts are common. A transfer costs ${K.usd(b.transferUsd!)} to an outside buyer, less within the system or the family.</p>
<h2>Royalty credits in 2026</h2>
<p>Two incentive programs, Standard and Strategic, apply to agreements signed by March 31, 2027. They grant a royalty credit of $125,000 or $175,000 per new restaurant and lower fund contributions for a period. The list of Standard and Strategic markets is not printed in the text read for this page, so check which one applies to your area before counting on the larger credit. The calculator ignores these credits and applies the full ${K.rate(b.royPct)} plus ${K.rate(b.adPct)}: about ${K.usd(e.y.fees)} a year at the Item 19 average.</p>
${h.mini('breakeven', { t: "Jimmy John's: sales needed with a loan", p: ['m', 'lf', 'lr'], d: { b: 'jimmy-johns' } })}
<h2>Drive-thru or not</h2>
<p>The ${K.usd(x19)} average mixes formats. The 972 traditional restaurants with a drive-thru averaged ${K.usd(oth(/with drive-thru \(/))}, against ${K.usd(oth(/without drive-thru \(/))} for the 1,584 without one. The top quartile averaged ${K.usd(oth(/1st/))} and the bottom quartile ${K.usd(oth(/4th/))}. Restaurants opened in 2025, those closed for long periods and company units are excluded, and the figures stop at sales: no cost line is given. With no fixed yearly fee in the calculator, break-even without a loan is reached on the first dollar of margin above ${K.rate(K.pctFees(b))}, which is why the simulator above starts with a borrowed share.</p>
<h2>Next to Jersey Mike's and Firehouse Subs</h2>
<p>${h.a('brand:jersey-mikes', "Jersey Mike's")} asks more (${K.range(jm)}) and reports higher average sales, ${K.usd(K.i19(jm)!)}. ${h.a('brand:firehouse-subs', 'Firehouse Subs')} sits close to Jimmy John's on sales, at ${K.usd(K.i19(fh)!)}, with a ${K.usd(fh.feeLow)} fee. Jimmy John's added ${K.num(b.units.franchisedNetChange!)} franchised restaurants in 2025.</p>
`,
  faqs: [
    { q: "How much is the startup cost for a Jimmy John's restaurant?", a: `Item 7 estimates ${K.range(b)} for a traditional location, initial lease costs included and real estate purchase excluded. The franchisor or its affiliate receives ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of that. The rest goes to the build-out, equipment, signs and working capital.` },
    { q: "Can the Jimmy John's franchise fee be lower than $35,000?", a: `Yes. The document lists $17,500 for non-traditional sites, $12,500 for reopening a traditional restaurant closed within the past year and $5,000 for an existing franchisee in good standing in that case. Fees actually charged in fiscal 2025 ranged from $0 to $35,000.` },
    { q: "What are the Jimmy John's royalty credits for new restaurants?", a: `The Standard and Strategic incentive programs, for agreements signed by March 31, 2027, give a royalty credit of $125,000 or $175,000 per new restaurant and reduced fund contributions. Which markets qualify is defined in the document. The calculator on this page ignores the credits and uses the full rates.` },
    { q: "Do Jimmy John's restaurants with a drive-thru sell more?", a: `In 2025 the 972 traditional franchised restaurants with a drive-thru averaged ${K.usd(oth(/with drive-thru \(/))} in gross sales, compared with ${K.usd(oth(/without drive-thru \(/))} for the 1,584 without one. These are sales only; the document publishes no costs, so a higher average does not show a higher profit.` },
  ],
  related: ['brand:jersey-mikes', 'brand:firehouse-subs', 'franchise-break-even', 'franchise-royalty-fees'],
});
