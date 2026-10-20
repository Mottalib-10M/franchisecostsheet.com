import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import type { Brand } from '../../lib/brand-types';

const n = K.BRANDS.length;
const how = (b: Brand) => (b.transfer === null ? 'not printed in Item 6' : b.transferUsd !== null ? 'dollar amount' : /%/.test(b.transfer) ? 'share of the initial fee' : 'range or formula, see Item 6');
const flat = K.BRANDS.filter((b) => b.transferUsd !== null);
const pctFee = K.BRANDS.filter((b) => b.transfer !== null && b.transferUsd === null && /%/.test(b.transfer));
const notPrinted = K.BRANDS.filter((b) => b.transfer === null);
const medTransfer = K.median(flat.map((b) => b.transferUsd!));
const byTransfer = flat.slice().sort((a, b) => b.transferUsd! - a.transferUsd!);
const topT = byTransfer[0];
const lowT = byTransfer[byTransfer.length - 1];
const medFee = K.median(K.BRANDS.map((b) => b.feeLow));
const counted = K.BRANDS.filter((b) => b.units.franchisedNetChange !== null);
const shrinking = counted.filter((b) => b.units.franchisedNetChange! < 0).sort((a, b) => a.units.franchisedNetChange! - b.units.franchisedNetChange!);
const growing = counted.filter((b) => b.units.franchisedNetChange! > 0);
const lost = -shrinking.reduce((s, b) => s + b.units.franchisedNetChange!, 0);
const worst = shrinking[0];
const shrinkPub = shrinking.filter((b) => K.i19(b) !== null);
const pick = shrinkPub[0] ?? K.BRANDS[0];
const share = (b: Brand) => -b.units.franchisedNetChange! / (b.units.franchised! - b.units.franchisedNetChange!);
const byShare = shrinking.filter((b) => b.units.franchised !== null).sort((a, b) => share(b) - share(a));
const steep = byShare[0];
const list = (xs: Brand[]) => xs.map((b) => b.brand).join(', ').replace(/, ([^,]*)$/, ' and $1');
const sub = K.B('subway');

export default defineGuide({
  id: 'franchise-for-sale',
  group: 'money',
  order: 22,
  slug: 'franchise-for-sale',
  nav: 'Buying a resale',
  card: 'Buying an existing franchised unit: the transfer fee of each brand, the networks that are shrinking, and what to ask the seller.',
  title: 'Franchise for Sale 2026: Resale Transfer Fees by Brand',
  description: `Franchise for sale in 2026: buying an existing unit, the Item 6 transfer fee of ${n} brands (median ${K.usd(medTransfer)}), shrinking networks and the Item 20 owner lists.`,
  h1: 'Buying a franchise for sale: transfer fees, shrinking networks and the seller\'s books',
  intro: `The calculator opens on ${pick.brand}, the brand that lost the most franchised units in its last reported year among those publishing sales; switch to your own sales figure once the seller shows the books.`,
  resume: `A franchise for sale is an operating unit whose owner wants out; the buyer pays the seller a price agreed between them, and the franchisor charges a transfer fee for approving the new owner, printed in Item 6 of its disclosure document. Among the ${n} brands read here, ${flat.length} print the fee as a dollar figure, a median of ${K.usd(medTransfer)} for the first unit, from ${K.usd(lowT.transferUsd!)} at ${lowT.brand} to ${K.usd(topT.transferUsd!)} at ${topT.brand}; ${pctFee.length} set it as a percentage of the current initial fee, and ${notPrinted.length} print none in the table read for this site. Item 20 shows where units are leaving: ${shrinking.length} brands ended their last reported year with fewer franchised units than they began it, ${K.num(lost)} units in all, led by ${worst.brand} with ${K.num(-worst.units.franchisedNetChange!)} fewer. Item 20 lists current owners and those who left, the people to call before you make an offer.`,
  body: (h) => `
<h2>What changes when you buy an existing unit</h2>
<p>A resale replaces the uncertainty of a new site with the record of an old one. The unit has a lease, staff, equipment and, above all, sales history. That history is what Item 19 cannot give: a franchisor may print only system averages, but a seller may show you the actual results of the unit for sale, and the Rule exempts that disclosure because it concerns one specific business. Ask for several years of profit and loss statements, sales tax returns and the royalty reports sent to the franchisor, and check that they agree.</p>
<p>The franchisor still controls the deal. Item 17 of its document sets the conditions for a transfer: approval of the buyer, training, often signing the current form of franchise agreement rather than taking over the old one, paying any amounts owed and sometimes remodeling the unit. That last condition can cost more than the transfer fee. ${h.fdd('dennys', "Denny's")} charges $7,500 rather than $5,000 when a restaurant changes owners past its remodel due date, Burger King raises the royalty by 3 % when remodel deadlines under its programs are missed, and Little Caesars may require a refurbishment every five years at up to $150,000. Ask the franchisor in writing what it will require of you before you agree on a price.</p>
<h2>Transfer fees by brand</h2>
<p>The transfer fee is small next to the price of a business, and it varies widely. ${flat.length} brands state a dollar amount for the first unit, with a median of ${K.usd(medTransfer)} against a median initial fee of ${K.usd(medFee)} for the brands on this site. Several charge less when the buyer is already one of their owners: ${h.fdd('checkers', 'Checkers')} asks $20,000 or $10,000, KFC $9,600 or $4,800, Culver's $10,000 or $5,000 plus its attorneys' fees, Jimmy John's $12,500 or $7,500. Others charge per unit in a package, like Burger King with $2,000 for the first restaurant and $500 for each additional one. ${pctFee.length} brands, including ${list(pctFee.slice(0, 4))}, set the fee as a share of their current initial fee, 50 % at several of them when control changes hands. ${h.fdd('nothing-bundt-cakes', 'Nothing Bundt Cakes')} adds $5,000 for an opening advertising campaign under the new owner and passes on any broker commission it incurs.</p>
${h.table(['Brand', 'Transfer fee, first unit', 'Printed as'], K.BRANDS.slice().sort((a, b) => (b.transferUsd ?? -1) - (a.transferUsd ?? -1)).map((b) => [h.fdd(b.slug, b.brand), b.transferUsd === null ? 'no single figure' : K.usd(b.transferUsd), how(b)]), 'Item 6 of each brand\'s latest disclosure document. Where a document charges less to existing owners, the higher amount is shown.', ['l', 'r', 'l'])}
<h2>Why shrinking networks mean more units for sale</h2>
<p>Item 20 counts franchised units at the start and end of each of the last three years. When the count falls, owners are closing or handing units back, and others try to sell before closing. ${shrinking.length} of the ${counted.length} brands with a count here lost franchised units in their last reported year and ${growing.length} gained. ${h.a('brand:subway', sub.brand)} lost ${K.num(-sub.units.franchisedNetChange!)} restaurants in ${sub.units.year}${worst.slug === sub.slug ? ', the most of any brand here' : `, and ${worst.brand} lost the most`}. Relative to its size the steepest fall was at ${steep.brand}, ${K.pct(share(steep), 1)} of its franchised units in one year. A buyer in a shrinking network has more choice and more room on price, but should ask why the units around the one for sale closed, and whether the same causes apply.</p>
<p>The count can also move for reasons that have nothing to do with owners' results. A franchisor that buys back restaurants lowers the franchised count, as Taco Bell did in ${K.B('taco-bell').units.year} when it reacquired 144 units; one that sells its own units raises it, as Arby's did with 115 restaurants in December 2025. Those sales are resales too, from the franchisor itself: Checkers charges a $10,000 asset transfer fee when a buyer takes over one of its company restaurants, and IHOP prices takeovers under its purchase program from $0 to $300,000. The notes under the Item 20 tables explain each movement.</p>
${h.mini('roi', { t: 'A resale on the seller\'s own figures', p: ['b', 'sb', 'so', 'm'], d: { b: pick.slug, sb: 'own', so: Math.round(K.i19(pick) ?? 0) } })}
<h2>The Item 20 lists: your best source</h2>
<p>The exhibits of Item 20 list every current franchisee with an address and phone number, and every owner who left the system during the last fiscal year, transferred, terminated or simply closed. Former owners will tell you what current ones may not: what the unit really earned, how the franchisor handled a dispute, why they sold. Call several in the same region as the unit you are considering. Item 20 also has a table of transfers by state, which shows how often units change hands; ${h.fdd('nothing-bundt-cakes', 'Nothing Bundt Cakes')}, for example, reports 117 transfers in 2025.</p>
<h2>Pricing a resale</h2>
<p>This site does not give resale prices: no disclosure document prints them, and listing sites quote asking prices, not closed deals. What you can check is the price against the cost of a new unit. If the seller asks more than the top of the brand's Item 7 range, you are paying for proven sales; make sure the books prove them. If the price is far below the low end, ask what is wrong with the site, the lease or the equipment. The calculator above lets you type the seller's sales and your margin; read the payback against the price you would pay rather than the Item 7 investment it shows. The ${h.a('franchise-loan', 'loan page')} covers financing, which works for an existing unit much as for a new one.</p>
`,
  faqs: [
    { q: 'How much is the transfer fee when buying an existing franchise?', a: `It is printed in Item 6 of the disclosure document. Among the ${n} brands read here, ${flat.length} state a dollar amount, a median of ${K.usd(medTransfer)}, from ${K.usd(lowT.transferUsd!)} at ${lowT.brand} to ${K.usd(topT.transferUsd!)} at ${topT.brand}. Others set it as a share of the current initial fee, and several charge less when the buyer already owns a unit of the brand.` },
    { q: 'Can the seller of a franchise show me its sales and profit?', a: 'Yes. The FTC Rule lets the owner of a specific unit, or the franchisor on that owner\'s behalf, give you the actual records of the unit you are buying, even when Item 19 publishes nothing. Ask for several years of profit and loss statements, tax returns and royalty reports, and check that they match one another.' },
    { q: 'Why are so many franchises of the same brand for sale?', a: `Often because the network is shrinking. ${shrinking.length} of the brands read here ended their last reported year with fewer franchised units, ${worst.brand} with ${K.num(-worst.units.franchisedNetChange!)} fewer. Owners retiring, remodel deadlines and thin margins all bring units to market. Call former owners listed in Item 20 to learn which applies.` },
    { q: 'Do I sign a new franchise agreement when I buy a resale?', a: 'Many franchisors require it, on their current terms, which may carry a higher royalty or new fees than the seller paid; some instead let you take over the remaining term. Item 17 of the disclosure document sets the transfer conditions, including approval of the buyer, training and any remodeling. Get them in writing before agreeing on a price.' },
  ],
  tool: 'roi',
  toolArg: { b: pick.slug },
  related: ['franchise-disclosure-document', 'franchise-loan', 'franchise-fee', 'brand:subway'],
  sources: ['ftc_436_5', 'ftc_guide', 'mn_cards'],
});
