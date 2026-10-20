import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('chick-fil-a');
const pop = K.B('popeyes');
const bo = K.B('bojangles');
const avg = K.i19(b)!;
const m25 = K.eco('chick-fil-a', { m: 25 });

export default defineBrand({
  slug: 'chick-fil-a',
  title: `Chick-fil-A Franchise Cost 2026: ${K.usd(b.feeLow)} Fee, Profit Split`,
  description: `Chick-fil-A franchise cost in 2026: a ${K.usd(b.feeLow)} fee, ${r(b.royPct)} of sales and half the net profit to the franchisor, and ${K.usd(avg)} in average sales per restaurant.`,
  intro: `A Chick-fil-A Operator signs for ${K.usd(b.feeLow)} but never owns the restaurant: the franchisor leases the building and the equipment and keeps a share of sales and half of the profit.`,
  resume: `The Chick-fil-A disclosure document issued on ${K.day(b.issued)} prints a total investment of ${K.range(b)} for a traditional restaurant, but only ${K.usd(b.toFrLow!)} of it is paid to the franchisor: the initial fee, of which half is a working capital deposit returned at the end. The Operator is an individual who leases the premises and rents the equipment from Chick-fil-A. In return the franchisor takes ${r(b.royPct)} of gross receipts, out of which equipment rent and a monthly business services fee are paid, then 50 % of the restaurant's net profit. The advertising contribution can reach ${r(b.adPctHigh)} but has been 0 % since 1989. Item 19 reports average sales of ${K.usd(avg)} in ${b.i19.period} for ${K.num(b.i19.count!)} free-standing and drive-thru restaurants, a median of ${K.usd(b.i19.median!)}, and no costs. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(b.units.franchised!)} of them run by Operators.`,
  body: (h) => `
<h2>An Operator, not an owner</h2>
<p>The franchise agreement is signed only with an individual, and that person does not buy a building, land or equipment. Chick-fil-A or a subsidiary is the landlord or sublessor of traditional locations, and the equipment is rented from it: currently $5,000 a month in a free-standing or in-line unit, $4,000 for a drive-thru only unit and $3,000 in a mall, within a printed range of $750 to $5,000. Item 7 Note 2 says the ${K.usd(b.feeLow)} fee is the only initial out-of-pocket investment the Operator is required to make. Of that fee, $5,000 is held as a working capital deposit and returned, less amounts owed, at termination or non-renewal. A second restaurant, if offered, carries a fee of $5,000.</p>
<h2>Why the range runs from ${K.usd(b.invLow)} to ${K.usd(b.invHigh)}</h2>
<p>The spread in Item 7 does not describe what the Operator brings from savings. Most of it is the line of additional funds meant to carry a restaurant through its first three months, and the document even prints the high end of that line as "$3,463155", the same digits as the total. Opening inventory of $22,950 to $107,000 is bought partly from the affiliate CFA Supply, and distributor prices include amounts paid to Chick-fil-A for its proprietary seasoning and coater. Read the range as the cost of running the restaurant at the start, not as a price tag for buying in.</p>
<h2>Fifteen percent, then half of what is left</h2>
<p>The Base Operating Service Fee is the amount by which ${r(b.royPct)} of gross receipts exceeds the equipment rent and the business services fee ($300 a month) for the month. On top, the Additional Operating Service Fee is 50 % of the restaurant's net profit. The Operator keeps a base profit of $1,000 a month, an advance on extra profit of up to $1,500 a month, and the other half of net profit. Rent comes before all of this: from $3,500 to $100,655 a month in Item 6, and under an internal policy dating from January 1, 2015, rent excluding equipment will not exceed 6 % of annual gross receipts for traditional locations; on a site Chick-fil-A owns, the Operator pays percentage rent of 6 % with no base rent. Insurance, hardware and software support ($9,500 to $20,000 a year) and cash handling services are billed besides.</p>
<p>For the calculator, this means two things. The margin you type is your estimate of what is left after food, labor, rent to Chick-fil-A and overhead, but before the ${r(b.royPct)} fee, since equipment rent sits inside that fee. And at the site default of ${r(K.P.calc.defaultMarginPct)}, the fee absorbs the whole margin, so this page opens at 25 %: at that setting and the Item 19 average, the Operator's share would be ${K.usd(m25.y.cashBeforeDebt)} a year and Chick-fil-A's ${K.usd(m25.y.toFranchisor)}. That 25 % is an assumption for the example, not a figure from the document.</p>
${h.mini('roi', { t: 'Chick-fil-A: the Operator share at your margin', p: ['m', 'sb', 'so'], d: { b: 'chick-fil-a', m: 25 } })}
<h2>The sales Item 19 reports</h2>
<p>The headline covers ${K.num(b.i19.count!)} non-mall restaurants operated by Operators for all of ${b.units.year}: an average of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)}, with the highest at $20,048,032 and the lowest at $1,658,209. Only 1,120 of them, 49 %, reached the average. The 201 mall restaurants averaged $4,579,894, with a median of $3,356,330, and the three delivery kitchens $2,547,052. Company-operated restaurants, 25 captive venue units and 424 licensed units are left out, and the document says the figures do not reflect costs of sales or operating expenses.</p>
<h2>Next to other chicken brands</h2>
<p>Popeyes estimates ${K.range(pop)} to open and takes ${r(pop.royPct)} plus ${r(pop.adPct)} of sales, with average Item 19 sales of ${K.usd(K.i19(pop)!)}; Bojangles asks ${K.range(bo)}, with ${K.usd(K.i19(bo)!)} in average sales. Their franchisees own their restaurants and pay no profit share, so a straight comparison of fees misses the point: at Chick-fil-A the franchisor carries the real estate and the equipment and is paid accordingly. The ${h.a('item-19-franchise-earnings', 'Item 19 page')} explains why sales alone say little about earnings.</p>
<h2>Growth in the count</h2>
<p>Item 20 shows ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company-owned restaurants at the end of ${b.units.year}, a net gain of ${K.num(b.units.franchisedNetChange!)} franchised units in the year. The franchised count at the start of ${b.units.year}, 2,624, does not match the 2,629 printed for the end of 2024, a small gap inside the document itself.</p>
`,
  faqs: [
    { q: 'How much money do you need to become a Chick-fil-A Operator?', a: `The fee in Item 5 is ${K.usd(b.feeLow)}, and Item 7 Note 2 calls it the only initial out-of-pocket investment the Operator is required to make. The full Item 7 range of ${K.range(b)} mostly reflects additional funds for the first months, while Chick-fil-A owns or leases the premises and rents out the equipment.` },
    { q: 'What share of profit does Chick-fil-A keep from its Operators?', a: `After a fee of ${r(b.royPct)} of gross receipts, which already covers equipment rent and the business services fee, Chick-fil-A takes an additional fee of 50 % of the restaurant's net profit. The Operator keeps a base profit of $1,000 a month, an advance of up to $1,500 a month and the other half of net profit.` },
    { q: 'Can a Chick-fil-A Operator own the building or the land?', a: 'Not under the Operator Program described in this document. Chick-fil-A or a subsidiary is the landlord or sublessor of traditional locations, and the equipment is rented from it. Rent runs from $3,500 to $100,655 a month in Item 6, and an internal policy caps rent, equipment excluded, at 6 % of annual gross receipts.' },
    { q: 'What are average sales at a Chick-fil-A restaurant run by an Operator?', a: `Item 19 gives an average of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} free-standing and drive-thru restaurants open all of ${b.units.year}. Mall restaurants averaged $4,579,894. These are sales before any cost, and 49 % of the restaurants reached the average.` },
  ],
  related: ['item-19-franchise-earnings', 'franchise-royalty-fees', 'brand:mcdonalds', 'franchise-cost'],
  toolArg: { m: 25 },
});
