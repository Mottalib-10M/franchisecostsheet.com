import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

/** Brand pages that exist (file names of src/content/brands), read without loading them. */
const PAGES = new Set(Object.keys(import.meta.glob('../brands/*.ts')).map((f) => f.split('/').pop()!.replace(/\.ts$/, '')));
const bl = (h: Helpers, slug: string, text = K.B(slug).brand) => (PAGES.has(slug) ? h.a(`brand:${slug}`, text) : h.fdd(slug, text));

const gyms = K.inCat('fitness');
const n = gyms.length;
const medLow = K.median(gyms.map((b) => b.invLow));
const medHigh = K.median(gyms.map((b) => b.invHigh));
const byLow = gyms.slice().sort((a, b) => a.invLow - b.invLow);
const cheapest = byLow[0];
const dearest = gyms.slice().sort((a, b) => b.invHigh - a.invHigh)[0];
/** Big boxes: a low end of Item 7 above one million dollars. */
const bigBox = gyms.filter((b) => b.invLow >= 1000000);
const studios = gyms.filter((b) => b.invLow < 1000000);
const flat = gyms.filter((b) => b.royPct === null);
const pctBrands = gyms.filter((b) => b.royPct !== null);
const withMinimum = pctBrands.filter((b) => b.royFlat !== null);
const medPctFees = K.median(pctBrands.map((b) => K.pctFees(b)));
const sales = (b: Brand) => K.i19(b)!;
/** Franchise fees at the brand's own Item 19 figure, as a share of that figure. */
const load = (b: Brand) => ((sales(b) * K.pctFees(b)) / 100 + b.fixedYear) / sales(b);
const published = gyms.filter((b) => K.i19(b) !== null);
const byLoad = published.slice().sort((a, b) => load(a) - load(b));
const lightest = byLoad[0], heaviest = byLoad[byLoad.length - 1];
const middleThird = published.filter((b) => /middle third/i.test(b.i19.label ?? ''));
const eft = published.filter((b) => /EFT/.test(b.i19.label ?? ''));
const memberLine = (b: Brand) => b.i19.other.find((o) => /member/i.test(o.label) && !/attrition|rate|%|revenue/i.test(o.label));
/** Brands whose equipment is sold by the franchisor or an affiliate (special notes of the documents). */
const equipFromFr = gyms.filter((b) => /equipment[^.]*(must be (bought|purchased) from|paid to the franchisor)|Equipment Pack/i.test(b.special ?? ''));
const ceilings = gyms.filter((b) => b.adPct !== null && b.adPctHigh !== null && b.adPctHigh > b.adPct);
/** Unit count of the company-owned sample behind a printed margin. */
const marginSample = (b: Brand) => { const o = b.i19.other.find((x) => x.value === b.i19.profitPct && /(\d+) (company|corporate)-owned/i.test(x.label)); return o ? o.label.match(/(\d+) (company|corporate)-owned/i)![1] : null; };
const margins = published.filter((b) => b.i19.profitPct !== null);
const perMember = published.filter((b) => memberLine(b)).map((b) => ({ b, m: memberLine(b)!.value, monthly: sales(b) / memberLine(b)!.value / 12 }));
const churn = gyms.map((b) => ({ b, o: b.i19.other.find((x) => /attrition/i.test(x.label)) })).filter((x) => x.o);
const cat = K.catSales('fitness');
const ratio = (b: Brand) => sales(b) / K.invAt(b, 'mid');
const bestRatio = published.slice().sort((a, b) => ratio(b) - ratio(a))[0];
const pf = K.B('planet-fitness'), af = K.B('anytime-fitness'), ot = K.B('orangetheory');
/** Revenue at which a flat-fee brand's fixed fees equal the median percentage of the other gyms. */
const crossover = (b: Brand) => b.fixedYear / (medPctFees / 100);
const scope = (b: Brand) => `${/^median/i.test(b.i19.label ?? '') ? 'Median' : 'Average'}${/middle third/i.test(b.i19.label ?? '') ? ', middle third only' : ''}, ${K.num(b.i19.count!)} units, ${b.i19.period}`;
const royCell = (b: Brand) => (b.royPct === null ? `flat, ${K.usd(b.fixedYear)} a year in fixed fees` : `${K.rate(b.royPct)} + ${K.rate(b.adPct)}${b.fixedYear ? `, plus ${K.usd(b.fixedYear)} fixed` : ''}`);

export default defineGuide({
  id: 'fitness-franchise-cost',
  group: 'compare',
  order: 16,
  slug: 'fitness-franchise-cost',
  nav: 'Fitness franchise cost',
  card: 'Big-box gyms, 24-hour clubs and boutique studios: Item 7 ranges, flat and percentage royalties, and what each Item 19 measures.',
  title: 'Fitness Franchise Cost 2026: Gyms and Studios Compared',
  description: `Fitness franchise cost in 2026 for ${n} gyms and studios: Item 7 from ${K.usd(cheapest.invLow)}, flat or percentage royalties, and the Item 19 figures with different scopes.`,
  h1: 'What a gym or fitness studio franchise costs, read in the disclosure documents',
  intro: `${pf.brand}, ${af.brand} and ${ot.brand} side by side at the same margin: three formats, three ways of charging the royalty.`,
  resume: `The ${n} fitness brands read on this site range from ${cheapest.brand}, whose Item 7 starts at ${K.usd(cheapest.invLow)}, to ${dearest.brand}, whose estimate tops out at ${K.usd(dearest.invHigh)}; the median range is ${K.usd(medLow)} to ${K.usd(medHigh)}. Two families stand apart: the big-box gyms, ${bigBox.map((b) => b.brand).join(' and ')}, start above one million dollars, while the ${studios.length} smaller clubs and boutique studios start lower. Royalties differ in kind: ${flat.map((b) => b.brand).join(' and ')} charge flat monthly amounts that do not move with revenue, while the other ${pctBrands.length} take a percentage, a median of ${K.rate(Number(medPctFees.toFixed(2)))} of sales with the ad fund. Item 19 figures are not built the same way either: ${middleThird.map((b) => b.brand).join(' and ')} print only a middle third, ${eft.map((b) => b.brand).join(', ')} counts drafted membership dues alone, and the others give an average for all units in their sample. Revenue in this category comes mostly from recurring memberships, which changes how a slow month and a fee rise feel.`,
  body: (h) => `
<h2>Every gym and studio on file</h2>
<p>The table lists the fitness brands whose latest disclosure document was read for this site, sorted by the low end of Item 7. The royalty column shows the percentage of sales charged as royalty and ad fund, or the flat amount where there is no percentage; fixed yearly fees counted by the calculator are added after it. The last column says what the Item 19 figure measures, because the scopes differ more than the figures suggest.</p>
${h.table(['Brand', 'Item 7 range', 'Fee', 'Royalty + ad fund', 'Item 19 figure', 'What it measures'], byLow.map((b) => [bl(h, b.slug), K.range(b), K.fee(b), royCell(b), K.i19(b) === null ? 'not published' : K.usd(sales(b)), K.i19(b) === null ? '' : scope(b)]), 'Fitness brands on this site, each from its latest disclosure document on file in Minnesota.', ['l', 'r', 'r', 'l', 'r', 'l'])}
<h2>Big boxes and small rooms</h2>
<p>The spread within the category comes from the floor area. ${bigBox.map((b) => { const m = b.format.match(/([\d,]+ to [\d,]+) sq ft/); return `${b.brand} quotes a club of ${m ? `about ${m[1]} square feet` : 'large floor area'}`; }).join(', ')}. A floor that size means a large lease and a long build-out, which is why their low ends sit above one million dollars. The ${studios.length} other brands quote clubs and studios of a few thousand square feet, and none of their ranges goes above ${K.usd(Math.max(...studios.map((b) => b.invHigh)))}.</p>
<p>Look at who sells the equipment. At ${equipFromFr.slice(0, -1).map((b) => b.brand).join(', ')} and ${equipFromFr[equipFromFr.length - 1].brand}, the equipment package is bought from the franchisor or an affiliate, which raises the share of the investment paid to the franchisor side well above the fee alone. ${pf.brand} adds a twist: its cover range assumes the equipment is financed, and a second, higher range applies when it is bought outright. Its brand page says which reading this site used.</p>
${h.mini('compare', { t: 'Three fitness formats at the same margin', p: ['a', 'c2', 'c3', 'm'], d: { a: 'planet-fitness', c2: 'anytime-fitness', c3: 'orangetheory' } })}
<h2>Flat royalties against percentages</h2>
<p>Most gyms and studios take a share of gross sales every week or month. ${flat.map((b) => `${bl(h, b.slug)} instead bills ${b.fixedNote}`).join(', and ')}. The calculator counts those flat amounts as fixed yearly fees and applies no percentage. A flat fee is light on a busy club and heavy on a slow one: for ${af.brand}, the ${K.usd(af.fixedYear)} of yearly fixed fees equals the median percentage load of the other gyms, ${K.rate(Number(medPctFees.toFixed(2)))}, at ${K.usd(crossover(af))} of yearly revenue. Below that, the flat model costs more than a typical percentage would; above it, less.${withMinimum.length ? ` A hybrid also exists: ${withMinimum.map((b) => `${b.brand} prints its royalty as "${b.royFlat}"`).join('; ')}, so a slow studio pays the floor.` : ''}</p>
<p>Flat terms are not always permanent. The ${af.brand} document reserves the right to replace its monthly fee with a royalty of up to ${K.rate(af.royPctHigh)} of revenue, and ${ceilings.length} brands (${ceilings.map((b) => `${b.brand}, ${K.rate(b.adPct)} now and up to ${K.rate(b.adPctHigh)}`).join('; ')}) print a current ad fund rate below a higher ceiling. Read the ceiling as well as the current figure, and test it in the ${h.a('franchise-royalty-fees', 'royalty calculator')}.</p>
${h.mini('fees', { t: 'A flat fee bill over ten years', p: ['sales', 'fx', 'yrs'], d: { sales: Math.round(sales(af)), roy: 0, ad: 0, fee: af.feeLow, yrs: 10, fx: af.fixedYear } })}
<h2>What each Item 19 counts</h2>
<p>Item 19 is optional, and ${published.length === n ? 'every fitness brand on file publishes one' : `${published.length} of the ${n} fitness brands on file publish one`}, but the populations differ. ${middleThird.map((b) => `${b.brand} ranks its clubs into thirds and gives no figure for all of them; this site uses the middle-third figure (${K.usd(sales(b))})`).join('. ')}. ${eft.map((b) => b.brand).join(' and ')} measures only membership dues drafted by electronic funds transfer, leaving out paid-in-full memberships and retail, which is also the base its royalty is charged on. Studio brands mostly count all gross sales of units open the full year, and some leave out new, expanded or non-traditional locations, or the units that closed during the year. A figure that excludes closures describes the survivors.</p>
<p>Only a few documents print anything about costs. ${margins.map((b) => `${b.brand} gives a margin of ${K.rate(b.i19.profitPct)}${marginSample(b) ? ` for ${marginSample(b)} company-owned clubs, with fees restated as a franchisee would pay them` : ''}`).join('; ') || 'None of the fitness documents on file prints a margin'}. A margin measured on a sample the franchisor chose, under its own definitions, is not your margin: the calculator starts at ${K.rate(K.P.calc.defaultMarginPct)}, a value to replace with your own estimate.</p>
<h3>Fees at each brand's own sales</h3>
<p>Applying each brand's royalty, ad fund and fixed fees to its own Item 19 figure gives a comparable load. It is lightest at ${lightest.brand}, ${K.pct(load(lightest), 1)} of the published figure, and heaviest at ${heaviest.brand}, ${K.pct(load(heaviest), 1)}. The ranking says nothing about profit; it shows how much of each published dollar goes back to the franchisor and its funds before rent and payroll. Measured as published sales per dollar invested at the middle of Item 7, ${bestRatio.brand} leads at ${K.dec(ratio(bestRatio), 2)}.</p>
<h2>Membership revenue</h2>
<p>A gym sells subscriptions. Revenue arrives monthly from a base of members who join, stay and leave, so the questions a buyer asks differ from a restaurant's: how many members a unit holds, what each pays, and how many must be replaced every month. ${perMember.map((x) => `${x.b.brand} reports ${K.num(x.m)} members on average, about ${K.usd(x.monthly)} of revenue per member per month on its Item 19 figure`).join('; ')}. ${churn.map((x) => `${x.b.brand} prints a monthly attrition rate of ${K.rate(x.o!.value)}`).join(' and ')}${churn.length ? ', the share of members lost each month that sales must replace' : ''}. A presale campaign before opening builds the first base, and the working capital line of Item 7 is there for the months before dues cover costs.</p>
<p>When a brand publishes no figure, the site falls back on the category median, ${cat.median === null ? 'not available here' : `${K.usd(cat.median)} for the ${cat.n} fitness brands that publish one`}. The ${h.a('item-19-franchise-earnings', 'Item 19 page')} explains how to read populations and exclusions, and the ${h.a('compare-franchises', 'comparison page')} sets any brands side by side.</p>
`,
  faqs: [
    { q: 'How much does a gym franchise cost in 2026?', a: `Among the ${n} fitness brands read here, Item 7 ranges run from ${K.usd(cheapest.invLow)} at the low end of ${cheapest.brand} to ${K.usd(dearest.invHigh)} at the top of ${dearest.brand}, with a median of ${K.usd(medLow)} to ${K.usd(medHigh)}. Big-box gyms start above one million dollars; small clubs and boutique studios stay well below that.` },
    { q: 'Which fitness franchises charge a flat royalty instead of a percentage?', a: `${flat.map((b) => b.brand).join(' and ')} bill fixed monthly amounts rather than a share of sales: ${flat.map((b) => `${K.usd(b.fixedYear)} a year in counted fees for ${b.brand}`).join(', ')}. A flat fee weighs more on a slow club and less on a busy one, and either franchisor may change the terms as its document allows.` },
    { q: 'Can Item 19 figures of different gym brands be compared directly?', a: `Only with care. Some brands print only a middle third of their clubs, one counts membership dues drafted by EFT and nothing else, others average all gross sales of units open a full year, and most leave out closed or new units. Check the population and the revenue base in each document before setting two figures side by side.` },
    { q: 'What share of a fitness studio’s sales goes to the franchisor?', a: `Among gyms that charge a percentage, royalty and ad fund add up to a median of ${K.rate(Number(medPctFees.toFixed(2)))} of sales, before fixed technology fees. Measured at each brand's own Item 19 figure, total franchise fees range from ${K.pct(load(lightest), 1)} at ${lightest.brand} to ${K.pct(load(heaviest), 1)} at ${heaviest.brand}.` },
  ],
  tool: 'compare',
  toolArg: { a: 'planet-fitness', c2: 'anytime-fitness', c3: 'orangetheory' },
  related: ['brand:planet-fitness', 'brand:orangetheory', 'franchise-royalty-fees', 'item-19-franchise-earnings'],
  sources: ['ftc_436_5', 'mn_cards', 'ftc_guide'],
});
