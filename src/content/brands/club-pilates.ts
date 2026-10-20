import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const b = K.B('club-pilates');
const e = K.eco('club-pilates');
const ot = K.B('orangetheory');
const pb = K.B('pure-barre');
const line = (x: Brand, re: RegExp) => { const o = x.i19.other.find((y) => re.test(y.label)); if (!o) throw new Error(`${x.slug}: no Item 19 line ${re}`); return o.value; };
const avg = K.i19(b)!;
const top = line(b, /1st \(top\) quartile/);
const bot = line(b, /4th \(bottom\) quartile/);
const expanded = line(b, /Expanded Studios/);
const members = line(b, /Monthly Active Members/);
const churn = line(b, /attrition/);
const month12 = line(b, /month 12 after Soft Opening/);
const lostPerMonth = Math.round((members * churn) / 100);
const frShare = b.toFrLow! / b.invLow;

export default defineBrand({
  slug: 'club-pilates',
  title: 'Club Pilates Franchise Cost 2026: Reformer Studio Budget',
  description: `Club Pilates franchise cost in 2026: ${K.range(b)} for a reformer studio, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty and ${K.usd(avg)} average revenue in Item 19.`,
  intro: 'A Club Pilates studio is small, but a large part of its opening budget is paid to the franchisor for the reformers and the fit-out package.',
  resume: `Club Pilates Franchise SPV, LLC puts the cost of one studio, typically 1,500 to 1,800 leased square feet with 12 reformers, at ${K.range(b)} in its disclosure document of ${K.day(b.issued)}, amended ${K.day(b.amended!)}. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} is paid to the franchisor or its affiliates, mostly the ${K.usd(b.feeLow)} franchise fee and the equipment and furnishings package. Each week the studio pays a royalty of ${K.rate(b.royPct)} of gross sales and ${K.rate(b.adPct)} to the Brand Development Fund, and every month a technology fee and a local advertising minimum. Item 19 reports an average gross revenue of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} qualified franchised studios open all of 2025, with no cost or profit figures. All ${K.num(b.units.total!)} studios counted at the end of ${b.units.year} are franchised, and the system added ${K.num(b.units.franchisedNetChange!)} of them during the year.`,
  body: (h) => `
<h2>A budget weighted toward the franchisor</h2>
<p>At the low end of Item 7, ${K.pct(frShare, 0)} of the investment is paid to the franchisor or an affiliate, a high share for any brand. The reason is the Fitness Equipment and Initial FF&E Package, $128,986 to $170,034, which must be bought from them along with other pre-opening items. Initial marketing adds $33,300 to $46,600. The document assumes leased premises; it does not say in so many words that buying real estate is excluded. When an existing franchisee opens a further studio through a franchise broker, a sourcing fee of $28,000 applies on top of the fee, and the document lists sourcing fees of up to $120,000.</p>
<h2>Fee discounts in Item 5</h2>
<p>The ${K.usd(b.feeLow)} fee falls to $48,750 for veterans under the VetFran program and to $55,000 for an existing franchisee's second or later studio. Multi-unit development adds a $10,000 development fee for each studio after the first.</p>
<h2>Ongoing charges</h2>
<p>On the Item 19 average, the royalty comes to ${K.usd(e.y.royalty)} a year and the fund to ${K.usd(e.y.ad)}. Local advertising must reach the greater of $1,500 or 2 % of the prior month's gross sales; fund, co-op and local spending together are capped at 7 % a month. The technology fee is $550 a month, $150 during the pre-sale phase, and may rise 10 % a year. The calculator counts that fee, ${K.usd(b.fixedYear)} a year, and leaves out music licensing, charged at the providers' rates. The transfer fee is $10,000.</p>
${h.mini('roi', { t: 'Club Pilates: payback across the Item 7 range', p: ['at', 'm'], d: { b: 'club-pilates', at: 'high' } })}
<h2>Members, churn and the first year</h2>
<p>Studios in the sample averaged ${K.num(members)} active members a month and lost ${K.rate(churn)} of them each month, about ${K.num(lostPerMonth)} members a month to replace at that average. Eighteen studios opened in 2025 averaged ${K.usd(month12)} of gross revenue in their twelfth month after soft opening, a pace of ${K.usd(month12 * 12)} a year if held. The top quarter averaged ${K.usd(top)} and the bottom quarter ${K.usd(bot)}; the 19 expanded studios with more than 12 reformers, kept out of the headline, averaged ${K.usd(expanded)}. Gross Revenue in Item 19 is defined differently from Gross Sales in the franchise agreement, the base of the royalty. With no costs printed, the margin is your entry: ${K.rate(K.P.calc.defaultMarginPct)} by default, a value to replace.</p>
<h2>Two studio formats compared</h2>
<p>${h.a('brand:orangetheory', 'Orangetheory')} takes the same ${K.rate(ot.royPct)} royalty, a ${K.rate(ot.adPct)} fund and reports ${K.usd(K.i19(ot)!)} of average sales, for ${K.range(ot)}. Pure Barre, another boutique format, estimates ${K.range(pb)} and reports ${K.usd(K.i19(pb)!)}. The ${h.fdd('club-pilates', 'Club Pilates disclosure document')} gives the quartile tables in full.</p>
`,
  faqs: [
    { q: 'How much money do you need to open a Club Pilates studio?', a: `Item 7 gives ${K.range(b)} for one studio of about 1,500 to 1,800 square feet with 12 reformers, in leased space. That includes ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} paid to the franchisor or its affiliates for the fee, equipment and furnishings, plus build-out, marketing and working capital.` },
    { q: 'What is the Club Pilates franchise fee for veterans?', a: `Veterans who qualify under the VetFran program pay $48,750 instead of the standard ${K.usd(b.feeLow)}. An existing franchisee opening a second or later studio pays $55,000. A sourcing fee is added when a franchise broker is owed a commission, which the document lists separately from the franchise fee.` },
    { q: 'How many members does a Club Pilates studio have on average?', a: `The ${K.num(b.i19.count!)} qualified studios in Item 19 averaged ${K.num(members)} active members a month during 2025, with a monthly attrition rate of ${K.rate(churn)}. Average gross revenue was ${K.usd(avg)}. Studios opened in 2025, non-traditional sites and expanded studios are excluded from those averages.` },
  ],
  related: ['brand:orangetheory', 'fitness-franchise-cost', 'franchise-fee', 'compare-franchises'],
  toolArg: { at: 'mid' },
});
