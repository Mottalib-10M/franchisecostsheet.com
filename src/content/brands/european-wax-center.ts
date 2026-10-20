import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const b = K.B('european-wax-center');
const e = K.eco('european-wax-center');
const me = K.B('massage-envy');
const gc = K.B('great-clips');
const line = (x: Brand, re: RegExp) => { const o = x.i19.other.find((y) => re.test(y.label)); if (!o) throw new Error(`${x.slug}: no Item 19 line ${re}`); return o.value; };
const avg = K.i19(b)!;
const med = b.i19.median!;
const matureAvg = line(b, /Average Gross Sales, mature/);
const matureMed = line(b, /Median Gross Sales, mature/);
const top = line(b, /1st \(top\) quartile/);
const bottom = line(b, /4th \(bottom\) quartile/);
const hi = line(b, /Highest/);
const lo = line(b, /Lowest/);

export default defineBrand({
  slug: 'european-wax-center',
  title: 'European Wax Center Franchise Cost 2026: Fees and Sales',
  description: `European Wax Center franchise cost in 2026: ${K.range(b)}, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} marketing fund and Item 19 sales for its ${K.num(b.i19.count!)} centers.`,
  intro: 'A European Wax Center is a small leased center with five or six waxing suites, supplied with wax by a single affiliate of the franchisor.',
  resume: `EWC Franchisor LLC estimates that a European Wax Center with 5 to 6 waxing suites in 1,000 to 1,600 leased square feet costs ${K.range(b)} to open, according to Item 7 of its disclosure document issued ${K.day(b.issued)}. A new franchisee pays ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of it to the franchisor or affiliates, including the ${K.usd(b.feeLow)} franchise fee ($36,000 for an existing franchisee) and a start-up package of products. After opening, the center pays a royalty of ${K.rate(b.royPct)} of gross sales each week and ${K.rate(b.adPct)} to the marketing fund each month, plus fixed technology and search marketing fees. Item 19 gives an average of ${K.usd(avg)} of gross sales for ${K.num(b.i19.count!)} franchised centers open all of fiscal 2025, and a printed median of ${K.usd(med)} that sits above that average. Item 20 shows ${K.num(b.units.total!)} centers at the end of ${b.units.year}, ${K.num(-b.units.franchisedNetChange!)} fewer franchised ones than a year earlier.`,
  body: (h) => `
<h2>The wax comes from one supplier</h2>
<p>The affiliate EWC Distributor LLC is currently the only approved supplier of wax and of every branded product, sold on an ongoing basis at its standard wholesale prices. Retail resale of those branded products is left out of gross sales, so no royalty is charged on it. The opening start-up package of products, $18,000 to $21,000, is also bought from the franchisor's side. The franchisor's share of the investment is otherwise modest: the fee plus that package. Item 7 assumes a leased center and excludes buying real estate.</p>
<h2>What is billed each month</h2>
<p>The ${K.rate(b.adPct)} marketing contribution goes to the affiliate EWC MFund, LLC, and since 2016 it has replaced a separate local advertising duty. Fixed charges are a Technology and Security Fee of $310 a month, a mandatory local search marketing program of $275 a month and a $100 yearly cyber insurance fee, ${K.usd(b.fixedYear)} a year in the calculator. Auto-shipments of imagery and other products, typically $300 to $500 and $300 to $2,500 a month, are purchases at cost and are not counted. Grand opening advertising is at least $12,000 and up to $35,000. On the Item 19 average, royalty and fund come to ${K.usd(e.y.royalty + e.y.ad)} a year.</p>
${h.mini('fees', { t: 'European Wax Center: fees over a ten-year term', p: ['sales', 'yrs'], d: { sales: Math.round(avg), roy: b.royPct!, ad: b.adPct!, fee: b.feeLow, yrs: 10, fx: b.fixedYear } })}
<h2>An average below the median</h2>
<p>The table for all reporting centers prints an average of ${K.usd(avg)} and a median of ${K.usd(med)}, ${K.usd(med - avg)} higher. That median also tops the median of the second quartile, which a median of the whole group cannot do, so one of the printed figures is likely a typing error in the document; this site uses the average, as printed, and flags the point. The quartile averages run from ${K.usd(top)} at the top to ${K.usd(bottom)} at the bottom, with a highest center at ${K.usd(hi)} and a lowest at ${K.usd(lo)}. For the 724 mature centers, open 60 months or more, the average was ${K.usd(matureAvg)} and the median ${K.usd(matureMed)}, a consistent pair. Of all reporting centers, 449, or 43.7 %, were above average; 32 centers closed in 2025 are not included.</p>
<p>No costs are given, so the margin field holds your estimate; the default of ${K.rate(K.P.calc.defaultMarginPct)} is only a starting point, and at it the payback at the middle of Item 7 reads ${e.pay === null ? 'never' : `${K.dec(e.pay)} years`}.</p>
<h2>Next to other personal service brands</h2>
<p>Massage Envy, on this site too, asks ${K.range(me)}, charges ${K.rate(me.royPct)} plus ${K.rate(me.adPct)} and reports ${K.usd(K.i19(me)!)} of average sales. ${h.a('brand:great-clips', 'Great Clips')} costs less to open, ${K.range(gc)}, but pays ${K.rate(K.pctFees(gc))} of sales in royalty and ad fund against ${K.rate(K.pctFees(b))} here. The figures above come from the ${h.fdd('european-wax-center', 'document on the Minnesota portal')}.</p>
`,
  faqs: [
    { q: 'How much does a European Wax Center franchise cost?', a: `Item 7 estimates ${K.range(b)} for one center with 5 to 6 waxing suites in leased space of 1,000 to 1,600 square feet. A new franchisee pays ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of that to the franchisor or its affiliates; an existing franchisee pays $54,000 to $57,350, because the fee is lower.` },
    { q: 'Must European Wax Center owners buy wax from the franchisor?', a: 'Yes, in practice. EWC Distributor LLC, an affiliate, is currently the only approved supplier of wax and all branded products, sold at its standard wholesale prices on an ongoing basis. The resale of these branded products to guests is excluded from the gross sales on which the royalty is calculated.' },
    { q: 'Why is the European Wax Center median above its average?', a: `Item 19 prints ${K.usd(avg)} as the average and ${K.usd(med)} as the median of all reporting centers. The median is also above the second quartile's median, which is not possible for the same group, so one figure looks wrong in the document. The mature centers' figures, ${K.usd(matureAvg)} and ${K.usd(matureMed)}, are consistent.` },
  ],
  related: ['brand:great-clips', 'franchise-royalty-fees', 'item-19-franchise-earnings', 'cheapest-franchises'],
});
