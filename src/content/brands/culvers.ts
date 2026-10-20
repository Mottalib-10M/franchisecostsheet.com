import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('culvers');
const mc = K.B('mcdonalds');
const fr = K.B('freddys');
const avg = K.i19(b)!;
const prof = b.i19.profitPct!;
const e = K.eco('culvers', { m: prof });

export default defineBrand({
  slug: 'culvers',
  title: `Culver's Franchise Cost 2026: Land, Building and Fees`,
  description: `Culver's franchise cost in 2026: ${K.range(b)} with land and building, a ${K.fee(b)} fee, ${r(b.royPct)} royalty and ${K.usd(avg)} in average sales.`,
  intro: `Culver's is the only burger brand on this site whose Item 7 includes buying the land and building the restaurant, which explains a range that reaches ${K.usd(b.invHigh)}.`,
  resume: `Culver's disclosure document issued on ${K.day(b.issued)} prices a free-standing restaurant with a drive-thru at ${K.range(b)}, a figure that includes buying the land and constructing a new building. Culver's asks for 20 % of the projected investment in cash or liquid assets. The franchise fee runs from ${K.usd(b.feeLow)} to ${K.usd(b.feeHigh)} on the cover, and the restaurant then pays a royalty of ${r(b.royPct)} and an advertising fee of ${r(b.adPct)} of gross sales, plus at least 1.00 % spent on local advertising. Item 19 reports average sales of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised restaurants open all of ${b.units.year}, and an income of ${r(prof)} of sales for the seven company restaurants in Wisconsin, before rent and financing. Item 20 counts ${K.num(b.units.total!)} restaurants, ${K.num(b.units.franchisedNetChange!)} more franchised ones than a year before.`,
  body: (h) => `
<h2>Real estate inside the range</h2>
<p>Most burger franchisors leave land out of Item 7. Culver's puts it in: the land line runs from $225,000 to $2,400,000 and the construction of a new free-standing building from $2,047,000 to $4,391,000. Those two lines explain most of the distance between ${K.usd(b.invLow)} and ${K.usd(b.invHigh)}. A franchisee who leases the site instead invests less, but then pays rent each month, and that rent is not in the income figure Item 19 prints. The calculator does not know which you choose: the investment is Item 7's, and the margin you type should include rent if you lease.</p>
<h2>A fee with five prices</h2>
<p>The cover prints a fee of ${K.fee(b)}; the Item 7 table starts at $35,000 because a veterans' discount of $10,000 applies to a first restaurant run by a full-time on-site owner-operator. An additional restaurant with the same operator costs $55,000 and one under the mentoring program $45,000. A $5,000 application fee is credited against the fee and refunded if the applicant is not approved, and 75 % of the fee comes back if the franchisee leaves before the fifth week of the development program. Under a development agreement, a territory fee of $50,000 per restaurant is refunded when the opening dates are met.</p>
<h2>What is paid each month</h2>
<p>The royalty is ${r(b.royPct)} and the advertising fee ${r(b.adPct)} of gross sales; agreements signed before March 31, 2012 pay 2.00 % to advertising. Local advertising must reach at least 1.00 %, and a regional cooperative, if one is formed, can charge up to 4 %. A technology fee, estimated at $600 to $1,000 a month, is described but not currently charged, and gift cards cost $.22 per redeemed transaction. Selling the restaurant costs $10,000 plus Culver's attorneys' fees, or $5,000 if the buyer is already a franchisee.</p>
<h2>Seven company restaurants, one margin</h2>
<p>Item 19 is unusual in printing costs. The seven company restaurants in Wisconsin sold $25,607,222 together in ${b.units.year} and earned $3,320,103, or ${r(prof)} of sales, before rent, real estate and property taxes, interest, depreciation, amortization and income tax. Food cost was 30.5 % and wages 31.7 % of sales; the lowest restaurant earned 8.7 % and the highest 15.9 %. This page sets the calculator to ${r(prof)} as a reference, not as a franchisee result: these are company restaurants, and their income also leaves out the initial franchise fee, management fees and travel. At that margin and the franchised average, the year's cash flow after fees would be ${K.usd(e.y.cashBeforeDebt)}. Change it to your own estimate.</p>
${h.mini('roi', { t: "Culver's: payback with your margin and your share of the range", p: ['m', 'at'], d: { b: 'culvers', m: prof } })}
<h2>Franchised sales and the network</h2>
<p>The ${K.num(b.i19.count!)} franchised restaurants open the full year, 13 of them in non-typical locations, averaged ${K.usd(avg)}, from $1,103,114 to $9,030,702; 450 of them, 46 %, met or beat the average. Restaurants opened during ${b.units.year} are excluded. Item 20 shows ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company restaurants at year end. For scale, ${h.a('brand:mcdonalds', "McDonald's")} reports ${K.usd(K.i19(mc)!)} on an investment of ${K.range(mc)} that leaves out the land, and Freddy's reports ${K.usd(K.i19(fr)!)} for ${K.range(fr)}.</p>
`,
  faqs: [
    { q: "Does the Culver's investment include buying land?", a: `Yes. Item 7 for a free-standing restaurant with a drive-thru includes land at $225,000 to $2,400,000 and a new building at $2,047,000 to $4,391,000, inside the total of ${K.range(b)}. Leasing the site lowers the investment, but rent then becomes a monthly cost that the published income figure does not include.` },
    { q: "How much cash does Culver's require from a new franchisee?", a: `Culver's requires 20 % of the total projected initial investment in cash or liquid assets. On the Item 7 range of ${K.range(b)}, that is a large sum at either end, because land and construction are counted. The rest is usually financed, and the loan payments come out of the restaurant's cash flow.` },
    { q: "What profit margin does the Culver's Item 19 show?", a: `Only for its seven company restaurants in Wisconsin: income of ${r(prof)} of sales in ${b.units.year}, from 8.7 % to 15.9 %, before rent, property taxes, interest, depreciation and income tax. No profit figure is given for the ${K.num(b.i19.count!)} franchised restaurants, which averaged ${K.usd(avg)} in sales.` },
    { q: "Is there a veterans' discount on the Culver's franchise fee?", a: `Yes. The veterans' discount takes $10,000 off the fee for a first restaurant run by a full-time on-site owner-operator, which is why the Item 7 table starts at $35,000 while the cover prints ${K.fee(b)}. A $5,000 application fee is credited against the franchise fee.` },
  ],
  related: ['brand:mcdonalds', 'brand:sonic', 'item-19-franchise-earnings', 'franchise-loan'],
  toolArg: { m: prof },
});
