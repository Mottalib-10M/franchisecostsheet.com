import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('crumbl');
const e = K.eco('crumbl');
const ts = K.B('tropical-smoothie');
const du = K.B('dunkin');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;

export default defineBrand({
  slug: 'crumbl',
  title: `Crumbl Franchise Cost 2026: ${b.royPct}% Royalty, Fees and Sales`,
  description: `Crumbl franchise cost in 2026: ${K.range(b)} for a leased bakery and a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.usd(b.fixedYear)} a year of tech fees, ${K.usd(x19)} in sales.`,
  intro: `Crumbl takes a high royalty, sells the opening packages itself and earns a margin on card processing; its Item 19 covers only the bakeries that reported on time.`,
  resume: `A Crumbl cookie bakery of about 1,600 to 2,000 square feet in leased space costs ${K.range(b)} to open, according to the disclosure document Crumbl Franchising, LLC issued on ${K.day(b.issued)} and amended ${K.day(b.amended!)}. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of it goes to the franchisor or its affiliates, starting with the ${K.usd(b.feeLow)} franchise fee. Once open, the bakery pays a royalty of ${K.rate(b.royPct)} of gross sales and ${K.rate(b.adPct)} to the marketing fund each week, a technology fee of ${K.usd(b.fixedYear)} a year and a processing fee on every card transaction. Item 19 reports average 2025 gross sales of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)}, but only for the ${K.num(b.i19.count!)} bakeries open all year that sent complete reports on time, 74 % of those eligible. The system had ${K.num(b.units.total!)} bakeries at the end of ${b.units.year}, every one franchised.`,
  body: (h) => `
<h2>Packages bought from the franchisor</h2>
<p>The ${K.range(b)} assumes a leased bakery; buying property is not included, and the document assumes rent of $50,000 to $250,000 a year. Beyond the fee, the amount paid to Crumbl or its affiliates covers an opening technology equipment package ($12,000 to $15,000), an opening box and ingredient package ($11,000 to $16,000) and an $8,000 initial training fee. These purchases are required, not optional. The operating account must also hold at least $30,000 of working capital. Area developers pay $50,000 per unit up front, three units at least, credited to each initial fee.</p>
<h2>The fees that are not in the royalty line</h2>
<p>The ${K.rate(b.royPct)} royalty plus ${K.rate(b.adPct)} fund makes ${K.rate(K.pctFees(b))} of gross sales. An advertising cooperative of 1 % to 2 % may be added if Crumbl sets one up, and a local marketing requirement of up to 2 % currently stands at 0 %. The monthly technology fee of $650 gives the ${K.usd(b.fixedYear)} the calculator counts. Then come charges it leaves out because they depend on volume: a transaction processing fee of 2.4 % to 4 % of each transaction, paid to the franchisor, which keeps the difference over the processor's cost of about 2.36 %; 5 % to 15 % of the redemption value of gift cards; and two to four store inspections a year billed at cost plus a 5 % to 15 % administrative fee. A transfer costs ${K.usd(b.transferUsd!)}.</p>
${h.mini('fees', { t: 'Crumbl: what goes to the franchisor over ten years', p: ['sales', 'yrs', 'fx'], d: { sales: x19, roy: b.royPct!, ad: b.adPct!, fee: b.feeLow, yrs: 10, fx: b.fixedYear } })}
<h2>A selected Item 19</h2>
<p>Of 1,048 bakeries open all of 2025, 272 were left out for not submitting complete financial information on time and 53 for not operating the whole year. The ${K.usd(x19)} average describes the remaining ${K.num(b.i19.count!)}, with a range of ${K.usd(oth(/Lowest/))} to ${K.usd(oth(/Highest/))}; 346, about 45 %, met or beat it. Whether the late reporters sell more or less is unknown. The amended document adds January 1 to May 31, 2026 for 621 bakeries: an average of ${K.usd(oth(/Average gross sales, January/))} and a median of ${K.usd(oth(/Median gross sales, January/))} over five months. There is no cost line. With the calculator's placeholder margin of ${K.rate(K.P.calc.defaultMarginPct)}, the middle of the range pays back in ${K.dec(e.pay!)} years, and the franchisor's share comes to ${K.usd(e.y.toFranchisor)} a year before processing fees.</p>
<h2>Growth has slowed</h2>
<p>Item 20 shows franchised bakeries rising by 281 in 2023, 88 in 2024 and ${K.num(b.units.franchisedNetChange!)} in 2025, to ${K.num(b.units.franchised!)}. The last company bakery was gone by year end. Among treat brands, ${h.a('brand:tropical-smoothie', 'Tropical Smoothie Cafe')} costs ${K.range(ts)} with a ${K.rate(ts.royPct)} royalty, and ${h.a('brand:dunkin', "Dunkin'")} ${K.range(du)} at ${K.rate(du.royPct)}.</p>
`,
  faqs: [
    { q: 'How much does a Crumbl cookie franchise cost to open?', a: `Item 7 estimates ${K.range(b)} for one leased bakery of about 1,600 to 2,000 square feet. The franchisor and its affiliates receive ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}: the ${K.usd(b.feeLow)} fee, a technology package, a box and ingredient package and an $8,000 training fee.` },
    { q: 'What ongoing fees does a Crumbl owner pay?', a: `A royalty of ${K.rate(b.royPct)} and a marketing fund fee of ${K.rate(b.adPct)} of gross sales, weekly; a technology fee of $650 a month; a card processing fee of 2.4 % to 4 % of each transaction paid to the franchisor; gift card fees; and inspection costs with an administrative markup. A cooperative of 1 % to 2 % may be added.` },
    { q: 'Are Crumbl Item 19 sales figures for every bakery?', a: `No. The ${K.usd(x19)} average and ${K.usd(b.i19.median!)} median cover ${K.num(b.i19.count!)} bakeries, the 74 % of those open all of 2025 that submitted complete reports on time. 272 bakeries were excluded for late or incomplete reporting, so the figure may not represent the whole system.` },
  ],
  related: ['brand:tropical-smoothie', 'brand:dunkin', 'franchise-royalty-fees', 'franchise-disclosure-document'],
});
