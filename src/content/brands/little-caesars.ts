import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('little-caesars');
const cat = K.catSales('pizza');
const e = K.eco('little-caesars');
const dom = K.B('dominos');
const mp = K.B('marcos-pizza');
const topFees = K.inCat('pizza').every((x) => K.pctFees(x) <= K.pctFees(b));

export default defineBrand({
  slug: 'little-caesars',
  title: 'Little Caesars Franchise Cost 2026: Fees and Blue Line',
  description: `Little Caesars franchise cost in 2026: ${K.range(b)}, most of it paid to the franchisor's affiliate, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty and no Item 19.`,
  intro: `With Little Caesars, the bulk of the opening budget is paid to the franchisor's own supply affiliate, Blue Line. The document prints no sales figure and caps advertising at a rate it does not fix.`,
  resume: `A single Little Caesars restaurant on a leased site of 1,200 to 1,600 square feet costs ${K.range(b)} under Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)}. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} must be paid to the franchisor or its affiliate Blue Line, mainly for equipment and technology. The standard franchise fee is ${K.usd(b.feeLow)}, with reductions for veterans and first responders. Each week the restaurant owes a royalty of ${K.rate(b.royPct)} of gross sales or $300, whichever is greater, and an advertising fee of up to ${K.rate(b.adPct)} of gross sales, set by the franchisor; the calculator applies that ceiling because no current rate is printed. Item 19 contains no financial performance representation, so there is no average sales figure. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, ${K.num(b.units.franchised!)} franchised, up ${K.num(b.units.franchisedNetChange!)}.`,
  body: (h) => `
<h2>Where the opening money goes</h2>
<p>The franchisee must buy from Blue Line the equipment and technology package, $235,000 to $460,000 before opening, and the opening order of food and supplies, $7,000 to $9,000. That is why ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of a ${K.usd(b.invLow)} to ${K.usd(b.invHigh)} budget ends up with the franchisor side, a far larger share than at most restaurant brands. After opening, most food, paper products, supplies and equipment still come from Blue Line, so the affiliate earns on purchases as well as on royalties. The estimate counts only one month's rent for the leased premises and no real estate. A refurbishment of up to $150,000 may be required every five years.</p>
<h2>The fee and its reductions</h2>
<p>The ${K.usd(b.feeLow)} fee drops by $5,000, to $15,000, for honorably discharged veterans and qualified first responders, and is waived for combat-disabled veterans and Gold Star families on their first restaurant. A food truck carries a $7,500 fee. Fees actually collected last fiscal year ran from $0 to $20,000. A separate $15,000 grand opening advertising fee is paid to the franchisor, or the same amount spent directly.</p>
<h2>An advertising rate written as a ceiling</h2>
<p>Item 6 reads "Up to 7% of Gross Sales, as determined by us", split among the Caesar Fund, a cooperative where there is one, and local advertising. Since the document gives no current rate, the calculator uses the maximum, ${K.rate(b.adPct)}, which puts royalty and advertising at ${K.rate(K.pctFees(b))} of sales${topFees ? ', the highest of the pizza brands on this site' : ''}. If the real figure is lower, cash flow improves. Fixed fees counted, ${K.usd(b.fixedYear)} a year, are the Caesar Vision support fee of $3,120, paid to Blue Line, and a $260 learning system fee. Per-transaction charges for digital orders, currently $0.36, and for card security, currently $0.06, are left out.</p>
${h.mini('roi', { t: 'Little Caesars: try your own sales and margin', p: ['sb', 'so', 'm'], d: { b: 'little-caesars', sb: 'own', so: 800000 } })}
<h2>No sales figure, and a median in its place</h2>
<p>Item 19 states that Little Caesars makes no representation about the past or future financial performance of its outlets. The calculator therefore starts from ${K.usd(cat.median!)}, the median Item 19 figure of ${cat.n} pizza brands on this site, which may be far from a Little Caesars carry-out store. With that and the ${K.rate(K.P.calc.defaultMarginPct)} default margin, a value for you to change, payback runs to ${K.dec(e.pay!)} years. Owners listed in Item 20 are the realistic source of sales numbers.</p>
<h2>Next to other pizza brands</h2>
<p>${h.a('brand:dominos', "Domino's")} also routes much of its opening budget through its supply chain affiliate, at ${K.range(dom)}, but prints weekly sales and margins. ${h.a('brand:marcos-pizza', "Marco's Pizza")} quotes ${K.range(mp)} and reports an average of ${K.usd(K.i19(mp)!)}. Transfers of a Little Caesars restaurant cost $5,000 when control changes and $1,000 otherwise.</p>
`,
  faqs: [
    { q: 'How much of a Little Caesars investment goes to Blue Line?', a: `Item 7 puts the amount paid to the franchisor or its affiliate at ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, out of ${K.range(b)} in total. Most of it is the equipment and technology package bought from Blue Line, $235,000 to $460,000, plus an opening order of $7,000 to $9,000 and the franchise fee.` },
    { q: 'What is the Little Caesars advertising fee?', a: `Item 6 prints it only as up to ${K.rate(b.adPct)} of gross sales, with the franchisor deciding the rate and splitting it among the Caesar Fund, a cooperative and local advertising. No current percentage appears in the document, so this site uses the ${K.rate(b.adPct)} ceiling. A $15,000 grand opening advertising fee is separate.` },
    { q: 'Does Little Caesars share franchisee sales figures?', a: `No. Item 19 says the company makes no representation about the financial performance of company-owned or franchised outlets, so a salesperson may not quote sales or profit. The calculator falls back on the median of the pizza brands that publish one; replace it with figures from current owners once you have them.` },
  ],
  related: ['brand:dominos', 'brand:marcos-pizza', 'franchise-royalty-fees', 'item-19-franchise-earnings'],
});
