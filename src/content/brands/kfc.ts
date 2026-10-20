import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('kfc');
const cat = K.catSales('chicken');
const e = K.eco('kfc');
const pop = K.B('popeyes');
const lost = -(b.units.franchisedNetChange ?? 0);

export default defineBrand({
  slug: 'kfc',
  title: 'KFC Franchise Cost 2026: Land Included, Fees and Royalty',
  description: `KFC franchise cost in 2026: ${K.range(b)} with the land, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, a ${K.rate(b.adPct)} ad rate until March 2027 and no average sales.`,
  intro: `KFC is one of the few brands whose estimate includes buying the land, which explains a range above two million dollars. Its Item 19 tests a sales forecast instead of reporting averages, so the calculator falls back on the chicken median.`,
  resume: `A newly built KFC outlet costs ${K.range(b)} according to Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)}, and that range includes purchased land of $300,000 to $1,200,000. Only ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to KFC or its affiliates, mostly the ${K.usd(b.feeLow)} franchise fee. A new franchisee who is not a Legacy Franchisee pays a royalty of ${K.rate(b.royPct)} of gross revenue, with a floor of $1,440 a month, and ${K.rate(b.adPct)} to the national co-op during the Comeback Period, which ends on March 31, 2027; the rate then drops to 4.5 % (to come). Item 19 publishes no average or median sales: it checks a forecasting tool against the actual sales of ${K.num(b.i19.count!)} outlets. Franchised outlets fell by ${K.num(lost)} in ${b.units.year}, to ${K.num(b.units.franchised!)}.`,
  body: (h) => `
<h2>Why the range starts above two million</h2>
<p>Most restaurant brands price a leased site and leave the property out. KFC's Item 7 describes a newly constructed outlet, dine-in and carryout, on land the franchisee buys, with a real property line of $300,000 to $1,200,000. Take that line out and the build-out, equipment and opening costs still make up most of the ${K.usd(b.invLow)} to ${K.usd(b.invHigh)} total. The money paid to KFC itself is small by comparison: ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, of which the fee is ${K.usd(b.feeLow)}, paid in two parts, a $20,000 deposit fee and a $25,000 option fee. Training at a company-owned outlet costs $3,000 a person and a background check $575 to $2,500. A development agreement commits $45,000 per outlet, so $135,000 to $540,000 for three to twelve outlets.</p>
<h2>A royalty that depends on who you are</h2>
<p>Note 2 of Item 6 sets the royalty at ${K.rate(b.royPct)} for a new outlet of a franchisee who is not a Legacy Franchisee, 4 % for Legacy Franchisees, and ${K.rate(b.royPctHigh!)} on acquired outlets under a Brand Contribution Option amendment. Whatever the rate, KFC collects at least $1,440 a month, a minimum indexed to consumer prices. The calculator uses the ${K.rate(b.royPct)} of a newcomer.</p>
<h2>The Comeback Period and the ad rate</h2>
<p>The advertising contribution is ${K.rate(b.adPct)} of gross revenue from October 1, 2025 through March 31, 2027, the period the document calls the Comeback Period. From April 1, 2027 through December 31, 2028 it is 4.5 % (to come), and from January 1, 2029 it reverts to 2 % unless the National Co-Op changes it. The calculator applies today's ${K.rate(b.adPct)}, which overstates the later years. Fixed fees add ${K.usd(b.fixedYear)} a year: a technology fee of $297.39 a month, which may rise to $450.63, and a One System Fund fee of $180 a month. A digital fee of 3.1 % of revenue from digital orders sits outside the model. Try the later rate below.</p>
${h.mini('fees', { t: 'KFC fees over ten years: change the ad rate', p: ['ad', 'sales', 'yrs'], d: { sales: cat.median!, roy: b.royPct!, ad: b.adPct!, fee: b.feeLow, yrs: 10, fx: b.fixedYear } })}
<h2>A forecast test, not a sales report</h2>
<p>Item 19 describes how a Kalibrate forecast tool projected the sales of ${K.num(b.i19.count!)} single-brand drive-thru outlets in the American Showman or Next Gen image, open at least one year. The projections ran from $545,000 to $3,151,000; actual net sales in fiscal 2025 ran from $387,000 to $3,379,000, and 77 % of projections fell within 22 % of the actual figure. The sample left out 1,263 outlets that did not meet its criteria and 156 franchised outlets that closed in 2025. No average comes out of this, so the calculator uses the median of the Item 19 figures of ${cat.n} chicken brands on this site, ${K.usd(cat.median!)}, a number that says nothing about KFC in particular. With it and the default margin of ${K.rate(K.P.calc.defaultMarginPct)}, your own estimate, payback reads ${K.dec(e.pay!)} years.</p>
<h2>Fewer outlets each year</h2>
<p>Item 20 shows franchised KFC outlets declining in each of the last three years, ending ${b.units.year} at ${K.num(b.units.franchised!)} plus ${K.num(b.units.company!)} company-owned. ${h.a('brand:popeyes', 'Popeyes')}, by contrast, added franchised units, prints an average of ${K.usd(K.i19(pop)!)} for its free-standing restaurants and quotes ${K.range(pop)} without land. A transfer of an existing KFC to a new franchisee costs $9,600 for the first outlet, a route the ${h.a('franchise-for-sale', 'resale page')} covers.</p>
`,
  faqs: [
    { q: 'Does the KFC franchise investment include buying land?', a: `Yes. The ${K.range(b)} estimate in Item 7 is for a newly constructed outlet and includes a real property line of $300,000 to $1,200,000 for the land. That is unusual: most restaurant brands quote a leased site and leave the property out, so their ranges look lower without being comparable.` },
    { q: 'What is the KFC advertising fee after March 2027?', a: `During the Comeback Period, October 1, 2025 through March 31, 2027, franchisees contribute ${K.rate(b.adPct)} of gross revenue to the national co-op. From April 1, 2027 to December 31, 2028 the rate is 4.5 %, and from 2029 it reverts to 2 % unless the co-op by-laws change it. Local advertising is a separate matter.` },
    { q: 'Why does KFC publish no average restaurant sales?', a: `KFC chose to use Item 19 only to show how accurate its sales forecasting tool was: projections against actual net sales for ${K.num(b.i19.count!)} drive-thru outlets, ranging from $387,000 to $3,379,000 in actual sales. It never states an average or median, so a buyer must rely on existing owners and the forecast for a given site.` },
    { q: 'What royalty does a new KFC franchisee pay?', a: `A new outlet of a franchisee who is not a Legacy Franchisee pays ${K.rate(b.royPct)} of gross revenue each month, or $1,440 if that is greater. Legacy Franchisees pay 4 %, and acquired outlets under a Brand Contribution Option can reach ${K.rate(b.royPctHigh!)}. The minimum moves with the Consumer Price Index.` },
  ],
  related: ['brand:popeyes', 'item-19-franchise-earnings', 'fast-food-franchise-cost', 'franchise-for-sale'],
  toolArg: { at: 'mid' },
});
