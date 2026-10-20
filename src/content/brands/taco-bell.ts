import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('taco-bell');
const cat = K.catSales('mexican');
const e = K.eco('taco-bell');
const dt = K.B('del-taco');
const qd = K.B('qdoba');

export default defineBrand({
  slug: 'taco-bell',
  title: 'Taco Bell Franchise Cost 2026: Land, Fees and Forecasts',
  description: `Taco Bell franchise cost in 2026: ${K.range(b)} for a freestanding unit on bought land, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} marketing fee.`,
  intro: `Taco Bell's estimate covers a freestanding drive-thru built on land the franchisee buys. Its Item 19 rates three forecasting tools rather than reporting what restaurants sell.`,
  resume: `A new Traditional Unit, the freestanding Taco Bell restaurant, costs ${K.range(b)} under Item 7 of the document ${b.franchisor} issued on ${K.day(b.issued)}, a total that includes purchased land of $250,000 to $1,400,000. An In-Line or End-Cap unit is estimated at $934,750 to $1,817,200 with a $25,000 fee. For the first unit, ${K.usd(b.toFrLow!)} goes to Taco Bell and an affiliate: the ${K.usd(b.feeLow)} franchise fee plus $27,250 of development services. Each accounting period the unit pays a Period Franchise Fee of ${K.rate(b.royPct)} of gross sales and a Period Marketing Fee of ${K.rate(b.adPct)}, plus about ${K.usd(b.fixedYear)} a year of fees owed to Taco Bell. Item 19 gives no historical average: it reports how well three tools projected the second-year sales of ${K.num(b.i19.count!)} units opened in 2023. Item 20 counts ${K.num(b.units.total!)} units at the end of ${b.units.year}, ${K.num(b.units.franchised!)} franchised.`,
  body: (h) => `
<h2>Land in, rent out</h2>
<p>The ${K.usd(b.invLow)} to ${K.usd(b.invHigh)} figure assumes you buy the site. A franchisee who leases the ground instead should expect base rent of $45,000 to $200,000 or more a year, according to the same Item 7. Existing restaurants bought from Taco Bell may be leased or subleased from it at a fixed rent that "generally ranges from $1,331.00 to $20,833.00 per month", not a share of sales. A smaller In-Line or End-Cap unit costs $934,750 to $1,817,200. For a first unit, a development services agreement with the affiliate YRSG may be required at $25,000 plus a $2,250 accessibility inspection, and YRSG sells optional real estate services from $10,000.</p>
<h2>Fees under other names</h2>
<p>Taco Bell calls its royalty the Period Franchise Fee, ${K.rate(b.royPct)} of gross sales, and its advertising contribution the Period Marketing Fee, ${K.rate(b.adPct)}, paid to the national advertising fund. Older franchisees who did not accept the 2012 marketing provisions pay 4.5 %, of which 1.5 % goes to local marketing. Incentive programs can waive marketing fees for one to four years or cut them to 2.25 % in the first year, and the ${K.usd(b.feeLow)} fee itself was paid at anywhere from $0 to $45,000 per unit in fiscal 2025. Fixed fees in the calculator, ${K.usd(b.fixedYear)}, are the $750 All Access fee and up to $6,000 of technology fees owed to Taco Bell or its affiliates. Up to $15,500 a year of third-party technology fees and $0.19 per digital order are left out.</p>
<p>Leaving early is expensive: on certain terminations, liquidated damages equal the greater of 11 % of the unit's gross sales over the last twelve months or $100,000.</p>
${h.mini('breakeven', { t: 'Taco Bell: sales needed to cover fees and the loan', p: ['m', 'lf', 'at'], d: { b: 'taco-bell' } })}
<h2>Three forecasts tested against reality</h2>
<p>Item 19 states that, apart from the forecasting tools, Taco Bell makes no representation about past or future performance. Vendors projected the second-year sales of ${K.num(b.i19.count!)} single-brand, freestanding drive-thru units opened in 2023. Kalibrate projected $826,707 to $3,621,383 and landed within 20 % of actual sales for 61 % of units; SiteZeus projected $616,474 to $3,991,919 and was within 20 % for 64 %; Bell Point carries a stated margin of error of 20 %. These are projections, not results, and the sample excludes multi-brand, in-line and licensed units. The calculator therefore uses ${K.usd(cat.median!)}, the median Item 19 figure of ${cat.n} Mexican food brands on this site. At the default margin of ${K.rate(K.P.calc.defaultMarginPct)}, which is your figure to replace, the middle of the range pays back in ${K.dec(e.pay!)} years, a result driven by the cost of the land.</p>
<h2>Franchised units bought back</h2>
<p>Franchised units fell by only ${K.num(-b.units.franchisedNetChange!)} in ${b.units.year}, while company-owned units grew by 165: Taco Bell reacquired 144 franchised units, 102 of them in Florida, 23 in Georgia and 19 in South Carolina. The table also starts 2025 at 7,839 units against 7,847 at the end of 2024, a gap the document does not explain. Next to it, ${dt.brand} quotes ${K.range(dt)} and ${qd.brand} ${K.range(qd)}, both with an average in Item 19. The ${h.a('compare-franchises', 'comparison tool')} puts them side by side.</p>
`,
  faqs: [
    { q: 'What does a Taco Bell franchise cost with the land?', a: `Item 7 estimates ${K.range(b)} for a new freestanding Traditional Unit, and that range already includes buying the land, at $250,000 to $1,400,000. A franchisee who leases the ground instead pays base rent that the document puts at $45,000 to $200,000 or more a year. In-Line and End-Cap units cost less.` },
    { q: 'What is the Taco Bell Period Franchise Fee?', a: `It is the royalty: ${K.rate(b.royPct)} of the unit's gross sales, due by the fifth business day after each accounting period. The Period Marketing Fee of ${K.rate(b.adPct)} is paid on the same schedule to the national advertising fund. Together they take ${K.rate(K.pctFees(b))} of sales before any cost of running the restaurant.` },
    { q: 'Does Taco Bell disclose how much its restaurants sell?', a: `Not as an average. Item 19 only reports how three forecasting tools, Bell Point, Kalibrate and SiteZeus, projected the second-year sales of ${K.num(b.i19.count!)} drive-thru units opened in 2023, and how close those projections came. Kalibrate's projections ranged from $826,707 to $3,621,383. Actual averages are never printed.` },
    { q: 'Can the Taco Bell franchise fee be waived?', a: `It can. The standard ${K.usd(b.feeLow)} for a Traditional Unit may be waived under the National Incentive Program for drive-thru units, the Urban Test program for in-lines and the De-Coupling program. In fiscal 2025 the fees actually paid ranged from $0 to $45,000 per unit, according to Item 5.` },
  ],
  related: ['compare-franchises', 'item-19-franchise-earnings', 'franchise-break-even', 'fast-food-franchise-cost'],
});
