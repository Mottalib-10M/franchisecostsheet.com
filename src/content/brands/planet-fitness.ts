import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const b = K.B('planet-fitness');
const e = K.eco('planet-fitness');
const eLow = K.eco('planet-fitness', { at: 'low' });
const cr = K.B('crunch-fitness');
const af = K.B('anytime-fitness');
const line = (x: Brand, re: RegExp) => { const o = x.i19.other.find((y) => re.test(y.label)); if (!o) throw new Error(`${x.slug}: no Item 19 line ${re}`); return o.value; };
const bottom = line(b, /franchised clubs, bottom third/);
const upper = line(b, /franchised clubs, upper third/);
const counted = line(b, /Number of franchised clubs/);
const corpMid = line(b, /corporate-owned clubs, middle third/);
const mid = K.i19(b)!;

export default defineBrand({
  slug: 'planet-fitness',
  title: 'Planet Fitness Franchise Cost 2026: Royalty on Dues, Item 19',
  description: `Planet Fitness franchise cost in 2026: ${K.range(b)} with financed equipment, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} of EFT dues as royalty and Item 19 by thirds.`,
  intro: 'Planet Fitness prices its big-box clubs on financed equipment and charges its fees on drafted membership dues rather than on all sales.',
  resume: `A single Planet Fitness club of about 15,000 to 25,000 square feet costs ${K.range(b)} to open under Item 7 of the document Planet Fitness Franchising LLC issued on ${K.day(b.issued)}, a range that assumes the fitness equipment is financed. Bought outright, the same estimate climbs to $2,385,000 to $5,386,000. The fee is ${K.usd(b.feeLow)}, waived when the club comes under an area development agreement. The royalty is ${K.rate(b.royPct)} and the national ad fund ${K.rate(b.adPct)}, both taken on membership dues drafted by electronic funds transfer (EFT), not on total sales, plus a minimum local advertising budget. Item 19 gives no average for all clubs: it splits ${K.num(counted)} franchised clubs open all of 2025 into thirds, and the middle third averaged ${K.usd(mid)} of EFT revenue. Item 20 counts ${K.num(b.units.total!)} clubs at the end of ${b.units.year}, ${K.num(b.units.franchised!)} of them franchised, ${K.num(b.units.franchisedNetChange!)} more than a year earlier.`,
  body: (h) => `
<h2>Two investment totals, one cover page</h2>
<p>The Item 7 table of this document runs from the financed low end to the purchased high end, so the cover page states two ranges. With equipment financed, the estimate is ${K.range(b)}, of which ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to the franchisor or its affiliate: that span is mostly the down payment on equipment, $33,300 to $298,500. With equipment paid in cash, the total is $2,385,000 to $5,386,000, including $333,000 to $1,050,000 paid to the franchisor or an affiliate. This site uses the financed range, the one printed first; the investment in the calculator therefore leaves out the financed balance of the equipment, which you repay on top. Real estate is excluded: the club is leased.</p>
<p>Equipment must come from the affiliate PF Equipment, at $333,000 to $995,000, and Item 6 expects it to be replaced every 5 to 9 years at about the same cost. A remodel of $250,000 to $1,200,000 can be required as often as every 12 years. Those two lines are capital spending, not fees, and the calculator does not spread them over the years.</p>
<h2>Fees on drafted dues</h2>
<p>The ${K.rate(b.royPct)} royalty applies to the monthly and annual membership fees drafted by EFT, and it is charged on the amounts due whether or not the member pays. The National Advertising Fund takes ${K.rate(b.adPct)}, with a ceiling of ${K.rate(b.adPctHigh)}; during 2026 only, the document adds 1 % of monthly EFT on top. Local advertising must reach the greater of $60,000 or 7 % of cumulative monthly EFT in a year (for 2026, the greater of $50,000 or 6 %), and the pre-sale and grand opening campaign can cost up to $120,000. Each new membership also pays a Join Fee to the franchisor of 20 % of the regular monthly fee, or 5 % of a prepaid membership. On the middle-third EFT figure, royalty and national fund alone come to ${K.usd(e.y.royalty + e.y.ad)} a year.</p>
${h.mini('roi', { t: 'Planet Fitness: payback on the financed range', p: ['at', 'm', 'lf'], d: { b: 'planet-fitness', at: 'low' } })}
<h2>Item 19 by thirds</h2>
<p>The franchisor ranks the ${K.num(counted)} franchised clubs open all of 2025 by EFT revenue and prints each third. The bottom third averaged ${K.usd(bottom)}, the middle third ${K.usd(mid)} (median ${K.usd(b.i19.median!)}), the upper third ${K.usd(upper)}. Corporate clubs of the middle third, 90 of them, averaged ${K.usd(corpMid)}. EFT revenue excludes paid-in-full memberships, retail and other income, so total club sales are higher than these figures. Clubs opened in 2025 and eight bought from the company in August 2025 are left out. The document also includes an operating statement for 262 corporate clubs; this site has not recorded its profit lines, and the calculator works on the margin you type, ${K.rate(K.P.calc.defaultMarginPct)} by default. At that margin and the low end of the range, the payback reads ${eLow.pay === null ? 'never' : `${K.dec(eLow.pay)} years`}.</p>
<h2>Against other gyms</h2>
<p>Among big-box gyms on this site, Crunch Fitness asks ${K.range(cr)} and charges ${K.rate(cr.royPct)} plus ${K.rate(cr.adPct)}; its Item 19 is also limited to a middle third. A small 24-hour format such as ${h.a('brand:anytime-fitness', 'Anytime Fitness')} costs ${K.range(af)} and charges flat monthly fees instead of a percentage. The ${h.a('fitness-franchise-cost', 'fitness franchise page')} sets all gyms and studios side by side, and the ${h.fdd('planet-fitness', 'full disclosure document')} is on the Minnesota portal.</p>
`,
  faqs: [
    { q: 'How much does it cost to open a Planet Fitness club?', a: `Item 7 estimates ${K.range(b)} when the fitness equipment is financed, and $2,385,000 to $5,386,000 when it is bought outright. Both ranges are for one leased club of roughly 15,000 to 25,000 square feet and leave out buying the building. Equipment, replaced every 5 to 9 years, comes from an affiliate of the franchisor.` },
    { q: 'Is the Planet Fitness royalty charged on total sales?', a: `No. The ${K.rate(b.royPct)} royalty and the ${K.rate(b.adPct)} national fund are charged on membership fees drafted by electronic funds transfer, the EFT Dues Draft, and on amounts due even when a member does not pay. Retail and other income are outside that base, but a Join Fee of 20 % of the monthly fee is owed on each new membership.` },
    { q: 'Why does the Planet Fitness Item 19 show three averages?', a: `The franchisor publishes no average across all franchised clubs. It sorts the ${K.num(counted)} clubs open all of 2025 into thirds by EFT revenue: ${K.usd(bottom)}, ${K.usd(mid)} and ${K.usd(upper)} on average. This site uses the middle third as its headline because it is the central figure, and the label says so.` },
    { q: 'Can the Planet Fitness franchise fee be waived?', a: `The standard fee is ${K.usd(b.feeLow)}, paid when the franchise agreement is signed. It is currently waived for agreements signed under an area development agreement, which instead charges an Area Development Fee of $10,000 per location, or $30,000 in a territory that was previously terminated. That is why Item 7 shows the fee as $0 to $40,000.` },
  ],
  related: ['fitness-franchise-cost', 'brand:anytime-fitness', 'item-19-franchise-earnings', 'franchise-loan'],
  toolArg: { at: 'low' },
});
