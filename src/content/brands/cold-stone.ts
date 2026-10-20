import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('cold-stone');
const br = K.B('baskin-robbins');
const nb = K.B('nothing-bundt-cakes');
const o = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const top = o('top 20%');
const bot = o('bottom 20%');

export default defineBrand({
  slug: 'cold-stone',
  title: 'Cold Stone Creamery Franchise Cost 2026: Fees and Sales',
  description: `Cold Stone Creamery franchise cost in 2026: ${K.range(b)} for a 1,200 sq ft store, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} ad fees, ${K.usd(K.i19(b)!)} average sales.`,
  intro: `Cold Stone Creamery cuts its fee for military buyers and nonprofits, splits its ad fees between a national and a regional fund, and reports one average for all its franchised stores.`,
  resume: `Kahala Franchising, L.L.C., the franchisor of Cold Stone Creamery, estimates in the document issued ${K.day(b.issued)} that a traditional store of about 1,200 square feet, built out from a leased vanilla shell, needs ${K.range(b)}, real estate and building construction excluded. The franchisor and its affiliate receive ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of it, mainly the ${K.usd(b.feeLow)} initial franchise fee for a first store and a $10,000 grand opening marketing fee. Every week the store pays a ${K.rate(b.royPct)} royalty on gross sales, plus ${K.rate(b.adPct)} in advertising fees, and about ${K.usd(b.fixedYear)} a year of data and help desk fees. Item 19 shows average gross sales of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised stores, over the twelve months to November 30, 2025. The United States count rose by ${K.num(b.units.franchisedNetChange!)} franchised stores in ${b.units.year}, to ${K.num(b.units.franchised!)}.`,
  body: (h) => `
<h2>Discounts on the fee</h2>
<p>The ${K.usd(b.feeLow)} fee applies to a first traditional store; a second and later store pay $15,000. Eligible military buyers, whether active, reserve or honorably discharged, and 501(c)(3) organizations get 20 % off, which brings the first store to $21,600 and later ones to $12,000, the low end of the fee line in Item 7. A non-traditional store carries a fee of $10,000 to $20,000. Some equipment, millwork and smallwares come from the affiliate Neptune Equipment, and the franchisor offers an optional guarantee of the store's lease for 10 % of the amount it covers, up to $10,000.</p>
<h2>Royalty, surcharge and a default rate</h2>
<p>The royalty of ${K.rate(b.royPct)} carries a surcharge of up to $10 a week, charged only in New York for now. The advertising fees total ${K.rate(b.adPct)}, 2 % to the national fund and 1 % to the regional fund of the store's cooperative, and the franchisor may raise them to ${K.rate(b.adPctHigh)} on 30 days' notice. A clause specific to this document: during any period of breach or default lasting at least 14 days, the royalty may be raised to as much as 18 % of gross sales. The calculator also counts ${K.usd(b.fixedYear)} a year for data fees and point of sale support. It leaves out the annual meeting fee of up to $1,000, owed whether or not the owner attends, and the 11 % charged on gift card redemptions.</p>
${h.mini('compare', { t: 'Three dessert brands at the same margin', p: ['m', 'at'], d: { a: 'cold-stone', c2: 'baskin-robbins', c3: 'nothing-bundt-cakes' } })}
<h2>One average for two kinds of store</h2>
<p>The ${K.usd(K.i19(b)!)} figure groups traditional and non-traditional stores, with no separate number for the traditional format the investment range describes. The top fifth of stores averaged ${K.usd(top)} and the bottom fifth ${K.usd(bot)}. New stores, stores temporarily closed and Guam are left out, and the sales come from unaudited weekly reports. The calculator applies the ${K.rate(K.P.calc.defaultMarginPct)} starting margin, a figure for the reader to change.</p>
<h2>Cold Stone among the dessert shops</h2>
<p>${h.a('brand:baskin-robbins', 'Baskin-Robbins')} needs ${K.range(br)} and charges ${K.rate(br.royPct)} plus ${K.rate(br.adPct)} in most states; its average shop sold ${K.usd(K.i19(br)!)}. ${h.a('brand:nothing-bundt-cakes', 'Nothing Bundt Cakes')} sits higher, at ${K.range(nb)}, and prints a profit figure that Cold Stone does not. A franchisee selling a traditional Cold Stone store pays a $17,500 transfer fee. The ${h.fdd('cold-stone')} runs to ${K.num(b.pages)} pages; the fee discounts are in Item 5.</p>
`,
  faqs: [
    { q: 'What is the Cold Stone Creamery franchise fee for veterans?', a: `Eligible military buyers, active, reserve or honorably discharged, get 20 % off the fee, as do 501(c)(3) organizations: $21,600 for a first traditional store instead of ${K.usd(b.feeLow)}, and $12,000 for each later store instead of $15,000. A $10,000 grand opening marketing fee is also paid to the franchisor before opening.` },
    { q: 'How much does Cold Stone Creamery take from sales?', a: `A royalty of ${K.rate(b.royPct)} of gross sales and advertising fees of ${K.rate(b.adPct)}, split between a national and a regional fund, paid weekly; the advertising share can rise to ${K.rate(b.adPctHigh)}. Fixed data and help desk fees add about ${K.usd(b.fixedYear)} a year, and New York stores pay a surcharge of up to $10 a week.` },
    { q: 'How much does a Cold Stone Creamery store sell a year?', a: `The ${K.num(b.i19.count!)} franchised stores in Item 19 averaged ${K.usd(K.i19(b)!)} in gross sales from December 2024 to November 2025, with a median of ${K.usd(b.i19.median!)}. The top fifth averaged ${K.usd(top)}, the bottom fifth ${K.usd(bot)}. Traditional and non-traditional stores are mixed, and costs are not published.` },
    { q: 'Can Cold Stone Creamery raise the royalty?', a: `The document allows the royalty to go up to 18 % of gross sales during any period of breach or default of at least 14 days. Outside that case, Item 6 prints a royalty of ${K.rate(b.royPct)} plus the New York surcharge, while the advertising fees may be raised from ${K.rate(b.adPct)} to ${K.rate(b.adPctHigh)} on 30 days of notice.` },
  ],
  related: ['brand:baskin-robbins', 'brand:nothing-bundt-cakes', 'franchise-fee', 'compare-franchises'],
});
