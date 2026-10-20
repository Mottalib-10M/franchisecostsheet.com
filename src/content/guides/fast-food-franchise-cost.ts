import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Category } from '../../lib/brand-types';

/** Brand pages that exist (file names of src/content/brands), read without loading them. */
const PAGES = new Set(Object.keys(import.meta.glob('../brands/*.ts')).map((f) => f.split('/').pop()!.replace(/\.ts$/, '')));
const bl = (h: Helpers, slug: string, text = K.B(slug).brand) => (PAGES.has(slug) ? h.a(`brand:${slug}`, text) : h.fdd(slug, text));

const FAST: Category[] = ['burgers', 'chicken', 'pizza', 'sandwiches', 'mexican'];
const groups = FAST.map((c) => ({ c, list: K.inCat(c) })).filter((g) => g.list.length > 0);
const all = groups.flatMap((g) => g.list);
const medLow = K.median(all.map((b) => b.invLow));
const medHigh = K.median(all.map((b) => b.invHigh));
const lowest = all.slice().sort((a, b) => a.invLow - b.invLow)[0];
const dearest = all.slice().sort((a, b) => b.invHigh - a.invHigh)[0];
const medOf = (c: Category) => K.median(K.inCat(c).map((b) => b.invLow));
const cheapCat = groups.slice().sort((a, b) => medOf(a.c) - medOf(b.c))[0];
const dearCat = groups.slice().sort((a, b) => medOf(b.c) - medOf(a.c))[0];
const landlords = all.filter((b) => b.rentToFranchisor !== null);
const mcd = K.B('mcdonalds');
const cfa = K.B('chick-fil-a');
const wen = K.B('wendys');
const mcdEco = K.eco('mcdonalds');
const cfaEco = K.eco('chick-fil-a');
const wenEco = K.eco('wendys');
const spreadOf = (b: (typeof all)[number]) => b.invHigh / b.invLow;
const widest = K.BRANDS.slice().sort((a, b) => spreadOf(b) - spreadOf(a))[0];
const feeRank = K.BRANDS.filter((b) => b.feeLow < cfa.feeLow).length;
const sharers = all.filter((b) => b.profitSharePct > 0);
const olderThanMcd = K.BRANDS.filter((b) => b.issued < mcd.issued).length;
const pizzaCheaper = medOf('pizza') < medOf('burgers');
const salesPizza = K.catSales('pizza').median, salesBurg = K.catSales('burgers').median;
const topFixed = all.slice().sort((a, b) => b.fixedYear - a.fixedYear)[0];

export default defineGuide({
  id: 'fast-food-franchise-cost',
  group: 'compare',
  order: 13,
  slug: 'fast-food-franchise-cost',
  nav: 'Fast food franchise cost',
  card: 'Burgers, chicken, pizza, sandwiches and Mexican: the Item 7 ranges, the fees, and the landlords that are also franchisors.',
  title: 'Fast Food Franchise Cost 2026: Burgers, Chicken, Pizza, Subs',
  description: `Fast food franchise cost in 2026 for ${all.length} brands: Item 7 ranges for burgers, chicken, pizza, subs and Mexican, plus McDonald's rent and the Chick-fil-A model.`,
  h1: 'What a fast food franchise costs: burgers, chicken, pizza, subs and Mexican',
  intro: `McDonald's, Chick-fil-A and Wendy's side by side at the same margin. Change any of the three brands, or the margin, to see how the payback moves.`,
  resume: `Across the ${all.length} fast food brands on this site (burgers, chicken, pizza, sandwiches and Mexican), the median Item 7 range runs from ${K.usd(medLow)} to ${K.usd(medHigh)}. The cheapest to open is ${lowest.brand}, from ${K.usd(lowest.invLow)}, and the top of all ranges is ${dearest.brand} at ${K.usd(dearest.invHigh)}. ${K.CATS[cheapCat.c].label} cost the least to open at the median and ${K.CATS[dearCat.c].label.toLowerCase()} the most, a gap that follows the kind of building each brand quotes. Two brands break the usual model. ${mcd.brand} owns or leases the land and building and charges rent as a percentage of sales on top of its ${K.rate(mcd.royPct)} royalty, so its ${K.range(mcd)} leaves out the property. ${cfa.brand} asks only a ${K.usd(cfa.feeLow)} fee, but its Operator owns neither building nor equipment and pays ${K.rate(cfa.royPct)} of gross receipts plus ${cfa.profitSharePct} % of the restaurant's net profit. ${landlords.length} of the ${all.length} brands print rent paid to the franchisor in at least some cases.`,
  body: (h) => `
<h2>Five kinds of fast food, five price levels</h2>
<p>The table gives, for each fast food category on file, the number of brands read, the median low and high Item 7 totals, the median initial fee and the median royalty plus ad fund. A median describes a typical brand of the group; the cheapest brand of each category is in the last column, linked to its document or brand page.</p>
${h.table(['Category', 'Brands', 'Item 7, median range', 'Fee, median', 'Royalty + ad, median', 'Cheapest to open'], groups.map((g) => { const c = g.list.slice().sort((a, b) => a.invLow - b.invLow)[0]; return [K.CATS[g.c].label, String(g.list.length), `${K.usd(medOf(g.c))} to ${K.usd(K.median(g.list.map((b) => b.invHigh)))}`, K.usd(K.median(g.list.map((b) => b.feeLow))), K.rate(Number(K.median(g.list.map((b) => K.pctFees(b))).toFixed(2))), `${bl(h, c.slug)}, ${K.usd(c.invLow)}`]; }), 'Fast food brands on this site, latest disclosure document of each.', ['l', 'r', 'r', 'r', 'r', 'l'])}
<p>The building drives most of the gap. Pizza delivery and carry-out stores and in-line sandwich shops open in leased storefronts with a modest kitchen. Burger and chicken brands mostly quote a freestanding restaurant with a drive-thru lane, a larger kitchen and a parking lot, and some include the land. Within a category the spread is also wide: the high end of one brand is often several times the low end of another, so the brand pages matter more than the medians.</p>
<h2>McDonald's: the franchisor is also the landlord</h2>
<p>${bl(h, 'mcdonalds', mcd.brand)} quotes ${K.range(mcd)} for a traditional restaurant, including the ${K.usd(mcd.feeLow)} fee. The total buys equipment, signs, seating and decor; it does not buy the land or the building, because ${mcd.brand} acquires the real estate and the franchisee rents it. The document sets that rent as a monthly base rent plus a fixed percentage of gross sales: for new traditional restaurants opened on or after January 1, 2020, the rate is 10.00 % when development costs are up to $1,550,000, and it rises in steps of 0.25 % with those costs, up to 15.00 % for $3,210,001 to $3,310,000. Item 19 adds that the range of effective rent percentages in 2023 for franchised restaurants was 0.00 % to 33.30 %.</p>
<p>That rent comes on top of the royalty of ${K.rate(mcd.royPct)} and an advertising spend of at least ${K.rate(mcd.adPct)} of sales, and of about twenty yearly technology fees, which add up to ${K.usd(mcd.fixedYear)} in the lines this site counts. The calculator does not include percentage rent, because it differs by restaurant: lower the margin you type to account for it. The sales figure in the ${mcd.brand} document is ${K.usd(K.i19(mcd)!)} per franchised traditional restaurant, for ${mcd.i19.period}; the edition on file was issued ${K.day(mcd.issued)}, ${olderThanMcd === 0 ? `the oldest of the ${K.BRANDS.length} documents read here` : `older than ${K.BRANDS.length - 1 - olderThanMcd} of the other ${K.BRANDS.length - 1} documents read here`}.</p>
<h2>Chick-fil-A: a low fee, an Operator, not an owner</h2>
<p>The ${cfa.brand} Item 7 range, ${K.range(cfa)}, ${widest.slug === cfa.slug ? 'is the widest on this site' : `spans ${K.dec(spreadOf(cfa), 1)} times its low end`}, and ${feeRank === 0 ? `no brand on file asks a lower fee than its ${K.usd(cfa.feeLow)}` : `only ${feeRank} brands on file ask a lower fee than its ${K.usd(cfa.feeLow)}`}. Both reflect a model ${sharers.length === 1 ? 'unlike any other fast food brand on file' : 'shared by few brands on file'}. The franchise agreement is signed only with an individual, the Operator, who leases the premises from ${cfa.brand} and rents the equipment from it. ${cfa.brand} takes a base operating service fee equal to ${K.rate(cfa.royPct)} of gross receipts minus the equipment rental and a business services fee, and then ${cfa.profitSharePct} % of the restaurant's net profit. The Operator keeps a base profit of $1,000 a month and the other half of net profit. The document has not charged an advertising contribution since 1989, as a matter of internal policy that it says may change.</p>
<p>The result: the Operator invests little and keeps a share of profit, while the restaurant and its sales, ${K.usd(K.i19(cfa)!)} on average for the non-mall Operator restaurants in Item 19, remain ${cfa.brand}'s asset. At the default margin of ${K.P.calc.defaultMarginPct} %, the calculator gives ${K.usd(cfaEco.y.toFranchisor)} a year paid to ${cfa.brand} against ${K.usd(mcdEco.y.toFranchisor)} for ${mcd.brand} (rent apart) and ${K.usd(wenEco.y.toFranchisor)} for ${wen.brand}, each on its own Item 19 sales.</p>
${h.mini('compare', { t: 'Three fast food brands at the same margin', p: ['a', 'c2', 'c3', 'm'], d: { a: 'mcdonalds', c2: 'chick-fil-a', c3: 'wendys' } })}
<h2>Fixed fees that do not move with sales</h2>
<p>Royalty and ad fund scale with sales; technology and service fees do not. The largest fixed yearly charge counted here among fast food brands is in the ${topFixed.brand} document, ${K.usd(topFixed.fixedYear)} (${topFixed.fixedNote ?? 'fees listed in Item 6'}). For a high-volume restaurant that is a rounding error; for a slow one in its first year it is a real cost. The ${h.a('franchise-royalty-fees', 'royalty page')} adds percentage and fixed fees together over a full agreement, and the ${h.a('cheapest-franchises', 'cheapest franchises page')} looks at the brands that cost least to open.</p>
`,
  faqs: [
    { q: 'How much does a fast food franchise cost to open in 2026?', a: `For the ${all.length} burger, chicken, pizza, sandwich and Mexican brands read here, the median Item 7 range is ${K.usd(medLow)} to ${K.usd(medHigh)}. Storefront pizza and sandwich shops sit at the bottom, freestanding drive-thru burger and chicken restaurants at the top. Most ranges exclude buying land; a few include it, which lifts them.` },
    { q: "Does McDonald's charge rent on top of the royalty?", a: `Yes. ${mcd.brand} owns or leases the site and charges the franchisee a monthly base rent plus a percentage of gross sales, 10.00 % or more for new traditional restaurants opened since 2020, depending on development costs. That comes on top of the ${K.rate(mcd.royPct)} royalty and at least ${K.rate(mcd.adPct)} for advertising. The Item 7 total does not include it.` },
    { q: 'Why is the Chick-fil-A franchise fee so low?', a: `Because the Operator does not buy the restaurant. ${cfa.brand} leases the premises and rents the equipment to the Operator, then takes ${K.rate(cfa.royPct)} of gross receipts, less the equipment rent and a services fee, plus ${cfa.profitSharePct} % of net profit. The ${K.usd(cfa.feeLow)} fee is the Operator's only required initial outlay; half of it is held as a deposit.` },
    { q: 'Which is cheaper to open, a pizza or a burger franchise?', a: `On the brands read here, ${pizzaCheaper ? 'pizza' : 'burgers'}: the median low end of Item 7 is ${K.usd(medOf('pizza'))} for pizza brands against ${K.usd(medOf('burgers'))} for burger brands. Pizza stores are mostly leased storefronts built for delivery and carry-out, while burger brands mostly quote freestanding drive-thru buildings.${salesPizza !== null && salesBurg !== null ? ` The median Item 19 sales figure is ${K.usd(salesPizza)} for pizza and ${K.usd(salesBurg)} for burgers.` : ''}` },
  ],
  tool: 'compare',
  toolArg: { a: 'mcdonalds', c2: 'chick-fil-a', c3: 'wendys' },
  related: ['franchise-cost', 'compare-franchises', 'cheapest-franchises', 'franchise-royalty-fees'],
  sources: ['ftc_436_5', 'mn_cards', 'ftc_guide'],
});
