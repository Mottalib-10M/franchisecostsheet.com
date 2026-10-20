import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

/** Brand pages that exist (file names of src/content/brands), read without loading them. */
const PAGES = new Set(Object.keys(import.meta.glob('../brands/*.ts')).map((f) => f.split('/').pop()!.replace(/\.ts$/, '')));
const bl = (h: Helpers, slug: string, text = K.B(slug).brand) => (PAGES.has(slug) ? h.a(`brand:${slug}`, text) : h.fdd(slug, text));

const n = K.BRANDS.length;
const TRIO = ['subway', 'jersey-mikes', 'jimmy-johns'].map(K.B);
const MARGINS = [10, K.P.calc.defaultMarginPct, 20];
const pay = (b: Brand, m: number) => K.eco(b.slug, { m }).pay;
const yrs = (x: number | null) => (x === null ? 'never' : `${K.dec(x, 1)} years`);
const order = (m: number) => TRIO.slice().sort((a, b) => (pay(a, m) ?? 1e9) - (pay(b, m) ?? 1e9)).map((b) => b.slug).join();
const flips = new Set(MARGINS.map(order)).size > 1;
const leaderAt = (m: number) => TRIO.slice().sort((a, b) => (pay(a, m) ?? 1e9) - (pay(b, m) ?? 1e9))[0];
const leaderFlips = new Set(MARGINS.map((m) => leaderAt(m).slug)).size > 1;
const noFig = TRIO.filter((b) => K.i19(b) === null);
/* Pitfall 1: Item 19 scope. */
const noAverage = K.BRANDS.filter((b) => b.i19.published && K.i19(b) === null);
const notLatest = K.BRANDS.filter((b) => K.i19(b) !== null && b.i19.period !== null && !/2025/.test(b.i19.period));
const pot = K.B('potbelly');
const cfa = K.B('chick-fil-a');
/* Pitfall 2: real estate inside Item 7. */
const withLand = K.BRANDS.filter((b) => /land purchased|includes? (the )?purchase of land|includes purchased land/i.test(`${b.format} ${b.special ?? ''}`) && !/exclud/i.test(b.format));
/* Pitfall 3: a flat royalty minimum, and the sales below which it binds. */
const flat = K.BRANDS.filter((b) => b.royFlat !== null && b.royPct !== null).map((b) => {
  const amt = Number((b.royFlat!.match(/\$([\d,]+)/) ?? ['', '0'])[1].replace(/,/g, ''));
  const per = /week/i.test(b.royFlat!) ? 52 : /month/i.test(b.royFlat!) ? 12 : 1;
  return { b, amt, per, binds: (amt * per * 100) / b.royPct! };
}).filter((x) => x.amt > 0);
const fixedMax = K.BRANDS.slice().sort((a, b) => b.fixedYear - a.fixedYear)[0];
const fixedMin = Math.min(...K.BRANDS.map((b) => b.fixedYear));
const unitYears = [...new Set(K.BRANDS.map((b) => b.units.year))].sort();

export default defineGuide({
  id: 'compare-franchises',
  group: 'compare',
  order: 14,
  slug: 'compare-franchises',
  nav: 'Compare franchises',
  card: 'Two or three brands on the same basis, and the three traps: Item 19 scope, land inside Item 7, flat royalty minimums.',
  title: 'Compare Franchises 2026: Two or Three Brands on One Basis',
  description: `Compare franchises in 2026 on one basis: same margin, same point of Item 7, each brand's Item 19 sales, and the traps of scope, land and flat royalties.`,
  h1: 'How to compare franchises on the same basis',
  intro: 'Pick two or three brands. The calculator applies one margin and one point of the Item 7 range to all of them, so the only differences left are the ones in the documents.',
  resume: `To compare franchises fairly, put every brand on the same footing: the same point of the Item 7 range (the middle, unless you know your site), the sales figure each prints in Item 19, the royalty and ad fund each sets in Item 6, and one margin for all, typed by you. The calculator above does exactly that for up to three of the ${n} brands on file, with no loan, so the payback reflects the documents alone. Three traps break most comparisons. Item 19 figures cover different subsets of units, and ${noAverage.length} brands print no average at all. Some Item 7 totals include buying land, ${withLand.length} on this site, which makes them look dearer than leased formats. And ${flat.length} brands add a flat royalty minimum that matters only at low sales. Even the order of brands can change with the margin: ${leaderFlips ? 'for the three sandwich brands loaded by default, the shortest payback moves from one brand to another between 10 % and 20 %.' : flips ? 'for the three sandwich brands loaded by default, the brands behind the leader swap places between 10 % and 20 %.' : 'for the three sandwich brands loaded by default, the order holds between 10 % and 20 %, but the gaps change.'}`,
  body: (h) => `
<h2>One basis for every brand</h2>
<p>A franchisor's brochure compares itself to nobody. Two disclosure documents, read separately, describe two businesses in their own terms: one quotes a drive-thru, another a storefront, one prints a mean, another a median. Comparing them means choosing a basis and holding it. The calculator here fixes four things for every brand you load: the point of the Item 7 range (low, middle or high), the source of sales (each brand's own Item 19 figure, or the median of its category when it prints none), the fees as printed in Item 6, and a single margin before franchise fees, which you choose. It leaves out loans, because borrowing terms depend on the buyer, not the brand.</p>
<p>The margin is the one figure you supply, and it moves the result more than anything else. The table runs the three sandwich brands loaded by default at three margins.</p>
${h.table(['Brand', ...MARGINS.map((m) => `Payback at ${m} %`), 'Royalty + ad'], TRIO.map((b) => [bl(h, b.slug), ...MARGINS.map((m) => yrs(pay(b, m))), K.rate(K.pctFees(b))]), 'Middle of Item 7, Item 19 sales or the sandwich median, no loan.', ['l', 'r', 'r', 'r', 'r'])}
<p>${leaderFlips ? `The leader changes: at 10 % it is ${leaderAt(10).brand}, at 20 % ${leaderAt(20).brand}.` : flips ? `${leaderAt(10).brand} stays first at all three margins, but the two brands behind it swap places.` : `The order holds at all three margins, with ${leaderAt(10).brand} first.`}${noFig.length ? ` Note that ${noFig.map((b) => b.brand).join(' and ')} ${noFig.length > 1 ? 'print' : 'prints'} no Item 19 figure, so ${noFig.length > 1 ? 'their rows use' : 'its row uses'} the sandwich median: a lower investment against a category average says nothing about ${noFig.length > 1 ? 'their' : 'its'} own units.` : ''} A brand with a higher fee load suffers most at thin margins, because its royalty takes a larger share of what is left. Using the same margin for all is itself a simplification, since a bakery and a burger grill do not keep the same share of a dollar, so run the comparison at the margins you believe for each kind of business, not one number for all.</p>
${h.mini('compare', { t: 'Three chicken brands on the same basis', p: ['a', 'c2', 'c3', 'm', 'at'], d: { a: 'popeyes', c2: 'bojangles', c3: 'churchs' } })}
<h2>Trap 1: Item 19 does not measure the same units</h2>
<p>Each franchisor decides which units its Item 19 covers. ${bl(h, 'chick-fil-a', cfa.brand)} reports only its non-mall Operator restaurants open a full year. ${bl(h, 'potbelly', pot.brand)} prints one all-shop franchised average that includes five airport shops averaging $3,430,686, which lifts it, and gives a suburban average of $1,187,544 next to it. ${noAverage.length ? `${noAverage.map((b) => b.brand).join(' and ')} print${noAverage.length > 1 ? '' : 's'} no average or median at all, only how a sales forecast tool performed, so the calculator treats ${noAverage.length > 1 ? 'them' : 'it'} like a brand with no figure.` : ''} The period is not always the same either: ${notLatest.length} brands with a figure report a year other than 2025, because the edition on file is older or the fiscal year differs.</p>
<p>Before setting two averages side by side, read the label of each on its brand page: which formats, how many units, which year, mean or median. When the scopes differ, compare each brand's figure with its own break-even sales rather than with the other brand's figure.</p>
<h2>Trap 2: land inside some Item 7 totals</h2>
<p>Most documents quote a leased site and leave the purchase of land or a building out of Item 7. A few quote a unit built on purchased land, which adds several hundred thousand dollars or more to both ends of the range. On this site that applies to ${withLand.map((b) => bl(h, b.slug)).join(', ')}. ${bl(h, 'culvers')}, for instance, counts land at $225,000 to $2,400,000 and a new building at $2,047,000 to $4,391,000. Set one of those against a leased brand and the leased one looks far cheaper, while its owner pays rent every month that the other does not. Either subtract the land from the first or add capitalized rent to the second; the payback in the calculator, which ignores rent apart from your margin, will otherwise favor the leased format.</p>
<h2>Trap 3: flat royalty minimums</h2>
<p>A percentage royalty scales with sales. A flat minimum does not: below a certain volume, the owner pays the minimum instead. ${flat.map((x) => `${bl(h, x.b.slug)} sets its royalty at ${K.rate(x.b.royPct)} with a minimum of ${K.usd(x.amt)} per ${x.per === 52 ? 'week' : x.per === 12 ? 'month' : 'year'}, which binds below about ${K.usd(x.binds)} of yearly sales`).join('; ')}. For a typical unit the minimum never applies; for a slow first year at a weak site it raises the effective rate. The calculator applies the printed percentage, not the minimum, so check the minimum yourself when testing low sales.</p>
<h2>Smaller differences that add up</h2>
<p>Fixed technology and service fees, listed in Item 6, run from ${K.usd(fixedMin)} to ${K.usd(fixedMax.fixedYear)} a year (${fixedMax.brand}) among the brands on file, and are counted in the calculator when printed in dollars. Unit counts in Item 20 also come from different years (${unitYears.join(', ')}). A franchisor that is also the landlord, or that sells supplies through an affiliate, earns more than its royalty shows. None of these changes the method; each changes the margin you should type. The ${h.a('fast-food-franchise-cost', 'fast food page')} shows the landlord model in detail, and the ${h.a('franchise-break-even', 'break-even page')} gives the sales each brand needs.</p>
`,
  faqs: [
    { q: 'What is the fairest way to compare two franchise brands?', a: 'Hold everything the buyer controls constant: the same point of the Item 7 range, the same margin, no loan or the same loan. Then let only the documents differ: each brand\'s Item 19 sales, Item 6 fees and Item 7 total. Read the scope of each Item 19 figure first, because two averages over different subsets of units are not comparable.' },
    { q: 'Why does the shortest payback change when I change the margin?', a: 'Royalty and ad fund are taken on sales, so they eat a larger share of a thin margin than of a wide one. A brand with heavy percentage fees and high sales can lead at a 20 % margin and fall behind at 10 %, where a brand with lighter fees keeps more of each dollar. Test several margins before drawing a conclusion.' },
    { q: 'Should land be included when comparing Item 7 investments?', a: `Only if it is included for every brand you compare. ${withLand.length} brands on this site quote a unit on purchased land, while most quote a leased site. Comparing the two directly overstates the first and understates the second, whose owner pays rent instead. Remove the land line, or add the cost of rent, before ranking them.` },
    { q: 'What does a royalty minimum mean for a new franchisee?', a: 'It is a floor on the royalty: the owner pays the printed percentage of sales or a fixed amount per week or month, whichever is greater. At normal volumes it changes nothing. At low sales, during a slow opening year or at a weak site, the fixed amount applies and the effective royalty rate rises above the printed percentage.' },
  ],
  tool: 'compare',
  related: ['best-franchises-to-own', 'item-19-franchise-earnings', 'fast-food-franchise-cost', 'franchise-break-even'],
  sources: ['ftc_436_5', 'ftc_guide', 'mn_cards'],
});
