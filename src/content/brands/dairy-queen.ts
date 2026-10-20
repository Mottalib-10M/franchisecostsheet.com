import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('dairy-queen');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const avg = K.i19(b)!;
const mp = b.i19.profitPct!;
const e = K.eco('dairy-queen');
const cu = K.B('culvers');
const so = K.B('sonic');

export default defineBrand({
  slug: 'dairy-queen',
  title: 'Dairy Queen Franchise Cost 2026: Grill & Chill, Fees, Sales',
  description: `Dairy Queen franchise cost in 2026: ${K.range(b)} for a new Grill & Chill without land, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty and ${K.usd(avg)} average sales.`,
  intro: `The Dairy Queen range describes one format only: a newly built, freestanding DQ Grill & Chill with seating, land not included.`,
  resume: `American Dairy Queen Corporation estimates ${K.range(b)} to open one newly constructed DQ Grill & Chill restaurant, in the disclosure document dated ${K.day(b.issued)}; buying the land is not in that range. Only ${K.usd(b.toFrLow!)} of it goes to the franchisor, the initial franchise fee, of which the first $10,000 is a non-refundable deposit paid with the application. Once open, the restaurant pays a continuing license fee of ${K.rate(b.royPct)} of gross sales and a sales promotion fee that ADQ sets between ${K.rate(b.adPct)} and ${K.rate(b.adPctHigh)}. Item 19 reports average gross sales of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} in ${b.i19.period} for ${K.num(b.i19.count!)} franchisee-owned freestanding Grill & Chill restaurants opened between 2015 and 2024. Item 20 counts ${K.num(b.units.total!)} direct-licensed outlets at the end of ${b.units.year}, ${K.num(b.units.franchisedNetChange!)} more than a year earlier, and only ${K.num(b.units.company!)} of them run by the company.`,
  body: (h) => `
<h2>A marked copy on file</h2>
<p>The document Minnesota holds for Dairy Queen is a marked version: last year's text struck through, this year's inserted beside it. The figures on this page are the ones left once the deletions are removed. The old Item 7 total of $1,516,200 to $2,543,050 still shows in the raw text, struck out, next to the current ${K.range(b)}; the current figures match the sum of the Item 7 lines at both ends. Anyone reading the PDF should expect two sets of numbers on many pages and keep only the inserted ones.</p>
<h2>Land comes on top</h2>
<p>The range assumes a new freestanding building with seating and leaves the land out. If the franchisee buys the lot, the document puts land generally at $250,000 to $800,000 more. Conversions of an existing restaurant and relocations follow other rules: no initial franchise fee for a conversion franchisee or an owner relocating under ADQ's relocation policy, and lower phased rates of the sales promotion fee for a period. A reduced fee is possible for a previously closed location, some captive venues and qualifying multi-unit operators. Training readiness costs $200 per attendee, $600 for the three people who must attend.</p>
<h2>License fee and a promotion fee that can move</h2>
<p>The ${K.rate(b.royPct)} license fee is due by the 10th of each month on the previous month's gross sales. The sales promotion fee is a range: ADQ chooses the rate between ${K.rate(b.adPct)} and ${K.rate(b.adPctHigh)} and must give 90 days' notice before changing it. On the Item 19 average, each point of that fee is worth ${K.usd(avg / 100)} a year. Gift cards cost 3 % of redemptions, which ADQ estimates at about $200 a year. Selling the restaurant costs a $6,000 transfer fee; from January 1, 2030 that fee rises by $500, then again every five years (to come).</p>
${h.mini('breakeven', { t: 'Dairy Queen: break-even sales against the Item 19 average', p: ['m', 'lf', 'at'], d: { b: 'dairy-queen' } })}
<h2>What Item 19 covers, and what it leaves out</h2>
<p>The sales table is narrow on purpose: franchisee-owned, newly built freestanding Grill & Chill restaurants first opened from 2015 to 2024, open all twelve months of ${b.i19.period}, Texas excluded, conversions and non-traditional sites excluded. Sales ran from ${K.usd(o('Low annual'))} to ${K.usd(o('High annual'))}; the 2024 average was ${K.usd(o('Schedule A restaurants, 2024'))} for 313 restaurants. A second schedule prints costs from franchisees' profit and loss statements: food ${K.rate(o('Cost of Goods'))}, labor ${K.rate(o('Labor'))}, controllables ${K.rate(o('Restaurant Controllables'))}, leaving a manageable profit of ${K.rate(mp)} of sales. That profit is before occupancy, insurance, the license fee, the promotion fee, legal and accounting. It rests on 16 restaurants in 2025 against 203 in 2024, when the figure was ${K.rate(o('203 Schedule B'))}; the document also says 318 restaurants were left out of that schedule, more than the 286 in the sales table, which does not add up. The calculator starts at a ${K.rate(K.P.calc.defaultMarginPct)} margin after rent, a figure of your own; at that setting the middle of the range yields ${K.usd(e.y.cashBeforeDebt)} a year before any loan.</p>
<h2>Next to other burger brands</h2>
<p>${h.a('brand:culvers', "Culver's")} prints an average of ${K.usd(K.i19(cu)!)} on a range of ${K.range(cu)} that includes land, and ${h.a('brand:sonic', 'Sonic')} ${K.usd(K.i19(so)!)} on ${K.range(so)}. On fees, Dairy Queen takes ${K.rate(K.pctFees(b))} of sales at the low end of its promotion range, against ${K.rate(K.pctFees(cu))} for Culver's and ${K.rate(K.pctFees(so))} for Sonic, royalty and ad fund added.</p>
`,
  faqs: [
    { q: 'Does the Dairy Queen Grill & Chill investment include the land?', a: `No. The Item 7 total of ${K.range(b)} covers a newly constructed freestanding restaurant with seating, without the lot. The document says land, if purchased, generally costs $250,000 to $800,000 on top. A leased site avoids that outlay but adds rent, which you should count in the margin you type into the calculator.` },
    { q: 'Who decides the Dairy Queen sales promotion fee rate?', a: `ADQ does. Item 6 prints the sales promotion program fee as ${K.rate(b.adPct)} to ${K.rate(b.adPctHigh)} of gross sales and gives the franchisor the right to set the rate within that range, with at least 90 days' notice before an adjustment. Conversions and relocations can start at lower phased rates. The license fee of ${K.rate(b.royPct)} is separate.` },
    { q: 'How much does an average Dairy Queen Grill & Chill sell in a year?', a: `For ${b.i19.period}, Item 19 gives ${K.usd(avg)} on average and ${K.usd(b.i19.median!)} at the median, across ${K.num(b.i19.count!)} franchisee-owned freestanding Grill & Chill restaurants opened from 2015 to 2024 and open all year. Texas restaurants, conversions and non-traditional sites are not in that group, so the figure does not describe every DQ.` },
    { q: 'Can a Dairy Queen conversion avoid the initial franchise fee?', a: `Yes, under Item 5 a conversion franchisee pays no initial franchise fee, and neither does an existing franchisee relocating under ADQ's relocation policy. A reduced fee may apply to previously closed locations, some captive venues and qualifying multi-unit operators. The standard fee for a single new restaurant is ${K.usd(b.feeLow)}, with $10,000 due at application.` },
  ],
  related: ['brand:culvers', 'brand:sonic', 'fast-food-franchise-cost', 'item-19-franchise-earnings'],
});
