import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('nothing-bundt-cakes');
const cr = K.B('crumbl');
const cs = K.B('cold-stone');
const o = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const top = o('top 1/3 (182');
const bot = o('bottom 1/3 (182');
const young = o('opened in 2024');
const ebitda = o('Average 4-Wall EBITDA after');
const medPct = o('Median 4-Wall EBITDA, 358 Bakeries, fiscal 2025, %');
const occ = o('occupancy');
const e = K.eco('nothing-bundt-cakes');

export default defineBrand({
  slug: 'nothing-bundt-cakes',
  title: 'Nothing Bundt Cakes Franchise Cost 2026: Fees and EBITDA',
  description: `Nothing Bundt Cakes franchise cost in 2026: ${K.range(b)} for a bakery, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} marketing and a ${K.dec(b.i19.profitPct!)} % average 4-wall EBITDA.`,
  intro: `Nothing Bundt Cakes is one of the few brands here that prints a profit line in Item 19, and it sells its cake mixes to franchisees through an affiliate.`,
  resume: `NBC Franchisor LLC estimates in its document of ${K.day(b.issued)} that a Nothing Bundt Cakes bakery of 1,600 to 1,800 square feet, in leased space, costs ${K.range(b)} to open, lease costs included but no purchase of real estate. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} goes to the franchisor and its affiliate: the ${K.usd(b.feeLow)} franchise fee, a $10,000 opening advertising program and about $16,034 of opening purchases from NBC Distribution. Each week the bakery pays a ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} to two marketing funds, on net revenues, plus about ${K.usd(b.fixedYear)} a year of technology and service fees. Item 19 reports average net revenues of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised bakeries open at least two full years in fiscal 2025, and an average 4-wall EBITDA of ${K.dec(b.i19.profitPct!)} % of net sales for 358 of them. The franchised count grew by ${K.num(b.units.franchisedNetChange!)} in ${b.units.year}.`,
  body: (h) => `
<h2>The money paid before the first cake</h2>
<p>The fee of ${K.usd(b.feeLow)} is due when the agreement is signed, and the document prints no discount for veterans. A developer signing for several bakeries pays the full fee for the first one and half the fee, $22,500, for each additional bakery up front. The rest of the payments to the franchisor side are operational: the $10,000 opening advertising program, which may be raised by up to $5,000, a $750 Master Architect Program fee and the first order of cake mixes, ingredients and supplies from NBC Distribution, an affiliate that remains the required supplier after opening. What the bakery spends with that affiliate is a cost of goods, outside the royalty that the calculator measures.</p>
<h2>Item 19 in three parts</h2>
<p>Part I covers the ${K.num(b.i19.count!)} bakeries open at least 24 months, with no exclusions; the top third averaged ${K.usd(top)} and the bottom third ${K.usd(bot)}. The 101 bakeries opened in 2024 averaged ${K.usd(young)} in their first full year, well under the overall average. Part III reports profit and loss data for 358 bakeries: average 4-wall EBITDA of ${K.usd(ebitda)}, or ${K.dec(b.i19.profitPct!)} % of net sales, and a median of ${K.dec(medPct)} %. Average occupancy cost was ${K.usd(occ)}.</p>
<p>Read that EBITDA with its definitions. It is computed after royalty and marketing fees adjusted to 11 % of net revenues, but before any owner salary: 190 bakeries reported owner payroll averaging $80,457, which is not deducted. It also excludes depreciation, interest, taxes and accounting fees, and 409 bakeries were left out of Part III. The margin in the calculator is measured before franchise fees, so it is not the same number; ${K.rate(K.P.calc.defaultMarginPct)} is only its starting value and is yours to set. At that default the average bakery would keep ${K.usd(e.y.cashBeforeDebt)} a year after fees.</p>
${h.mini('roi', { t: 'Nothing Bundt Cakes: payback at your margin', p: ['m', 'at'], d: { b: 'nothing-bundt-cakes', at: 'mid' } })}
<h2>Inconsistencies in the document</h2>
<p>Item 19 counts 765 franchised bakeries at the end of fiscal 2025 while Item 20 counts ${K.num(b.units.franchised!)}. The Part II table by bakery size labels its averages "Avg 2024 Net Revenues" although it covers 2025, and the exclusions listed for Part III add up to 407, not 409. None of these changes the headline average, but they are worth raising with the franchisor.</p>
<h2>Against Crumbl and Cold Stone</h2>
<p>Crumbl, also in the treats category here, needs ${K.range(cr)} with ${K.rate(cr.royPct)} plus ${K.rate(cr.adPct)}. ${h.a('brand:cold-stone', 'Cold Stone Creamery')} costs less to open, ${K.range(cs)}, and reports lower average sales. The ${h.fdd('nothing-bundt-cakes')} also lists the 117 bakeries that changed hands in 2025.</p>
`,
  faqs: [
    { q: 'How much is a Nothing Bundt Cakes franchise in 2026?', a: `Item 7 estimates ${K.range(b)} for a leased bakery of 1,600 to 1,800 square feet, lease costs included and real estate purchase excluded. The franchise fee is ${K.usd(b.feeLow)}, and ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} in all goes to the franchisor and its affiliate before opening, including the opening advertising program and the first products.` },
    { q: 'What profit does a Nothing Bundt Cakes bakery report?', a: `Part III of Item 19 shows an average 4-wall EBITDA of ${K.usd(ebitda)}, ${K.dec(b.i19.profitPct!)} % of net sales, for 358 bakeries in fiscal 2025. That figure is after royalty and marketing fees but before any owner salary, depreciation, interest and taxes. It describes past results of existing bakeries, not what a new one will earn.` },
    { q: 'Must Nothing Bundt Cakes owners buy supplies from the franchisor?', a: `Yes. Cake mixes, ingredients, accessories and supplies must be bought from NBC Distribution, an affiliate of the franchisor, starting with about $16,034 before opening and continuing afterwards. These purchases come on top of the ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} marketing contributions, which are both calculated on weekly net revenues.` },
    { q: 'How fast is Nothing Bundt Cakes growing?', a: `Item 20 shows ${K.num(b.units.franchised!)} franchised bakeries at the end of ${b.units.year}, ${K.num(b.units.franchisedNetChange!)} more than a year earlier, and ${K.num(b.units.company!)} company-owned ones. Fast growth means many young bakeries: the 101 opened in 2024 averaged ${K.usd(young)} of net revenues in their first full year, below the system average.` },
  ],
  related: ['brand:cold-stone', 'brand:baskin-robbins', 'item-19-franchise-earnings', 'best-franchises-to-own'],
});
