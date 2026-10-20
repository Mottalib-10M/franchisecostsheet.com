import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('scooters-coffee');
const dk = K.B('dunkin');
const nb = K.B('nothing-bundt-cakes');
const o = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const endCap = o('Average gross sales, Participating franchised End Cap');
const ebitda = o('Average EBITDA after imputed');
const topM = o('top 1/4');
const botM = o('bottom 1/4');
const rent = o('rental expense');
const sss = o('Same-store');
const ticket = o('customer ticket');
const e = K.eco('scooters-coffee');

export default defineBrand({
  slug: 'scooters-coffee',
  title: "Scooter's Coffee Franchise Cost 2026: Kiosk Fees and Margin",
  description: `Scooter's Coffee franchise cost in 2026: ${K.range(b)} for a drive-thru kiosk, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} marketing and ${K.usd(K.i19(b)!)} in sales.`,
  intro: `Scooter's Coffee prices a small drive-thru kiosk, sells the equipment and coffee through its own supply affiliate, and prints a profit margin for its kiosks.`,
  resume: `For a Scooter's Coffee kiosk, a freestanding drive-thru of 650 to 700 square feet on a leased site, Item 7 of the document issued ${K.day(b.issued)} and amended ${K.day(b.amended!)} estimates ${K.range(b)}, land not included. An unusually large share, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, goes to the franchisor or its affiliate: the ${K.usd(b.feeLow)} franchise fee, a $20,000 opening support fee, and the opening inventory and most of the equipment bought from Scooter's Coffee Supply Chain. The store then pays a ${K.rate(b.royPct)} royalty on net sales and, for now, ${K.rate(b.adPct)} to national marketing, which may rise to ${K.rate(b.adPctHigh)}, plus a technology fee that grows 15 % a year. Item 19 reports average gross sales of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} kiosks open all of 2025, and an average net profit margin of ${K.dec(b.i19.profitPct!)} % for reporting kiosks. Franchised stores grew by ${K.num(b.units.franchisedNetChange!)} in ${b.units.year}.`,
  body: (h) => `
<h2>Kiosk or end cap</h2>
<p>The cover page quotes $658,898 to $1,345,750, a range that takes its low end from the End Cap store, a unit at the end of a shopping center, and its high end from the kiosk. The kiosk alone, used on this page, is ${K.range(b)}; the End Cap is estimated at $658,898 to $1,068,525. Neither includes land, and franchisees who bought their real estate paid $250,000 to $1,300,000 for it. End Cap stores reported higher average sales in 2025, ${K.usd(endCap)} across 45 stores.</p>
<h2>Where the ${K.usd(b.toFrHigh!)} goes</h2>
<p>Beyond the ${K.usd(b.feeLow)} fee and the mandatory $20,000 Initial Opening Support Fee, the affiliate Scooter's Coffee Supply Chain sells the opening inventory and most store equipment, $160,000 to $226,000 for a kiosk, and remains the source of ongoing inventory. Honorably discharged veterans receive a $20,000 product credit from that affiliate on their first store, rather than a cut in the fee. The technology fee is $350 a month today and rises 15 % a year, compounded: the calculator counts today's amount and a $499 conference fee, ${K.usd(b.fixedYear)} a year, so later years cost more than it shows. Local marketing of up to 2 % and a regional cooperative of up to 3 % may be required in future, with total marketing capped at 5 % of net sales.</p>
${h.mini('breakeven', { t: "Scooter's Coffee kiosk: break-even sales", p: ['m', 'lf', 'at'], d: { b: 'scooters-coffee', lf: 60 } })}
<h2>The margin the document prints</h2>
<p>Item 19 reports an average EBITDA of ${K.usd(ebitda)} for 621 reporting kiosks, a net profit margin of ${K.dec(b.i19.profitPct!)} %. Costs include goods, labor, rent averaging ${K.usd(rent)}, estimated card processing and an estimated overhead, and royalty, marketing and technology fees are imputed at the current rates. The spread is wide: the top quarter of kiosks reached ${K.dec(topM)} %, the bottom quarter ${K.dec(botM)} %. The document does not state that owner pay is deducted. Same-store net sales grew ${K.dec(sss)} % from 2024 to 2025, on an average ticket of $${K.dec(ticket, 2)}. Since that printed margin is after franchise fees and the calculator asks for one before them, its ${K.rate(K.P.calc.defaultMarginPct)} default, a value for you to replace, is not the document's figure; at that default the average kiosk keeps ${K.usd(e.y.cashBeforeDebt)} a year.</p>
<h2>Discrepancies and comparison</h2>
<p>The document is not consistent with itself: the kiosk average appears as ${K.usd(K.i19(b)!)} in one section and $998,869 in another, the overhead is described as $49,800 while the tables use $52,500, and one section counts 761 kiosks open all year where another counts 697. ${h.a('brand:nothing-bundt-cakes', 'Nothing Bundt Cakes')}, which also prints a profit line, asks ${K.range(nb)}; Dunkin' needs ${K.range(dk)} with ${K.rate(dk.royPct)} plus ${K.rate(dk.adPct)}. Check each point in the ${h.fdd('scooters-coffee')}.</p>
`,
  faqs: [
    { q: "How much does a Scooter's Coffee kiosk cost?", a: `Item 7 estimates ${K.range(b)} for a drive-thru kiosk of 650 to 700 square feet on a leased site, land excluded. An End Cap store in a shopping center is estimated at $658,898 to $1,068,525. Of the kiosk total, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} is paid to the franchisor or its supply affiliate.` },
    { q: "What fees does a Scooter's Coffee franchisee pay?", a: `A ${K.usd(b.feeLow)} franchise fee and a $20,000 opening support fee up front, then a ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} national marketing on weekly net sales. The marketing rate may rise to ${K.rate(b.adPctHigh)}. A technology fee of $350 a month rises 15 % each year, and inventory is bought from the franchisor's affiliate.` },
    { q: "What profit margin does a Scooter's Coffee kiosk make?", a: `For 621 reporting kiosks in 2025, Item 19 prints an average EBITDA of ${K.usd(ebitda)}, a ${K.dec(b.i19.profitPct!)} % net profit margin after imputed royalty, marketing and technology fees. The top quarter reached ${K.dec(topM)} % and the bottom quarter ${K.dec(botM)} %. Debt service, depreciation and owner pay are not clearly deducted, and past results are no forecast.` },
  ],
  related: ['brand:nothing-bundt-cakes', 'franchise-break-even', 'item-19-franchise-earnings', 'franchise-fee'],
});
