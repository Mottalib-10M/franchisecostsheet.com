import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

/** Brand pages that exist (file names of src/content/brands), read without loading them. */
const PAGES = new Set(Object.keys(import.meta.glob('../brands/*.ts')).map((f) => f.split('/').pop()!.replace(/\.ts$/, '')));
const bl = (h: Helpers, slug: string, text = K.B(slug).brand) => (PAGES.has(slug) ? h.a(`brand:${slug}`, text) : h.fdd(slug, text));

const n = K.BRANDS.length;
const byLow = K.BRANDS.slice().sort((a, b) => a.invLow - b.invLow);
const top = byLow.slice(0, 8);
const first = byLow[0], second = byLow[1], third = byLow[2];
const under500 = K.BRANDS.filter((b) => b.invLow < 500000);
const under500pub = under500.filter((b) => K.i19(b) !== null);
const medLow = K.median(K.BRANDS.map((b) => b.invLow));
const spread = (b: Brand) => b.invHigh / b.invLow;
const widest = top.slice().sort((a, b) => spread(b) - spread(a))[0];
const sub = K.B('subway');
const lc = K.B('little-caesars');
const dom = K.B('dominos');
const byFees = K.BRANDS.slice().sort((a, b) => K.pctFees(b) - K.pctFees(a));
const subRank = byFees.findIndex((b) => b.slug === 'subway') + 1;
const above = byFees.filter((b) => K.pctFees(b) > K.pctFees(sub));
const medPct = K.median(K.BRANDS.map((b) => K.pctFees(b)));
const subEco = K.eco('subway');
const subFees = subEco.y.royalty + subEco.y.ad;
const tenYears = K.tool('fees', { sales: subEco.sales, roy: sub.royPct!, ad: sub.adPct!, fee: sub.feeLow, yrs: 10, fx: sub.fixedYear });
const tenTotal = sub.feeLow + 10 * (subFees + sub.fixedYear);
const topCats = [...new Set(top.map((b) => b.category))];
const medSpread = K.median(under500.map((b) => b.invHigh / b.invLow));
const lcShare = lc.toFrLow! / lc.invLow;
const zeroFee = K.BRANDS.filter((b) => b.feeLow === 0);
const noI19Cheap = top.filter((b) => K.i19(b) === null);

export default defineGuide({
  id: 'cheapest-franchises',
  group: 'compare',
  order: 10,
  slug: 'cheapest-franchises',
  nav: 'Cheapest franchises',
  card: 'The lowest Item 7 starting totals on file, what the low end leaves out, and the fees that come after opening.',
  title: 'Cheapest Franchises 2026: Lowest Item 7 Investments on File',
  description: `Cheapest franchises in 2026, ranked by the low end of Item 7 in each disclosure document, with what that low end covers and the royalty taken on every sale.`,
  h1: 'The cheapest franchises to open, read in their disclosure documents',
  intro: 'Sorted by the smallest starting total each franchisor prints in Item 7. Switch the sort to fees or published sales to see how the order changes.',
  resume: `Ranked by the low end of the Item 7 estimate, the cheapest brand on this site to open is ${first.brand}, from ${K.usd(first.invLow)}, followed by ${second.brand} from ${K.usd(second.invLow)} and ${third.brand} from ${K.usd(third.invLow)}. Of the ${n} brands read, ${under500.length} print a low end under $500,000, against a median low end of ${K.usd(medLow)} for all of them. That low end is the franchisor's cheapest plausible opening: the smallest premises, minimal fit-out and the smallest cash cushion, and it rarely includes land or a building. For the brands under $500,000, the high end is a median ${K.dec(medSpread, 1)} times the low end. A low entry price can also come with heavy fees later: ${sub.brand}, from ${K.usd(sub.invLow)}, takes ${K.rate(K.pctFees(sub))} of gross sales in royalty and ad fund, against a median of ${K.rate(medPct)} across the site, and publishes no sales figure in Item 19. Cheap to open and cheap to run are two separate questions.`,
  body: (h) => `
<h2>The lowest starting totals on file</h2>
<p>The table lists the ${top.length} brands with the smallest Item 7 low end among the ${n} disclosure documents read for this site, with the high end of the same estimate, the initial fee from Item 5, the share of royalty and ad fund taken on sales, and the yearly sales figure printed in Item 19 when there is one. Each row comes from the latest edition registered in Minnesota; the brand links open the brand page, or the document itself where no page exists yet.</p>
${h.table(['Brand', 'Item 7 low end', 'Item 7 high end', 'Fee', 'Royalty + ad', 'Item 19 sales'], top.map((b) => [bl(h, b.slug), K.usd(b.invLow), K.usd(b.invHigh), K.usd(b.feeLow), b.royFlat ? `${K.rate(K.pctFees(b))}, with a minimum` : K.rate(K.pctFees(b)), K.i19(b) === null ? 'none published' : K.usd(K.i19(b)!)]), 'Lowest Item 7 starting totals, latest disclosure document of each brand.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Two things stand out. The list spans ${topCats.length} categories (${topCats.map((c) => K.CATS[c].short).join('; ')}): the low ends are set by small premises and light equipment, not by the brand's fame. And ${noI19Cheap.length ? `${noI19Cheap.map((b) => b.brand).join(' and ')} ${noI19Cheap.length > 1 ? 'publish' : 'publishes'} no sales figure at all, so a low entry ticket can come with the least information about what a unit sells` : 'every brand in the list publishes a sales figure, though each on its own scope'}. Of the ${under500.length} brands under $500,000 at the low end, ${under500pub.length} print an Item 19 figure.</p>
<h2>What the low end really pays for</h2>
<p>Item 7 is a table of estimated expenses, line by line, with a low and a high column and a total at the bottom. The low total assumes the cheapest case on every line at once: the smallest space, the lowest rent deposit, used or minimal fixtures where allowed, a landlord who pays part of the build-out, and the shortest stretch of working capital the franchisor considers plausible. Rarely does a single opening hit the low figure on all lines together, which is why lenders and owners plan from the middle.</p>
<p>The gap between ends tells you how much the site decides. Among the brands above, ${widest.brand} has the widest spread: its high end is ${K.dec(spread(widest), 1)} times its low end (${K.range(widest)}), because the same franchise can open in very different buildings. The ${sub.brand} document is a good example of what a low line can hide: its real property line covers only a two-month rent deposit, and its premises are usually subleased from an affiliate of the franchisor at an estimated $1,000 to $6,000 a month, an operating cost that never appears in the total. Several mall formats, such as ${bl(h, 'auntie-annes')} and ${bl(h, 'cinnabon')}, count only one month of rent in Item 7.</p>
${h.mini('roi', { t: 'Payback at the low end versus the high end', p: ['b', 'at', 'm'], d: { b: first.slug, at: 'low' } })}
<h2>Cheap to open, then fees on every sale</h2>
<p>The franchise fee is a one-time charge, and the cheapest brands do not always have the lowest one. ${zeroFee.length ? `${zeroFee.map((b) => b.brand).join(' and ')} ${zeroFee.length > 1 ? 'print' : 'prints'} an Item 5 fee of ${K.usd(0)} for the unit quoted. ` : ''}${dom.brand} ${dom.feeLow === 0 ? 'charges no fee' : `charges a fee of ${K.usd(dom.feeLow)}`} for a traditional store, yet ${K.usd(dom.toFrLow!)} or more of its ${K.usd(dom.invLow)} low end goes to the franchisor and its affiliates for equipment, software and supplies. ${lc.brand} works the same way: ${K.pct(lcShare, 0)} of its low end, ${K.usd(lc.toFrLow!)}, is paid to the franchisor or an affiliate, mostly for equipment and technology. What a franchisor collects at opening and what it collects later are both part of the price.</p>
<p>The later part weighs more. ${sub.brand} charges a royalty of ${K.rate(sub.royPct)} and an ad fund of ${K.rate(sub.adPct)}, ${K.rate(K.pctFees(sub))} of gross sales in all, which places it ${subRank === 1 ? 'first' : `number ${subRank}`} of ${n} brands by that measure${above.length ? ` (only ${above.map((b) => b.brand).join(' and ')} ${above.length > 1 ? 'take' : 'takes'} more on paper)` : ''}. Since ${sub.brand} prints no sales figure, the calculator uses the median Item 19 figure of the sandwich brands on file, ${K.usd(subEco.sales)}. On that volume the royalty and ad fund come to ${K.usd(subFees)} a year, and over a ten-year agreement, with the fee and the fixed technology charges, ${tenYears.value} paid to the franchisor and its fund at flat sales. That is ${tenTotal > sub.invHigh ? 'more than the whole Item 7 high end' : `${K.pct(tenTotal / sub.invHigh, 0)} of the Item 7 high end`}.</p>
<h2>How to use a cheap entry figure</h2>
<p>Treat the low end as a floor for planning, not a budget. Read the notes beneath the Item 7 table: they say what the rent line counts, whether a tenant improvement allowance has been subtracted, and which formats the total does not cover. Then look at Item 6 for the fees that start on opening day, and at Item 19 for a sales figure to test them against. A unit that costs little to build but needs high volume to cover a large percentage fee can take longer to pay back than a dearer one with a lighter fee load; the ${h.a('franchise-break-even', 'break-even page')} works that out for any brand, and the ${h.a('franchise-royalty-fees', 'royalty page')} adds the fees up over the years.</p>
`,
  faqs: [
    { q: 'Which franchise has the lowest starting investment in 2026?', a: `Among the ${n} brands read here, ${first.brand} prints the lowest Item 7 low end, ${K.usd(first.invLow)}, followed by ${second.brand} at ${K.usd(second.invLow)}. Both figures are the franchisor's cheapest scenario for one unit. The high ends of the same estimates are ${K.usd(first.invHigh)} and ${K.usd(second.invHigh)}, closer to what many openings cost.` },
    { q: 'Does a low Item 7 figure include rent and real estate?', a: 'Rarely in full. Most low ends assume a leased site and count only a deposit and one to three months of rent, while the purchase of land or a building is left out. Rent paid after those first months is an operating cost, not part of the investment. The notes under each Item 7 table say exactly what the real property line covers.' },
    { q: 'Is a cheaper franchise cheaper to run?', a: `Not necessarily. ${sub.brand} is among the cheapest to open here, from ${K.usd(sub.invLow)}, but takes ${K.rate(K.pctFees(sub))} of gross sales in royalty and ad fund, above the site median of ${K.rate(medPct)}. Fees are charged on sales whatever the profit, so a low entry price can be followed by a heavier yearly bill than a dearer brand charges.` },
    { q: 'Why do some low-cost franchises publish no sales figures?', a: 'Item 19 is optional under the FTC Rule. A franchisor may print average or median sales of its units, or print nothing, and then its staff may not quote any sales or profit figure. A missing Item 19 leaves the buyer to ask the owners listed in Item 20 or to read the books of a unit offered for resale.' },
  ],
  tool: 'list',
  toolArg: { cat: 'all', sort: 'low' },
  related: ['franchise-cost', 'franchise-fee', 'brand:subway', 'franchise-royalty-fees'],
  sources: ['ftc_436_5', 'mn_cards', 'ftc_guide'],
});
