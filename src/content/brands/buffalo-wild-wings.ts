import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('buffalo-wild-wings');
const ab = K.B('applebees');
const bo = K.B('bojangles');
const e = K.eco('buffalo-wild-wings');
const q = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const top = q('1st (top) quartile');
const bottom = q('4th (bottom) quartile');

export default defineBrand({
  slug: 'buffalo-wild-wings',
  title: 'Buffalo Wild Wings Franchise Cost 2026: Fees and Sales',
  description: `Buffalo Wild Wings franchise cost in 2026: ${K.range(b)} for a sports bar, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} ad fund and ${K.usd(K.i19(b)!)} average sales.`,
  intro: `A Buffalo Wild Wings sports bar is one of the largest investments on this site, and the brand prints sales by quartile. The calculator below starts from the average of the franchised bars.`,
  resume: `A new free-standing Buffalo Wild Wings sports bar is estimated at ${K.range(b)} in Item 7 of the disclosure document Buffalo Wild Wings International, Inc. issued on ${K.day(b.issued)}, before land, site work and demolition. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of it goes to the franchisor or an affiliate, starting with a ${K.usd(b.feeLow)} franchise fee. The open bar then pays a ${K.rate(b.royPct)} royalty on gross sales every Friday and ${K.rate(b.adPct)} to the advertising fund, which may rise to ${K.rate(b.adPctHigh)} during the initial term, plus at least 0.25 % to a local co-op. Item 19 reports average gross sales of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for the ${K.num(b.i19.count!)} franchised bars open all of fiscal 2025, with no costs or profit. At the end of ${b.units.year}, ${K.num(b.units.franchised!)} of the ${K.num(b.units.total!)} bars in the United States were franchised; the company ran the rest.`,
  body: (h) => `
<h2>A bar with a liquor license, not a counter restaurant</h2>
<p>The ${K.range(b)} range describes a free-standing sports bar of about 3,500 to 6,500 square feet. A bar in a shopping center or a conversion of an existing building is estimated lower, at $2,463,945 to $4,500,320, and the cover page of the document mixes the two ranges. Land, site work and demolition are left out. Because these bars sell alcohol, Item 7 carries a liquor license line of $5,000 to $500,000, and the document warns that a license can cost $1,000,000 or more in some East Coast areas. A bar at a non-traditional location, such as an arena, pays a reduced fee of $12,500 and 2 % to the ad fund instead of ${K.rate(b.adPct)}.</p>
<h2>Royalty credits that change the first years</h2>
<p>The headline royalty is ${K.rate(b.royPct)} of gross sales, but the document attaches incentives to it. A franchisee who signs for a new bar by March 31, 2027 receives a royalty credit of $325,000 per bar under the standard incentive. Opening early can bring up to six months at a 0 % royalty, and veterans receive a $10,000 royalty credit per bar, up to $100,000. In the second half of the term the royalty becomes the greater of ${K.rate(b.royPct)} or the rate then in force, with the increase capped at 0.5 %. The calculator ignores credits: it charges the full rate from day one, so year one looks heavier than it would for a franchisee who qualifies. Item 6 also lists a 2.2 % contribution on loyalty program sales, a menu database fee of $300 to $420 a year and convention registration of $550 to $1,000 per person, none of which the calculator counts.</p>
${h.mini('breakeven', { t: 'Buffalo Wild Wings: sales needed to break even', p: ['m', 'lf'], d: { b: 'buffalo-wild-wings', lf: 70 } })}
<h2>Four quartiles of sales</h2>
<p>Rather than a single average, Item 19 splits the ${K.num(b.i19.count!)} reporting bars into four groups of 133. The top quartile averaged ${K.usd(top)} in fiscal 2025 and the bottom quartile ${K.usd(bottom)}, a gap of more than two to one between bars carrying the same name. The figures exclude the 15 bars opened during 2025, bars closed for long periods and every company-owned bar, and the bars in the sample have been open 15.1 years on average. A newly built bar has no such history behind it. At the ${K.rate(K.P.calc.defaultMarginPct)} starting margin, which is the reader's estimate and not a published figure, the average sales would leave ${K.usd(e.y.cashBeforeDebt)} a year after royalty and ad fund, before any loan.</p>
<h2>Against other large restaurant formats</h2>
<p>${h.a('brand:applebees', "Applebee's")}, the closest sit-down format read here, estimates ${K.range(ab)} for its newest prototype and charges ${K.rate(ab.royPct)} plus ${K.rate(ab.adPct)}. Within the chicken category, Bojangles asks ${K.range(bo)} with a ${K.rate(bo.royPct)} royalty and a ${K.rate(bo.adPct)} ad fund. All three need several million dollars per unit, yet unlike Applebee's, Buffalo Wild Wings runs more units itself than it franchises, and its count moved in two directions in 2025: ${K.num(b.units.franchisedNetChange!)} more franchised bars, fewer company bars, and a total down by five. A buyer can also check the ${h.a('franchise-royalty-fees', 'royalty page')} for how the percentages compare across categories. The ${h.fdd('buffalo-wild-wings')} is on the Minnesota portal.</p>
`,
  faqs: [
    { q: 'How much money do you need to open a Buffalo Wild Wings franchise?', a: `Item 7 estimates ${K.range(b)} for a new free-standing sports bar, and $2,463,945 to $4,500,320 for a bar in an existing building or shopping center. Land, site work and demolition are extra, and a liquor license alone can run from $5,000 to $500,000, or more in some East Coast markets.` },
    { q: 'What royalty does a Buffalo Wild Wings franchisee pay?', a: `The royalty is ${K.rate(b.royPct)} of gross sales, paid weekly, with ${K.rate(b.adPct)} more to the advertising fund and at least 0.25 % to a local co-op. Signing for a new bar by March 31, 2027 brings a royalty credit of $325,000 per bar, and the rate can be reset in the second half of the term.` },
    { q: 'What are the average sales of a Buffalo Wild Wings sports bar?', a: `The ${K.num(b.i19.count!)} franchised bars open all of fiscal 2025 averaged ${K.usd(K.i19(b)!)} in gross sales, with a median of ${K.usd(b.i19.median!)}. The top quartile averaged ${K.usd(top)} and the bottom quartile ${K.usd(bottom)}. Item 19 gives sales only, so costs, rent and profit must come from your own estimates.` },
    { q: 'Are most Buffalo Wild Wings bars owned by franchisees?', a: `No. Item 20 counts ${K.num(b.units.total!)} bars in the United States at the end of ${b.units.year}, of which ${K.num(b.units.franchised!)} were franchised and ${K.num(b.units.company!)} were run by the company. The franchised count grew by ${K.num(b.units.franchisedNetChange!)} during the year while the company count fell.` },
  ],
  related: ['brand:applebees', 'fast-food-franchise-cost', 'item-19-franchise-earnings', 'franchise-loan'],
});
