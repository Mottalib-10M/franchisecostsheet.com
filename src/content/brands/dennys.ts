import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('dennys');
const ih = K.B('ihop');
const gc = K.B('golden-corral');
const o = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const y24 = o('2024');
const y23 = o('2023');
const sss = o('Same store');
const hi = o('Highest');
const lo = o('Lowest');
const e = K.eco('dennys');

export default defineBrand({
  slug: 'dennys',
  title: "Denny's Franchise Cost 2026: Diner 2.0, Fees and Net Sales",
  description: `Denny's franchise cost in 2026: ${K.range(b)} for a Diner 2.0, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} brand fee and ${K.usd(K.i19(b)!)} in average sales.`,
  intro: `Denny's prints three years of average sales, a falling same store figure and a lease from its own affiliate for restaurants bought from the company.`,
  resume: `Item 7 of the Denny's disclosure document, issued ${K.day(b.issued)} and amended ${K.day(b.amended!)}, estimates ${K.range(b)} to open a traditional Denny's Diner 2.0 of about 4,200 square feet and 150 seats. The document prints the range to the cent, $1,618,574.75 to $3,055,924.75, and leaves land out: real estate may add $300,000 to $1,500,000 or more. Payments to the franchisor total ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)}, made of the ${K.usd(b.feeLow)} franchise fee and a new restaurant opening fee of up to $45,000. A standard restaurant without a development incentive pays a ${K.rate(b.royPct)} royalty and a ${K.rate(b.adPct)} Brand Building Fee on gross sales every week. Item 19 shows average net sales of ${K.usd(K.i19(b)!)} for ${K.num(b.i19.count!)} franchised restaurants open all of fiscal 2025, a 53-week year, with a median of ${K.usd(b.i19.median!)}. Item 20 counts ${K.num(b.units.total!)} restaurants at the end of ${b.units.year}.`,
  body: (h) => `
<h2>Fees: the standard case and the exceptions</h2>
<p>The ${K.rate(b.royPct)} royalty applies to a standard restaurant without a development incentive and to a Denny's inside a travel center. Item 6 prints the royalty as a range up to ${K.rate(b.royPctHigh)}, and the document names The Den by Denny's at 7 %; it also lets the franchisor charge a temporarily higher royalty during a month-to-month lease transition. Developers under the IGP Development Agreement pay a $5,000 deposit and receive a $75,000 development incentive per restaurant plus a 2 % royalty reduction for up to five years or $225,000. Other entry points cost less: The Den carries a $10,000 fee and the Scrape and Rebuild program none. Fixed bills include a $125 monthly Xenial software subscription, the only one the calculator counts, a $55 weekly technology platform fee, DINE software at $48.65 a month and menus at $500 to $850, reprinted twice a year.</p>
${h.mini('roi', { t: "Denny's: test your own margin", p: ['m', 'at'], d: { b: 'dennys', at: 'low' } })}
<h2>Rent paid to an affiliate</h2>
<p>A restaurant previously owned and run by Denny's, Inc., the franchisor's affiliate, comes with a sublease from that affiliate. Minimum weekly rent ranges from $710 to $6,790 or more, and a percentage rent based on gross sales is added on top; the lease form leaves that percentage blank, so the document does not tell you the rate. The affiliate also keeps 75 % of any sub-sublease rent above what it charges. The document adds that the company is selling its own restaurants, which are the ones that come with this sublease. The calculator counts none of this rent: fold it into the margin you enter.</p>
<h2>Three years of net sales</h2>
<p>Average net sales of franchised restaurants open the full year went from ${K.usd(y23)} in 2023 to ${K.usd(y24)} in 2024 and ${K.usd(K.i19(b)!)} in 2025, while the number of restaurants in the sample fell. The 2025 figure covers 53 weeks against 52 the year before, and same store sales for restaurants open at least 18 months moved by ${K.dec(sss)} % in 2025. The highest restaurant sold ${K.usd(hi)}, the lowest ${K.usd(lo)}. At the ${K.rate(K.P.calc.defaultMarginPct)} margin preset in the calculator, which is a placeholder for your own estimate, the average leaves ${K.usd(e.y.cashBeforeDebt)} a year after fees and before any loan.</p>
<h2>Shrinking count, compared with IHOP</h2>
<p>Franchised restaurants fell by ${K.num(-b.units.franchisedNetChange!)} in ${b.units.year}, to ${K.num(b.units.franchised!)}. ${h.a('brand:ihop', 'IHOP')} lost fewer franchised units and asks ${K.range(ih)} with ${K.rate(ih.royPct)} plus ${K.rate(ih.adPct)}; Golden Corral needs ${K.range(gc)}. Among the sit-down brands on this site, Denny's has the lowest Item 7 range. The ${h.fdd('dennys')} is ${K.num(b.pages)} pages long.</p>
`,
  faqs: [
    { q: "How much does a Denny's Diner 2.0 cost to open?", a: `Item 7 estimates ${K.range(b)} for a traditional Diner 2.0 restaurant of about 4,200 square feet, printed to the cent in the document. Land is extra, at $300,000 to $1,500,000 or more according to the document. The total includes ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} paid to Denny's for the franchise fee and the opening team.` },
    { q: "What royalty rate does Denny's charge in 2026?", a: `A standard Denny's without a development incentive, or one inside a travel center, pays ${K.rate(b.royPct)} of weekly gross sales plus a ${K.rate(b.adPct)} Brand Building Fee. The Den by Denny's pays 7 %. Developers in the IGP program get a 2 % royalty reduction for up to five years or $225,000, and local co-ops may add their own fee.` },
    { q: "Are Denny's restaurant sales growing?", a: `Average net sales rose from ${K.usd(y23)} in 2023 to ${K.usd(K.i19(b)!)} in 2025 for franchised restaurants open the whole year, but 2025 had 53 weeks. Same store sales for restaurants open 18 months or more changed by ${K.dec(sss)} % in 2025, and the number of franchised restaurants fell by ${K.num(-b.units.franchisedNetChange!)}.` },
    { q: "Do Denny's franchisees rent from the franchisor?", a: `Those who take over a restaurant previously run by the affiliate Denny's, Inc. must sign a sublease with it. The minimum weekly rent ranges from $710 to $6,790 or more, plus a percentage rent on gross sales whose rate is blank in the lease form printed in the document. The affiliate also keeps 75 % of any sub-sublease rent above its own.` },
  ],
  related: ['brand:ihop', 'brand:applebees', 'franchise-break-even', 'cheapest-franchises'],
});
