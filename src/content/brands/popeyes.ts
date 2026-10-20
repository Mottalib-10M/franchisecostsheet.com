import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('popeyes');
const e = K.eco('popeyes');
const kfc = K.B('kfc');
const cfa = K.B('chick-fil-a');
const m = K.rate(K.P.calc.defaultMarginPct);

export default defineBrand({
  slug: 'popeyes',
  title: `Popeyes Franchise Cost 2026: ${K.usd(b.feeLow)} Fee and Item 19 Sales`,
  description: `Popeyes franchise cost in 2026: ${K.range(b)} for a free-standing unit before land, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty and average sales in Item 19.`,
  intro: `Popeyes prints both an average sales figure and profit tables by sales band, which few chicken brands do. The calculator starts from that average for a free-standing restaurant.`,
  resume: `A new free-standing Popeyes Louisiana Kitchen costs ${K.range(b)} to open, not counting land or a building, according to Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)}. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of that is paid to Popeyes or its affiliates, starting with the ${K.usd(b.feeLow)} initial fee. The restaurant then pays ${K.rate(b.royPct)} of gross sales as royalty each week and 4.6 % to ${K.rate(b.adPct)} to the advertising fund, plus about ${K.usd(b.fixedYear)} a year of fixed fees. Item 19 reports that the ${K.num(b.i19.count!)} franchised free-standing restaurants open all of fiscal 2025 averaged ${K.usd(K.i19(b)!)} in sales, with a median of ${K.usd(b.i19.median!)}. Item 20 counts ${K.num(b.units.total!)} Popeyes outlets in the United States at the end of ${b.units.year}, ${K.num(b.units.franchised!)} of them franchised, up ${K.num(b.units.franchisedNetChange!)} franchised units in the year.`,
  body: (h) => `
<h2>Two buildings, two budgets</h2>
<p>The ${K.usd(b.invLow)} to ${K.usd(b.invHigh)} range is for a new free-standing restaurant and leaves out real estate entirely: the site is bought or leased on top. The same Item 7 prices an in-line unit, set inside a strip of shops, at $504,545 to $1,968,245. The amount paid to the franchisor printed on the cover, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, is one figure for both formats. One cost is easy to miss: a franchisee who hires a construction management firm outside the Qualified Partners list pays Popeyes $20,000 to $80,000 for the review of the project.</p>
<h2>A fee with several discounts</h2>
<p>The standard fee in Item 5 is ${K.usd(b.feeLow)}, paid before opening. The Veterans Development Incentive Program cuts it to $27,500 for the first new restaurant of a new franchisee, with a royalty of 2 % for six months. College and airport sites carry a $12,500 fee and no advertising contribution. Under a development agreement, a deposit of $25,000 per committed restaurant is credited against the fee. The fees Popeyes actually collected in fiscal 2025 ran from $0 to $50,000, which shows how often the list price moves.</p>
<h2>Royalty, ad fund and the test program</h2>
<p>The royalty is ${K.rate(b.royPct)} of gross sales, paid weekly, yet the document notes that the royalties actually paid in 2025 ranged from 2 % to 10 %, and non-traditional sites may negotiate 2 % to 8 %. The advertising line reads 4.6 % to ${K.rate(b.adPct)}: every new franchisee joins the Ad Fund Test Program at ${K.rate(b.adPctHigh!)} from April 1, 2025, which may rise to 5.25 % as early as May 1, 2026 and to 5.50 % as early as May 1, 2027 (to come), if restaurant EBITDA targets are met. The calculator uses the new franchisee's rate, ${K.rate(b.adPct)}. A local co-op takes another 0.5 % to 1.75 %. The fixed fees counted here, ${K.usd(b.fixedYear)} a year, cover the POP I.T. fee, the training platform, the PLK Foundation, guest recovery and food safety; a consumer ordering fee of $200 a month plus 1 % of digital sales, capped at $6,500, comes on top.</p>
<p>When Popeyes itself is the landlord, the lease adds a percentage rent, typically 8.5 % of monthly gross sales up to $133,333.33 and 10 % above, beyond a minimum rent based on site and construction costs. That case breaks the simple model of the calculator, which assumes you rent from a third party.</p>
${h.mini('roi', { t: 'Popeyes: test your margin and sales', p: ['m', 'sb', 'so', 'at'], d: { b: 'popeyes' } })}
<h2>What Item 19 shows, band by band</h2>
<p>The headline is the ${K.usd(K.i19(b)!)} average of ${K.num(b.i19.count!)} franchised free-standing restaurants open the whole of fiscal 2025; 43.6 % of them reached or beat it. Franchised in-line units averaged $1,802,688 and food court units $1,328,516. The profit tables go further than most: free-standing restaurants under $1.5 million of sales averaged $41,234 of EBITDA, those between $1.5 million and $2.0 million $194,886 (11.2 % of sales), and those above $2.5 million $547,990. That EBITDA is measured after royalty, ad fund and rent, while the ${m} margin in the calculator is your own estimate before franchise fees, so the two are not the same number. At that default, the payback on the middle of the range comes out at ${K.dec(e.pay!)} years.</p>
<h2>Popeyes against other chicken brands</h2>
<p>${h.a('brand:kfc', 'KFC')} builds its range on purchased land, ${K.range(kfc)}, and publishes no average sales, only a forecasting test. ${cfa.brand} asks far less up front, ${K.range(cfa)}, but keeps half of each restaurant's profit. Popeyes sits between the two: a large build-out and fees close to the category norm, with the sales and cost tables printed. The ${h.a('fast-food-franchise-cost', 'fast food cost page')} lines up every chicken brand on this site.</p>
`,
  faqs: [
    { q: 'How much money do you need to open a Popeyes restaurant?', a: `Item 7 estimates ${K.range(b)} for a free-standing restaurant and $504,545 to $1,968,245 for an in-line unit, both before buying or leasing the real estate. The ${K.usd(b.feeLow)} franchise fee is included, along with build-out, equipment, signs and opening working capital. A lender will look at the whole amount, not the fee alone.` },
    { q: 'Is there a Popeyes franchise discount for veterans?', a: `Yes. Under the Veterans Development Incentive Program the initial fee falls from ${K.usd(b.feeLow)} to $27,500 and the royalty is 2 % for six months, for the first new restaurant of a new franchisee. College and airport locations have their own program with a $12,500 fee. The terms are in Item 5 and its notes.` },
    { q: 'What were average Popeyes restaurant sales in 2025?', a: `The ${K.num(b.i19.count!)} franchised free-standing restaurants open all of fiscal 2025 averaged ${K.usd(K.i19(b)!)}, with a median of ${K.usd(b.i19.median!)}, according to Item 19. In-line units averaged $1,802,688. These are sales, not profit; the document prints separate EBITDA tables by sales band, measured after royalty, advertising and rent.` },
    { q: 'What advertising percentage does a new Popeyes franchisee pay?', a: `New franchisees join the Ad Fund Test Program at ${K.rate(b.adPctHigh!)} of gross sales from April 1, 2025, a rate that can step up to 5.25 % and then 5.50 % if restaurant profit targets are met. Older restaurants outside the test pay 4.6 %. Local co-op dues of 0.5 % to 1.75 % are separate.` },
  ],
  related: ['brand:kfc', 'fast-food-franchise-cost', 'item-19-franchise-earnings', 'franchise-royalty-fees'],
});
