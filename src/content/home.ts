/** Text of the home page (the pillar). Every figure comes from the kit. */
import { KIT as K } from '../lib/kit';
import type { FAQ, Helpers } from '../lib/page-types';

const n = K.BRANDS.length;
const pub = K.BRANDS.filter((b) => K.i19(b) !== null);
const lowest = K.BRANDS.slice().sort((a, b) => a.invLow - b.invLow)[0];
const highest = K.BRANDS.slice().sort((a, b) => b.invHigh - a.invHigh)[0];
const medFee = K.median(K.BRANDS.map((b) => b.feeLow));
const medPct = K.median(K.BRANDS.map((b) => K.pctFees(b)));
const medLow = K.median(K.BRANDS.map((b) => b.invLow));
const medHigh = K.median(K.BRANDS.map((b) => b.invHigh));
const cfa = K.B('chick-fil-a');
const sub = K.B('subway');
const mcd = K.B('mcdonalds');
const newest = K.BRANDS.map((b) => b.received).sort().slice(-1)[0];
const oldest = K.BRANDS.map((b) => b.issued).sort()[0];
const DM = K.P.calc.defaultMarginPct;

/** The value sentence (RECETTE §2.4), shown on the home page, the About page and the method page. */
export const VALUE = `The pages that rank first for a franchise's cost either ask for your name and phone number before they show a figure, sell the disclosure document, or print ranges that disagree with each other; this site gives, with no form, the figures of each brand's own dated disclosure document (initial fee, royalty and ad fund, initial investment, published sales, number of units, with a link to the document) and works out payback and break-even sales on your own margin.`;

export const HOME = {
  title: 'Franchise Cost 2026: Fees, Royalties and Payback by Brand',
  description: `Franchise cost in 2026 for ${n} brands, read in each Franchise Disclosure Document: initial fee, investment, royalty, ad fund, Item 19 sales and payback.`,
  h1: 'Franchise cost by brand: the investment, the fees, and how long it takes to earn it back',
  intro: 'Pick a brand: its disclosure document figures load, and the payback, the yearly cash flow and the break-even sales follow from the margin you expect.',
  resume: `Across the ${n} brands whose Franchise Disclosure Document this site has read, the initial investment printed in Item 7 runs from ${K.usd(lowest.invLow)} at the low end for ${lowest.brand} to ${K.usd(highest.invHigh)} at the high end for ${highest.brand}; the median brand asks ${K.usd(medLow)} to ${K.usd(medHigh)}. The initial franchise fee is a small part of that, a median of ${K.usd(medFee)}. What weighs more over the years is the royalty and the ad fund, a median of ${K.rate(medPct)} of gross sales together, taken on sales and not on profit. ${pub.length} of the ${n} brands publish yearly sales in Item 19: ${mcd.brand} reports ${K.usd(K.i19(mcd)!)} per franchised restaurant, ${cfa.brand} ${K.usd(K.i19(cfa)!)}, while ${sub.brand} publishes none. A franchisor may not tell you what you will earn outside Item 19, and almost none prints a profit, so the calculator asks for your own margin and starts at ${DM} %, a round value to replace, not a published figure.`,
  why: (h: Helpers) => `
<h2>Where each figure comes from</h2>
<p>A franchisor that sells a franchise in the United States must hand the buyer a Franchise Disclosure Document at least ${K.P.rules.disclosureDays} calendar days before any agreement is signed or any money paid, under the ${h.src('ftc_rule', 'FTC Franchise Rule')}. The document follows ${K.P.rules.ftcItems} numbered Items in the same order for every brand, which is what makes brands comparable. Minnesota is one of the states that require franchisors to register that document before selling there, and its Department of Commerce publishes every filing in the ${h.src('mn_cards', 'CARDS database')}, free and without an account. This site read the latest edition on file for each brand, between editions issued on ${K.day(oldest)} and filings received on ${K.day(newest)}, and kept five Items: the initial fee (Item 5), the recurring fees (Item 6), the initial investment (Item 7), the financial performance representation (Item 19) and the count of units (Item 20).</p>
<p>Each brand page names the issuance date and the state document number and links to the PDF itself. A figure the document does not print is left blank. Where a document contradicts itself, the page says so and the calculator uses the printed total. The ${h.a('method', 'method page')} lists every step.</p>
${h.mini('list', { t: 'Brands on this site, sorted', p: ['cat', 'sort'], d: { cat: 'all', sort: 'low' } })}
<h2>Why the margin is yours to type</h2>
<p>Item 19 is the only place a franchisor may say what a unit sells or earns, and the Rule lets it say nothing at all. Most brands that publish something give average or median gross sales, a few add a cost line or a profit margin for company stores, and none can tell you what your rent, wages and loan will be. The calculator therefore takes the sales figure from Item 19, subtracts the royalty and ad fund the document sets, and leaves the rest of the costs to a single margin you choose: what is left of a dollar of sales after food or goods, labor, rent, utilities and insurance, before the franchise fees. Start from ${DM} % and change it after reading the brand's Item 19 and talking to owners listed in Item 20.</p>
<p>The payback period is the investment divided by the yearly cash flow before any loan. A loan changes the picture: its payments come before the owner's pay, and the ${h.a('franchise-loan', 'franchise loan page')} shows what a 7(a) loan at today's rates costs each month.</p>
<h2>What these figures are not</h2>
<p>They are what each franchisor printed, not an offer to you. Investment ranges leave out real estate for many brands, and an Item 19 average covers units that have been open for years, not a new one. The site sells nothing, asks for no contact details and sends no one to a broker. It describes the documents; a franchise lawyer reads the agreement, and current owners tell you what the averages hide.</p>
`,
  faqs: [
    { q: 'How much does it cost to open a franchise in 2026?', a: `It depends on the brand far more than on the fee. Among the ${n} brands read here, the low end of the Item 7 investment goes from ${K.usd(lowest.invLow)} to more than ${K.usd(K.BRANDS.slice().sort((a, b) => b.invLow - a.invLow)[0].invLow)}, and the median brand asks ${K.usd(medLow)} to ${K.usd(medHigh)}. The range covers the fee, build-out, equipment, opening inventory and the first months of working capital, and often leaves out land.` },
    { q: 'What is the difference between the franchise fee and the investment?', a: `The franchise fee in Item 5 is paid to the franchisor once, when the agreement is signed, for the right to open; the median here is ${K.usd(medFee)}. The investment in Item 7 is everything needed to open the doors: the fee, construction, equipment, signs, inventory, deposits and the cash to run the first months. It is usually ten to fifty times the fee.` },
    { q: 'How are franchise royalties calculated?', a: `Most brands take a percentage of gross sales every week or month, whether the unit makes a profit or not, and a second percentage for the national ad fund. The median of the two together is ${K.rate(medPct)} among the brands read here. A few charge a flat amount or a minimum, and ${cfa.brand} also takes half of the restaurant's net profit.` },
    { q: 'Can a franchisor tell me how much I will make?', a: 'Only in Item 19 of its disclosure document, and only with a reasonable basis and written backup. Many brands publish average or median sales of their units; some publish nothing, and then their salespeople may not give you any figure at all. A number given orally or in a brochure but missing from Item 19 is a warning sign under the FTC Rule.' },
    { q: 'Why do two websites give different costs for the same franchise?', a: 'Most copy a range from an old edition of the disclosure document, mix formats such as a drive-thru and a mall unit, or add their own estimates. Each brand page here names the edition read, its issuance date and the state filing number, and links to the document, so you can check the figure against the source.' },
    { q: 'Where can I read a franchise disclosure document for free?', a: `States that register franchise offerings publish the filings. Minnesota's Department of Commerce posts every registered document in its CARDS database, searchable by brand and free to download without an account; that is the source used on this site. A franchisor must also give you its current document at least ${K.P.rules.disclosureDays} days before you sign or pay.` },
  ] as FAQ[],
  sources: ['ftc_rule', 'ftc_436_5', 'mn_cards', 'ftc_guide', 'sba_terms'],
};
