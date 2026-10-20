import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('five-guys');
const fr = K.B('freddys');
const ck = K.B('checkers');
const cat = K.catSales('burgers');
const e = K.eco('five-guys');

export default defineBrand({
  slug: 'five-guys',
  title: `Five Guys Franchise Cost 2026: Fee Plus $50,000 Development`,
  description: `Five Guys franchise cost in 2026: ${K.range(b)} in a leased space, a ${K.usd(b.feeLow)} fee plus a $50,000 development fee, ${r(b.royPct)} royalty, no sales in Item 19.`,
  intro: `Five Guys starts at ${K.usd(b.invLow)} in Item 7, but every franchisee also signs a development agreement with its own $50,000 fee, left out of that range.`,
  resume: `The Five Guys disclosure document issued on ${K.day(b.issued)} estimates ${K.range(b)} to open one fast casual restaurant of about 2,000 to 3,000 square feet in a leased strip center or urban space. The franchise fee is ${K.usd(b.feeLow)}, but a development agreement is mandatory even for a single restaurant, and its $50,000 development fee per restaurant is neither credited against the franchise fee nor counted in the range, which brings the amount paid to Five Guys and its affiliates to $75,350 per restaurant. The royalty is ${r(b.royPct)} of gross sales, the creative fund ${r(b.adPct)}, and buns must be bought every week from the Five Guys bakery. Five Guys publishes no sales or profit figure in Item 19. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(b.units.company!)} of them run by the company.`,
  body: (h) => `
<h2>Two agreements, two fees</h2>
<p>A Five Guys franchisee signs a development agreement before the franchise agreement, even to open one restaurant. The development fee is $50,000 per restaurant, non-refundable, and not applied to the ${K.usd(b.feeLow)} franchise fee; in Alaska, Hawaii and Puerto Rico it is $125,000 and the royalty is 8 %. The cover's investment range of ${K.range(b)} leaves out this $50,000 and $2,100 of transportation expenses owed under the same agreement, so the true opening budget is higher than the headline. Veterans pay $10,000 less on the franchise fee for a first restaurant, $15,000 instead of ${K.usd(b.feeLow)}, and 75 % of the franchise fee may be refunded if no location is approved within six months.</p>
<h2>A leased box, not a building</h2>
<p>The format behind the range is a restaurant of about 2,000 to 3,000 square feet in leased space, in a strip center or in a city. No land or building is bought, which is why the range is lower than a freestanding drive-thru. Rent is paid to a landlord, not to Five Guys, and belongs in the margin you type in the calculator.</p>
<h2>Fees on sales and the bakery</h2>
<p>The royalty is ${r(b.royPct)} of gross sales. The creative fund takes ${r(b.adPct)} today and may rise to ${r(b.adPctHigh)}; local advertising can be required up to 2 %, a cooperative up to 1.5 % credited toward it, and the creative fund, cooperative and local spending together will not exceed 4 % of gross sales. Bread products come from the Five Guys bakery, an affiliate, every Monday, at a price the document says varies with needs. A cash register upgrade costs about $5,000 when it happens, and a transfer $5,000.</p>
<h2>No Item 19, so the calculator borrows a figure</h2>
<p>Item 19 reads: "We do not make any representations about a franchisee's future financial performance or the past financial performance of company-owned or franchised outlets." The calculator therefore starts from the median of the Item 19 figures of ${cat.n} burger brands on this site, ${K.usd(cat.median!)}, and a margin of ${r(K.P.calc.defaultMarginPct)}, which is your estimate to change. With both, the fees come to ${K.usd(e.y.fees)} a year. Replace the sales figure with one from a Five Guys owner or from the books of a restaurant for sale; the ${h.a('franchise-for-sale', 'resale page')} covers what buying an existing one involves.</p>
${h.mini('roi', { t: 'Five Guys: type your own sales figure', p: ['sb', 'so', 'm'], d: { b: 'five-guys', sb: 'own', so: 1500000 } })}
<h2>A large company-run share</h2>
<p>Item 20 shows ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company restaurants at the end of ${b.units.year}. The franchised count grew by ${K.num(b.units.franchisedNetChange!)} and the company count did not change, so the company runs ${K.pct(b.units.company! / b.units.total!, 0)} of the system itself. Freddy's, another fast casual burger brand, estimates ${K.range(fr)} and does publish sales, ${K.usd(K.i19(fr)!)} on average; Checkers starts lower, at ${K.usd(ck.invLow)}, with ${K.usd(K.i19(ck)!)} in average sales. ${h.a('brand:culvers', "Culver's")} and ${h.a('brand:wendys', "Wendy's")} also publish their averages.</p>
`,
  faqs: [
    { q: 'How much does it really cost to open a Five Guys?', a: `Item 7 estimates ${K.range(b)} for one restaurant in leased space, but that range leaves out the $50,000 development fee and $2,100 of transportation expenses owed under the mandatory development agreement. With the ${K.usd(b.feeLow)} franchise fee, $75,350 is paid to Five Guys and its affiliates per restaurant.` },
    { q: 'Why is there a development fee for a single Five Guys restaurant?', a: 'The document makes a development agreement mandatory even for one restaurant. Its fee is $50,000 per restaurant, $125,000 in Alaska, Hawaii and Puerto Rico, is non-refundable and is not applied to the franchise fee. It is paid in addition to everything in the Item 7 range.' },
    { q: 'Does Five Guys say how much its franchise restaurants earn?', a: 'No. Item 19 states that Five Guys makes no representation about the past or future financial performance of company or franchised restaurants. Sales figures can only come from existing owners listed in Item 20 or from the books of a restaurant offered for sale. The calculator lets you enter your own figure.' },
  ],
  related: ['brand:culvers', 'brand:wendys', 'item-19-franchise-earnings', 'franchise-for-sale'],
  toolArg: { sb: 'auto' },
});
