import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const b = K.B('anytime-fitness');
const e = K.eco('anytime-fitness');
const sn = K.B('snap-fitness');
const line = (x: Brand, re: RegExp) => { const o = x.i19.other.find((y) => re.test(y.label)); if (!o) throw new Error(`${x.slug}: no Item 19 line ${re}`); return o.value; };
const avg = K.i19(b)!;
const members = line(b, /Average Membership Revenue/);
const top = line(b, /fourth \(top\) quartile/);
const low = line(b, /first \(bottom\) quartile/);
const coRev = line(b, /11 company-owned centers \(12 months/);
const coEbitda = line(b, /^EBITDA, 11 company-owned/);
const coTop = line(b, /EBITDA margin, company-owned top third/);
const coLow = line(b, /EBITDA margin, company-owned bottom third/);
const fx = b.fixedYear;
const asPct = (sales: number) => K.pct(fx / sales, 1);
const at8 = (avg * b.royPctHigh!) / 100;

export default defineBrand({
  slug: 'anytime-fitness',
  title: 'Anytime Fitness Franchise Cost 2026: Flat Fees and Item 19',
  description: `Anytime Fitness franchise cost in 2026: ${K.range(b)} to open, a ${K.usd(b.feeLow)} fee, flat monthly royalty and ad fees, and the revenue of ${K.num(b.i19.count!)} centers.`,
  intro: 'Anytime Fitness bills its royalty as a fixed monthly amount, so what the franchisor takes does not move with the revenue of the center.',
  resume: `A start-up Anytime Fitness center of 4,000 to 7,000 square feet in a leased shell is estimated at ${K.range(b)} in the disclosure document of ${K.day(b.issued)}, amended ${K.day(b.amended!)}; ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of it is paid to the franchisor or an affiliate. The standard fee is ${K.usd(b.feeLow)}, with lower fees for veterans and existing owners. There is no royalty percentage: the center pays a Monthly Fee of $842, an advertising fee of $900 and a technology fee of $799, which this site counts as ${K.usd(fx)} a year. Item 19 reports an average total revenue of ${K.usd(avg)} (median ${K.usd(b.i19.median!)}) for ${K.num(b.i19.count!)} franchised centers using AF Coaching over the ${b.i19.period}, and an EBITDA margin of ${K.rate(b.i19.profitPct)} for 11 company-owned centers. The network had ${K.num(b.units.total!)} centers at the end of ${b.units.year}, ${K.num(-b.units.franchisedNetChange!)} fewer than a year before.`,
  body: (h) => `
<h2>A fixed bill instead of a percentage</h2>
<p>Item 6 sets the royalty, called the Monthly Fee, at $842 per center per month, raised each January by the consumer price index. The General Advertising and Marketing Fee is $900 a month and the Base Technology Fee $799 a month, the latter rising 10 % a year, compounded. Together they make the ${K.usd(fx)} of yearly fixed fees in the calculator, which applies no percentage to sales for this brand. A flat bill weighs differently on each center: it equals ${asPct(avg)} of the average revenue in Item 19, ${asPct(low)} for the bottom quartile and ${asPct(top)} for the top quartile.</p>
<p>The flat model is not locked in. The franchisor reserves the right to replace the Monthly Fee with a royalty of up to ${K.rate(b.royPctHigh)} of Gross Revenue on 30 days' notice, and the advertising fee may rise to the greater of $900 a month or ${K.rate(b.adPctHigh)} of Gross Revenue. At ${K.rate(b.royPctHigh)}, the royalty on an average center would be ${K.usd(at8)} a year instead of ${K.usd(b.other.find((o) => /Monthly Fee/.test(o.name))!.annualUsd!)}.</p>
${h.mini('roi', { t: 'Anytime Fitness: flat fees against your own revenue', p: ['sb', 'so', 'm'], d: { b: 'anytime-fitness', sb: 'own', so: 300000 } })}
<h2>Spending outside the fee line</h2>
<p>The investment includes a technology package bought from the affiliate ProVision, $37,857 to $45,462, and three months of rent with the security deposit. Local Marketing Spend of $600, $800 or $1,000 a month depending on the market tier, and a Grand Opening and Ramp Up Program of $11,000 to $23,000, are paid to others. The document also recommends setting aside $1,000 a month in a Club Enhancement Program for the remodel at renewal; it is a reserve, not counted as a fee here. Fee discounts for one location: $37,500 for an existing franchisee, $38,250 for a veteran, $33,750 for a veteran who already owns a center, and $27,500 or $22,500 for the Club Purple and Club Platinum tiers.</p>
<h2>What the Item 19 sample shows</h2>
<p>The average total revenue of ${K.usd(avg)} combines memberships, coaching and pay-per-visit; memberships alone averaged ${K.usd(members)}. Enrollment fees and vending are excluded. Only 39 % of the centers reached the average. For the 11 company-owned centers, nine in Illinois and two in Minnesota, the franchisor restates expenses at franchisee cost and reports ${K.usd(coRev)} of revenue and ${K.usd(coEbitda)} of EBITDA, a margin from ${K.rate(coLow)} in the bottom third to ${K.rate(coTop)} in the top third. That margin excludes owner pay beyond a manager base salary, so it is not the figure to type in the calculator, whose default margin of ${K.rate(K.P.calc.defaultMarginPct)} is a starting estimate; at that default the payback reads ${e.pay === null ? 'never' : `${K.dec(e.pay)} years`}.</p>
<h2>The other flat-fee gym</h2>
<p>Snap Fitness, also on this site, charges flat monthly fees too, counted at ${K.usd(sn.fixedYear)} a year, for an investment of ${K.range(sn)} and an Item 19 average of ${K.usd(K.i19(sn)!)}. ${h.a('brand:planet-fitness', 'Planet Fitness')} works the other way, with a percentage of drafted dues. The ${h.a('franchise-royalty-fees', 'royalty page')} explains how flat and percentage royalties add up over a whole agreement.</p>
`,
  faqs: [
    { q: 'How much is the Anytime Fitness royalty per month?', a: `Item 6 prints a Monthly Fee of $842 per center, adjusted every January for inflation, rather than a share of revenue. With the $900 advertising fee and the $799 technology fee, a center pays ${K.usd(fx)} a year in fixed fees. The franchisor may switch to a royalty of up to ${K.rate(b.royPctHigh)} of Gross Revenue with 30 days' notice.` },
    { q: 'What does an Anytime Fitness center bring in, according to Item 19?', a: `Over the ${b.i19.period}, ${K.num(b.i19.count!)} franchised centers using AF Coaching averaged ${K.usd(avg)} of total revenue, with a median of ${K.usd(b.i19.median!)}. The bottom quarter averaged ${K.usd(low)}, the top quarter ${K.usd(top)}. These are revenues, not profits, and fewer than half of the centers reached the average.` },
    { q: 'Are there discounts on the Anytime Fitness franchise fee?', a: `Yes. The standard fee of ${K.usd(b.feeLow)} drops to $37,500 for an existing franchisee, $38,250 for a veteran and $33,750 for a veteran who already owns a center. Owners in the Club Purple and Club Platinum tiers pay $27,500 and $22,500. A development agreement for two locations costs a new franchisee $75,000.` },
    { q: 'Is the Anytime Fitness network growing?', a: `Item 20 counts ${K.num(b.units.total!)} centers at the end of ${b.units.year}: ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} run by the company. The franchised count fell by ${K.num(-b.units.franchisedNetChange!)} during the year. The list of current and former owners in the document is the place to ask why centers closed or changed hands.` },
  ],
  related: ['fitness-franchise-cost', 'brand:planet-fitness', 'franchise-royalty-fees', 'franchise-break-even'],
  toolArg: { sb: 'auto' },
});
