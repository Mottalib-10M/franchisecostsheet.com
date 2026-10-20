import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('subway');
const cat = K.catSales('sandwiches');
const e = K.eco('subway');
const jm = K.B('jersey-mikes');
const jj = K.B('jimmy-johns');
const lost = -(b.units.franchisedNetChange ?? 0);

export default defineBrand({
  slug: 'subway',
  title: 'Subway Franchise Cost 2026: Fee, 8% Royalty and Payback',
  description: `Subway franchise cost in 2026: ${K.range(b)} to open, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty plus ${K.rate(b.adPct)} ad fund, and no sales figure in Item 19 of the document.`,
  intro: `Subway asks less to open than most sandwich brands and takes more of every sale. The calculator below starts from the sandwich category median, since Subway publishes no sales figure.`,
  resume: `Opening one traditional Subway restaurant costs ${K.range(b)} according to Item 7 of the disclosure document Doctor's Associates LLC issued on ${K.day(b.issued)}, amended ${K.day(b.amended!)}. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to Subway or its affiliates, including the ${K.usd(b.feeLow)} franchise fee, which falls to $7,500 for qualified veterans and existing owners. Once open, the restaurant pays a royalty of ${K.rate(b.royPct)} of gross sales and ${K.rate(b.adPct)} to the advertising fund, every week: ${K.rate(K.pctFees(b))} of sales in all, among the highest of the brands on this site. Subway makes no financial performance representation, so no average sales figure exists in the document. The system is entirely franchised and counted ${K.num(b.units.total!)} restaurants in the United States at the end of ${b.units.year}, ${K.num(lost)} fewer than a year earlier.`,
  body: (h) => `
<h2>What the ${K.usd(b.invLow)} to ${K.usd(b.invHigh)} covers</h2>
<p>The range in Item 7 is for a new traditional restaurant in leased space; a non-traditional location inside a store, a school or a travel center is estimated lower, at $227,000 to $458,000. The total does not include buying a building: most Subway owners sublease their premises from a leasing affiliate of the franchisor, at an estimated $1,000 to $6,000 a month, and the real property line in Item 7 is only a two-month deposit. The bulk of the money goes to the build-out, equipment, signs and the working capital of the first months.</p>
<h2>Fees on sales, not on profit</h2>
<p>A royalty of ${K.rate(b.royPct)} and an ad fund of ${K.rate(b.adPct)} are taken from total gross sales, before food, labor or rent. On the sandwich category median of ${K.usd(cat.median!)} a year (the Item 19 figures of ${cat.n} sandwich brands on this site), that is ${K.usd(e.y.royalty + e.y.ad)} a year to Subway and its fund. For comparison, ${h.a('brand:jersey-mikes', "Jersey Mike's")} charges ${K.rate(jm.royPct)} plus ${K.rate(jm.adPct)} and ${h.a('brand:jimmy-johns', "Jimmy John's")} ${K.rate(jj.royPct)} plus ${K.rate(jj.adPct)}. Item 6 also lists a restaurant technology fee of $75 a month, hardware rental for the register and the digital menu boards, and a fee of 1.9 % on sales to members of the Sub Club loyalty program.</p>
${h.mini('roi', { t: 'Subway: change the margin and the sales', p: ['m', 'sb', 'so'], d: { b: 'subway', sb: 'own', so: 500000 } })}
<h2>No sales figure in the document</h2>
<p>Item 19 reads: "We do not make any representations about a franchisee's future financial performance or the past financial performance of company-owned or franchised outlets." A Subway salesperson may therefore not quote any sales or profit number. To judge a location, the only routes are the owners listed in Item 20, whom you may call, and the books of a restaurant for sale. The calculator uses the sandwich median by default; switch to your own figure as soon as you have one. The ${h.a('item-19-franchise-earnings', 'Item 19 page')} explains what brands that do publish actually show.</p>
<h2>A shrinking network</h2>
<p>Item 20 counts ${K.num(b.units.total!)} Subway restaurants in the United States at the end of ${b.units.year}, all of them franchised, after a net loss of ${K.num(lost)} in the year. A falling count matters to a buyer for two reasons: closures can mean nearby restaurants that could not cover their fees, and they mean more existing restaurants for sale, often at prices below the cost of a new one. The ${h.a('franchise-for-sale', 'resale page')} covers what a transfer costs.</p>
`,
  faqs: [
    { q: 'How much does it cost to open a Subway franchise?', a: `Item 7 of the ${b.issued.slice(0, 4)} disclosure document estimates ${K.range(b)} for a new traditional restaurant in leased space, including ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} paid to Subway and its affiliates. A non-traditional unit inside another business is estimated at $227,000 to $458,000. Neither figure includes buying land or a building.` },
    { q: 'What is the Subway franchise fee?', a: `The standard fee in Item 5 is ${K.usd(b.feeLow)} for a first-time franchisee. It is $7,500 for qualified United States veterans, for existing franchisees adding a restaurant and for some non-traditional sites. The fee is paid when the franchise agreement is signed and is a small share of the total investment.` },
    { q: 'How much does a Subway owner pay in royalties?', a: `The royalty is ${K.rate(b.royPct)} of total gross sales, excluding sales taxes, paid weekly, and the advertising contribution is ${K.rate(b.adPct)}, also weekly. Together that is ${K.rate(K.pctFees(b))} of every dollar sold, whatever the restaurant earns. Fixed monthly fees for technology and equipment rental come on top.` },
    { q: 'How much does a Subway franchise make a year?', a: 'The disclosure document does not say: Subway makes no financial performance representation in Item 19, so it publishes neither sales nor profit. Owners listed in Item 20 can tell you about their own restaurants, and a restaurant offered for resale must show its books to a serious buyer. The calculator lets you test any sales figure.' },
  ],
  related: ['brand:jersey-mikes', 'brand:jimmy-johns', 'franchise-royalty-fees', 'cheapest-franchises'],
  toolArg: { at: 'mid' },
});
