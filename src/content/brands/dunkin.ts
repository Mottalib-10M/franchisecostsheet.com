import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('dunkin');
const e = K.eco('dunkin');
const ts = K.B('tropical-smoothie');
const cr = K.B('crumbl');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;

export default defineBrand({
  slug: 'dunkin',
  title: "Dunkin' Franchise Cost 2026: Fee by Market, Royalty, Sales",
  description: `Dunkin' franchise cost in 2026: ${K.range(b)} for a freestanding store, a ${K.fee(b)} fee set by market, a ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} ad fee.`,
  intro: `Dunkin' prices its franchise fee by market type, discounts advertising in the first years under its incentives, and publishes sales for more than seven thousand restaurants.`,
  resume: `Opening a freestanding Dunkin' restaurant costs ${K.range(b)} under Item 7 of the disclosure document Dunkin' Donuts Franchising LLC issued on ${K.day(b.issued)}, real estate excluded. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of it is paid to the franchisor or an affiliate. The initial franchise fee runs from ${K.fee(b)} depending on the development area type of the market. Each week the restaurant pays a continuing franchise fee of ${K.rate(b.royPct)} of gross sales and a continuing advertising fee of ${K.rate(b.adPct)}, plus 1.4 % of loyalty program sales. Item 19 reports average yearly sales of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised restaurants open all of 2025, traditional and non-traditional together. Item 20 lists ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}, almost all franchised, after a net gain of ${K.num(b.units.franchisedNetChange!)} franchised units.`,
  body: (h) => `
<h2>Freestanding first, other formats beside</h2>
<p>The ${K.range(b)} is Table A of Item 7, a freestanding restaurant. Dunkin' also franchises shopping center and storefront units, restaurants in gas stations and convenience stores, and non-traditional sites called SDOs, each with its own table. Real estate is marked "variable" and is not in the total, nor is a delivery vehicle. The Center, the franchisor's portal, charges a $340 access fee at signing.</p>
<h2>Six fee levels</h2>
<p>The initial franchise fee depends on the designated market area: Type 1 markets pay $90,000, then $80,000, $70,000, $60,000, $50,000 and $40,000 for Type 6. Gas station and convenience store units pay a fee prorated by term, self-service and SDO units half the standard fee. Fees actually paid in fiscal 2025 ranged from $0 to $90,000. Training for the first two people is included. Veterans get a credit of $10,000 per restaurant against the continuing franchise fee, up to $100,000.</p>
<h2>Advertising that starts low</h2>
<p>The full rates are ${K.rate(b.royPct)} and ${K.rate(b.adPct)}, or ${K.rate(K.pctFees(b))} of gross sales; SDOs pay 2.5 % for advertising. Under the Standard incentive, the advertising fee is 2 % through year one, 3 % in year two, 4 % in year three and 5 % from year four. The Strategic incentive holds it at 2.4 % through year five and 3.4 % in years six to eight. These programs also carry credits against the franchise fee of $125,000, $225,000 or up to $300,000. A marketing start-up spend of at least $10,000 is required at opening. The loyalty contribution of 1.4 % of loyalty program sales falls to 1.2 % from 2027. The calculator uses the full rates and ${K.usd(b.fixedYear)} a year of fixed charges (The Center subscription and a data service).</p>
${h.mini('compare', { t: "Dunkin' against two other treat brands", p: ['m', 'at'], d: { a: 'dunkin', c2: 'tropical-smoothie', c3: 'crumbl' } })}
<h2>Rent and purchases inside the system</h2>
<p>If you lease the site from a Dunkin' affiliate, you pay fixed rent and may also pay percentage rent even when the prime lease does not require it; the rate is set in each lease and not printed in the document. More than 95 % of what you buy to open and run the restaurant is under the franchisor's specifications, and affiliates received $132,600,000 from sales and leases to franchisees in 2025.</p>
<h2>Which average fits a freestanding unit</h2>
<p>The ${K.usd(x19)} headline blends every format. The 3,169 freestanding pad or building restaurants averaged ${K.usd(oth(/Average AUV, Traditional\/Free-standing/))} (median ${K.usd(oth(/Median AUV, Traditional\/Free-standing/))}), closer to the Item 7 table above; units with a drive-thru averaged ${K.usd(oth(/with Drive-Thru/))}, those without ${K.usd(oth(/No Drive-Thru/))}. Sales ran from ${K.usd(oth(/Lowest/))} to ${K.usd(oth(/Highest/))}. The group excludes 2025 openings, Combo restaurants shared with Baskin-Robbins and those closed for long periods, and the document states it shows no costs. At the default margin of ${K.rate(K.P.calc.defaultMarginPct)}, your figure to replace, the calculator gives ${K.dec(e.pay!)} years of payback on the middle of the range. ${h.a('brand:tropical-smoothie', 'Tropical Smoothie Cafe')} asks ${K.range(ts)} and ${h.a('brand:crumbl', 'Crumbl')} ${K.range(cr)}, both for leased storefronts.</p>
`,
  faqs: [
    { q: "How much does a Dunkin' franchise cost in 2026?", a: `A freestanding restaurant is estimated at ${K.range(b)} in Item 7, real estate not included. The franchisor or its affiliates receive ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} of that, mostly the initial fee, which depends on the market. Other formats, such as storefronts and gas station units, have their own estimates.` },
    { q: "Why does the Dunkin' franchise fee change from one city to another?", a: `The fee is set by the development area type of the designated market area: $90,000 in Type 1 markets down to $40,000 in Type 6. Self-service and SDO units pay half the standard fee, and fees actually paid in fiscal 2025 ranged from $0 to $90,000.` },
    { q: "What does a Dunkin' franchisee pay every week?", a: `A continuing franchise fee of ${K.rate(b.royPct)} of gross sales, a continuing advertising fee of ${K.rate(b.adPct)} (lower in the early years under the incentives) and 1.4 % of loyalty program sales, all collected weekly. Fixed technology charges and, for leased affiliate sites, rent come on top.` },
    { q: "What do Dunkin' restaurants sell in a year?", a: `Item 19 reports ${K.usd(x19)} on average and ${K.usd(b.i19.median!)} at the median for ${K.num(b.i19.count!)} franchised restaurants open all of 2025. Freestanding pad restaurants averaged ${K.usd(oth(/Average AUV, Traditional\/Free-standing/))}. The figures are sales only and unaudited, with no expenses, so any profit you derive rests on your own margin assumption.` },
  ],
  related: ['brand:tropical-smoothie', 'brand:crumbl', 'compare-franchises', 'franchise-fee'],
});
