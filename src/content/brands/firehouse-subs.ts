import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('firehouse-subs');
const e = K.eco('firehouse-subs');
const jj = K.B('jimmy-johns');
const jm = K.B('jersey-mikes');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;

export default defineBrand({
  slug: 'firehouse-subs',
  title: 'Firehouse Subs Franchise Cost 2026: Fee, EBITDA and Payback',
  description: `Firehouse Subs franchise cost in 2026: ${K.range(b)} before real estate, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty plus ${K.rate(b.adPct)} fund, and an Item 19 with its EBITDA.`,
  intro: `Firehouse Subs is one of the few sandwich brands whose Item 19 goes past sales to restaurant-level EBITDA, and its development program pays cash toward each new restaurant opened through 2028.`,
  resume: `Firehouse of America, LLC estimates in its disclosure document of ${K.day(b.issued)} that a traditional in-line Firehouse Subs restaurant without a drive-thru costs ${K.range(b)} to open, exclusive of real estate. Of that, ${K.usd(b.toFrLow!)} is paid to the franchisor or its affiliates, starting with the ${K.usd(b.feeLow)} fee for a ten-year agreement. The royalty is ${K.rate(b.royPct)} of gross sales per accounting period and the System Fund takes ${K.rate(b.adPct)}, its ceiling. Item 19 reports average yearly sales of ${K.usd(x19)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised counter service restaurants open all of 2025, and, for 704 restaurants that sent complete profit and loss statements, an average restaurant-level EBITDA of ${K.dec(b.i19.profitPct!)} % of sales. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}.`,
  body: (h) => `
<h2>In-line counter service, real estate apart</h2>
<p>The ${K.range(b)} is for the traditional format: an in-line restaurant with no drive-thru. Land, buildings and their financing are not in it. Item 19 shows why the format matters: franchised freestanding restaurants with a drive-thru (35 of them) averaged ${K.usd(oth(/Free Standing Restaurants with Drive Thru \(/))} and end cap strip center units with a drive-thru (69) averaged ${K.usd(oth(/End Cap Strip Center Restaurants with Drive Thru \(/))}, both above the counter service figure the calculator uses.</p>
<h2>Cash back from the franchisor</h2>
<p>Under the 2026 to 2028 Development Incentive Program, the franchisor pays a cash contribution of $75,000 for each restaurant opened in that window, plus a $25,000 bonus when two or more open, and up to $150,000 under the Grow A-Gain or Accelerated Market incentives. The Veteran and First Responder program pays $100,000 per restaurant. In accelerated markets the royalty is also cut by 2 % of gross sales for three years. None of this is in the calculator, which keeps the full Item 7 range and the full ${K.rate(b.royPct)}. In the other direction, a $5,000 market introduction fee is due per new restaurant, a background check costs up to $500, a development agreement asks for $1,000 per restaurant to the Firehouse Subs Public Safety Foundation, and a deferred renovation can raise the royalty to an agreed default rate, typically up to 9 %.</p>
<h2>Fees after opening</h2>
<p>Royalty and System Fund come to ${K.rate(K.pctFees(b))} of gross sales. A special cooperative contribution of up to 4 % may be imposed, though none is charged today. The calculator adds the MIS system fee of ${K.usd(b.fixedYear)} a year; digital technology fees of $150 a month per restaurant plus 1 % of digital sales come on top. A transfer costs half of the then-current initial fee.</p>
${h.mini('roi', { t: 'Firehouse Subs: margin and investment', p: ['m', 'at'], d: { b: 'firehouse-subs', m: 15 } })}
<h2>Reading the EBITDA table</h2>
<p>The 704 restaurants with complete statements averaged ${K.usd(oth(/Average annual sales, 704/))} in sales and ${K.usd(oth(/Average restaurant-level EBITDA in dollars/))} of restaurant-level EBITDA; the median was ${K.usd(oth(/Median restaurant-level EBITDA in dollars/))}, or ${K.dec(oth(/Median restaurant-level EBITDA as %/))} %. The spread is wide: units selling over $1.2 million reached ${K.dec(oth(/sales >\$1\.2M/))} %, those under $0.8 million ${K.dec(oth(/sales <\$0\.8M/))} %. Cost of goods averaged ${K.dec(oth(/COGS/))} %, labor ${K.dec(oth(/Labor/))} % and occupancy ${K.dec(oth(/Occupancy/))} %. The document counts royalties and System Fund contributions among the "other" costs, so this EBITDA is measured after them, but before interest, depreciation, loan fees and any overhead above the restaurant. The calculator's margin field is the reverse, a figure before franchise fees: about ${K.rate(K.pctFees(b))} plus the EBITDA rate if you take the table as your guide. With the starting value of ${K.rate(K.P.calc.defaultMarginPct)}, which is only a placeholder, the middle of the range pays back in ${K.dec(e.pay!)} years. Note that 433 restaurants that did not send a full statement are not in the EBITDA group.</p>
<h2>Compared with other sub shops</h2>
<p>${h.a('brand:jimmy-johns', "Jimmy John's")} reports ${K.usd(K.i19(jj)!)} on a ${K.range(jj)} investment, and ${h.a('brand:jersey-mikes', "Jersey Mike's")} ${K.usd(K.i19(jm)!)} on ${K.range(jm)}; neither prints a profit line. Firehouse grew by ${K.num(b.units.franchisedNetChange!)} franchised restaurants in 2025. Item 19 gives 1,234 franchised restaurants at year end against ${K.num(b.units.franchised!)} in Item 20, a gap the document does not explain.</p>
`,
  faqs: [
    { q: 'How much does a Firehouse Subs franchise cost to open?', a: `The disclosure document estimates ${K.range(b)} for a traditional in-line restaurant without a drive-thru, real estate excluded. ${K.usd(b.toFrLow!)} of that is paid to the franchisor or its affiliates. Development incentives of $75,000 or more per restaurant opened from 2026 to 2028 can offset part of the cost.` },
    { q: 'Does Firehouse Subs publish profit figures in Item 19?', a: `Yes. For 704 franchised restaurants that submitted complete statements for 2025, it reports average restaurant-level EBITDA of ${K.usd(oth(/Average restaurant-level EBITDA in dollars/))}, ${K.dec(b.i19.profitPct!)} % of sales, after royalties and fund contributions but before interest, depreciation and overhead above the restaurant. Only 704 of 1,137 full-year restaurants sent complete statements.` },
    { q: 'What is the Firehouse Subs royalty and System Fund rate?', a: `The royalty is ${K.rate(b.royPct)} of gross sales per accounting period and the System Fund contribution is currently ${K.rate(b.adPct)}, its maximum. A special cooperative contribution of up to 4 % is allowed but not charged today. In accelerated markets the royalty is reduced by 2 % for three years.` },
    { q: 'What average sales does a Firehouse Subs counter service unit report?', a: `Item 19 gives ${K.usd(x19)} on average and ${K.usd(b.i19.median!)} at the median for ${K.num(b.i19.count!)} franchised counter service restaurants open all of 2025. The top quarter averaged ${K.usd(oth(/top 25%/))} and the bottom quarter ${K.usd(oth(/bottom 25%/))}. Restaurants open only part of the year, those closed in 2025 and company units are left out, and drive-thru formats are reported separately.` },
  ],
  related: ['brand:jimmy-johns', 'brand:jersey-mikes', 'item-19-franchise-earnings', 'franchise-cost'],
  toolArg: { at: 'mid' },
});
