import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Category } from '../../lib/brand-types';

const n = K.BRANDS.length;
const medFee = K.median(K.BRANDS.map((b) => b.feeLow));
const byLow = K.BRANDS.slice().sort((a, b) => a.feeLow - b.feeLow || a.feeHigh - b.feeHigh);
const cheapest = byLow.slice(0, 3);
const topHigh = K.BRANDS.slice().sort((a, b) => b.feeHigh - a.feeHigh)[0];
const maxLow = Math.max(...K.BRANDS.map((b) => b.feeLow));
const atMax = K.BRANDS.filter((b) => b.feeLow === maxLow);
const ranged = K.BRANDS.filter((b) => b.feeLow !== b.feeHigh);
const share = (b: (typeof K.BRANDS)[number]) => b.feeLow / K.invAt(b, 'mid');
const medShare = K.median(K.BRANDS.map(share));
const byShare = K.BRANDS.slice().sort((a, b) => share(b) - share(a));
const topShare = byShare[0];
const vetText = (b: (typeof K.BRANDS)[number]) => `${b.feeNote ?? ''} ${b.special ?? ''}`;
const vets = K.BRANDS.filter((b) => /veteran|vetfran|vet fran|military/i.test(vetText(b)) && !/no veteran discount/i.test(vetText(b)));
const noVets = K.BRANDS.filter((b) => /no veteran discount/i.test(vetText(b)));
const cats = (Object.keys(K.CATS) as Category[]).map((c) => ({ c, list: K.inCat(c) })).filter((g) => g.list.length >= 2);
const catShare = cats.map((g) => ({ ...g, s: K.median(g.list.map(share)), f: K.median(g.list.map((b) => b.feeLow)) })).sort((a, b) => b.s - a.s);
const topCat = catShare[0];
const lowCat = catShare[catShare.length - 1];
const pubSales = K.BRANDS.map((b) => K.i19(b)).filter((x): x is number => x !== null);
const medSales = Math.round(K.median(pubSales));
const medRoy = K.median(K.BRANDS.map((b) => b.royPct ?? 0));
const medAd = K.median(K.BRANDS.map((b) => b.adPct ?? 0));
const tenYears = K.tool('fees', { sales: medSales, roy: medRoy, ad: medAd, fee: medFee, yrs: 10 });
const cfa = K.B('chick-fil-a');
const sub = K.B('subway');
const cul = K.B('culvers');
const dun = K.B('dunkin');

export default defineGuide({
  id: 'franchise-fee',
  group: 'costs',
  order: 2,
  slug: 'franchise-fee',
  nav: 'Franchise fee by brand',
  card: 'The Item 5 initial fee of every brand, the veteran and existing owner discounts, and when the fee comes back.',
  title: 'Franchise Fee 2026: Initial Fees and Discounts by Brand',
  description: `Franchise fee in 2026 for ${n} brands: the Item 5 initial fee, a median of ${K.usd(medFee)}, the veteran and existing owner discounts, and the rare refund terms printed.`,
  h1: 'Initial franchise fees by brand: what Item 5 charges and who pays less',
  intro: `The list opens on ${K.CATS[topCat.c].label.toLowerCase()}, where the fee weighs most against the investment; switch the category to see the Item 5 fee of every brand next to its Item 7 total.`,
  resume: `The initial franchise fee is the lump sum a franchisor charges in Item 5 of its disclosure document for the right to open one unit under its name, paid at signing or before opening. Among the ${n} brands read on this site it runs from ${K.fee(cheapest[0])} at ${cheapest[0].brand} to ${K.usd(topHigh.feeHigh)} at ${topHigh.brand}${topHigh.feeLow !== topHigh.feeHigh ? ', the top of its range' : ''}, with a median of ${K.usd(medFee)}; ${atMax.length === 1 ? `one brand, ${atMax[0].brand}, starts at` : `${atMax.length} brands start at`} ${K.usd(maxLow)}. Against the middle of the Item 7 investment the fee is small, a median of ${K.pct(medShare, 1)}, and at most ${K.pct(share(topShare), 1)} for ${topShare.brand}. ${vets.length} of the ${n} documents print a lower fee or a credit for military veterans, several cut the fee for owners who already run a unit, and ${ranged.length} brands print a range rather than one price. The fee is rarely refundable once paid; the few exceptions, such as ${cul.brand} and McDonald's, are written into Item 5 with their conditions.`,
  body: (h) => `
<h2>What the fee pays for</h2>
<p>Item 5 of the disclosure document lists every payment due to the franchisor before the business opens. The initial fee is the main one: it buys the license to use the name and the system at one address, the initial training of a set number of people and the franchisor's help with site approval and opening. The documents differ on what is bundled. Pizza Hut includes the training of the first qualified operator, ${dun.brand} the training of two people, Sonic the first three. ${h.fdd('wendys', "Wendy's")} does not call it a franchise fee at all but a Technical Assistance Fee, and KFC splits its ${K.usd(K.B('kfc').feeLow)} into a deposit fee and an option fee. Whatever the name, it is a one-time charge: the royalty and the ad fund in Item 6 pay for the system after opening.</p>
<p>The fee also understates what the franchisor collects up front. The cover page of each document states how much of the Item 7 investment goes to the franchisor or its affiliates, and for many brands that sum is several times the fee: training charges, opening support, grand opening advertising paid to the franchisor, equipment or ingredient packages bought from an affiliate. Some brands add a development fee that is not credited against the franchise fee: ${h.fdd('five-guys', 'Five Guys')} requires a separate development fee per restaurant, ${h.fdd('jersey-mikes', "Jersey Mike's")} one of $10,000, ${h.fdd('arbys', "Arby's")} one of $12,500. Reading Item 5 to the last line is the only way to know the true amount due before the doors open.</p>
${h.table(['Category', 'Brands', 'Median fee', 'Fee as share of mid Item 7, median'], catShare.map((g) => [K.CATS[g.c].label, String(g.list.length), K.usd(g.f), K.pct(g.s, 1)]), 'Categories with at least two brands on this site, sorted by the weight of the fee in the investment.', ['l', 'r', 'r', 'r'])}
<h2>Why a low fee says little about the cost</h2>
<p>The fee is a poor guide to the size of the commitment. ${K.CATS[topCat.c].label} have the highest median ratio of fee to investment here, ${K.pct(topCat.s, 1)}; ${K.CATS[lowCat.c].label.toLowerCase()} have the lowest, ${K.pct(lowCat.s, 1)}. The fee weighs most where the rest of the investment is small, and almost nothing where a building has to be put up. ${cfa.brand} is the extreme case: its fee is ${K.usd(cfa.feeLow)}, and the document states that the fee is the only initial out-of-pocket investment the operator must make, half of it held as a working capital deposit, because the company owns the restaurant and the operator gives up half of the net profit in exchange. A low fee can therefore come with a heavier royalty, a profit share or required purchases from an affiliate; the ${h.a('franchise-royalty-fees', 'royalty page')} adds those up.</p>
<h2>Ranges and negotiated fees</h2>
<p>${ranged.length} brands print a range rather than one figure. ${h.fdd('culvers', "Culver's")} asks ${K.fee(cul)} depending on the program, ${dun.brand} sets the fee by market type from ${K.usd(dun.feeLow)} to ${K.usd(dun.feeHigh)}, ${h.fdd('papa-johns', 'Papa Johns')} states that its fee is not uniform, and Domino's may waive the fee entirely under its incentive programs. When fees are not uniform, the Rule requires Item 5 to give the range actually paid in the last fiscal year, and those disclosures are telling: Jack in the Box and Popeyes report fees from zero to the full list price, Tropical Smoothie Cafe from one dollar to the full price, Sonic from $1,250 to $45,000. The printed fee is a starting point for development deals and takeovers of closed units.</p>
${h.mini('fees', { t: 'The fee next to ten years of royalties', p: ['fee', 'sales', 'yrs'], d: { fee: medFee, sales: medSales, roy: medRoy, ad: medAd, yrs: 10 } })}
<h2>Veterans and existing owners</h2>
<p>${vets.length} of the ${n} documents mention a veteran program in Item 5 or in their incentive terms. The size varies widely. Auntie Anne's, Cinnabon, McAlister's, Moe's and Schlotzsky's, whose documents use the same VetFran wording, charge qualifying veterans $20,000 instead of $35,500. ${sub.brand} halves its ${K.usd(sub.feeLow)} fee to $7,500 for an honorably discharged veteran's first franchise. Checkers prints a $0 fee under its Vet Fran incentive, Taco John's $0 for a veteran with a service-connected disability rating of 50 % or more, and Little Caesars waives the fee for combat-disabled veterans and Gold Star families. Others prefer credits against later royalties, such as Dunkin' and Baskin-Robbins with $10,000 per restaurant. ${noVets.map((b) => b.brand).join(', ').replace(/, ([^,]*)$/, ' and $1')} print no veteran discount at all.</p>
<p>Existing owners are the other group that pays less, since the franchisor knows their record. European Wax Center charges an existing franchisee $36,000 rather than its standard fee, Culver's $55,000 for an additional restaurant under the same operator, and Jersey Mike's reported a fee of $8,500 for some existing franchisees in fiscal 2025. A buyer of an existing unit usually pays no initial fee at all but a transfer fee, covered on the ${h.a('franchise-for-sale', 'resale page')}.</p>
<h2>Can the fee be refunded?</h2>
<p>Where a document addresses the point, the default is that the fee is not refundable: IHOP and Pizza Hut say so in Item 5, and the development fees of Arby's, Five Guys and Jersey Mike's are called non-refundable. A few brands set conditions for getting money back. McDonald's refunds the fee in full if construction is not completed within one year of signing. Culver's credits its $5,000 application fee against the fee, refunds it if the applicant is not approved, and returns 75 % of the fee if the franchisee ends the agreement before the fifth week of its development program. Five Guys may refund 75 % of the fee if no approved location is found within six months. ${cfa.brand} holds half of its fee as a deposit returned, less amounts owed, at the end of the agreement. If a refund matters to you, the exact clause is in Item 5 and in the franchise agreement in Item 22; ask a franchise lawyer to read both before you pay.</p>
<p>At a median of ${K.usd(medFee)} the fee is rarely what decides whether a unit pays off. On the median Item 19 sales of ${K.usd(medSales)}, median royalty and ad fund rates would cost ${tenYears.value} over ten years, fee included, as the calculator above shows. The ${h.a('franchise-cost', 'franchise cost page')} puts each fee next to its full Item 7 range.</p>
`,
  faqs: [
    { q: 'Which franchise has the lowest initial fee in 2026?', a: `Among the ${n} brands read here, ${cheapest[0].brand} prints ${K.fee(cheapest[0])}, then ${cheapest[1].brand} at ${K.fee(cheapest[1])} and ${cheapest[2].brand} at ${K.fee(cheapest[2])}. A low fee does not mean a cheap unit: compare the Item 7 investment, the royalty and any required purchases before concluding that a brand costs less to own.` },
    { q: 'Do veterans pay a lower franchise fee?', a: `Often, but not everywhere. ${vets.length} of the ${n} disclosure documents read here mention a veteran program, usually a lower first fee, sometimes a credit against royalties instead. Subway charges $7,500 instead of ${K.usd(sub.feeLow)}, several brands $20,000 instead of $35,500. The conditions, such as honorable discharge or majority ownership, are in Item 5.` },
    { q: 'Is the initial franchise fee refundable?', a: 'Usually not: IHOP and Pizza Hut, for example, call it non-refundable in Item 5. A few brands print exceptions in Item 5, such as a full refund at McDonald\'s if construction is not completed within a year, or a 75 % refund at Five Guys if no site is approved within six months. Read the clause in the franchise agreement too.' },
    { q: 'Is the franchise fee part of the Item 7 investment?', a: `Yes. The Item 7 table starts with the initial fee from Item 5 and adds construction, equipment, inventory, deposits and working capital, so the fee is already inside the range. Across the brands here the fee is a median of ${K.pct(medShare, 1)} of the middle of that range, which is why the other lines deserve more attention.` },
  ],
  tool: 'list',
  toolArg: { cat: topCat.c, sort: 'low' },
  related: ['franchise-cost', 'franchise-royalty-fees', 'franchise-disclosure-document', 'brand:subway'],
  sources: ['ftc_436_5', 'ftc_guide', 'mn_cards'],
});
