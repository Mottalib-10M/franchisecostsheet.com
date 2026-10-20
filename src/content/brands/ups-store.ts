import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('ups-store');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const tech = b.other.find((x) => x.name.startsWith('Annual Technology'))!.annualUsd!;
const avg = K.i19(b)!;
const e = K.eco('ups-store');
const gc = K.B('great-clips');

export default defineBrand({
  slug: 'ups-store',
  title: 'The UPS Store Franchise Cost 2026: Fees, STR and Sales',
  description: `The UPS Store franchise cost in 2026: ${K.range(b)} for a Traditional Center, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty on STR and ${K.usd(avg)} average sales in ${b.units.year}.`,
  intro: `A UPS Store bills its customers for UPS shipping and keeps a commission, so the sales on which every fee is charged include money that is not the owner's margin.`,
  resume: `The UPS Store, Inc. estimates ${K.range(b)} to open a new or relocated Traditional Center in leased retail space under its Laser Lite design, in the disclosure document issued ${K.day(b.issued)}. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of that is paid to the franchisor or an affiliate, including the ${K.usd(b.feeLow)} initial franchise fee for a first Center. Fees are charged on "Subject to Royalty" revenue, gross sales plus gross commissions less allowed exclusions: a royalty of ${K.rate(b.royPct)}, a national advertising fee of ${K.rate(b.adPct)} capped at $27,734 a year, and a separate marketing fee of 1 %. Item 19 reports average adjusted gross sales of ${K.usd(avg)} in ${b.i19.period} for ${K.num(b.i19.count!)} franchised Traditional Centers open the full year, with no costs shown. Item 20 lists ${K.num(b.units.total!)} outlets at the end of ${b.units.year}, ${K.num(b.units.franchisedNetChange!)} more franchised Centers than a year earlier.`,
  body: (h) => `
<h2>Six prices for the same franchise fee</h2>
<p>The standard fee is ${K.usd(b.feeLow)} for a first Center. Item 5 then lists a string of programs: $19,950 for a second or later Center held by an owner of at least half of an existing one, $14,950 under the Rural Program, $29,950 under the Believe Program for first-time purchasers, and $19,950 for veterans and first responders. For 2026 the fee is waived for the first ten veterans who develop a new Traditional Center. An $8,000 application fee ($4,000 for existing owners) is credited to the fee. Two more payments to the franchisor come before opening: a Center Development Fee of $7,700 and a Laser Lite design fee of $3,275. Together they explain why the amount paid to the franchisor in Item 7 starts above the fee itself.</p>
<h2>What "Subject to Royalty" means for the bill</h2>
<p>Royalty and advertising are not taken on profit or even on the store's own services alone. STR adds gross sales, which include the UPS shipping charges collected at the counter, to gross commissions, then subtracts the exclusions the agreement allows. Shipping carries a thin margin for the store, so a percentage fee on it weighs more than the same percentage on a sandwich shop's sales. The royalty of ${K.rate(b.royPct)} is paid monthly by the 20th. The national advertising fee of ${K.rate(b.adPct)} stops at $2,135 a month from January to November and $4,249 in December, $27,734 a year in all; on the Item 19 average it comes to ${K.usd(e.y.ad)}, under the cap. The 1 % marketing fee comes on top without a cap. Local advertising collaboratives charge $100 to $500 a month, or a share of STR from 0.5 % up to 3 % if members vote it. The technology fee is ${K.usd(tech)} a year, billed monthly, and each iShip transaction costs $0.22.</p>
${h.mini('fees', { t: 'The UPS Store: royalty and advertising over ten years', p: ['sales', 'yrs', 'fx'], d: { sales: avg, roy: b.royPct!, ad: b.adPct!, fee: b.feeLow, yrs: 10, fx: tech } })}
<h2>Sales, from the bottom tenth to the top</h2>
<p>The ${K.usd(avg)} average comes from all ${K.num(b.i19.count!)} franchised Traditional Centers that reported for the full year; 2,263 of them, 45 %, beat it. The top 10 % averaged ${K.usd(o('top 10%'))} and the bottom 10 % ${K.usd(o('bottom 10%'))}. The figure barely moved over three years: ${K.usd(o('2023'))} in 2023 and ${K.usd(o('2024'))} in 2024. The document says it also gives median sales, but that table did not come through in the text we read, so no median is shown here. Since the calculator applies your margin to adjusted gross sales, shipping included, a margin typed for a pure service business would overstate the result. At the default ${K.rate(K.P.calc.defaultMarginPct)}, cash after the royalty and advertising fee is ${K.usd(e.y.cashBeforeDebt)} a year; the 1 % marketing fee and the technology fee are not in that figure.</p>
<h2>Network and resale</h2>
<p>Item 20 counts ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company outlets, Traditional and Non-Traditional together. In some regions an area franchisee receives half of the royalties paid in its territory. A transfer costs a $6,000 fee plus a $6,000 processing fee, or $1,500 if a finder's fee is paid. No other brand in the services category is on this site yet; among storefront brands with similar ranges, ${h.a('brand:great-clips', 'Great Clips')} estimates ${K.range(gc)} and reports average sales of ${K.usd(K.i19(gc)!)}.</p>
`,
  faqs: [
    { q: 'What fees does a UPS Store owner pay on Subject to Royalty revenue?', a: `Three percentages apply to STR: a ${K.rate(b.royPct)} royalty, a ${K.rate(b.adPct)} national advertising fee capped at $27,734 a year, and a 1 % marketing fee. STR is gross sales, including UPS shipping charges, plus gross commissions, less allowed exclusions. A technology fee of ${K.usd(tech)} a year and collaborative dues of $100 to $500 a month come on top.` },
    { q: 'Is there a discount on The UPS Store franchise fee for veterans?', a: `Yes. The VetFran and First Responder programs set the fee at $19,950 instead of ${K.usd(b.feeLow)}, and for 2026 the fee is waived entirely for the first ten veterans who develop a new Traditional Center. The Rural Program fee is $14,950 and the Believe Program for first-time purchasers $29,950.` },
    { q: 'Do UPS Store average sales include shipping charges?', a: `Yes. Item 19 reports adjusted gross sales of ${K.usd(avg)} for ${b.i19.period}, defined as gross sales, including UPS shipping costs collected from customers, plus gross commissions less permitted exclusions. No costs or expenses are printed. Much of that revenue is passed through to the carrier, so the owner's margin on it is narrow.` },
  ],
  related: ['brand:great-clips', 'franchise-royalty-fees', 'cheapest-franchises', 'franchise-for-sale'],
});
