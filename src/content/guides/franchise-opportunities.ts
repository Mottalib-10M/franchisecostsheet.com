import { defineGuide } from '../../lib/page-types';
import type { Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand, Category } from '../../lib/brand-types';

/** Brand pages that exist (file names of src/content/brands), read without loading them. */
const PAGES = new Set(Object.keys(import.meta.glob('../brands/*.ts')).map((f) => f.split('/').pop()!.replace(/\.ts$/, '')));
const bl = (h: Helpers, slug: string, text = K.B(slug).brand) => (PAGES.has(slug) ? h.a(`brand:${slug}`, text) : h.fdd(slug, text));

const n = K.BRANDS.length;
const cats = (Object.keys(K.CATS) as Category[]).map((c) => ({ c, list: K.inCat(c) })).filter((g) => g.list.length > 0).sort((a, b) => b.list.length - a.list.length);
const biggest = cats[0];
const BANDS: Array<{ label: string; lo: number; hi: number }> = [
  { label: 'Under $500,000', lo: 0, hi: 500000 },
  { label: '$500,000 to $999,999', lo: 500000, hi: 1000000 },
  { label: '$1,000,000 to $1,999,999', lo: 1000000, hi: 2000000 },
  { label: '$2,000,000 and more', lo: 2000000, hi: Infinity },
];
const inBand = (bd: (typeof BANDS)[number]) => K.BRANDS.filter((b) => b.invLow >= bd.lo && b.invLow < bd.hi).sort((a, b) => a.invLow - b.invLow);
const bands = BANDS.map((bd) => ({ ...bd, list: inBand(bd) }));
const fullest = bands.slice().sort((a, b) => b.list.length - a.list.length)[0];
const FOOD: Category[] = ['burgers', 'chicken', 'pizza', 'sandwiches', 'mexican', 'coffee-treats', 'casual-dining'];
const food = K.BRANDS.filter((b) => FOOD.includes(b.category));
const culv = K.B('culvers');
const pub = K.BRANDS.filter((b) => K.i19(b) !== null);
const noFig = K.BRANDS.filter((b) => K.i19(b) === null);
const totalFr = K.BRANDS.reduce((s, b) => s + (b.units.franchised ?? 0), 0);
const allFr = K.BRANDS.filter((b) => b.units.company === 0);
const oldest = K.BRANDS.slice().sort((a, b) => a.issued.localeCompare(b.issued))[0];
const disc = K.P.rules.disclosureDays;
const shortList = (l: Brand[], max = 4) => (l.length <= max ? l.map((b) => b.brand).join(', ') : `${l.slice(0, max).map((b) => b.brand).join(', ')} and ${l.length - max} more`);

export default defineGuide({
  id: 'franchise-opportunities',
  group: 'compare',
  order: 12,
  slug: 'franchise-opportunities',
  nav: 'Franchise opportunities',
  card: 'The brands on file by category and budget band, and how to read an offer from its disclosure document first.',
  title: 'Franchise Opportunities 2026: Brands on File by Budget Band',
  description: `Franchise opportunities in 2026 sorted by category and by Item 7 budget band, read from each disclosure document, with no form to fill and no contact asked.`,
  h1: 'Franchise opportunities by category and budget, from the documents',
  intro: 'Every brand whose disclosure document this site has read, grouped by category. Filter the list, then open the brand page or the document itself.',
  resume: `This site holds the latest disclosure document of ${n} franchise brands registered in Minnesota, grouped in ${cats.length} categories; the largest group is ${K.CATS[biggest.c].label.toLowerCase()}, with ${biggest.list.length} brands. Sorted by the low end of the Item 7 investment, ${bands[0].list.length} brands start under $500,000, ${bands[1].list.length} between $500,000 and one million, ${bands[2].list.length} between one and two million and ${bands[3].list.length} at two million or more. ${pub.length} of the ${n} print a yearly sales figure in Item 19 and ${noFig.length} print none. Their latest Item 20 tables count ${K.num(totalFr)} franchised units between them. An opportunity, in the franchise trade, is an offer to buy the right to run one of those units, and the only figures a franchisor may give you about it are in its disclosure document, which it must hand you ${disc} days before you sign or pay. Read the document first, then talk to owners, then to the seller. This page asks for nothing: no name, no phone number, no form.`,
  body: (h) => `
<h2>The brands on file, by category</h2>
<p>Franchise directories often list thousands of offers, many of them with no figure until you leave your details. The list here is short on purpose: only brands whose current disclosure document has been read line by line, with the edition date and the state filing number. The table counts them by category, with the lowest and highest Item 7 totals in each group and how many print sales in Item 19.</p>
${h.table(['Category', 'Brands', 'Lowest low end', 'Highest high end', 'Print Item 19 sales'], cats.map((g) => [K.CATS[g.c].label, String(g.list.length), K.usd(Math.min(...g.list.map((b) => b.invLow))), K.usd(Math.max(...g.list.map((b) => b.invHigh))), `${g.list.filter((b) => K.i19(b) !== null).length} of ${g.list.length}`]), 'Brands on this site by category, latest disclosure document of each.', ['l', 'r', 'r', 'r', 'r'])}
<p>Restaurant, bakery and coffee brands account for ${food.length} of the ${n} for now. Categories with fewer brands on file are not smaller markets, only fewer documents read so far; more are added as they are reviewed.</p>
<h2>By budget: the low end of Item 7</h2>
<p>A budget band sorts brands by the smallest opening total their franchisor prints. It is a rough filter, since the high end of a brand can sit two or three bands above its low end, but it is the honest way to answer the first question most buyers ask: what can I open with the money I have and can borrow? The fullest band on file is ${fullest.label.toLowerCase()}, with ${fullest.list.length} brands.</p>
${h.table(['Item 7 low end', 'Brands', 'Which'], bands.map((bd) => [bd.label, String(bd.list.length), bd.list.length ? bd.list.map((b) => bl(h, b.slug)).join(', ') : 'none on file']), 'Brands by the low end of their Item 7 estimate.', ['l', 'r', 'l'])}
<p>The band is not the whole cash question. Some franchisors set their own requirement: ${bl(h, 'culvers')}, whose Item 7 runs ${K.range(culv)} with the land included, asks for 20 % of the projected investment in cash or liquid assets. The ${h.a('franchise-loan', 'franchise loan page')} shows what the borrowed part costs each month at current SBA rates.</p>
${h.mini('list', { t: 'Filter the brands by category', p: ['cat', 'sort'], d: { cat: 'all', sort: 'low' } })}
<h2>How to read an opportunity, document first</h2>
<p>The order matters. A sales meeting or a discovery day comes with a story; the disclosure document comes with figures the franchisor must stand behind. Reading it first lets you arrive with questions instead of impressions. Five Items carry most of the money: Item 5 gives the initial fee, Item 6 every recurring fee, Item 7 the opening budget line by line, Item 19 any sales or profit figure the franchisor chooses to print, and Item 20 the count of units opened, closed and transferred, with the names and phone numbers of current and former owners.</p>
<p>Check the date on the cover. Editions are renewed every year, and the one on file for this site may be older for some brands: the oldest here, ${oldest.brand}, was issued on ${K.day(oldest.issued)}. Ask the franchisor for its current edition before relying on any figure. Then call owners from the Item 20 list, choosing them yourself rather than taking the names a salesperson suggests, and ask what they paid, what they earn and what they would do differently.</p>
<p>Watch what is said outside the document. Under the FTC Rule, a franchisor that prints no Item 19 may not give you any sales or earnings figure in another form, and one that prints Item 19 may not go beyond it. A number offered in a meeting, a brochure or a phone call that does not appear in Item 19 is a warning sign; the ${h.src('ftc_guide', "FTC's Franchise Rule compliance guide")} sets out what Item 19 may and may not contain.</p>
<h2>New unit or existing one</h2>
<p>An opportunity is not always a new build. Item 20 counts transfers, units sold by one franchisee to another, and some franchisors also sell their own company units to franchisees. An existing unit comes with a sales history you can read in its books, which no new site has, and usually a transfer fee instead of the initial fee. It also comes with the previous owner's lease, equipment and staff. The ${h.a('franchise-for-sale', 'resale page')} covers what a transfer costs and what to ask the seller for before any deposit.</p>
<h2>Why there is no lead form here</h2>
<p>Many pages about franchise opportunities are built to collect contact details: the visitor asks for information and the page passes the name on. A page built that way has a reason to sell an opportunity rather than compare several. This site sells nothing, asks for nothing and links to a brand only through its document on the Minnesota portal. ${allFr.length ? `A small detail it shows instead: ${shortList(allFr)} ${allFr.length > 1 ? 'have' : 'has'} no company-owned units at all in Item 20, which means every unit in ${allFr.length > 1 ? 'those systems' : 'that system'} is run by a franchisee you could call.` : ''} The ${h.a('franchise-disclosure-document', 'disclosure document page')} explains each of the ${K.P.rules.ftcItems} Items in turn.</p>
`,
  faqs: [
    { q: 'Where can I find franchise opportunities without giving my phone number?', a: `State registration portals publish disclosure documents for free. Minnesota's CARDS database lets anyone search by brand and download the PDF without an account; it is the source of the ${n} documents read for this site. Each brand page here links to that filing, and nothing on the site asks for a name, an email address or a phone number.` },
    { q: 'How should I compare franchise opportunities in different industries?', a: 'Start with the same Items for each: the Item 7 range, the Item 6 fees as a share of sales, the Item 19 figure and its scope, and the Item 20 trend. Industries differ in margins, so a sales figure alone favors restaurants. Put your own margin estimate on each and compare the cash flow and payback, not the sales.' },
    { q: 'What should I check first in a franchise offer?', a: `The issuance date on the cover, then Items 5, 6 and 7 for what you will pay, Item 19 for any figure about sales, and Item 20 for owners to call. A franchisor must give you its document at least ${disc} calendar days before you sign or pay. Any earnings figure given outside Item 19 is a warning sign under the FTC Rule.` },
  ],
  tool: 'list',
  toolArg: { cat: 'all', sort: 'low' },
  related: ['franchise-disclosure-document', 'franchise-cost', 'cheapest-franchises', 'franchise-loan'],
  sources: ['ftc_rule', 'ftc_guide', 'mn_cards', 'mn_80c'],
});
