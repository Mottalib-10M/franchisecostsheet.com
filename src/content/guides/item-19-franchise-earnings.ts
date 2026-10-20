import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const n = K.BRANDS.length;
const clean = (s: string) => s.replace(/[–—]/g, '-');
const withFig = K.BRANDS.filter((b) => K.i19(b) !== null);
const none = K.BRANDS.filter((b) => !b.i19.published);
const forecast = K.BRANDS.filter((b) => b.i19.published && K.i19(b) === null);
const list = (xs: Brand[]) => xs.map((b) => b.brand).join(', ').replace(/, ([^,]*)$/, ' and $1');
const both = K.BRANDS.filter((b) => b.i19.value !== null && b.i19.median !== null);
const avgAbove = both.filter((b) => b.i19.value! > b.i19.median!);
const medAbove = both.filter((b) => b.i19.value! < b.i19.median!);
const gap = (b: Brand) => b.i19.value! / b.i19.median! - 1;
const widest = avgAbove.slice().sort((a, b) => gap(b) - gap(a))[0];
const medGap = K.median(avgAbove.map(gap));
const noMedian = K.BRANDS.filter((b) => b.i19.value !== null && b.i19.median === null);
const salesOnly = K.BRANDS.filter((b) => b.i19.note !== null && /sales only|revenue only|revenues only|no costs|do not reflect|does not reflect/i.test(b.i19.note));
const margins = K.BRANDS.filter((b) => b.i19.profitPct !== null).sort((a, b) => b.i19.profitPct! - a.i19.profitPct!);
const what = (b: Brand) => clean(b.i19.other.find((o) => o.value === b.i19.profitPct)?.label ?? 'profit as a share of sales');
const company = margins.filter((b) => /company|corporate|affiliate-owned/i.test(what(b)));
const jack = K.B('jack-in-the-box');
const jackLowest = margins[margins.length - 1]?.slug === jack.slug;
const boj = K.B('bojangles');
const old = withFig.filter((b) => !/2025|2026|FY26/.test(b.i19.period ?? ''));
const medCount = K.median(withFig.map((b) => b.i19.count ?? 0));
const big = withFig.slice().sort((a, b) => (b.i19.count ?? 0) - (a.i19.count ?? 0))[0];
const dom = K.B('dominos');
const cfa = K.B('chick-fil-a');
const pot = K.B('potbelly');
const gc = K.B('golden-corral');
const qd = K.B('qdoba');
const qdPre = qd.i19.other.find((o) => /pre-fees/i.test(o.label) && /%/.test(o.label))?.value ?? K.P.calc.defaultMarginPct;
const potAirport = pot.i19.other.find((o) => /airport/i.test(o.label))?.value;
const potSuburban = pot.i19.other.find((o) => /suburban/i.test(o.label))?.value;
const cfaMall = cfa.i19.other.find((o) => /mall/i.test(o.label) && /average/i.test(o.label))?.value;
const top = withFig.slice().sort((a, b) => K.i19(b)! - K.i19(a)!);

export default defineGuide({
  id: 'item-19-franchise-earnings',
  group: 'costs',
  order: 4,
  slug: 'item-19-franchise-earnings',
  nav: 'Item 19 earnings',
  card: 'What Item 19 of each disclosure document shows: average or median sales, the units counted, and the few profit margins printed.',
  title: 'Item 19 Franchise Earnings 2026: Sales Each Brand Publishes',
  description: `Item 19 franchise earnings in 2026: the average and median sales ${withFig.length} of ${n} brands publish, the brands that print nothing at all, and the ${margins.length} that print a margin.`,
  h1: 'Item 19 earnings claims: what franchisors publish about sales and profit',
  intro: `The calculator opens on ${qd.brand}, whose Item 19 prints a margin before royalty and advertising of ${K.rate(qdPre)}; pick another brand and replace the margin with your own estimate.`,
  resume: `Item 19 is the only section of a Franchise Disclosure Document where a franchisor may state what its units sell or earn, and it is optional. Of the ${n} brands read on this site, ${withFig.length} print an average or median yearly sales figure, ${forecast.length} (${list(forecast)}) print figures with no single average or median, and ${none.length} (${list(none)}) make no representation at all. The figures are mostly sales, not profit: ${salesOnly.length} documents say in so many words that their numbers leave out costs. Where both are printed, the average is above the median for ${avgAbove.length} of ${both.length} brands, because a few very busy units pull it up; the median gap is ${K.pct(medGap, 1)}. Only ${margins.length} brands print a profit margin, from ${K.rate(margins[margins.length - 1].i19.profitPct)} to ${K.rate(margins[0].i19.profitPct)}, each measured differently and ${company.length} of them on company-owned units. The highest average sales on file belong to ${top[0].brand}, at ${K.usd(K.i19(top[0])!)}.`,
  body: (h) => `
<h2>What the Rule allows</h2>
<p>Under the ${h.src('ftc_436_5', 'disclosure rules')}, a financial performance representation is any statement from which a buyer could infer a level of sales, income or profit. The franchisor may make one only in Item 19, only with a reasonable basis and written substantiation, and it must say which units the figures cover and how many reached them. If Item 19 is blank, the sales staff may not give figures in a meeting, an email or a brochure; the only exception is the actual records of a specific unit you are buying from its owner. The document gives the franchisor's choice of figure, its choice of units and its choice of period, so the first task is to read the definitions before the numbers.</p>
<h2>Brands that publish nothing</h2>
<p>${list(none)} print the standard sentence that they make no representations about future or past performance. ${(() => { const big = none.slice().sort((x, y) => (y.units.total ?? 0) - (x.units.total ?? 0))[0]; return big ? `${big.slug === 'subway' ? h.a('brand:subway', big.brand) : big.brand} is the largest of them by number of units, with ${K.num(big.units.total ?? 0)} at the end of ${big.units.year}.` : ''; })()} ${list(forecast)} take a middle path: their Item 19 prints figures, but no single average or median a buyer could use. ${h.fdd('kfc', 'KFC')} and Taco Bell describe how well a sales forecasting tool predicted actual sales for a sample of restaurants; others print only groupings, by revenue band or by quartile. For these brands the calculator falls back on the median of their category, said so on the result, or on a figure you type.</p>
<h2>Average or median, and of which units</h2>
<p>An average adds every unit and divides; a median is the unit in the middle. Since a few exceptional units pull the average up, the median is usually the more realistic middle: among the ${both.length} brands that print both, the average is higher for ${avgAbove.length}${medAbove.length ? `, and only ${list(medAbove)} ${medAbove.length === 1 ? 'shows' : 'show'} the reverse` : ''}. The widest gap is at ${h.fdd(widest.slug, widest.brand)}, where the average of ${K.usd(widest.i19.value!)} is ${K.pct(gap(widest), 1)} above the median of ${K.usd(widest.i19.median!)}. At ${h.fdd('bojangles', boj.brand)} the document itself notes that only 38 % of its franchised restaurants beat an average of ${K.usd(boj.i19.value!)}. ${noMedian.length ? `${list(noMedian)} ${noMedian.length === 1 ? 'prints' : 'print'} an average with no median.` : ''} Many documents state the share of units at or above the average; when it is far below half, the average flatters the typical unit.</p>
<p>The units counted matter as much as the statistic. The median count of units behind a headline figure here is ${K.num(medCount)}, up to ${K.num(big.i19.count ?? 0)} for ${big.brand}. Most figures exclude units opened during the year, units closed for remodeling and units that shut down, which removes the weakest. Some go further. ${h.fdd('golden-corral', gc.brand)} gives no all-restaurant average and leads with its metro market restaurants, ${K.num(gc.i19.count ?? 0)} of them. ${cfa.brand}'s ${K.usd(K.i19(cfa)!)} covers free-standing and drive-thru restaurants outside malls${cfaMall ? `; its mall restaurants average ${K.usd(cfaMall)}` : ''}. ${pot.brand}'s franchised average is lifted by a handful of airport shops${potAirport && potSuburban ? ` averaging ${K.usd(potAirport)}, against ${K.usd(potSuburban)} for its suburban shops` : ''}. Auntie Anne's and Cinnabon cover only certain venues, such as enclosed malls. Compare two brands only after checking that the two figures describe comparable units.</p>
${h.mini('roi', { t: 'Item 19 sales with your own margin', p: ['b', 'm'], d: { b: qd.slug, m: qdPre } })}
<h2>The age of the figure</h2>
<p>Item 19 reports a past year. For most brands here it is fiscal 2025, but ${old.length ? `${list(old)} ${old.length === 1 ? 'reports' : 'report'} an earlier period, because the latest document on file in Minnesota is older` : 'every brand on this site reports 2025 or later'}. A sales figure from an older year says nothing about price increases or traffic changes since. The ${h.a('franchise-disclosure-document', 'disclosure document guide')} explains how to check the issuance date and whether a newer edition exists.</p>
<h2>${dom.brand}: a weekly figure turned into a year</h2>
<p>${h.fdd('dominos', dom.brand)} prints average weekly unit sales for its franchised traditional stores, not a yearly figure. The calculator needs a year, so this site multiplies the weekly average by 52 and says so in the label: ${clean(dom.i19.label ?? '')}, which gives ${K.usd(K.i19(dom)!)}. The document also prints EBITDA bands by weekly sales level, from franchised stores' own accounts, which include supply chain profit sharing from the franchisor's affiliate.</p>
<h2>The profit margins actually printed</h2>
<p>${margins.length} of the ${n} documents print a margin as a percentage of sales. They are not comparable with one another, and none is a promise: each subtracts a different list of costs, and ${company.length} of them describe company-owned units, which pay no royalty and often own their buildings. The table quotes each one with the definition the document gives.</p>
${h.table(['Brand', 'Margin printed', 'What the document measures'], margins.map((b) => [h.fdd(b.slug, b.brand), K.rate(b.i19.profitPct), what(b)]), 'Profit margins printed in Item 19, as labeled in each document.', ['l', 'r', 'l'])}
<p>Read the exclusions. A margin before rent, as at ${h.fdd('del-taco', 'Del Taco')}, overstates what an owner who leases the site keeps; a margin before royalty, as at Panera Bread, leaves out a fee every franchisee pays; ${gc.brand} measures operating income before rent, advertising, insurance and the royalty. A figure after royalty, advertising and rent, such as Jack in the Box's operating margin, is the closest to what reaches the owner, and it is ${jackLowest ? 'the lowest in the table' : 'well below most of the others'}. None deducts loan payments or the owner's salary. That is why the calculator asks you for a margin and starts at ${K.P.calc.defaultMarginPct} %, a value to replace once you have spoken to owners listed in Item 20; the ${h.a('franchise-break-even', 'break-even page')} shows what that margin must cover.</p>
`,
  faqs: [
    { q: 'What is Item 19 in a franchise disclosure document?', a: `Item 19 is the financial performance representation: the one place where a franchisor may state the sales, income or profit of its units, with the basis for the figures. It is optional. Of the ${n} brands on this site, ${withFig.length} print an average or median sales figure and ${none.length} print nothing at all.` },
    { q: 'Which big franchises publish no Item 19 figures?', a: `Among the brands read here, ${list(none)} make no financial performance representation, and ${list(forecast)} print figures with no single average or median, such as the accuracy of a sales forecast or revenue bands. Owners listed in Item 20 and the books of a unit for sale are then the only sources of real figures.` },
    { q: 'Should I trust the average or the median in Item 19?', a: `The median is usually closer to a typical unit, because a few very busy locations raise the average. Where a document prints both, the average is higher for ${avgAbove.length} of ${both.length} brands here. Check also the share of units that reached the average, which many documents state, and which units were left out.` },
    { q: 'Does Item 19 show franchise profit?', a: `Rarely. Most brands print sales only and say the figures do not reflect costs. ${margins.length} brands here print a margin, but each is defined differently, some before rent or royalty, and ${company.length} describe company-owned units. None deducts debt payments or an owner's pay, so treat any printed margin as an upper reference.` },
  ],
  tool: 'roi',
  toolArg: { b: qd.slug, m: qdPre },
  related: ['franchise-disclosure-document', 'franchise-break-even', 'franchise-royalty-fees', 'brand:subway'],
  sources: ['ftc_436_5', 'ftc_guide', 'mn_cards'],
});
