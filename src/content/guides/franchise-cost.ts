import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Category } from '../../lib/brand-types';

const n = K.BRANDS.length;
const cats = (Object.keys(K.CATS) as Category[]).map((c) => ({ c, list: K.inCat(c) })).filter((g) => g.list.length >= 2);
const catRow = (g: (typeof cats)[number]) => {
  const lows = g.list.map((b) => b.invLow), highs = g.list.map((b) => b.invHigh);
  const s = K.catSales(g.c);
  return [K.CATS[g.c].label, String(g.list.length), `${K.usd(K.median(lows))} to ${K.usd(K.median(highs))}`, K.usd(K.median(g.list.map((b) => b.feeLow))), K.rate(Number(K.median(g.list.map((b) => K.pctFees(b))).toFixed(2))), s.median === null ? 'too few published' : K.usd(s.median)];
};
const toFr = K.BRANDS.filter((b) => b.toFrLow !== null && b.toFrLow > 0);
const shareFr = K.median(toFr.map((b) => b.toFrLow! / b.invLow));
const realEstate = K.BRANDS.filter((b) => /land|real (estate|property)|purchase of the (site|property)/i.test(`${b.invQuote} ${b.special ?? ''}`));
const medLow = K.median(K.BRANDS.map((b) => b.invLow));
const medHigh = K.median(K.BRANDS.map((b) => b.invHigh));
const lowest = K.BRANDS.slice().sort((a, b) => a.invLow - b.invLow).slice(0, 3);
const bc = K.BRANDS.filter((b) => b.category === 'burgers' || b.category === 'chicken');
const bcMillion = bc.filter((b) => b.invLow > 1_000_000).length;
const withSales = K.BRANDS.filter((b) => K.i19(b) !== null);
const tenYears = (b: (typeof K.BRANDS)[number]) => (K.i19(b)! * K.pctFees(b)) / 100 * 10 + b.fixedYear * 10;
const overInv = withSales.filter((b) => tenYears(b) > K.invAt(b, 'mid'));
const ratio = (b: (typeof K.BRANDS)[number]) => b.invHigh / b.invLow;
const widest = K.BRANDS.slice().sort((a, b) => ratio(b) - ratio(a))[0];
const narrowest = K.BRANDS.slice().sort((a, b) => ratio(a) - ratio(b))[0];
const medRatio = K.median(K.BRANDS.map(ratio));

export default defineGuide({
  id: 'franchise-cost',
  group: 'costs',
  order: 1,
  slug: 'franchise-cost',
  nav: 'Franchise cost by brand',
  card: 'Every brand read on this site, its Item 7 investment, fee, royalty and published sales, by category.',
  title: 'Franchise Cost 2026: Investment and Fees for Every Brand',
  description: `Franchise cost in 2026 by brand and by category: the Item 7 investment, the Item 5 fee and the Item 6 royalty of ${n} brands, read in each disclosure document.`,
  h1: 'Franchise cost by brand and category: what the disclosure documents print',
  intro: 'Filter by category and sort by investment, fees or published sales: every line comes from the brand\'s own disclosure document.',
  resume: `What a franchise costs is printed in two places of its disclosure document. Item 7 gives the estimated initial investment for one unit, a low and a high total that include the franchise fee, construction or build-out, equipment, signs, opening inventory, deposits and the working capital of the first months. Item 5 gives the franchise fee alone. Across the ${n} brands on this site the median Item 7 range is ${K.usd(medLow)} to ${K.usd(medHigh)}, while the median franchise fee is ${K.usd(K.median(K.BRANDS.map((b) => b.feeLow)))}. The cheapest brands to open here are ${lowest.map((b) => `${b.brand} (from ${K.usd(b.invLow)})`).join(', ')}; ${bcMillion} of the ${bc.length} burger and chicken brands start above one million dollars. The franchisor itself receives a small part of the investment, a median of ${K.pct(shareFr, 0)} of the low total for the brands that state it; the rest goes to builders, equipment makers, landlords and suppliers.`,
  body: (h) => `
<h2>Category by category</h2>
<p>The table gives, for each category with at least two brands on this site, the median of the low and high Item 7 totals, the median fee, the median royalty plus ad fund, and the median of the Item 19 sales figures when at least ${K.P.calc.minBrandsForCategoryMedian} brands of the category publish one. A median says what a typical brand of the group asks, not what the cheapest or dearest does: the brand pages give each one.</p>
${h.table(['Category', 'Brands', 'Investment, median range', 'Fee, median', 'Royalty + ad fund, median', 'Item 19 sales, median'], cats.map(catRow), 'Each brand\'s latest disclosure document registered in Minnesota.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<h2>Why the range is so wide</h2>
<p>A single brand's Item 7 often runs from one figure to two or three times that figure. The gap comes from the site: a conversion of an existing restaurant costs less than a new building, rent and construction differ between a small town and a city, and the size of the dining room changes the equipment. For ${realEstate.length} brands on this site the document says the range includes buying land or a building; for most it assumes a leased site and leaves real estate out. Read the notes under the Item 7 table before comparing two brands: the brand pages say which case applies.</p>
<p>The spread itself varies a lot. The median brand's high total is ${K.dec(medRatio, 1)} times its low total. ${widest.brand} has the widest range on this site, ${K.range(widest)}, because its document covers very different sites under one table; ${narrowest.brand} has the narrowest, ${K.range(narrowest)}. A narrow range usually means one standard format and a franchisor that controls the build-out closely; a wide one means the buyer's own site choices drive the bill, and the brand page names the format the range describes.</p>
<p>The low end is not a promise either. It is the franchisor's estimate of the cheapest plausible opening, with the least expensive site and the smallest working capital. Lenders and owners tend to plan from the middle or the top of the range, which is why the calculators here let you pick the low end, the middle or the high end.</p>
${h.mini('roi', { t: 'Payback at the low, middle or high end of Item 7', p: ['b', 'at', 'm'], d: { b: 'jersey-mikes', at: 'high' } })}
<h2>Reading the Item 7 table line by line</h2>
<p>Every Item 7 table lists the same kinds of lines, in an order the FTC Rule leaves to the franchisor: the initial fee, travel and living costs during training, real estate or the first months of rent, leasehold improvements or construction, furniture, fixtures and equipment, signs, computer systems, opening inventory, grand opening advertising, insurance deposits, licenses and permits, professional fees, and additional funds, the working capital for the first three months or so. The last line is the one most often underestimated: it is meant to carry the unit until sales cover costs, and the document states over how many months it was estimated. A buyer who borrows should check that the loan covers it, because a unit that runs out of cash in month four closes whatever its long-term sales would have been.</p>
<p>Each line also says to whom it is paid and whether it is refundable. Lines paid to the franchisor or an affiliate add up to the amount on the cover page. Lines paid to suppliers that the franchisor approves, but does not own, can sometimes be negotiated or shopped around; lines tied to a required supplier cannot.</p>
<h2>What is paid to the franchisor</h2>
<p>The cover page of every disclosure document states how much of the initial investment goes to the franchisor or its affiliates. For most brands it is the franchise fee plus some training, software or opening fees; for a few, such as Little Caesars, it includes equipment and supplies bought from an affiliate, which makes it much larger. The ${h.a('franchise-fee', 'franchise fee page')} compares the fees themselves, discounts for veterans included.</p>
<h2>The cost after opening</h2>
<p>The investment is spent once. The royalty and the ad fund are paid every week or month for the whole agreement, as a percentage of sales, and at the Item 19 sales level they add up, over ten years, to more than the middle of the Item 7 range for ${overInv.length} of the ${withSales.length} brands that publish sales. The ${h.a('franchise-royalty-fees', 'royalty page')} adds them up year by year, and the ${h.a('franchise-break-even', 'break-even page')} shows the sales a unit needs before the owner earns anything.</p>
`,
  faqs: [
    { q: 'What is the average cost of a franchise?', a: `There is no meaningful average across brands, because a tutoring center and a drive-thru restaurant have little in common. Among the ${n} brands read here, the median Item 7 range is ${K.usd(medLow)} to ${K.usd(medHigh)}. The table by category gives a more useful middle point for the kind of business you are considering.` },
    { q: 'Does the franchise investment include the land and the building?', a: `Usually not. Most documents assume you lease the site and count only the deposit and the first months of rent. For ${realEstate.length} brands on this site the Item 7 total does include buying the land or building, which is part of why their ranges are higher. Each brand page says which case applies.` },
    { q: 'How much of the investment goes to the franchisor?', a: `For most brands only the franchise fee and a few opening charges, a median of ${K.pct(shareFr, 0)} of the low end of Item 7 among brands that state it on their cover page. The rest is paid to contractors, equipment makers, landlords and suppliers. Brands that sell equipment or food through an affiliate receive much more.` },
  ],
  tool: 'list',
  toolArg: { cat: 'all', sort: 'low' },
  related: ['franchise-fee', 'cheapest-franchises', 'franchise-royalty-fees', 'compare-franchises'],
  sources: ['ftc_436_5', 'mn_cards', 'ftc_guide'],
});
