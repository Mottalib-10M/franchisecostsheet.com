import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('applebees');
const ih = K.B('ihop');
const dn = K.B('dennys');
const gc = K.B('golden-corral');
const reg = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const ne = reg('Northeast');
const so = reg('South');
const e = K.eco('applebees');

export default defineBrand({
  slug: 'applebees',
  title: "Applebee's Franchise Cost 2026: Prototype, Fees and Sales",
  description: `Applebee's franchise cost in 2026: ${K.range(b)} for the new prototype, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, a ${K.rate(b.adPct)} ad fund and ${K.usd(K.i19(b)!)} in sales.`,
  intro: `Applebee's prices a restaurant model nobody has built yet, and its ad fund rate changes on January 1, 2027. The calculator uses the average sales of its traditional franchised restaurants.`,
  resume: `The disclosure document of Applebee's Franchisor LLC, issued ${K.day(b.issued)} and amended ${K.day(b.amended!)}, estimates ${K.range(b)} to build a new Applebee's Neighborhood Grill & Bar on the 2025 "Celebration" prototype, with roughly 169 to 225 seats and no purchase of real property. The franchisor receives ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of that, the initial fee being ${K.usd(b.feeLow)}. Each month the restaurant pays a royalty of ${K.rate(b.royPct)} of gross sales, a rate the document says the franchisor can increase, and ${K.rate(b.adPct)} to the national advertising fund through December 31, 2026. Item 19 reports average gross sales of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} traditional franchised restaurants in 2025, sales only. Item 20 ends ${b.units.year} with ${K.num(b.units.total!)} traditional restaurants, ${K.num(b.units.franchised!)} of them franchised, ${K.num(-b.units.franchisedNetChange!)} fewer than a year before.`,
  body: (h) => `
<h2>Three formats, one of them on paper only</h2>
<p>Item 7 gives three totals. The Celebration prototype used on this page, ${K.range(b)}, is labelled as a 2025 model not yet built, and its line items are third-party estimates. The older Tower II prototype, now discontinued, is estimated at $3,870,004 to $5,822,933. A Dual Branded restaurant combining IHOP and Applebee's, often a conversion, runs from $616,682 to $4,632,445, which is why the cover page shows a range starting near $600,000. None of the three includes land or a building. Because Applebee's serves alcohol, the liquor license line runs from $500 to $1,000,000 depending on the state, and Item 7 notes that third-party rent typically equals 4 % to more than 8 % of gross sales a year, paid to a landlord rather than to the franchisor.</p>
<h2>What the franchisor collects</h2>
<p>The fee is paid half at signing and half 14 days before opening. A separate applicant's fee of $15,000 may be required, although none was charged in fiscal 2025, and fees actually charged that year ranged from $0 to $50,000 depending on the site. The royalty of ${K.rate(b.royPct)} is low for a restaurant chain, but the document reserves the right to raise it. The advertising side is in motion: the national fund takes ${K.rate(b.adPct)} through December 31, 2026, and is to come down to 3.25 % from January 1, 2027, when a local advertising minimum of 0.5 % of gross sales starts, with total advertising capped at ${K.rate(b.adPctHigh)}. Item 6 adds technology bills that the calculator leaves out: a Toast software fee of $3,750 to $5,000 a year, a help desk subscription of $1,995 to $2,300 and 10.55 % on redeemed national gift cards.</p>
${h.mini('compare', { t: "Applebee's, IHOP and Denny's at the same margin", p: ['m'], d: { a: 'applebees', c2: 'ihop', c3: 'dennys' } })}
<h2>Sales that depend on the region</h2>
<p>The ${K.usd(K.i19(b)!)} average hides a wide regional spread. Franchised restaurants in the Northeast averaged ${K.usd(ne)} in 2025, those in the South ${K.usd(so)}. The figures come from unaudited royalty reports, are annualized, and leave out express units, restaurants closed during the year and the 24 Dual Branded restaurants. At the ${K.rate(K.P.calc.defaultMarginPct)} margin the calculator starts with, a figure you should replace with your own, the average would leave ${K.usd(e.y.cashBeforeDebt)} a year after royalty and ad fund.</p>
<h2>Next to the other sit-down brands</h2>
<p>${h.a('brand:ihop', 'IHOP')} estimates ${K.range(ih)} and ${h.a('brand:dennys', "Denny's")} ${K.range(dn)}; both report lower average sales than Applebee's. Golden Corral, also in the casual dining category, asks ${K.range(gc)}. The Applebee's network is shrinking on the franchised side while the company count grew by 12 in 2025, after the franchisor took back restaurants in 2024, 32 of them in Georgia. The full ${h.fdd('applebees')} runs to ${K.num(b.pages)} pages.</p>
`,
  faqs: [
    { q: "What does an Applebee's franchise cost in 2026?", a: `Item 7 puts a new Celebration prototype restaurant at ${K.range(b)}, without real property. That model had not been built when the document was issued, so the estimates come from third parties. The discontinued Tower II prototype was estimated at $3,870,004 to $5,822,933, and a Dual Branded restaurant with IHOP at $616,682 to $4,632,445.` },
    { q: "Will the Applebee's ad fund rate change in 2027?", a: `Yes. The national advertising fund takes ${K.rate(b.adPct)} of gross sales through December 31, 2026 and is to fall to 3.25 % from January 1, 2027. From that date a local advertising spend of at least 0.5 % becomes required, and the national fund plus local spending may not exceed ${K.rate(b.adPctHigh)} of gross sales.` },
    { q: "How much does an average Applebee's restaurant sell?", a: `The ${K.num(b.i19.count!)} traditional franchised restaurants in Item 19 averaged ${K.usd(K.i19(b)!)} in gross sales over the 12 months to December 28, 2025, with a median of ${K.usd(b.i19.median!)}. Northeast restaurants averaged ${K.usd(ne)} and Southern ones ${K.usd(so)}. The document prints no costs or profit.` },
    { q: "Is the Applebee's royalty fixed for the whole agreement?", a: `Not necessarily. Item 6 prints a royalty of ${K.rate(b.royPct)} of gross sales, paid monthly on the 12th, and adds that this percentage can be increased by the franchisor. A buyer should read the franchise agreement itself to see what limits, if any, apply to an increase during the term.` },
  ],
  related: ['brand:ihop', 'brand:dennys', 'compare-franchises', 'franchise-royalty-fees'],
});
