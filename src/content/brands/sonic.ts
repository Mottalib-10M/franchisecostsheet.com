import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('sonic');
const w = K.B('wendys');
const cu = K.B('culvers');
const avg = K.i19(b)!;
const all = K.pctFees(b) + 0.9;

export default defineBrand({
  slug: 'sonic',
  title: `Sonic Franchise Cost 2026: ${K.usd(b.feeLow)} Fee, Royalty Ramp`,
  description: `Sonic franchise cost in 2026: ${K.range(b)} for a leased drive-in, a ${K.usd(b.feeLow)} fee, a ${r(b.royPct)} royalty that starts at 1 %, and ${K.usd(avg)} average sales.`,
  intro: `Sonic's franchise fee is low for a burger brand, and new drive-ins signed by March 31, 2027 start on a royalty of 1 % that climbs to ${r(b.royPct)} in year five.`,
  resume: `Sonic's disclosure document of ${K.day(b.issued)} estimates ${K.range(b)} to open a traditional free-standing drive-in on a leased site, without the cost of buying land or a building. The franchise fee is ${K.usd(b.feeLow)}, and ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of the investment is paid to Sonic. Once open, a drive-in pays a royalty of ${r(b.royPct)} of gross sales, at least ${r(b.adPct)} to advertising, which can reach ${r(b.adPctHigh)}, and 0.90 % to the Sonic Brand Fund, so ${r(all)} of sales at the minimum. A new traditional drive-in signed by March 31, 2027 pays a reduced royalty for its first four years. Item 19 reports an average of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised drive-ins in fiscal 2025. Item 20 counts ${K.num(b.units.total!)} drive-ins at the end of ${b.units.year}, ${K.num(-b.units.franchisedNetChange!)} fewer franchised ones than a year earlier.`,
  body: (h) => `
<h2>A drive-in on a leased site</h2>
<p>The range in Item 7 assumes the franchisee leases the site. The real property line is printed as "Variable", and the cost of acquiring land and a building for a free-standing drive-in is not in the total. Up to ${K.usd(b.toFrHigh!)} goes to Sonic, mostly the franchise fee. A buyer who owns the site carries that capital instead of rent; a tenant carries rent, which then belongs in the margin typed in the calculator.</p>
<h2>Five fee levels for one franchise</h2>
<p>The standard fee is ${K.usd(b.feeLow)}. It drops to $12,500 at the site of a Sonic drive-in another franchisee closed within the last year, or $5,000 there for an existing franchisee in good standing; to $11,250 for non-traditional locations and convenience stores; and to nothing for a relocation. A development agreement costs $10,000 per drive-in, credited against the fee. In fiscal 2025 the fees actually paid ranged from $1,250 to $45,000. Training covers the first three people; each further trainee costs $5,000, and each general manager leadership class $250.</p>
<h2>The royalty ramp for new drive-ins</h2>
<p>For a new traditional drive-in signed by March 31, 2027, the royalty is 1 % in year one, 1.5 % in year two, 2 % in year three, 2.5 % in year four and ${r(b.royPct)} from year five, with an extra 0.5 % of sales collected for the advertising cooperative during the reduced years. The calculator uses the full ${r(b.royPct)}, so it understates the first years' cash for a buyer who qualifies.</p>
${h.mini('fees', { t: 'Sonic: fees over the agreement at the full rates', p: ['sales', 'yrs'], d: { sales: avg, roy: b.royPct!, ad: b.adPct! + 0.9, fee: b.feeLow, yrs: 10 } })}
<p>The mini calculator above adds the 0.90 % brand fund contribution to the ${r(b.adPct)} advertising minimum. Where the market is a developing or new one, the advertising share is higher: 0.5 % to the cooperative and 4.5 % to the Sonic marketing fund, or 5 % to the fund alone. Inspire Payment Services adds about $365 to $565 a month.</p>
<h2>What the drive-ins sold in 2025</h2>
<p>The average annual unit volume of ${K.num(b.i19.count!)} franchised traditional drive-ins open all of fiscal 2025 was ${K.usd(avg)}, and 44 % reached it. The top quartile averaged $2,332,093 and the bottom quartile $919,629, a spread worth noting before relying on any single figure; the best drive-in sold $4,800,647. The 69 drive-ins in gas stations and convenience stores averaged $1,089,017. Two figures in the same item disagree: the lowest volume is $255,308 in one table and $225,308 in another, and the counts with and without a drive-thru lane add up to 3,120 rather than ${K.num(b.i19.count!)}. The figures are sales only; the margin in the calculator, ${r(K.P.calc.defaultMarginPct)} by default, is the reader's estimate.</p>
<h2>Sonic beside Wendy's and Culver's</h2>
<p>${h.a('brand:wendys', "Wendy's")} costs ${K.range(w)} and reports ${K.usd(K.i19(w)!)}, with a lower royalty but a fee more than three times Sonic's. ${h.a('brand:culvers', "Culver's")} includes the land in its ${K.range(cu)} and reports ${K.usd(K.i19(cu)!)}. Sonic's Item 20 shows ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company drive-ins at the end of ${b.units.year}.</p>
`,
  faqs: [
    { q: 'What is the franchise fee for a Sonic Drive-In?', a: `Item 5 prints ${K.usd(b.feeLow)} for a standard traditional drive-in. The fee is $12,500 at a site another franchisee closed within the last year, or $5,000 there for an existing franchisee in good standing, $11,250 for non-traditional locations and convenience stores, and nothing for a relocation. Fees paid in fiscal 2025 ranged from $1,250 to $45,000.` },
    { q: 'How does the reduced Sonic royalty work for a new drive-in?', a: `A new traditional drive-in signed by March 31, 2027 pays 1 % of gross sales in year one, then 1.5 %, 2 % and 2.5 %, and the standard ${r(b.royPct)} from year five. During those reduced years an extra 0.5 % of sales is collected for the advertising cooperative.` },
    { q: 'How much of every sale does a Sonic franchisee pay in fees?', a: `At the minimum, ${r(b.royPct)} royalty, ${r(b.adPct)} for advertising and 0.90 % for the Sonic Brand Fund, or ${r(all)} of gross sales. Advertising can reach ${r(b.adPctHigh)} in developing and new markets, and a cooperative may vote more. Payment services add a monthly charge.` },
  ],
  related: ['brand:wendys', 'brand:culvers', 'franchise-fee', 'fast-food-franchise-cost'],
});
