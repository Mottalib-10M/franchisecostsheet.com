import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { getTool } from '../../lib/tool-specs';
import type { Category } from '../../lib/brand-types';

const F = K.P.finance;
const prime = F.primeRate;
const LF = Number(getTool('breakeven').inputs.find((i) => i.id === 'lf')!.def);
const capFor = (amt: number) => prime + (F.sbaSpreads.find((s) => s.upTo === null || amt <= s.upTo) ?? F.sbaSpreads[F.sbaSpreads.length - 1]).spread;
const pay = (amt: number, years: number, rate = capFor(amt)) => K.loanPayment({ principal: amt, ratePct: rate, years });
const n = K.BRANDS.length;
const medMid = K.median(K.BRANDS.map((b) => K.invAt(b, 'mid')));
const medLowInv = K.median(K.BRANDS.map((b) => b.invLow));
const medHighInv = K.median(K.BRANDS.map((b) => b.invHigh));
const typical = Math.round((medMid * LF) / 100 / 1000) * 1000;
const tY = F.sbaMaxYearsEquipment;
const rY = F.sbaMaxYearsRealEstate;
const tPay = pay(typical, tY);
const rPay = pay(typical, rY);
const upPay = pay(typical, tY, capFor(typical) + 1);
const tiers = F.sbaSpreads.map((s, i) => {
  const from = i === 0 ? 0 : F.sbaSpreads[i - 1].upTo!;
  const label = s.upTo === null ? `Over ${K.usd(from)}` : i === 0 ? `Up to ${K.usd(s.upTo)}` : `${K.usd(from + 1)} to ${K.usd(s.upTo)}`;
  return [label, `prime + ${K.dec(s.spread, 2)} points`, K.rate(prime + s.spread)];
});
const cats = (Object.keys(K.CATS) as Category[]).map((c) => ({ c, list: K.inCat(c) })).filter((g) => g.list.length >= 2).map((g) => {
  const mid = K.median(g.list.map((b) => K.invAt(b, 'mid')));
  const amt = (mid * LF) / 100;
  const s = K.catSales(g.c).median;
  return { ...g, mid, amt, yr: pay(amt, tY), s };
}).sort((a, b) => a.mid - b.mid);
const cheapCat = cats[0];
const dearCat = cats[cats.length - 1];
const smallTier = F.sbaSpreads[0];
const bigFrom = K.usd(F.sbaSpreads[F.sbaSpreads.length - 2].upTo!);

export default defineGuide({
  id: 'franchise-loan',
  group: 'money',
  order: 21,
  slug: 'franchise-loan',
  nav: 'Franchise loan',
  card: 'SBA 7(a) rate ceilings and terms at today\'s prime rate, and the monthly payment on a typical franchise investment.',
  title: 'Franchise Loan 2026: SBA 7(a) Rate Caps, Terms and Payments',
  description: `Franchise loan in 2026: SBA 7(a) rate ceilings at prime ${K.rate(prime)} plus ${K.dec(F.sbaSpreadOver350k, 1)} to ${K.dec(smallTier.spread, 1)} points, terms of ${tY} or ${rY} years, and the monthly payment on a typical franchise.`,
  h1: 'Franchise loans: SBA 7(a) rates, terms and what the monthly payment does to a unit',
  intro: `The calculator starts from ${LF} % of the median middle Item 7 investment of the brands on this site, at the SBA 7(a) ceiling for that amount; change the amount, the rate or the term.`,
  resume: `Many franchise buyers in the United States borrow part of the investment, and the SBA 7(a) program is the federal frame for such loans. The SBA does not lend itself; it guarantees part of a loan made by a lender and caps the interest rate. On a variable loan above ${bigFrom}, the cap is the prime rate plus ${K.dec(F.sbaSpreadOver350k, 1)} points, ${K.rate(prime + F.sbaSpreadOver350k)} with prime at ${K.rate(prime)} on ${K.day(F.primeRateDate)}; smaller loans may carry up to ${K.dec(smallTier.spread, 1)} points over prime. Terms run up to ${tY} years for equipment and working capital and ${rY} years when real estate is financed. Borrowing ${LF} % of the median middle Item 7 investment of the ${n} brands here, about ${K.usd(typical)}, costs ${K.usd(tPay / 12)} a month over ${tY} years at the ceiling, or ${K.usd(rPay / 12)} over ${rY} years. Those payments come before the owner earns anything.`,
  body: (h) => `
<h2>The rate ceilings in 2026</h2>
<p>A 7(a) loan is made by a participating lender and carries a partial guarantee from the ${h.src('sba_terms', 'Small Business Administration')}, which also limits what the lender may charge. On a variable rate loan the ceiling is a base rate plus a spread that shrinks as the loan grows. The base used on this page is the prime rate published by the Federal Reserve in its ${h.src('fed_h15', 'H.15 release')}, ${K.rate(prime)} on ${K.day(F.primeRateDate)}. The table gives the resulting maximum for each loan size. A lender may charge less; the ceiling is a limit, not a quote. Fixed rate loans have their own ceilings, and the guarantee fee and any lender fees come on top of the rate.</p>
${h.table(['Loan amount', 'Maximum spread', 'Maximum rate today'], tiers, `SBA 7(a) variable rate ceilings, prime rate of ${K.day(F.primeRateDate)}.`, ['l', 'l', 'r'])}
<p>Because the rate is variable, the payment moves with prime. On ${K.usd(typical)} over ${tY} years, one more point of prime raises the yearly payment from ${K.usd(tPay)} to ${K.usd(upPay)}, ${K.usd(upPay - tPay)} more each year for the same unit and the same sales. The calculator assumes a fixed rate for the whole term, which is a simplification worth keeping in mind. The reverse also holds: a fall in prime lowers the payment without any negotiation, which a fixed rate loan would not do.</p>
<h2>Terms: ${tY} years or ${rY}</h2>
<p>The SBA sets maximum maturities by use of the money. Equipment, build-out and working capital are usually financed over ${tY} years at most; land and buildings over up to ${rY}. A franchise whose Item 7 includes buying the site, as some burger and chicken brands do, can therefore spread part of the debt much further, while a leased storefront sandwich shop is financed almost entirely on the shorter term. On ${K.usd(typical)}, the ${rY}-year payment is ${K.pct(1 - rPay / tPay, 0)} lower than the ${tY}-year one, but the total interest paid is far higher. A loan that mixes real estate and equipment usually gets a blended term.</p>
${h.mini('loan', { t: 'Your loan at the SBA ceiling', p: ['amt', 'ly'], d: { amt: Math.round((K.median(K.BRANDS.map((b) => b.invLow)) * LF) / 100 / 1000) * 1000, lr: capFor((medLowInv * LF) / 100), ly: tY } })}
<h2>What the payment means for a unit, category by category</h2>
<p>The table borrows ${LF} % of the median middle Item 7 investment of each category and repays it over ${tY} years at the SBA ceiling for that amount. The last column compares the yearly payment with the category's median Item 19 sales where at least ${K.P.calc.minBrandsForCategoryMedian} brands publish one. ${K.CATS[cheapCat.c].label} are the least capital-hungry here, with a yearly payment of ${K.usd(cheapCat.yr)}; ${K.CATS[dearCat.c].label.toLowerCase()} the most, at ${K.usd(dearCat.yr)}. Set the last column against a margin of ${K.P.calc.defaultMarginPct} % before fees, from which the royalty and the ad fund must also come, and the weight of the debt is plain; the ${h.a('franchise-break-even', 'break-even page')} compares each brand's Item 19 sales with the sales such a loan requires.</p>
${h.table(['Category', 'Investment, median middle', `Borrowed (${LF} %)`, 'Monthly payment', 'Yearly payment / median Item 19 sales'], cats.map((g) => [K.CATS[g.c].label, K.usd(g.mid), K.usd(g.amt), K.usd(g.yr / 12), g.s === null ? 'too few published' : K.pct(g.yr / g.s, 1)]), `Repayment over ${tY} years at the SBA 7(a) ceiling for each amount, prime of ${K.day(F.primeRateDate)}.`, ['l', 'r', 'r', 'r', 'r'])}
<h2>What the disclosure document says about financing</h2>
<p>Item 10 of each document states whether the franchisor or an affiliate offers financing, on what terms, and what happens on default. This site does not record Item 10, so read it in each document before assuming the franchisor offers nothing. Some documents print, in Item 5 or Item 6, incentives that work like financing: Jack in the Box describes a $150,000 interest-free loan per new restaurant under a development program, repaid by crediting royalties, and Firehouse Subs pays cash contributions per new restaurant opened in 2026 to 2028. Others restrict it: Bojangles requires the equipment of a first restaurant to be paid in full, and Culver's requires 20 % of the projected investment in cash or liquid assets. Item 7 also tells you how much working capital to hold back; a loan that covers the build-out but leaves no cash for the first months is a common way to fail.</p>
<h2>Before you sign a loan</h2>
<p>A lender looks at the same disclosure document you do: Item 7 for the budget, Item 19 for the sales a unit might reach, Item 20 for closures and Item 21 for the franchisor's own strength. Expect to put in equity of your own, to sign a personal guarantee and pledge collateral, and to show a business plan built on figures you can defend. Ask for the full cost of the loan, fees included, and run the payment through the calculator at a rate one or two points higher than today's. The ${h.a('franchise-cost', 'franchise cost page')} gives each brand's investment range to start from, and this site sends no one to any lender.</p>
`,
  faqs: [
    { q: 'What interest rate does an SBA 7(a) franchise loan carry in 2026?', a: `The SBA caps it rather than setting it. On a variable loan above ${bigFrom} the ceiling is prime plus ${K.dec(F.sbaSpreadOver350k, 1)} points, ${K.rate(prime + F.sbaSpreadOver350k)} with prime at ${K.rate(prime)} on ${K.day(F.primeRateDate)}. Smaller loans allow higher spreads, up to ${K.dec(smallTier.spread, 1)} points over prime. A lender may charge less, and the rate moves when prime moves.` },
    { q: 'How long can a franchise loan last?', a: `Under the SBA 7(a) program, up to ${tY} years for equipment, build-out and working capital, and up to ${rY} years for land and buildings. A longer term lowers the monthly payment but raises the interest paid in total. A unit in leased premises has no real estate to finance, so its loan falls under the shorter term.` },
    { q: 'What is the monthly payment on a franchise loan?', a: `It depends on the amount, the rate and the term. Borrowing ${K.usd(typical)}, about ${LF} % of the median middle investment of the brands read here, costs ${K.usd(tPay / 12)} a month over ${tY} years at the SBA ceiling of ${K.rate(capFor(typical))}, or ${K.usd(rPay / 12)} over ${rY} years. The calculator gives the figure for any amount.` },
    { q: 'Does the franchisor lend money to buy a franchise?', a: 'Rarely. Item 10 of the disclosure document says whether the franchisor or an affiliate offers financing and on what terms; read it in the document of each brand. Some brands give incentives that work like financing, such as royalty credits or cash contributions for new units, described in Item 5 or in the notes of Item 6.' },
  ],
  tool: 'loan',
  toolArg: { amt: typical, lr: capFor(typical), ly: tY },
  related: ['franchise-break-even', 'franchise-cost', 'cheapest-franchises', 'franchise-for-sale'],
  sources: ['sba_terms', 'fed_h15', 'ftc_436_5'],
});
