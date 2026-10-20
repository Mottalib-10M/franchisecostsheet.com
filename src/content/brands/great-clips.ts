import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const b = K.B('great-clips');
const sc = K.B('supercuts');
const ewc = K.B('european-wax-center');
const line = (x: Brand, re: RegExp) => { const o = x.i19.other.find((y) => re.test(y.label)); if (!o) throw new Error(`${x.slug}: no Item 19 line ${re}`); return o.value; };
const avg = K.i19(b)!;
const ocf = line(b, /^Average Operating Cash Flow \(dollars\)/);
const ocfPct = b.i19.profitPct!;
const ocfMed = line(b, /^Median Operating Cash Flow/);
const repSales = line(b, /^Average Total Sales, 2,376/);
const labor = line(b, /^Labor as %/);
const occ = line(b, /^Occupancy as %/);
const under = line(b, /under \$250K/);
const over = line(b, /over \$600K/);
const e = K.eco('great-clips');
const eOwn = K.eco('great-clips', { m: Number((ocfPct + K.pctFees(b)).toFixed(2)) });

export default defineBrand({
  slug: 'great-clips',
  title: 'Great Clips Franchise Cost 2026: Salon Fees, Cash Flow',
  description: `Great Clips franchise cost in 2026: ${K.range(b)} per salon, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty plus ${K.rate(b.adPct)} ad fund, and the cash flow printed in Item 19.`,
  intro: 'Great Clips is one of the few brands on this site that prints an operating cash flow for its franchised units, not only their sales.',
  resume: `One Great Clips salon in leased shopping-center space costs ${K.range(b)} to open, according to Item 7 of the document Great Clips, Inc. issued on ${K.day(b.issued)}. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of it is paid to Great Clips or an affiliate: the ${K.usd(b.feeLow)} franchise fee, a $5,000 initial advertising contribution, and fixtures, signs, flooring and inventory bought from the franchisor. The salon then pays ${K.rate(b.royPct)} of gross sales as royalty and ${K.rate(b.adPct)} to the ad fund, both every two weeks, ${K.rate(K.pctFees(b))} in all. Item 19 reports average total sales of ${K.usd(avg)} (median ${K.usd(b.i19.median!)}) for ${K.num(b.i19.count!)} franchised salons in the United States and Canada open all of 2025, and an average operating cash flow of ${K.usd(ocf)}, ${K.rate(ocfPct)} of sales, for the salons that sent in financial statements. All ${K.num(b.units.total!)} salons at the end of ${b.units.year} were franchised.`,
  body: (h) => `
<h2>Small investment, many required purchases</h2>
<p>A salon is a small unit, and a large slice of its opening budget passes through the franchisor. Fixtures, signage, flooring and the initial inventory must be bought from Great Clips, an estimated $48,700 to $71,600; architecture fees run $100 to $3,800 and a lease review $2,200 to $2,500. The space is leased, so real estate is outside the range. A remodel is required every seven to 10 years, at $20,000 to $80,000, and maintenance costs $3,000 to $9,000 a year.</p>
<p>Fee arrangements vary. Veterans under VetFran get a $5,000 rebate on their first salon. Under a Master Development Agreement each salon carries a $4,000 development fee plus a $6,000 franchise fee, and the Three Star Program prices three agreements at a $35,000 program fee plus $5,000 to the ad fund.</p>
<h2>Fees every other week</h2>
<p>Royalty and ad fund total ${K.rate(K.pctFees(b))} of gross sales, ${K.usd(e.y.royalty + e.y.ad)} a year at the Item 19 average. The document adds that a salon will likely need another 1 to 3 % of gross sales for its own local advertising, and co-op dues average $100 a month. The calculator counts the fixed lines of Item 6, a training fee, a recruiting technology fee and co-op dues, at ${K.usd(b.fixedYear)} a year. The assignment fee for a transfer is $1,500 per salon.</p>
<h2>What the cash flow table says</h2>
<p>Of the salons in the sales table, 2,376 submitted unaudited financial statements. They averaged ${K.usd(repSales)} of sales and ${K.usd(ocf)} of operating cash flow (median ${K.usd(ocfMed)}). Labor took ${K.rate(labor)} of sales and occupancy ${K.rate(occ)}. The spread is wide: salons under $250,000 of sales averaged ${K.rate(under)}, those above $600,000 reached ${K.rate(over)}. Operating cash flow is defined before income taxes, depreciation, amortization and capital reserves, and before the pay of a general manager or the franchisee when it can be identified, so it overstates what an owner keeps. Sales of Canadian salons were converted at 0.71.</p>
<p>The calculator does not use this cash flow: its margin, ${K.rate(K.P.calc.defaultMarginPct)} by default, is what you assume before franchise fees. If you read the printed ${K.rate(ocfPct)} as a result after royalty and ad fund, the equivalent entry is about ${K.rate(Number((ocfPct + K.pctFees(b)).toFixed(2)))}, and the payback at the middle of the range would read ${eOwn.pay === null ? 'never' : `${K.dec(eOwn.pay)} years`}; whether that reading holds is for the document's definitions and your accountant to settle.</p>
${h.mini('roi', { t: 'Great Clips: try your own margin', p: ['m', 'at', 'lf'], d: { b: 'great-clips' } })}
<h2>Against Supercuts and a wax center</h2>
<p>Supercuts, the closest format on this site, estimates ${K.range(sc)}, charges ${K.rate(sc.royPct)} plus ${K.rate(sc.adPct)} and reports ${K.usd(K.i19(sc)!)} of average sales. ${h.a('brand:european-wax-center', 'European Wax Center')} needs ${K.range(ewc)} and takes ${K.rate(K.pctFees(ewc))} of sales. Item 20 shows Great Clips grew by ${K.num(b.units.franchisedNetChange!)} salons net in ${b.units.year}. Details are in the ${h.fdd('great-clips', 'Great Clips disclosure document')}.</p>
`,
  faqs: [
    { q: 'What is the total cost of opening a Great Clips salon?', a: `Item 7 gives ${K.range(b)} for one salon in leased space. The total includes the ${K.usd(b.feeLow)} franchise fee, a $5,000 initial ad contribution, fixtures and inventory bought from Great Clips, build-out and working capital. ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of it is paid to the franchisor or an affiliate.` },
    { q: 'How much cash flow does a Great Clips salon produce?', a: `For 2,376 salons that submitted statements for 2025, Item 19 prints an average operating cash flow of ${K.usd(ocf)}, ${K.rate(ocfPct)} of sales, and a median of ${K.usd(ocfMed)}. The figure excludes taxes, depreciation, capital reserves and, where identifiable, the owner's or manager's labor, so it is not take-home pay.` },
    { q: 'Do Great Clips owners usually run more than one salon?', a: 'The document notes that many franchisees operate several salons: owners who have been in the system five years or more run 8.5 salons on average. A Master Development Agreement and the Three Star Program are the routes for signing several agreements at once, each with its own fee schedule.' },
    { q: 'What percentage of sales does Great Clips take?', a: `A ${K.rate(b.royPct)} continuing franchise fee and a ${K.rate(b.adPct)} advertising contribution, ${K.rate(K.pctFees(b))} of gross sales, collected every two weeks. Small fixed fees for training and recruiting technology come on top, and the document expects another 1 to 3 % of sales spent on local advertising.` },
  ],
  related: ['brand:european-wax-center', 'cheapest-franchises', 'item-19-franchise-earnings', 'franchise-royalty-fees'],
});
