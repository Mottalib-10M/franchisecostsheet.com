import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('mathnasium');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const avg = K.i19(b)!;
const e = K.eco('mathnasium');
const gd = K.B('goddard-school');
const pr = K.B('primrose');

export default defineBrand({
  slug: 'mathnasium',
  title: 'Mathnasium Franchise Cost 2026: Fixed Fees and Item 19',
  description: `Mathnasium franchise cost in 2026: ${K.range(b)} for a first center, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty plus monthly fixed fees, and ${K.usd(avg)} average receipts.`,
  intro: `Mathnasium is cheap to open and costly to run: on top of a ${K.rate(b.royPct)} royalty, a center pays fixed monthly fees whatever it takes in.`,
  resume: `Mathnasium Franchisor LLC estimates ${K.range(b)} to open a first learning center of 1,200 to 1,600 square feet in leased space, in the disclosure document issued ${K.day(b.issued)}. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to the franchisor, mostly the ${K.usd(b.feeLow)} franchise fee paid in full at signing. The running costs are what set this brand apart: a royalty of ${K.rate(b.royPct)} of gross receipts, with a $1,500 monthly minimum from the 24th month, a marketing fee of $250 a month plus ${K.rate(b.adPct)}, and fixed charges that this site counts at ${K.usd(b.fixedYear)} a year (${b.fixedNote}). Item 19 reports average gross receipts of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised centers in ${b.i19.period}, with an operating profit printed before any owner or manager salary. Item 20 counts ${K.num(b.units.total!)} U.S. centers at the end of ${b.units.year}, ${K.num(b.units.franchisedNetChange!)} more than a year earlier.`,
  body: (h) => `
<h2>A small build-out</h2>
<p>A center is a leased storefront with tables, not a kitchen or a service bay, which keeps Item 7 low: ${K.range(b)} for a first center. The franchise fee is the largest single payment to the franchisor. Discounts exist: 25 % off the first center's fee for veterans, active-duty service members and qualifying educators; $26,500 for an additional franchise or for an eligible center director, of which $15,000 may be financed at 10 %; $7,000 for a buyer taking over an existing center. Pre-opening advertising adds $5,500.</p>
<h2>The monthly bill, line by line</h2>
<p>Item 6 stacks percentages and dollar amounts. The royalty is ${K.rate(b.royPct)} of gross receipts, and from the 24th month it can never be less than $1,500 a month. A base royalty of $650 a month starts six months after signing, whether the center is open or not. The marketing fee is $250 a month plus ${K.rate(b.adPct)} of receipts. A digital and local marketing fee of at least $1,000 a month is paid to the franchisor and credited against a local advertising requirement of $6,000 every three months. The technology license is $266 a month. Every fixed dollar amount can rise each year by 3 % or by inflation, whichever is greater. The calculator counts ${K.usd(b.fixedYear)} of these fixed fees a year; on the Item 19 average, total payments to the franchisor come to ${K.usd(e.y.toFranchisor)}, close to the ${K.usd(o('Average Royalties & Marketing Fees paid'))} Item 19 says centers actually paid on average, ${K.rate(o('Average Royalties & Marketing Fees as %'))} of receipts.</p>
<h2>What the operating profit leaves out</h2>
<p>Item 19 is detailed. The top quarter of centers averaged ${K.usd(o('top quartile'))} in receipts and the bottom quarter ${K.usd(o('bottom quartile'))}; only 39 % reached the average. Average operating profit was ${K.usd(o('Average Operating Profit (dollar'))}, or ${K.rate(b.i19.profitPct)} of receipts, and the median ${K.usd(o('Median Operating Profit (dollar'))}. Those figures are after royalties, marketing fees and an average rent of ${K.usd(o('Average Rent'))}, but before any salary, draw or benefits for the owner, a center director or other managers: instructor payroll covers hourly tutors only. Whoever runs the center is paid out of that profit. The calculator works differently: its margin is before franchise fees, and the default ${K.rate(K.P.calc.defaultMarginPct)} is only a starting value for your own estimate. At that setting the average center would not cover its fees (${K.usd(e.y.cashBeforeDebt)} a year), which shows how much the fixed charges weigh on a small center.</p>
${h.mini('roi', { t: 'Mathnasium: margin before fees and sales needed', p: ['m', 'sb', 'so'], d: { b: 'mathnasium' } })}
<h2>Incentive for a second center, to come until December 31, 2026</h2>
<p>An existing franchisee who signs for an additional center in the same territory by December 31, 2026 pays no franchise fee and may have up to $1,500 a month of royalty waived for twelve months. Transfers cost $7,000, plus $3,000 of training paid by the buyer.</p>
<h2>Against other education brands</h2>
<p>${h.a('brand:goddard-school', 'The Goddard School')} is a different scale of business: ${K.range(gd)} to open and ${K.usd(K.i19(gd)!)} in average yearly revenue. Primrose Schools estimates ${K.range(pr)} for a new school without land. The fixed yearly fees this site counts are ${K.usd(gd.fixedYear)} at Goddard and ${K.usd(pr.fixedYear)} at Primrose, against ${K.usd(b.fixedYear)} here, on far smaller revenue.</p>
`,
  faqs: [
    { q: 'What monthly fixed fees does a Mathnasium center pay?', a: `Item 6 lists a base royalty of $650, the $250 fixed part of the marketing fee, a digital and local marketing fee of at least $1,000 and a technology license of $266, each per month. That is ${K.usd(b.fixedYear)} a year before any percentage fee, and each amount can rise yearly by 3 % or inflation, whichever is greater.` },
    { q: 'Is there a minimum royalty at Mathnasium?', a: `Yes. The royalty is ${K.rate(b.royPct)} of monthly gross receipts, and beginning in the 24th month of operation it is the greater of that percentage or $1,500 a month. The $650 monthly base royalty is charged on top, so a center taking in less than $15,000 a month still pays at least $2,150 in royalties from its second year.` },
    { q: 'Does the Mathnasium operating profit in Item 19 include the owner salary?', a: `No. The average operating profit of ${K.usd(o('Average Operating Profit (dollar'))}, ${K.rate(b.i19.profitPct)} of receipts, excludes the owner's salary or draw and the pay, bonuses and benefits of managers, including a center director. It is after royalties, marketing fees and rent. An owner who hires a director to run the center pays that salary from this profit.` },
    { q: 'How much do Mathnasium centers in the bottom quarter take in?', a: `Item 19 for ${b.i19.period} puts the bottom quarter of the ${K.num(b.i19.count!)} centers at average gross receipts of ${K.usd(o('bottom quartile'))}, against ${K.usd(o('top quartile'))} for the top quarter. At the bottom figure, the fixed monthly fees and the $1,500 minimum royalty take a much larger share of revenue than at the average of ${K.usd(avg)}.` },
  ],
  related: ['brand:goddard-school', 'cheapest-franchises', 'franchise-royalty-fees', 'franchise-break-even'],
});
