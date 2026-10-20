import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

/** Brand pages that exist (file names of src/content/brands), read without loading them. */
const PAGES = new Set(Object.keys(import.meta.glob('../brands/*.ts')).map((f) => f.split('/').pop()!.replace(/\.ts$/, '')));
const bl = (h: Helpers, slug: string, text = K.B(slug).brand) => (PAGES.has(slug) ? h.a(`brand:${slug}`, text) : h.fdd(slug, text));

const n = K.BRANDS.length;
const TOP = 5;
/* Criterion 1: Item 19 sales per dollar of the middle of Item 7. */
const ratio = (b: Brand) => K.i19(b)! / K.invAt(b, 'mid');
const withSales = K.BRANDS.filter((b) => K.i19(b) !== null);
const byRatio = withSales.slice().sort((a, b) => ratio(b) - ratio(a));
/* Criterion 2: royalty + ad fund, percentage brands only (a flat minimum cannot be ranked on a share). */
const pctOnly = K.BRANDS.filter((b) => !b.royFlat && b.royPct !== null);
const byFees = pctOnly.slice().sort((a, b) => K.pctFees(a) - K.pctFees(b) || a.fixedYear - b.fixedYear);
/* Criterion 3: net change of franchised units in the last Item 20 year, as a share of the start count. */
const withUnits = K.BRANDS.filter((b) => b.units.franchised !== null && b.units.franchisedNetChange !== null && b.units.franchised - b.units.franchisedNetChange > 0);
const growth = (b: Brand) => b.units.franchisedNetChange! / (b.units.franchised! - b.units.franchisedNetChange!);
const byGrowth = withUnits.slice().sort((a, b) => growth(b) - growth(a));
const shrinking = withUnits.filter((b) => b.units.franchisedNetChange! < 0);
const unitYears = [...new Set(withUnits.map((b) => b.units.year))].sort();
/* Criterion 4: a margin printed in Item 19. */
const withMargin = K.BRANDS.filter((b) => b.i19.profitPct !== null).sort((a, b) => b.i19.profitPct! - a.i19.profitPct!);

const tops = [byRatio, byFees, byGrowth].map((l) => l.slice(0, TOP).map((b) => b.slug));
const inTwo = K.BRANDS.filter((b) => tops.filter((t) => t.includes(b.slug)).length >= 2);
const inAll = K.BRANDS.filter((b) => tops.every((t) => t.includes(b.slug)));
const r1 = byRatio[0], f1 = byFees[0], g1 = byGrowth[0], s1 = shrinking.slice().sort((a, b) => growth(a) - growth(b))[0];
const cfa = K.B('chick-fil-a');
const names = (l: Brand[]) => l.map((b) => b.brand).join(', ');

export default defineGuide({
  id: 'best-franchises-to-own',
  group: 'compare',
  order: 11,
  slug: 'best-franchises-to-own',
  nav: 'Best franchises: four measures',
  card: 'Four measurable criteria from the disclosure documents, a ranking on each, and why no single brand wins them all.',
  title: 'Best Franchises to Own 2026: Four Measures From the FDDs',
  description: `Best franchises to own in 2026, measured not chosen: Item 19 sales per dollar invested, royalty plus ad fund, unit growth and printed margins, from each FDD.`,
  h1: 'The best franchises to own, measured four ways from the documents',
  intro: 'No pick and no advice: four criteria the disclosure documents allow you to measure, each ranked from the same files. Sort the table by the one that matters to you.',
  resume: `No document can say which franchise is best for a given buyer, and this page names none. What the disclosure documents do allow is measurement on criteria that matter to an owner. On Item 19 sales per dollar of the middle Item 7 investment, ${r1.brand} ranks first, with ${K.dec(ratio(r1), 2)} dollars of yearly sales per dollar invested. On the share of sales taken as royalty plus ad fund, ${f1.brand} is lowest at ${K.rate(K.pctFees(f1))}. On growth of franchised units in the last year counted in Item 20, ${g1.brand} leads with a net gain of ${K.num(g1.units.franchisedNetChange!)}, ${K.pct(growth(g1), 1)} of its starting count, while ${shrinking.length} of the ${withUnits.length} brands counted lost franchised units. Only ${withMargin.length} of ${n} brands print any margin, each on its own scope. ${inAll.length ? `${names(inAll)} ${inAll.length > 1 ? 'reach' : 'reaches'} the top ${TOP} on all three ranked measures.` : `No brand reaches the top ${TOP} on all three ranked measures.`} Item 19 figures cover different subsets of units, so every ranking here is a starting point for reading, not advice.`,
  body: (h) => `
<h2>Why this page ranks criteria, not brands</h2>
<p>A list of the best franchises can reflect who paid to appear on it, or an editor's taste. A disclosure document offers something narrower and more useful: figures printed under the FTC Rule, in the same numbered Items for every brand, which can be put side by side. This page takes four such figures, ranks the ${n} brands on file on each, and stops there. Your budget, your town, your experience in the trade and the rent of the site you can get matter more than any of the four, and none of them appears in a franchisor's document.</p>
<p>Read every ranking with one caution. Item 19 is not a standard measure: one franchisor prints the average of all its franchised units open a full year, another only its freestanding drive-thru restaurants, a third only its mall shops or a single region. ${cfa.brand}, for example, reports its non-mall Operator restaurants only. Two averages built on different subsets do not compare cleanly, and the brand pages say which subset each covers.</p>
<h2>Measure 1: published sales per dollar invested</h2>
<p>The ratio divides the Item 19 sales figure (the average, or the median where no average is printed) by the middle of the Item 7 range. It asks how much yearly business each dollar of the opening budget buys. It ignores margins, which differ widely between a bakery and a drive-thru, so a high ratio is a reason to read further, not a verdict. ${withSales.length} of the ${n} brands print a usable figure; the others cannot be ranked here.</p>
${h.table(['Rank', 'Brand', 'Item 19 sales', 'Middle of Item 7', 'Sales per $ invested'], byRatio.slice(0, TOP).map((b, i) => [String(i + 1), bl(h, b.slug), K.usd(K.i19(b)!), K.usd(K.invAt(b, 'mid')), K.dec(ratio(b), 2)]), `Top ${TOP} of ${withSales.length} brands with an Item 19 sales figure.`, ['r', 'l', 'r', 'r', 'r'])}
<h2>Measure 2: the share of sales paid to the franchisor</h2>
<p>Royalty and ad fund are charged on gross sales, before food, labor or rent, so each point of difference is a point of margin the owner keeps or gives up. The ranking below adds the two printed rates for brands that charge a straight percentage, and breaks ties on the fixed yearly charges counted from Item 6. Brands whose royalty carries a flat minimum are left out, since their burden depends on volume. Note what the percentage misses: rent paid to the franchisor as landlord, supply markups through an affiliate, and the profit share of ${cfa.brand}.</p>
${h.table(['Rank', 'Brand', 'Royalty', 'Ad fund', 'Together', 'Fixed fees a year'], byFees.slice(0, TOP).map((b, i) => [String(i + 1), bl(h, b.slug), K.rate(b.royPct), K.rate(b.adPct), K.rate(K.pctFees(b)), K.usd(b.fixedYear)]), `Lowest royalty plus ad fund among ${pctOnly.length} brands with percentage fees.`, ['r', 'l', 'r', 'r', 'r', 'r'])}
<h2>Measure 3: are franchised units growing?</h2>
<p>Item 20 counts franchised and company outlets at the start and end of each of the last three years. A network where owners keep opening units, and few close, tells you something that no sales average does. The measure here is the net change of franchised units in the latest year printed, divided by the count at the start of that year. The years are not the same for all brands (${unitYears.join(', ')}), because some documents on file are older editions. A brand can also grow its franchised count by selling company units to franchisees, which moves units from one column to the other without opening anything.</p>
${h.table(['Rank', 'Brand', 'Year', 'Franchised units', 'Net change', 'Growth'], byGrowth.slice(0, TOP).map((b, i) => [String(i + 1), bl(h, b.slug), String(b.units.year), K.num(b.units.franchised!), `+${K.num(b.units.franchisedNetChange!)}`, K.pct(growth(b), 1)]), `Fastest net growth of franchised units, ${withUnits.length} brands with an Item 20 count.`, ['r', 'l', 'r', 'r', 'r', 'r'])}
<p>At the other end, ${shrinking.length} brands ended their last counted year with fewer franchised units than they started with; the steepest relative fall is ${s1.brand}, ${K.pct(growth(s1), 1)} (${K.num(s1.units.franchisedNetChange!)} units). A shrinking count does not mean every unit struggles, but the owners who left are worth calling: Item 20 lists them.</p>
<h2>Measure 4: margins that are actually printed</h2>
<p>Almost no franchisor prints a profit. The ${withMargin.length} that print some margin in Item 19 do so on scopes chosen by each: company units only, before rent, before the royalty a franchisee would pay, or for one format among several. These percentages cannot be ranked against each other in any honest way, so the list below is sorted from the highest printed figure only for ease of reading, not as a ranking; the brand page of each says what the figure leaves out.</p>
${h.table(['Brand', 'Margin printed', 'Item 19 sales'], withMargin.map((b) => [bl(h, b.slug), K.pct(b.i19.profitPct! / 100, 1), K.i19(b) === null ? 'none' : K.usd(K.i19(b)!)]), 'Margins as printed in Item 19, each on its own scope.', ['l', 'r', 'r'])}
${h.mini('list', { t: 'Rank every brand on one measure', p: ['cat', 'sort'], d: { cat: 'all', sort: 'ratio' } })}
<h2>No brand wins on all counts</h2>
<p>Put the three ranked measures together and the lists barely overlap. ${inTwo.length ? `${names(inTwo)} ${inTwo.length > 1 ? 'appear' : 'appears'} in the top ${TOP} of two of them` : `No brand appears in the top ${TOP} of two of them`}${inAll.length ? `, and ${names(inAll)} in all three` : ', and none in all three'}. That is the point of measuring rather than choosing: a buyer who cares most about cash returned on the opening budget, one who wants the lightest fee load, and one who wants a network that keeps adding owners would land on different brands. The ${h.a('compare-franchises', 'comparison page')} sets two or three of them side by side at the same margin, and the ${h.a('item-19-franchise-earnings', 'Item 19 page')} explains what each kind of sales figure includes.</p>
`,
  faqs: [
    { q: 'Which franchise makes the most money for its owner?', a: 'No disclosure document answers that, because almost none prints owner profit. Item 19 gives sales, sometimes costs for company units, and the owner pays rent, wages, loan payments and taxes that vary by site. This page ranks measurable proxies, such as sales per dollar invested, and leaves profit to the margin you type in the calculator.' },
    { q: 'Is this ranking a recommendation to buy a franchise?', a: `No. It sorts ${n} brands on figures their own documents print and says plainly where those figures differ in scope. A brand at the top of one measure can sit near the bottom of another. The choice depends on capital, location, experience and the terms of the agreement, which a franchise lawyer and current owners can review with you.` },
    { q: 'Why do Item 19 averages not compare directly between brands?', a: `Each franchisor picks the units it reports: all franchised units open a full year, only freestanding drive-thrus, only mall shops, or one region. Some print a median, some an average, some both, and the years differ. ${cfa.brand} reports non-mall Operator restaurants only. Comparing two averages without reading their scope compares two different populations.` },
    { q: 'What does franchised unit growth in Item 20 tell a buyer?', a: 'It shows whether owners are opening more units than they close, in the latest years printed. Growth can also come from a franchisor selling its company units to franchisees, which adds franchised units without any new opening. A falling count means closures or buybacks; Item 20 lists former owners you may contact to ask why they left.' },
  ],
  tool: 'list',
  toolArg: { cat: 'all', sort: 'ratio' },
  related: ['item-19-franchise-earnings', 'compare-franchises', 'cheapest-franchises', 'franchise-royalty-fees'],
  sources: ['ftc_436_5', 'ftc_guide', 'mn_cards'],
});
