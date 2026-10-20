import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const b = K.B('orangetheory');
const e = K.eco('orangetheory');
const cp = K.B('club-pilates');
const pb = K.B('pure-barre');
const line = (x: Brand, re: RegExp) => { const o = x.i19.other.find((y) => re.test(y.label)); if (!o) throw new Error(`${x.slug}: no Item 19 line ${re}`); return o.value; };
const q1 = line(b, /top quartile/);
const q2 = line(b, /second quartile/);
const q3 = line(b, /third quartile/);
const q4 = line(b, /fourth \(bottom\) quartile/);
const hi = line(b, /Highest/);
const lo = line(b, /Lowest/);
const mem = line(b, /Member Count/);
const avg = K.i19(b)!;
/** Minimum performance standards printed in the document (special): yearly Gross Sales floors. */
const floors = [300000, 350000, 400000];
const minRoy = floors.map((f) => (f * b.royPct!) / 100);

export default defineBrand({
  slug: 'orangetheory',
  title: 'Orangetheory Franchise Cost 2026: Studio Fees and Sales',
  description: `Orangetheory franchise cost in 2026: ${K.range(b)} per studio, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} brand fund and ${K.usd(avg)} average Item 19 sales.`,
  intro: 'An Orangetheory studio carries one of the higher percentage fee loads among fitness brands here, plus a sales floor that sets a minimum royalty.',
  resume: `OTF Franchisor, LLC estimates the cost of one Orangetheory Fitness studio at ${K.range(b)} in the disclosure document issued ${K.day(b.issued)} and amended ${K.day(b.amended!)}, for a leased space of 1,750 to 4,800 square feet. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of that goes to the franchisor or an affiliate, chiefly the ${K.usd(b.feeLow)} franchise fee and the equipment sold by OTF Sourcing. The studio then pays ${K.rate(b.royPct)} of gross sales as royalty every week and currently ${K.rate(b.adPct)} to the brand fund, which may go up to ${K.rate(b.adPctHigh)}, plus a technology fee and heart-rate system fees. Item 19 reports average total gross sales of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised studios over the ${b.i19.period}. Item 20 shows ${K.num(b.units.total!)} studios at the end of ${b.units.year}, after a net drop of ${K.num(-b.units.franchisedNetChange!)} franchised studios.`,
  body: (h) => `
<h2>Where the opening money goes</h2>
<p>The Item 7 range covers a leased studio, typically 3,100 square feet, with the build-out, signs, the opening campaign and working capital; it does not include buying property. Fitness equipment, the OTbeat heart-rate system and retail merchandise must be bought from the affiliate OTF Sourcing, the equipment alone at $114,323 to $158,624, which explains why the franchisor's share of the investment is large for a studio. Pre-sale and grand opening advertising is estimated at $36,000 to $45,000. Fees actually paid in 2025 ran from $0 to $59,950, and area development packages price three studios at $150,000 ($135,000 for veterans or existing franchisees, $121,500 for existing franchisees who are veterans) and five at $237,500.</p>
<h2>Weekly percentage, monthly technology</h2>
<p>On the Item 19 average, the ${K.rate(b.royPct)} royalty is ${K.usd(e.y.royalty)} a year and the ${K.rate(b.adPct)} brand fund ${K.usd(e.y.ad)}. Local advertising must reach at least the greater of 2 % of the prior month's gross sales or $2,500 a month, on top of the fund. The technology fee of $899 a month climbs 10 % a year, compounded, and OTbeat costs $149 a month (it may rise to $500); the calculator counts both at today's rates, ${K.usd(b.fixedYear)} a year. Product and promotional purchases typically add $5,000 to $11,000 a year.</p>
<h2>A floor under the royalty</h2>
<p>The franchise agreement sets minimum gross sales of $300,000 in the first year, $350,000 in the second and $400,000 from the third. A studio below the floor pays the royalty it would have owed at the floor, which at ${K.rate(b.royPct)} means at least ${minRoy.map(K.usd).join(', ')} in those years. The lowest studio in the Item 19 sample sold ${K.usd(lo)} over the period, under every floor.</p>
${h.mini('breakeven', { t: 'Orangetheory: sales needed to break even', p: ['m', 'lf', 'at'], d: { b: 'orangetheory', lf: 70 } })}
<h2>Reading the quartiles</h2>
<p>Ranked by sales, the four quarters of studios averaged ${K.usd(q1)}, ${K.usd(q2)}, ${K.usd(q3)} and ${K.usd(q4)}; the best studio reached ${K.usd(hi)}. Only 518 studios, 44 %, met or beat the overall average, and the 95 franchised studios that closed permanently during the period are not in the figures. The average studio counted ${K.num(mem)} members a month. The sales are gross: no cost or profit is printed, so the margin in the calculator, ${K.rate(K.P.calc.defaultMarginPct)} unless you change it, is your own assumption.</p>
<p>Next to it, ${h.a('brand:club-pilates', 'Club Pilates')} also charges ${K.rate(cp.royPct)} with a ${K.rate(cp.adPct)} fund and reports ${K.usd(K.i19(cp)!)} of average revenue for ${K.range(cp)} invested, while Pure Barre asks ${K.range(pb)}. The ${h.fdd('orangetheory', 'Orangetheory document')} has the full tables.</p>
`,
  faqs: [
    { q: 'What does an Orangetheory studio cost to open in 2026?', a: `Item 7 estimates ${K.range(b)} for one studio in leased space of 1,750 to 4,800 square feet. The figure includes the ${K.usd(b.feeLow)} franchise fee, equipment bought from the affiliate OTF Sourcing, build-out, opening advertising and working capital, but not the purchase of a building.` },
    { q: 'What happens if an Orangetheory studio misses its sales minimum?', a: 'The franchise agreement sets gross sales floors of $300,000 in year one, $350,000 in year two and $400,000 from year three on. A studio that falls short owes the royalty shortfall, as if it had reached the floor. The calculator on this page does not apply that floor, so a low sales figure typed there understates what such a studio would owe.' },
    { q: 'How much do Orangetheory franchisees pay in ongoing fees?', a: `A royalty of ${K.rate(b.royPct)} of gross sales, weekly, and a brand fund of ${K.rate(b.adPct)} that may rise to ${K.rate(b.adPctHigh)}. Local advertising adds at least the greater of 2 % of sales or $2,500 a month. The technology fee is $899 a month and OTbeat $149 a month, both set to increase over time.` },
    { q: 'How many Orangetheory studios beat the Item 19 average?', a: `Of the ${K.num(b.i19.count!)} franchised studios open for the full period, 518, or 44 %, met or exceeded the average of ${K.usd(avg)}. The median was ${K.usd(b.i19.median!)}. Studios that closed during the period, 95 of them, are excluded, which lifts the figures compared with the whole network.` },
  ],
  related: ['brand:club-pilates', 'fitness-franchise-cost', 'franchise-break-even', 'item-19-franchise-earnings'],
});
