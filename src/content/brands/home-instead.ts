import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('home-instead');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const avg = K.i19(b)!;
const va = K.B('visiting-angels');

export default defineBrand({
  slug: 'home-instead',
  title: 'Home Instead Franchise Cost 2026: Fees and Mature Offices',
  description: `Home Instead franchise cost in 2026: ${K.range(b)} for a non-medical home care office, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} fund and ${K.usd(avg)} average sales.`,
  intro: `Home Instead's average sales come mostly from offices that have run their territory for more than twenty years, which a new owner does not have.`,
  resume: `Home Instead, Inc. estimates ${K.range(b)} to open one non-medical home care office serving a protected area of about 10,000 people aged 65 or older, in the disclosure document issued ${K.day(b.issued)}. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} goes to the franchisor: the ${K.usd(b.feeLow)} initial franchise fee, which covers training for two people, and any extra trainee. The office then pays a royalty of ${K.rate(b.royPct)} and a marketing fund contribution of ${K.rate(b.adPct)} of gross sales, plus a technology fee counted here at ${K.usd(b.fixedYear)} a year. Item 19 reports average gross sales of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised businesses open all of ${b.units.year}, without any cost figure. Item 20 counts ${K.num(b.units.total!)} offices at year end, ${K.num(b.units.franchisedNetChange!)} more franchised ones than a year earlier.`,
  body: (h) => `
<h2>An office, not a storefront</h2>
<p>A Home Instead business sells hours of non-medical care delivered in clients' homes. The investment buys an office, its systems, training and the working capital needed to pay caregivers before clients pay their invoices, which explains why the high end of the range, ${K.usd(b.invHigh)}, is several times the low end. The territory is defined by population: about 10,000 people aged 65 and over.</p>
<h2>The fee and its exceptions</h2>
<p>The ${K.usd(b.feeLow)} fee is due at signing. Honorably discharged veterans who do not already own a Home Instead franchise get 20 % off, a fee of $43,200. A candidate can reserve a market with an optional $27,000 deposit, of which $24,300 is refunded if the candidate withdraws within 90 days. The fee covers two trainees; each extra person costs $2,250. The document reports that franchisees actually paid between $0 and ${K.usd(b.feeLow)} in 2025. A transfer costs $25,000, a minority ownership change $9,000.</p>
<h2>Fees taken on billed hours</h2>
<p>The ${K.rate(b.royPct)} royalty is collected on the 15th and the last day of each month, and ${K.rate(b.adPct)} of monthly gross sales goes to the marketing fund. The technology fee is $500 a month and may not rise by more than 25 % in a calendar year. Required systems cost $177 to $1,861 a month, up to $3,457 in a month when annual licenses are billed, and the franchisor may add an administrative fee of up to 10 % on contracts it negotiates for the network. Owners that are institutions may have to post an escrow or a letter of credit equal to 3 % of the previous twelve months' gross revenue, or up to $65,000 for a new business.</p>
${h.mini('breakeven', { t: 'Home Instead: sales needed to cover fees and a loan', p: ['m', 'lf', 'lr'], d: { b: 'home-instead' } })}
<h2>Reading the Item 19 average</h2>
<p>Gross sales ran from ${K.usd(o('Lowest'))} to ${K.usd(o('Highest'))}; 242 of the ${K.num(b.i19.count!)} businesses, 39 %, beat the average. The average office served ${K.num(o('Average Client Hours'))} client hours in the year, the median ${K.num(o('Median Client Hours'))}. The population is old: ${K.rate(o('26+ years'))} of the businesses have held their territory for 26 years or more and 31.6 % for 21 to 25 years, while only 14 have one or two years. The document states that these figures say nothing about cost of sales or operating expenses, and caregiver wages are the main cost of this business. The calculator applies your margin to the average, ${K.rate(K.P.calc.defaultMarginPct)} by default; on a mature office's sales, a small change in that figure moves the result by tens of thousands of dollars, so the margin you type, and the sales a new office can reach, matter more than any figure printed here.</p>
<h2>Ownership, a care platform and pending suits</h2>
<p>The franchisor is owned by Honor Technology, Inc. Some existing franchisees run on Honor's Care Platform, under which Honor or its affiliates recruit and employ caregivers, manage care and bill clients, for a payment to Honor. Item 3 reports lawsuits by franchisees, still pending, over early renewal rights under a settlement of March 2024. Visiting Angels, the other senior care brand on this site, estimates ${K.range(va)} with a ${K.usd(va.feeLow)} fee and ${K.rate(va.royPct)} royalty, and publishes no average sales figure.</p>
`,
  faqs: [
    { q: 'How long have most Home Instead franchisees owned their territory?', a: `Item 19 shows that ${K.rate(o('26+ years'))} of the ${K.num(b.i19.count!)} businesses in the ${b.units.year} sales table have held their territory for 26 years or more and 31.6 % for 21 to 25 years. Only 14 had one to two years. The average of ${K.usd(avg)} therefore describes long-established offices, not a newly opened one.` },
    { q: 'Does Home Instead offer a veterans discount on the franchise fee?', a: `Yes. Under VetFran, honorably discharged U.S. veterans who do not already own a Home Instead franchise get 20 % off the ${K.usd(b.feeLow)} initial fee, which brings it to $43,200. The fee covers training for two people; an additional trainee costs $2,250. An optional $27,000 deposit can reserve a market before signing.` },
    { q: 'What is the Honor Care Platform in the Home Instead disclosure document?', a: `Home Instead, Inc. is owned by Honor Technology, Inc. Some existing franchisees operate under Honor's Care Platform: Honor or its affiliates recruit and employ the caregivers, manage care and bill clients, and the franchisee pays Honor for it. The document describes it for existing franchisees; its cost is not part of the ${K.range(b)} estimate.` },
  ],
  related: ['franchise-cost', 'item-19-franchise-earnings', 'cheapest-franchises', 'franchise-break-even'],
});
