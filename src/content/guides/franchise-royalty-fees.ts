import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const n = K.BRANDS.length;
const roy = (b: Brand) => b.royPct ?? 0;
const ad = (b: Brand) => b.adPct ?? 0;
const PB = K.BRANDS.filter((b) => b.royPct !== null);
const flatOnly = K.BRANDS.filter((b) => b.royPct === null);
const minimums = K.BRANDS.filter((b) => b.royPct !== null && b.royFlat !== null);
const list = (xs: Brand[]) => xs.map((b) => b.brand).join(', ').replace(/, ([^,]*)$/, ' and $1');
const medRoy = K.median(PB.map(roy));
const medAd = K.median(PB.map(ad));
const medBoth = K.median(PB.map((b) => K.pctFees(b)));
const byBoth = PB.slice().sort((a, b) => K.pctFees(a) - K.pctFees(b));
const lowest = byBoth[0];
const highest = byBoth[byBoth.length - 1];
const tenPlus = PB.filter((b) => K.pctFees(b) >= 10);
const cfa = K.B('chick-fil-a');
const kfc = K.B('kfc');
const lc = K.B('little-caesars');
const app = K.B('applebees');
const mcd = K.B('mcdonalds');
const wen = K.B('wendys');
const others = PB.filter((b) => b.profitSharePct === 0);
const topRoy = others.slice().sort((a, b) => roy(b) - roy(a))[0];
const topRoyAll = others.filter((b) => roy(b) === roy(topRoy));
const topAd = PB.slice().sort((a, b) => ad(b) - ad(a))[0];
const zeroAd = PB.filter((b) => ad(b) === 0);
const netBasis = K.BRANDS.filter((b) => /net/i.test(b.royBasis) && !/gross/i.test(b.royBasis));
const weekly = K.BRANDS.filter((b) => /week/i.test(b.royBasis));
const withFixed = K.BRANDS.filter((b) => b.fixedYear > 0);
const medFixed = K.median(withFixed.map((b) => b.fixedYear));
const byFixed = withFixed.slice().sort((a, b) => b.fixedYear - a.fixedYear);
const pub = K.BRANDS.filter((b) => K.i19(b) !== null);
const medSales = Math.round(K.median(pub.map((b) => K.i19(b)!)));
const medFee = K.median(K.BRANDS.map((b) => b.feeLow));
const ten = (b: Brand) => b.feeLow + 10 * ((K.i19(b)! * K.pctFees(b)) / 100 + b.fixedYear);
const tenRows = pub.slice().sort((a, b) => ten(b) - ten(a));
const tenShare = (b: Brand) => ten(b) / K.invAt(b, 'mid');
const overInv = pub.filter((b) => b.profitSharePct === 0 && tenShare(b) > 1);
const chickenSales = K.catSales('chicken').median ?? medSales;
const kfcSales = K.i19(kfc) ?? chickenSales;
const kfcYear = (kfcSales * ad(kfc)) / 100;
const chickenN = K.catSales('chicken').n;
const boj = K.B('bojangles');
const pctTen = (b: Brand) => (10 * K.i19(b)! * K.pctFees(b)) / 100 / b.feeLow;
const minTen = Math.min(...pub.filter((b) => b.feeLow > 0 && b.royPct !== null).map(pctTen));
const bojTotal = K.pctFees(boj) + 3;

export default defineGuide({
  id: 'franchise-royalty-fees',
  group: 'costs',
  order: 3,
  slug: 'franchise-royalty-fees',
  nav: 'Royalty and ad fund fees',
  card: 'Royalty, ad fund and fixed yearly fees of each brand, and what they add up to over ten years of sales.',
  title: 'Franchise Royalty Fees 2026: Royalty and Ad Fund by Brand',
  description: `Franchise royalty fees in 2026: the Item 6 royalty, ad fund and fixed yearly fees of ${n} brands, a median of ${K.rate(medBoth)} of sales, and their total over ten years.`,
  h1: 'Franchise royalty and ad fund fees: what each brand takes from every dollar of sales',
  intro: 'The calculator starts from the median royalty, ad fund, fee and Item 19 sales of the brands on this site; type any brand\'s rates to see what ten years of fees come to.',
  resume: `A franchise royalty is a percentage of the unit's sales paid to the franchisor every week or month for as long as the agreement runs, and the ad fund is a second percentage paid into a pooled advertising budget. Both are printed in Item 6 of the disclosure document and both are owed on sales, before food, labor, rent or the owner's pay. Across the ${PB.length} brands read here that charge a percentage, the median royalty is ${K.rate(medRoy)} and the median ad fund ${K.rate(medAd)}, ${K.rate(medBoth)} of sales together. The lowest combined rate is ${K.rate(K.pctFees(lowest))}, at ${lowest.brand}, before any local marketing it requires; ${tenPlus.length} brands take ${K.rate(10)} or more, and ${cfa.brand} takes ${K.rate(roy(cfa))} plus half of the net profit. On top come fixed charges: ${withFixed.length} brands print yearly technology or service fees in dollars, a median of ${K.usd(medFixed)}. Held for ten years on a brand's own Item 19 sales, the percentages alone come to at least ${K.num(Math.floor(minTen))} times its initial fee for every one of them that publishes a figure.`,
  body: (h) => `
<h2>Royalty and ad fund, brand by brand</h2>
<p>The royalty pays for the license and the franchisor's support; the ad fund pays for national or regional advertising that the franchisor manages for the whole system. The owner has no say in how the fund is spent beyond what the document grants. Both are computed on a measure of sales that each document defines, most often gross sales; ${netBasis.length} of the ${n} brands use net sales or net revenues instead, and ${weekly.length} collect weekly rather than monthly. The highest royalty outside ${cfa.brand} is ${K.rate(roy(topRoy))}, charged by ${list(topRoyAll)}. The highest ad fund rate on file is ${K.rate(ad(topAd))} at ${topAd.brand}, and ${zeroAd.length === 1 ? `one brand, ${zeroAd[0].brand}, charges` : `${list(zeroAd)} charge`} none at present.${flatOnly.length ? ` ${list(flatOnly)} ${flatOnly.length === 1 ? 'charges' : 'charge'} no percentage at all but a flat monthly royalty, counted below with the fixed fees.` : ''}</p>
<p>Many brands add a local advertising obligation that is not paid to the fund. ${h.fdd('bojangles', boj.brand)} charges a royalty of ${K.rate(boj.royPct)} and a fund contribution of ${K.rate(boj.adPct)}, ${K.pctFees(boj) < medBoth ? 'below the median of the brands here' : 'in line with the brands here'}, but also requires a local marketing spend of 3 % of sales, which brings its total to ${K.rate(bojTotal)}, against a median royalty and fund of ${K.rate(medBoth)}. ${mcd.brand} prints a minimum of ${K.rate(ad(mcd))} for advertising that is not payable to the franchisor at all but spent through owner cooperatives. Read the notes under the Item 6 table: the rate that counts is the total you must spend, whoever receives it.</p>
${h.table(['Brand', 'Royalty', 'Ad fund', 'Fixed yearly fees', 'Item 19 sales', 'Fee + 10 years of fees'], tenRows.map((b) => [h.fdd(b.slug, b.brand), K.rate(b.royPct), K.rate(b.adPct), K.usd(b.fixedYear), K.usd(K.i19(b)!), b.profitSharePct ? `${K.usd(ten(b))} + ${b.profitSharePct} % of net profit` : K.usd(ten(b))]), 'Initial fee plus ten years of royalty, ad fund and fixed fees on the brand\'s own Item 19 figure, sales held flat. Brands that publish no sales figure are left out.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<h2>What ten years of fees add up to</h2>
<p>The table applies each brand's own rates to its own Item 19 sales figure for ten years with no growth, and adds the initial fee once. The point is the order of magnitude, not the exact sum: for ${overInv.length} of the ${pub.length - 1} brands with a sales figure and no profit share, ten years of fees exceed the middle of their own Item 7 investment. A unit with high sales pays the most in dollars even at a moderate rate, which is why the brands with the busiest units top the list. The calculator above does the same sum for any rate and sales level you type; the ${h.a('franchise-break-even', 'break-even page')} shows how much of the margin those fees consume.</p>
${h.mini('fees', { t: `${kfc.brand}: the ad fund rate during the Comeback Period`, p: ['ad', 'sales'], d: { sales: Math.round(kfcSales), roy: roy(kfc), ad: ad(kfc), fee: kfc.feeLow, fx: kfc.fixedYear, yrs: 10 } })}
<h2>Flat royalties, minimums and fixed yearly fees</h2>
<p>A percentage is not the only form. ${minimums.length} brands add a minimum in dollars, ${list(minimums)}. ${h.fdd('kfc', kfc.brand)} charges ${K.rate(roy(kfc))} of gross revenue for a new franchisee or a minimum of $1,440 a month, whichever is greater, and ${h.fdd('little-caesars', lc.brand)} a royalty of ${K.rate(roy(lc))} with a minimum of $300 a week, so a slow unit pays more than its rate. ${withFixed.length} brands also print fixed yearly charges in dollars, for software, point of sale support, loyalty apps, marketing or, at a few brands, the royalty itself: ${byFixed.slice(0, 3).map((b) => `${b.brand} ${K.usd(b.fixedYear)}`).join(', ')} are the heaviest. Among restaurants, ${wen.brand} prints ${K.usd(wen.fixedYear)} a year, mostly a FreshAi service fee and technology charges, and ${mcd.brand} ${K.usd(mcd.fixedYear)}, spread over about twenty separate technology fees. The calculator counts these as fixed costs, so they weigh more on a small unit than on a large one.</p>
<h2>${cfa.brand}: a royalty plus half the profit</h2>
<p>${h.fdd('chick-fil-a', cfa.brand)} sits apart. Its operator pays a base operating service fee of ${K.rate(roy(cfa))} of gross receipts, from which equipment rental and the business services fee are deducted, and then an additional fee equal to ${cfa.profitSharePct} % of the restaurant's net profit. The ad fund is currently ${K.rate(ad(cfa))}, with a ceiling of ${K.rate(cfa.adPctHigh)}. In exchange the company provides the site, the building and the equipment, and the initial fee is only ${K.usd(cfa.feeLow)}. The model cannot be compared line by line with a brand where the owner finances the building: the calculator applies the ${K.rate(roy(cfa))} and the profit share, which at its default margin of ${K.P.calc.defaultMarginPct} % leaves nothing.</p>
<h2>Rates that change: ${kfc.brand}, ${app.brand} and others</h2>
<p>Several documents print rates that move on a fixed date. ${kfc.brand} asks ${K.rate(ad(kfc))} for its national advertising co-op during what it calls the Comeback Period, from October 1, 2025 through March 31, 2027; the rate to come is 4.5 % from then through December 31, 2028, and 2 % from January 1, 2029 unless the co-op changes it. ${K.i19(kfc) === null ? `${kfc.brand} publishes no average sales; on the median Item 19 figure of the ${chickenN} chicken brands on this site, ${K.usd(kfcSales)}, the current rate alone comes to ${K.usd(kfcYear)} a year.` : `On its Item 19 sales of ${K.usd(kfcSales)}, the current rate alone comes to ${K.usd(kfcYear)} a year.`} ${h.fdd('applebees', app.brand)} prints its national fund at ${K.rate(ad(app))} through December 31, 2026, with 3.25 % to come from January 1, 2027 together with a new minimum local spend of 0.5 % of sales. Papa Johns charges 6 % under a marketing initiative that runs until December 30, 2029. The calculator uses the rate in force today; enter the later rate to see the difference.</p>
<p>New-unit incentives push the other way for a few years. Sonic ramps its royalty from 1 % in year one to 5 % from year five for agreements signed by March 31, 2027, Checkers waives it for the first twelve months under its 2026 growth incentive, and Arby's starts at 0.5 %. Penalty rates exist too: Cold Stone may raise the royalty to 18 % during a default, and Burger King adds 3 % when remodel deadlines are missed. The ${h.a('franchise-fee', 'franchise fee page')} covers the one-time payment, and the ${h.a('franchise-disclosure-document', 'disclosure document guide')} shows where these terms sit.</p>
`,
  faqs: [
    { q: 'What is a typical franchise royalty rate in 2026?', a: `Among the ${PB.length} brands read here that charge a percentage, the median royalty is ${K.rate(medRoy)} of sales and the median ad fund ${K.rate(medAd)}, so a typical owner sends about ${K.rate(medBoth)} of every dollar of sales to the franchisor and its fund. The range is wide, from ${K.rate(K.pctFees(lowest))} at ${lowest.brand} to ${K.rate(K.pctFees(highest))} at ${highest.brand}, which also takes half of net profit.` },
    { q: 'Is the franchise royalty charged on sales or on profit?', a: `On sales. Item 6 sets the royalty as a percentage of gross or net sales as the document defines them, owed whether or not the unit makes money. ${cfa.brand} is the one brand here that also takes a share of profit, ${cfa.profitSharePct} % of net profit on top of its ${K.rate(roy(cfa))}. Fixed monthly fees for technology are owed even in a month with no sales.` },
    { q: 'What does the advertising fund pay for?', a: `It pays for brand advertising, creative work and media bought by the franchisor or a cooperative for the whole system or a region. The median contribution here is ${K.rate(medAd)} of sales. Many documents add a separate local spend you make yourself; the notes under the Item 6 table give both, and only their total shows what marketing really costs.` },
    { q: 'Will the KFC advertising contribution go down?', a: `The document issued on ${K.day(kfc.issued)} sets it at ${K.rate(ad(kfc))} of gross revenue during the Comeback Period, which ends on March 31, 2027. The rate to come after that date is 4.5 % through December 31, 2028, then 2 % from January 1, 2029 unless the national co-op decides otherwise. These later rates are printed, not yet in force.` },
  ],
  tool: 'fees',
  toolArg: { sales: medSales, roy: medRoy, ad: medAd, fee: medFee, yrs: 10, fx: Math.round(K.median(K.BRANDS.map((b) => b.fixedYear))) },
  related: ['franchise-fee', 'franchise-break-even', 'item-19-franchise-earnings', 'brand:subway'],
  sources: ['ftc_436_5', 'ftc_guide', 'mn_cards'],
});
