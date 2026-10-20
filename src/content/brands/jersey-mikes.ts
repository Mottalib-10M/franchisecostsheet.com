import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('jersey-mikes');
const e = K.eco('jersey-mikes');
const sw = K.B('subway');
const jj = K.B('jimmy-johns');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;
const m = K.rate(K.P.calc.defaultMarginPct);

export default defineBrand({
  slug: 'jersey-mikes',
  title: "Jersey Mike's Franchise Cost 2026: Fees, AUV and Payback",
  description: `Jersey Mike's franchise cost in 2026: ${K.range(b)} for a shopping center unit, a ${K.usd(b.feeLow)} fee plus a development fee, ${K.rate(b.royPct)} royalty, ${K.usd(x19)} AUV.`,
  intro: `Jersey Mike's sells every restaurant through an area development agreement, even a single one, so the fee in Item 5 is never the whole entry ticket. The calculator starts from the average sales its Item 19 publishes.`,
  resume: `A Jersey Mike's restaurant in a retail shopping center costs ${K.range(b)} to open, according to Item 7 of the disclosure document A Sub Above, LLC issued on ${K.day(b.issued)} and amended ${K.day(b.amended!)}. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of that is paid to the company: the ${K.usd(b.feeLow)} franchise fee, a $10,000 development fee per restaurant that is not credited against it, and a $10,000 grand opening advertising fee. After opening, the royalty is ${K.rate(b.royPct)} of gross receipts and the two advertising funds take ${K.rate(b.adPct)} today, with a combined ceiling of ${K.rate(b.adPctHigh)}. Item 19 reports average yearly sales of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} traditional franchised restaurants open more than 360 days in 2025. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(b.units.franchisedNetChange!)} more franchised units than a year earlier.`,
  body: (h) => `
<h2>A shopping center store, leased</h2>
<p>The Item 7 range describes one restaurant of roughly 1,000 to 2,000 square feet in a retail shopping center. Non-traditional sites, standalone buildings and drive-thru units are outside that estimate. The cover page does not say in so many words that real estate is excluded, but the table only lists rent deposits and leasehold improvements: no purchase of land or a building appears anywhere in the ${K.range(b)}.</p>
<h2>Three payments at signing</h2>
<p>An area development agreement is mandatory, even for one restaurant, and it carries a non-refundable development fee of $10,000 per restaurant that is not applied toward the ${K.usd(b.feeLow)} franchise fee. Each restaurant therefore costs $30,000 in fees before any advertising, plus a grand opening advertising fee of $10,000 also paid to the company. The document notes that in fiscal 2025 certain existing franchisees acquiring rights to more restaurants paid a reduced initial fee of $8,500. A transfer later costs ${K.usd(b.transferUsd!)} per restaurant. The ${h.a('franchise-fee', 'franchise fee page')} compares these entry payments across brands.</p>
<h2>Royalty, two funds and the software bill</h2>
<p>The continuing royalty is ${K.rate(b.royPct)} of gross receipts, wired weekly. Advertising is split in two: 1 % to the Corporate Advertising and Development Fund and 4 % to the National Media Fund, which the agreement allows to rise as long as the total stays at or below ${K.rate(b.adPctHigh)}. The calculator also counts ${K.usd(b.fixedYear)} a year of fixed charges printed in Item 6: the POS software license and support package at $395 a month (which may increase up to $795), a secure network fee of $39.85 a month and $9.50 a month for the gift card program. Online orders carry their own fee of $0.2921 per transaction plus 3.74 % of the sale, which the calculator leaves out because it depends on your order mix.</p>
${h.mini('roi', { t: "Jersey Mike's: test your own margin", p: ['m', 'at', 'lf'], d: { b: 'jersey-mikes' } })}
<h2>What the ${K.usd(x19)} average leaves out</h2>
<p>The Item 19 population is narrow on purpose: ${K.num(b.i19.count!)} traditional franchised restaurants that operated more than 360 days between ${b.i19.period}. It excludes 583 restaurants open fewer than 361 days, 13 non-traditional units and those run by the company or its affiliates. Inside that group, sales went from ${K.usd(oth(/Lowest/))} to ${K.usd(oth(/Highest/))}, and 1,148 restaurants (44 %) reached or beat the average. The figures are sales only, net of taxes and discounts, with no cost or profit line, so the margin in the calculator stays your estimate. At the starting value of ${m}, the middle of the range pays back in about ${K.dec(e.pay!)} years before any loan; the fees then take ${K.usd(e.y.fees)} a year.</p>
<h2>Against the other sub chains</h2>
<p>${h.a('brand:subway', 'Subway')} costs ${K.range(sw)} and publishes no sales at all, while ${h.a('brand:jimmy-johns', "Jimmy John's")} asks ${K.range(jj)} and reports ${K.usd(K.i19(jj)!)} on average. Jersey Mike's sits above both on investment and on reported sales. Its network grew to ${K.num(b.units.franchised!)} franchised restaurants, with ${K.num(b.units.company!)} more owned by affiliates; the franchisor itself owns none. Eight affiliate outlets were reclassified as franchised for 2025, which accounts for part of the franchised gain.</p>
`,
  faqs: [
    { q: "How much money do you need to open a Jersey Mike's?", a: `Item 7 puts one shopping center restaurant at ${K.range(b)}, of which ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to the franchisor. The estimate assumes leased space, so buying land or a building would come on top. Non-traditional, standalone and drive-thru restaurants are not covered by this range.` },
    { q: "Why is the Jersey Mike's fee really $30,000 and not $20,000?", a: `Every franchisee signs an area development agreement, even for one restaurant, with a $10,000 development fee per restaurant that is not credited against the ${K.usd(b.feeLow)} franchise fee. Add the $10,000 grand opening advertising fee paid at signing and the company collects more than the headline fee suggests.` },
    { q: "What royalty and advertising does a Jersey Mike's owner pay?", a: `The royalty is ${K.rate(b.royPct)} of gross receipts, paid weekly. Advertising currently takes ${K.rate(b.adPct)}, split between a 1 % corporate fund and a 4 % national media fund, and the two together may not exceed ${K.rate(b.adPctHigh)}. Monthly software, network and gift card charges come on top.` },
    { q: "What are average sales at a Jersey Mike's restaurant?", a: `Item 19 reports an average of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} traditional franchised restaurants open more than 360 days in 2025. The document gives sales only, no profit, and restaurants opened recently are not in the group.` },
  ],
  related: ['brand:subway', 'brand:jimmy-johns', 'franchise-fee', 'item-19-franchise-earnings'],
});
