import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Category } from '../../lib/brand-types';

/** Brand pages that exist (file names of src/content/brands), read without loading them. */
const PAGES = new Set(Object.keys(import.meta.glob('../brands/*.ts')).map((f) => f.split('/').pop()!.replace(/\.ts$/, '')));
const bl = (h: Helpers, slug: string, text = K.B(slug).brand) => (PAGES.has(slug) ? h.a(`brand:${slug}`, text) : h.fdd(slug, text));

/*
 * Figures from the companies' annual reports on Form 10-K filed with the SEC (not in the kit):
 *  - Starbucks Corporation, Form 10-K for fiscal 2025 (params-2026.json > sources > sec_sbux): company-operated stores
 *    accounted for 83% of total net revenues in fiscal 2025 and licensed stores for 12%; "Most licensees are prominent
 *    retailers".
 *  - Chipotle Mexican Grill, Form 10-K for 2025 (sources > sec_cmg): "As of December 31, 2025, we owned 3,938 Chipotle
 *    restaurants throughout the United States"; only restaurants outside the US are operated by third parties under
 *    license or franchise agreements.
 * Minnesota CARDS search of October 20, 2026: no recent disclosure document for the six brands of NOT_FOUND
 * (the latest Wingstop document on the portal dates from 2012).
 */
const SBUX = { fiscal: 2025, companyPct: 83, licensedPct: 12, quote: 'Most licensees are prominent retailers' };
const CMG = { asOf: 'December 31, 2025', usOwned: 3938, quote: 'As of December 31, 2025, we owned 3,938 Chipotle restaurants throughout the United States' };
const SEARCHED = 'October 20, 2026';
const WINGSTOP_LATEST = 2012;
const NOT_FOUND: Array<{ name: string; cat: Category | null }> = [
  { name: 'In-N-Out Burger', cat: 'burgers' },
  { name: "Raising Cane's", cat: 'chicken' },
  { name: '7-Eleven', cat: null },
  { name: 'Whataburger', cat: 'burgers' },
  { name: 'Dutch Bros', cat: 'coffee-treats' },
  { name: 'Wingstop', cat: 'chicken' },
];

const n = K.BRANDS.length;
const coffee = K.inCat('coffee-treats');
const mex = K.inCat('mexican').slice().sort((a, b) => a.invLow - b.invLow);
const burgers = K.inCat('burgers').slice().sort((a, b) => a.invLow - b.invLow);
const chicken = K.inCat('chicken').slice().sort((a, b) => a.invLow - b.invLow);
const drink = coffee.filter((b) => /coffee|smoothie|dunkin/i.test(`${b.brand} ${b.format}`)).sort((a, b) => a.invLow - b.invLow);
const mexPub = mex.filter((b) => K.i19(b) !== null);
const mexMed = K.catSales('mexican');
const and = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const list = (h: Helpers, l: typeof mex) => and(l.map((b) => `${bl(h, b.slug)} (${K.range(b)})`));
const sixNames = NOT_FOUND.map((x) => x.name);
const sixText = `${sixNames.slice(0, -1).join(', ')} and ${sixNames[sixNames.length - 1]}`;

export default defineGuide({
  id: 'brands-that-do-not-franchise',
  group: 'compare',
  order: 15,
  slug: 'brands-that-do-not-franchise',
  nav: 'Brands that do not franchise',
  card: 'Starbucks and Chipotle sell no franchise in the US, per their 10-K reports; six other brands have no recent document on file.',
  title: 'Brands That Do Not Franchise 2026: Starbucks, Chipotle',
  description: `Brands that do not franchise in 2026: Starbucks and Chipotle per their SEC 10-K, six names with no recent disclosure document on file, and what to read instead.`,
  h1: 'Brands you cannot buy as a franchise, and brands with no document on file',
  intro: 'Two well-known chains run their US stores themselves; six more have no recent disclosure document on the Minnesota portal. The list below shows brands on file in the same categories.',
  resume: `Starbucks and Chipotle sell no franchise to individuals in the United States, and their own annual reports to the SEC say why. In Starbucks' Form 10-K for fiscal ${SBUX.fiscal}, company-operated stores account for ${SBUX.companyPct} % of total net revenues and licensed stores for ${SBUX.licensedPct} %, and the report adds that "${SBUX.quote}": a licensed Starbucks is run under a license, most often by a retailer, not as a franchise bought by a person. Chipotle's 10-K for 2025 states: "${CMG.quote}"; only restaurants outside the US are run by third parties under license or franchise agreements. For six other names people search with the word franchise, ${sixText}, no recent disclosure document was found on the Minnesota CARDS portal on ${SEARCHED} (Wingstop's latest there dates from ${WINGSTOP_LATEST}), so this site publishes no figure for them. The ${n} brands on file include ${coffee.length} coffee, dessert and smoothie brands and ${mex.length} Mexican food brands with dated documents.`,
  body: (h) => `
<h2>Starbucks: company stores and licensed counters</h2>
<p>Searches for a Starbucks franchise are common, and the answer sits in the company's annual report, filed with the Securities and Exchange Commission. In its ${h.src('sec_sbux', `Form 10-K for fiscal ${SBUX.fiscal}`)}, Starbucks describes two kinds of stores. Company-operated stores, run by Starbucks itself, brought in ${SBUX.companyPct} % of total net revenues that year. Licensed stores brought in ${SBUX.licensedPct} %. The report describes the licensees in one line: "${SBUX.quote}." In other words, a licensed Starbucks store is run under a license, most often held by a large retailer, not by an individual who bought a franchise and signed a franchise agreement.</p>
<p>That is why there is no Starbucks disclosure document to read, no Item 7 investment and no Item 19 sales figure on this site. A page that quotes a Starbucks franchise fee or startup cost is not quoting a franchise offer, because no such offer is made to individuals.</p>
<h2>Chipotle: every US restaurant owned by the company</h2>
<p>Chipotle states the point even more directly in its ${h.src('sec_cmg', 'Form 10-K for 2025')}: "${CMG.quote}." Restaurants operated by third parties under license or franchise agreements exist only outside the United States. For a buyer in the US there is no Chipotle franchise, so no fee, royalty or investment to compare. Any figure presented as a Chipotle franchise cost for the US cannot come from a disclosure document for a US franchise, since the company offers none here.</p>
<p>Mexican food is still a franchised category. The disclosure documents on file for it are ${list(h, mex)}. ${mexPub.length} of the ${mex.length} print yearly sales in Item 19${mexMed.median !== null ? `, with a median of ${K.usd(mexMed.median)} across those figures` : ''}. Each brand page gives the format the range applies to and the scope of its sales figure.</p>
${h.mini('list', { t: 'Mexican food brands on file', p: ['cat', 'sort'], d: { cat: 'mexican', sort: 'low' } })}
<h2>Six brands with no recent document on file</h2>
<p>For ${sixText}, this site searched the ${h.src('mn_cards', 'Minnesota CARDS portal')} on ${SEARCHED} and found no recent Franchise Disclosure Document. For Wingstop, the latest document on the portal dates from ${WINGSTOP_LATEST}, far too old to describe a current offer. A missing filing in one state has several possible explanations, and this site holds no document that says which applies to any of the six, so it states only what it found and publishes no investment, fee, royalty or sales figure for them.</p>
${h.table(['Brand', 'Recent disclosure document on CARDS', 'Figures on this site'], NOT_FOUND.map((x) => [x.name, x.name === 'Wingstop' ? `none; latest from ${WINGSTOP_LATEST}` : 'none found', 'none']), `Search of the Minnesota CARDS portal, ${SEARCHED}.`, ['l', 'l', 'l'])}
<p>If you are approached with a franchise offer under any of these names, the franchisor must give you its current disclosure document at least ${K.P.rules.disclosureDays} calendar days before you sign or pay, under the ${h.src('ftc_rule', 'FTC Franchise Rule')}. Ask for it, check the issuance date on the cover, and read Items 5, 6, 7, 19 and 20 before anything else.</p>
<h2>What to read instead</h2>
<p>A buyer drawn to one of these names usually wants a kind of business rather than a logo. The documents on file cover the same kinds. For coffee and drinks, the brands with a dated document are ${list(h, drink)}. For burgers, the cheapest three to open here are ${list(h, burgers.slice(0, 3))}, out of ${burgers.length} burger brands on file. For chicken, the ${chicken.length} brands on file start with ${list(h, chicken.slice(0, 3))}. The site has no convenience store category, so 7-Eleven has no close match here. Each of these pages shows the fee, the royalty, the Item 19 figure and the edition read, with a link to the document itself.</p>
<p>The comparison tools apply to them as to any brand: the ${h.a('compare-franchises', 'comparison page')} sets two or three side by side at the same margin, and the ${h.a('franchise-opportunities', 'opportunities page')} groups every brand on file by category and by budget.</p>
`,
  faqs: [
    { q: 'Can you buy a Starbucks franchise in the United States?', a: `No. Starbucks' 10-K for fiscal ${SBUX.fiscal} describes company-operated stores, ${SBUX.companyPct} % of total net revenues, and licensed stores, ${SBUX.licensedPct} %, and says most licensees are prominent retailers. A licensed Starbucks is operated under a license, not as a franchise sold to an individual, so there is no franchise fee or disclosure document.` },
    { q: 'Does Chipotle sell franchises in the US?', a: `No. Its 10-K for 2025 says that as of ${CMG.asOf} the company owned ${K.num(CMG.usOwned)} Chipotle restaurants throughout the United States. Third parties operate restaurants under license or franchise agreements only outside the US. Mexican food brands that do franchise in the US, with dated disclosure documents, are listed on this page.` },
    { q: 'Why are In-N-Out, Wingstop and Dutch Bros missing from this site?', a: `This site publishes figures only from a disclosure document it has read. On ${SEARCHED}, no recent document for these brands was found on the Minnesota CARDS portal; Wingstop's latest there dates from ${WINGSTOP_LATEST}. Without a current document there is no sourced fee, investment or sales figure to show, so none is published.` },
    { q: 'What should I do if a seller offers a franchise of a brand not on this site?', a: `Ask for the current Franchise Disclosure Document. A franchisor must hand it over at least ${K.P.rules.disclosureDays} calendar days before you sign anything or pay any money. Check the issuance date, the name of the franchisor company and Items 5, 6, 7, 19 and 20. A seller who cannot produce one leaves you without the figures the FTC Rule is meant to give a buyer.` },
  ],
  tool: 'list',
  related: ['franchise-opportunities', 'franchise-disclosure-document', 'compare-franchises', 'fast-food-franchise-cost'],
  sources: ['sec_sbux', 'sec_cmg', 'mn_cards', 'ftc_rule'],
});
