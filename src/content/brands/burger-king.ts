import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const r = (x: number | null) => `${K.dec(x ?? 0, 2)} %`;

const b = K.B('burger-king');
const mc = K.B('mcdonalds');
const jb = K.B('jack-in-the-box');
const avg = K.i19(b)!;
const e = K.eco('burger-king');
const e20 = K.eco('burger-king', { m: 20 });

export default defineBrand({
  slug: 'burger-king',
  title: `Burger King Franchise Cost 2026: Fee, Royalty and Remodels`,
  description: `Burger King franchise cost in 2026: ${K.range(b)} for a freestanding restaurant without land, a ${K.usd(b.feeLow)} fee, and ${r(K.pctFees(b))} of sales in royalty and ads.`,
  intro: `A freestanding Burger King costs more to build than most burger restaurants, and the document ties the royalty to keeping the building up to date.`,
  resume: `Burger King's disclosure document, issued on ${K.day(b.issued)} and amended on ${K.day(b.amended!)}, estimates ${K.range(b)} for a traditional freestanding restaurant, before buying any land. The franchise fee is ${K.usd(b.feeLow)} for a full term, with application and training fees on top. A franchisee pays a royalty of ${r(b.royPct)} and an advertising contribution of ${r(b.adPct)} of gross sales, ${r(K.pctFees(b))} in all, and may be asked by the franchisees of its market to spend up to 2.0 % more on local marketing. Missing a remodel deadline raises the royalty by 3.0 %. Where Burger King is also the landlord, percentage rent of 8.5 % of sales is added. In ${b.units.year}, ${K.num(b.i19.count!)} franchisee-owned traditional restaurants averaged ${K.usd(avg)} in sales, and the system ended the year with ${K.num(b.units.total!)} restaurants, ${K.num(b.units.company!)} of them company-owned.`,
  body: (h) => `
<h2>Which format the range describes</h2>
<p>The cover of the document gives one range for every format, $348,400 to ${K.usd(b.invHigh)}. The traditional facility, a freestanding restaurant, starts at ${K.usd(b.invLow)}, and that is the range used on this page. It excludes real estate: a note in Item 7 puts unimproved land for a freestanding restaurant at $250,000 to $2,000,000. The ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} shown as paid to Burger King comes from the cover too, so it covers all formats rather than this one alone.</p>
<h2>The entry fees</h2>
<p>The ${K.usd(b.feeLow)} fee is for a full term and is prorated for shorter ones, with a minimum of $15,000; a non-traditional site on a ten-year term typically pays $25,000. Each individual applicant pays $250 and an entity $5,000 to apply, and each trainee in the new franchisee program costs $7,500. Under a development agreement the fee is prepaid at $50,000 per restaurant, with a minimum of $100,000.</p>
<h2>Royalty, advertising and the remodel clause</h2>
<p>Both the royalty and the advertising contribution are ${r(b.royPct)} of gross sales, and the advertising rate is capped there. Franchisees of a market area decide together on investment spending of up to 2.0 % more. Under the 2024 multi-unit new development program, the royalty can be 2.5 % to 4.5 % and advertising 2.0 % to 3.5 % for the first five years. The clause particular to Burger King concerns remodels: a franchisee that misses the deadlines of the Reclaim the Flame 2 or Sizzle Jr. programs pays 3.0 % more in royalty, and the default royalty after a deferred remodel is 6.0 % or 7.5 %. Item 19 reports that 1,031 remodeled traditional restaurants sold 12.8 % more on average in the twelve months after than in the twelve months before.</p>
<p>Fixed charges include $700 a year for training material and $1,000 for the Burger King Foundation, which the calculator adds as ${K.usd(b.fixedYear)}, plus a service desk fee of $750 to $1,200 a year and a digital services fee of $110 a month plus 1 % of digital sales, capped at $4,500 a year. When Burger King leases the premises, the rent has an annual minimum and a percentage of 8.5 % of monthly sales up to $133,333.33 and 10 % above. Count that rent in the margin you type.</p>
${h.mini('roi', { t: 'Burger King: payback at your margin', p: ['m', 'at', 'lf'], d: { b: 'burger-king' } })}
<p>The margin is your estimate, not a figure from Burger King. At the site default of ${r(K.P.calc.defaultMarginPct)}, the average sales leave ${K.usd(e.y.cashBeforeDebt)} a year after fees; at 20 %, ${K.usd(e20.y.cashBeforeDebt)}.</p>
<h2>Item 19 by format</h2>
<p>The ${K.num(b.i19.count!)} franchisee-owned traditional restaurants open all of ${b.units.year} averaged ${K.usd(avg)}, with a median of ${K.usd(b.i19.median!)} and a span from $188,523 to $5,532,973; 43 % reached the average. Company-owned traditional restaurants averaged $1,779,702. The 630 franchised non-traditional restaurants averaged $1,381,645, full-size restaurants sharing a fuel station $1,537,710 and kiosks at fuel stations $1,009,964. The document states that these sales figures do not reflect any cost.</p>
<h2>How it compares</h2>
<p>${h.a('brand:mcdonalds', "McDonald's")} needs ${K.range(mc)} but reports average sales of ${K.usd(K.i19(mc)!)}, more than twice Burger King's, while charging rent as a share of sales. ${h.a('brand:jack-in-the-box', 'Jack in the Box')} estimates ${K.range(jb)} and ${K.usd(K.i19(jb)!)} in sales, with ${r(K.pctFees(jb))} of sales in royalty and advertising. In Item 20, the franchised count ended ${b.units.year} at ${K.num(b.units.franchised!)}, a net change of ${K.num(b.units.franchisedNetChange!)}; the 2024 purchase of Carrols turned 1,023 franchised restaurants into company ones.</p>
`,
  faqs: [
    { q: 'How much does a Burger King franchise cost without the land?', a: `Item 7 estimates ${K.range(b)} for a traditional freestanding restaurant, excluding real estate. Unimproved land may cost another $250,000 to $2,000,000, according to a note in the same item. The cover range, which starts at $348,400, includes smaller non-traditional formats.` },
    { q: 'What happens to the Burger King royalty if a remodel is late?', a: `A franchisee that misses a remodel deadline under the Reclaim the Flame 2 or Sizzle Jr. programs pays an extra 3.0 % of sales in royalty, and the default royalty after a deferred remodel is 6.0 % or 7.5 %, instead of the standard ${r(b.royPct)}.` },
    { q: 'What percentage of sales goes to Burger King each month?', a: `The royalty is ${r(b.royPct)} and the advertising contribution ${r(b.adPct)} of gross sales, ${r(K.pctFees(b))} together. Franchisees of a market may add up to 2.0 % for local marketing. If Burger King is the landlord, percentage rent of 8.5 % of sales, 10 % above $133,333.33 a month, comes on top.` },
    { q: 'What are average sales at a franchised Burger King?', a: `In ${b.units.year}, ${K.num(b.i19.count!)} franchisee-owned traditional restaurants open all year averaged ${K.usd(avg)} and had a median of ${K.usd(b.i19.median!)}. The 630 non-traditional franchised restaurants averaged $1,381,645. The document prints no cost or profit figure for franchised restaurants, so the margin in the calculator is yours to estimate.` },
  ],
  related: ['brand:mcdonalds', 'brand:jack-in-the-box', 'franchise-royalty-fees', 'franchise-loan'],
});
