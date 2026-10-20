import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const n = K.BRANDS.length;
const days = K.P.rules.disclosureDays;
const items = K.P.rules.ftcItems;
const pages = K.BRANDS.map((b) => b.pages);
const medPages = K.median(pages);
const longest = K.BRANDS.slice().sort((a, b) => b.pages - a.pages)[0];
const shortest = K.BRANDS.slice().sort((a, b) => a.pages - b.pages)[0];
const byIssued = K.BRANDS.slice().sort((a, b) => a.issued.localeCompare(b.issued));
const oldest = byIssued[0];
const newest = byIssued[byIssued.length - 1];
const amended = K.BRANDS.filter((b) => b.amended !== null);
const yearAgo = `${Number(K.P.retrieved_at.slice(0, 4)) - 1}${K.P.retrieved_at.slice(4)}`;
const stale = byIssued.filter((b) => b.issued < yearAgo);
const list = (xs: typeof K.BRANDS) => xs.map((b) => b.brand).join(', ').replace(/, ([^,]*)$/, ' and $1');
const noI19 = K.BRANDS.filter((b) => !b.i19.published);
const sub = K.B('subway');
const ITEMS = [
  'The franchisor and any parents, predecessors and affiliates', 'Business experience', 'Litigation', 'Bankruptcy', 'Initial fees', 'Other fees',
  'Estimated initial investment', 'Restrictions on sources of products and services', "Franchisee's obligations", 'Financing',
  "Franchisor's assistance, advertising, computer systems and training", 'Territory', 'Trademarks', 'Patents, copyrights and proprietary information',
  'Obligation to participate in the actual operation of the business', 'Restrictions on what the franchisee may sell', 'Renewal, termination, transfer and dispute resolution',
  'Public figures', 'Financial performance representations', 'Outlets and franchisee information', 'Financial statements', 'Contracts', 'Receipts',
];
const LINKS: Record<number, string> = { 5: 'franchise-fee', 6: 'franchise-royalty-fees', 7: 'franchise-cost', 19: 'item-19-franchise-earnings', 20: 'franchise-for-sale' };

export default defineGuide({
  id: 'franchise-disclosure-document',
  group: 'costs',
  order: 5,
  slug: 'franchise-disclosure-document',
  nav: 'The disclosure document',
  card: `The ${items} Items of a Franchise Disclosure Document, the ${days}-day rule, where to read each brand's filing for free, and the five Items that hold the money.`,
  title: 'Franchise Disclosure Document 2026: Reading the 23 Items',
  description: `Franchise Disclosure Document in 2026: the ${items} Items, the ${days}-day rule, where to read any FDD free in Minnesota, and how to read Items 5, 6, 7, 19 and 20.`,
  h1: 'The Franchise Disclosure Document: its 23 Items and the five that hold the money',
  intro: 'Every brand on this site, sorted by the sales figure its Item 19 publishes; each line links to the document it comes from on the Minnesota portal.',
  resume: `A Franchise Disclosure Document, or FDD, is the document a franchisor must hand a prospective buyer at least ${days} calendar days before the buyer signs a binding agreement or pays any money, under the FTC Franchise Rule. It follows ${items} numbered Items in a fixed order, from the franchisor's history and litigation to its audited financial statements and the contracts themselves, which is what makes two brands comparable line by line. The documents are long: the ${n} read for this site have a median of ${K.num(medPages)} pages, up to ${K.num(longest.pages)} for ${longest.brand}. Five Items carry most of the money questions: Item 5 (initial fee), Item 6 (royalty and other recurring fees), Item 7 (initial investment), Item 19 (sales or earnings, if any) and Item 20 (units opened, closed and transferred, with owners' contact details). Minnesota publishes every registered document free in its CARDS database, and each brand on this site links to the edition used.`,
  body: (h) => `
<h2>The ${items} Items in order</h2>
<p>The ${h.src('ftc_rule', 'FTC Franchise Rule')} fixes the content and the order of the document, and ${h.src('ftc_436_5', 'section 436.5')} describes each Item. The order never changes, so once you know where Item 7 sits in one document you can find it in any other. The cover page comes first, with the total investment range and the amount paid to the franchisor, followed by a page of state-specific risk notes and a table of contents. The ${items} Items follow, then the exhibits, which often run longer than the Items: the franchise agreement, any development agreement, the financial statements, the list of owners, state addenda and the receipt pages.</p>
${h.table(['Item', 'Title', 'On this site'], ITEMS.map((t, i) => [String(i + 1), t, LINKS[i + 1] ? h.a(LINKS[i + 1], 'read the guide') : '']), `The ${items} Items of a disclosure document under 16 CFR 436.5.`, ['r', 'l', 'l'])}
<h2>The ${days}-day rule and what it protects</h2>
<p>The franchisor must give you the document at least ${days} calendar days before you sign a binding agreement with it or pay it any consideration, a deposit included. The point is time: time to read the agreement with a lawyer, to call owners, and to compare the figures with other brands. Sign the receipt in Item 23 with the true date; it is the proof that the clock started. If the franchisor changes the terms of the agreement in a material way on its own initiative, the Rule also gives you a waiting period on the final version before signing. Nothing obliges a buyer to sign after ${days} days: the period is a minimum.</p>
<h2>Where to read any brand's document for free</h2>
<p>Some states require franchisors to register their document before selling there, and Minnesota is one of them under ${h.src('mn_80c', 'chapter 80C of its statutes')}. Its Department of Commerce posts each registration in the ${h.src('mn_cards', 'CARDS database')}: search by the franchisor's name, open the most recent filing, and download the clean copy of the document. No account and no payment are needed. This site used exactly that source, the most recent edition on file for each brand, between an issuance date of ${K.day(oldest.issued)} for ${oldest.brand} and ${K.day(newest.issued)} for ${newest.brand}. ${amended.length} of the ${n} editions carry an amendment date, meaning the franchisor changed part of the document during the year. Some brands sell several formats under separate documents, a nontraditional venue or a second banner for example; check that the filing you open matches the format you are considering.</p>
<p>The edition matters. ${stale.length ? `${list(stale)} ${stale.length === 1 ? 'is' : 'are'} read here from a document issued more than a year before this site's review of ${K.day(K.P.retrieved_at)}, because no newer edition was on file in Minnesota at that date.` : `Every document read here was issued less than a year before this site's review of ${K.day(K.P.retrieved_at)}.`} A franchisor must update its document every year after its fiscal year ends, so ask for the current one and compare its issuance date with the figures you have seen elsewhere. Each brand's FDD link on this site, such as the ${h.fdd(sub.slug, `${sub.brand} document`)}, states the date of the edition.</p>
${h.mini('list', { t: 'Brands by Item 19 sales per dollar of Item 7', p: ['cat', 'sort'], d: { cat: 'all', sort: 'ratio' } })}
<h2>How to read the five money Items</h2>
<p><strong>Item 5</strong> lists what you pay the franchisor before opening: the initial fee, and any development, training or opening fees. When the fee is not uniform, it must give the range actually paid in the last fiscal year, which reveals how much room for discount exists. <strong>Item 6</strong> is a table of every recurring or occasional fee: royalty, advertising, technology, transfer, renewal, audit and penalty fees. Read the remarks column and the notes under it, where the base of each percentage and the right to raise it are defined. <strong>Item 7</strong> estimates the initial investment in a table with a low and a high column. Its notes say whether land and building are included, how many months of working capital are counted and which items are paid to the franchisor.</p>
<p><strong>Item 19</strong> is optional. If present, it states which units are counted, which are left out and why, and how many reached the figure. ${noI19.length} of the ${n} brands here leave it empty. <strong>Item 20</strong> gives five tables of units by year: the system-wide count, transfers between owners, franchised units opened, closed or not renewed, company units, and projected openings. Its exhibits list the names and phone numbers of current owners and of those who left the system in the last fiscal year. Those people are the best check on every other Item: they know their real rent, labor and royalty, and how the franchisor behaves when a unit struggles.</p>
<h2>The other Items deserve a reading too</h2>
<p>Item 3 lists material litigation, including suits brought by franchisees. Item 8 says which supplies you must buy from the franchisor or approved suppliers and whether the franchisor earns money on them, which can matter as much as the royalty. Item 11 sets out the training and the opening schedule. Item 12 tells you whether you get a protected territory; many documents give none. Item 17 is a table of the agreement's term, renewal, termination and transfer rules, the clauses that decide what you can sell and when. Item 21 holds audited financial statements of the franchisor itself, a sign of its strength. None of these produce a figure for the calculator, but any of them can change whether the figures matter.</p>
`,
  faqs: [
    { q: 'How many days before signing must I receive the FDD?', a: `At least ${days} calendar days before you sign any binding agreement with the franchisor or pay it anything, under the FTC Franchise Rule. Sign the receipt in Item 23 with the real date. The period is a minimum: take longer if your lawyer or your calls to current owners need it.` },
    { q: 'How long is a typical franchise disclosure document?', a: `Long. The ${n} documents read for this site have a median of ${K.num(medPages)} pages, from ${K.num(shortest.pages)} for ${shortest.brand} to ${K.num(longest.pages)} for ${longest.brand}, because the agreement, financial statements and lists of owners are attached as exhibits. The ${items} Items themselves are usually a smaller part of the total.` },
    { q: 'Can I get a franchise disclosure document without talking to a salesperson?', a: 'Yes. Minnesota requires registration and posts every registered document in its CARDS database, free and without an account; search by the franchisor\'s legal name. The franchisor must still hand you its current edition before you sign, and that copy is the one your receipt refers to, so compare the two dates.' },
    { q: 'Which Items of an FDD matter most for cost?', a: 'Items 5, 6 and 7 give the initial fee, the recurring fees and the initial investment. Item 19 gives sales or earnings if the franchisor publishes any, and Item 20 counts units opened, closed and transferred, with a list of owners to call. Items 8 and 17 then explain required purchases and the terms for selling or leaving.' },
  ],
  tool: 'list',
  toolArg: { cat: 'all', sort: 'sales' },
  related: ['item-19-franchise-earnings', 'franchise-fee', 'franchise-for-sale', 'franchise-cost'],
  sources: ['ftc_rule', 'ftc_436_5', 'ftc_guide', 'mn_cards', 'mn_80c'],
});
