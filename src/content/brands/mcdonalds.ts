import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('mcdonalds');
const w = K.B('wendys');
const bk = K.B('burger-king');
const avg = K.i19(b)!;
const e = K.eco('mcdonalds');

export default defineBrand({
  slug: 'mcdonalds',
  title: `McDonald's Franchise Cost: Fee, Rent and ${r(b.royPct)} Royalty`,
  description: `McDonald's franchise cost, 2024 FDD: ${K.range(b)} plus rent to McDonald's of 10.00 % of sales and up, a ${r(b.royPct)} royalty, and ${K.usd(avg)} average sales.`,
  intro: `McDonald's is the landlord of its franchisees, and the rent it charges is a share of sales on top of the royalty. The latest document on file in Minnesota dates from 2024 and describes the year 2023.`,
  resume: `The McDonald's disclosure document on file in Minnesota was issued on ${K.day(b.issued)} and amended on ${K.day(b.amended!)}; its Item 19 and Item 20 describe ${b.units.year}. Opening a traditional restaurant costs ${K.range(b)}, a range that covers equipment, signs, seating and decor but not the land or the building, which McDonald's owns or leases and then rents to the franchisee. The initial fee is ${K.usd(b.feeLow)}, and ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of the investment goes to McDonald's, including up to three months of base rent. Each month the franchisee pays a royalty of ${r(b.royPct)} of gross sales, spends at least ${r(b.adPct)} on advertising, and pays McDonald's a base rent plus a percentage rent that starts at 10.00 % of sales for new restaurants. Franchised restaurants open a full year averaged ${K.usd(avg)} in sales in ${b.i19.period}, and the system counted ${K.num(b.units.total!)} restaurants.`,
  body: (h) => `
<h2>A 2024 document describing 2023</h2>
<p>No newer McDonald's disclosure document was on file with the Minnesota Department of Commerce when this page was written: the one used here was issued on ${K.day(b.issued)} and amended on ${K.day(b.amended!)}. Its sales figures and outlet counts are for ${b.units.year}. Before signing anything, a buyer receives the current document, which may print different fees and different averages; ${h.fdd('mcdonalds', 'the copy read for this page')} is the reference for every figure below.</p>
<h2>The rent is the largest fee</h2>
<p>McDonald's acquires the real estate and builds the restaurant, then franchises the right to operate at that address. The franchisee pays a monthly base rent and a fixed percentage rent on gross sales. For new traditional restaurants opened on or after January 1, 2020, that percentage is 10.00 % when development costs are up to $1,550,000, and it rises by 0.25 % per cost step, to 15.00 % for a restaurant that cost $3,210,001 to $3,310,000. Item 7 shows percentage rent of 0.00 % to 28.00 %, and Item 19 reports effective rent of 0.00 % to 33.30 % among franchised restaurants in 2023. A franchisee may lower the percentage by co-investing in the restaurant, at no less than $30,000 per quarter point, outside the Item 7 total. The Item 7 totals, the document warns, "do not include percentage rent or royalty".</p>
<p>The calculator on this page counts the royalty, the advertising spend and ${K.usd(b.fixedYear)} of yearly technology fees, but not the rent, because the rent depends on the site. Put it in your margin: the figure you type should be what is left after food, labor, rent to McDonald's and overhead. At the site's starting value of ${r(K.P.calc.defaultMarginPct)}, which is a reader's estimate and not a published figure, the Item 19 average leaves ${K.usd(e.y.cashBeforeDebt)} a year after fees. If your rent is 10.00 % of sales, the margin you type must already be net of it.</p>
${h.mini('roi', { t: "McDonald's: margin after rent to McDonald's", p: ['m', 'at'], d: { b: 'mcdonalds', m: 15 } })}
<h2>Fee, royalty, advertising</h2>
<p>The ${K.usd(b.feeLow)} fee is paid when the restaurant opens and is refunded in full if construction is not completed within a year of signing. It is prorated when the real estate tenure or the agreed term is ten years or less. Small town oil and small town retail locations pay $22,500, and satellite locations $500 (none in Walmart stores) plus an annual fee of $500 to $2,500. The royalty is ${r(b.royPct)} of gross sales for new restaurants and 4 % for some existing franchisees. The advertising requirement is to spend at least ${r(b.adPct)} of gross sales a year through franchisee cooperatives, not to pay it to McDonald's; the national fund currently takes 2.00 % of sales. About twenty technology services are billed yearly, from $45 for eProduction to $2,303 for deployment and support.</p>
<h2>What Item 19 shows for 2023</h2>
<p>Approximately ${K.num(b.i19.count!)} franchised traditional restaurants open at least a year averaged ${K.usd(avg)}, with a median of ${K.usd(b.i19.median!)}. The 633 or so company restaurants averaged $4,711,000. Sales ranged from $1,098,000 to $19,556,000, and 78 % of franchised restaurants sold more than $3,000,000. The document also prints a pro forma: at $3,000,000 of product sales, operating income before occupancy costs is $762,000, and at $3,400,000 it is $903,000, before rent, royalty, depreciation, interest and taxes, and at a royalty of 4 % at the time. That pro forma is the closest the document comes to a margin, and the rent still has to come out of it.</p>
<h2>Against Wendy's and Burger King</h2>
<p>${h.a('brand:wendys', "Wendy's")} estimates ${K.range(w)} and ${h.a('brand:burger-king', 'Burger King')} ${K.range(bk)}, both without land, and both print average franchise sales well below ${K.usd(avg)}: ${K.usd(K.i19(w)!)} and ${K.usd(K.i19(bk)!)}. Neither makes every franchisee its tenant. Item 20 counts ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company restaurants at the end of ${b.units.year}, a net change of ${K.num(b.units.franchisedNetChange!)} franchised units in the year. In 2023, 5 of the 20 company restaurants McDonald's sold went over the high end of the Item 7 range, by up to $2,297,182.</p>
`,
  faqs: [
    { q: "Does a McDonald's franchisee pay rent to McDonald's?", a: `Yes. McDonald's acquires the land and the building and the franchisee pays a monthly base rent plus a percentage of gross sales. For new traditional restaurants since 2020 the percentage starts at 10.00 % and rises with development costs. Item 19 reports effective rents of 0.00 % to 33.30 % in 2023. This rent is not in the Item 7 total.` },
    { q: "How much is the McDonald's initial franchise fee?", a: `Item 5 prints ${K.usd(b.feeLow)}, paid when the restaurant opens. Small town oil and retail locations pay $22,500 and satellite locations $500 plus an annual fee. The fee is prorated for terms of ten years or less and refunded in full if construction is not completed within a year of signing.` },
    { q: "Why are the McDonald's figures from 2023?", a: `The latest McDonald's document on file in Minnesota was issued on ${K.day(b.issued)} and amended on ${K.day(b.amended!)}. Its Item 19 sales and Item 20 counts describe 2023. The current document handed to a buyer may show later figures, so check the edition date of the one you receive.` },
    { q: "What do McDonald's restaurants sell in a year on average?", a: `Approximately ${K.num(b.i19.count!)} franchised traditional restaurants open at least a year averaged ${K.usd(avg)} in 2023, with a median of ${K.usd(b.i19.median!)}. Company restaurants averaged $4,711,000. These are sales, not profit: rent, royalty, advertising and every operating cost still come out of them.` },
  ],
  related: ['brand:wendys', 'brand:burger-king', 'item-19-franchise-earnings', 'franchise-royalty-fees'],
  toolArg: { at: 'mid' },
});
