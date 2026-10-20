import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('baskin-robbins');
const cs = K.B('cold-stone');
const dk = K.B('dunkin');
const o = (s: string) => b.i19.other.find((x) => x.label.includes(s))!.value;
const q1 = o('1st (top)');
const q4 = o('4th quartile');
const hi = o('Highest');
const lo = o('Lowest');
const e = K.eco('baskin-robbins');

export default defineBrand({
  slug: 'baskin-robbins',
  title: 'Baskin-Robbins Franchise Cost 2026: Fees by State, Sales',
  description: `Baskin-Robbins franchise cost in 2026: ${K.range(b)} for a leased shop, a ${K.usd(b.feeLow)} fee, a ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} ad fee in most states, ${K.usd(K.i19(b)!)} AUV.`,
  intro: `Baskin-Robbins is the rare brand whose royalty depends on the state you open in, and an opening incentive lowers it during the first years.`,
  resume: `A standard Baskin-Robbins shop in a leased space of about 1,100 to 1,300 square feet costs ${K.range(b)} to open, according to Item 7 of the document Baskin-Robbins Franchising LLC issued on ${K.day(b.issued)}. Of that, ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} is paid to the franchisor or an affiliate, including the ${K.usd(b.feeLow)} initial franchise fee. In most of the country the shop then pays a continuing franchise fee of ${K.rate(b.royPct)} of gross sales and a continuing advertising fee of ${K.rate(b.adPct)}, ${K.rate(K.pctFees(b))} in all, but rates are far lower in Hawaii, Alaska, the Pacific Northwest and the Central States Territory. Item 19 reports an average unit volume of ${K.usd(K.i19(b)!)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised shops open all of fiscal 2025, sales only. Every one of the ${K.num(b.units.total!)} standalone shops counted at the end of ${b.units.year} is franchised.`,
  body: (h) => `
<h2>A royalty map rather than a single rate</h2>
<p>The ${K.rate(b.royPct)} continuing franchise fee is the default. Shops in Hawaii and in the Central States Territory pay 0.5 % of gross sales instead, and shops in Alaska, Idaho, Montana, Oregon or Washington pay 1.0 %. The advertising fee follows its own map: ${K.rate(b.adPct)} in general, 3.5 % in Alaska and Hawaii, 2.5 % in the Central States Territory and for shops at special distribution outlets. The calculator uses the default rates; a buyer in one of the named states should lower them in the ${h.a('franchise-royalty-fees', 'royalty calculator')}.</p>
<h2>The opening incentive</h2>
<p>Under the Standard (Royalty) Incentive, the continuing franchise fee starts at 1.9 % in year one and climbs back to ${K.rate(b.royPct)} from year five, with a $12,500 credit, while the advertising fee is 2.5 % from opening through year three before returning to ${K.rate(b.adPct)}. The calculator shows a full-rate year; with the incentive, the early years cost less in fees. Veterans can add a $10,000 royalty credit per shop, up to $100,000. The fee itself also varies: a shop in a gas station or convenience store pays a fee pro-rated by term, $12,500 for ten years, and a combined Baskin-Robbins and Dunkin' restaurant pays $10,000 plus the Dunkin' fee. Fees actually paid in fiscal 2025 ranged from $0 to ${K.usd(b.feeHigh)}.</p>
${h.mini('roi', { t: 'Baskin-Robbins: payback at your margin', p: ['m', 'sb', 'so'], d: { b: 'baskin-robbins' } })}
<h2>A wide spread of shop sales</h2>
<p>The top quarter of reporting shops averaged ${K.usd(q1)} in 2025 and the bottom quarter ${K.usd(q4)}; the best single shop sold ${K.usd(hi)} and the weakest ${K.usd(lo)}. The sample includes 80 non-traditional shops and leaves out 1,219 combo restaurants shared with Dunkin', 41 shops that closed in 2025 and 112 closed for long periods. Starting from the average and the ${K.rate(K.P.calc.defaultMarginPct)} default margin, which you should replace with your own estimate, a shop would keep ${K.usd(e.y.cashBeforeDebt)} a year after fees.</p>
<h2>Leases with an affiliate, and the comparison</h2>
<p>When the premises are leased from an affiliate, the shop pays a fixed monthly rent and may also owe percentage rent to the franchisor, whether or not the main lease requires it; the document gives no percentage. ${h.a('brand:cold-stone', 'Cold Stone Creamery')} asks ${K.range(cs)} with ${K.rate(cs.royPct)} plus ${K.rate(cs.adPct)} and reports higher average sales. Dunkin', the partner brand of the 1,219 combo restaurants, needs ${K.range(dk)}. The network lost ${K.num(-b.units.franchisedNetChange!)} standalone shops in ${b.units.year}. The ${h.fdd('baskin-robbins')} gives the state lists in Item 6.</p>
`,
  faqs: [
    { q: 'How much does a Baskin-Robbins shop cost to open?', a: `Item 7 puts a standard leased shop of about 1,100 to 1,300 square feet at ${K.range(b)}. That includes ${K.usd(b.toFrLow!)} to ${K.usd(b.toFrHigh!)} paid to the franchisor or an affiliate, starting with the ${K.usd(b.feeLow)} initial franchise fee. A shop inside a gas station or convenience store pays a fee pro-rated by the length of its term.` },
    { q: 'Why is the Baskin-Robbins royalty lower in some states?', a: `Item 6 sets the continuing franchise fee at ${K.rate(b.royPct)} of gross sales in general but at 0.5 % in Hawaii and the Central States Territory and 1.0 % in Alaska, Idaho, Montana, Oregon and Washington. The advertising fee also drops, to 3.5 % in Alaska and Hawaii and 2.5 % in the Central States Territory. The document prints the rates without giving a reason.` },
    { q: 'What is the average Baskin-Robbins unit volume?', a: `The ${K.num(b.i19.count!)} franchised shops open all of fiscal 2025 averaged ${K.usd(K.i19(b)!)} in gross sales, with a median of ${K.usd(b.i19.median!)}. The top quarter averaged ${K.usd(q1)} and the bottom quarter ${K.usd(q4)}. Combo shops with Dunkin' are not included, and the document does not report costs or profit.` },
  ],
  related: ['brand:cold-stone', 'brand:nothing-bundt-cakes', 'franchise-royalty-fees', 'cheapest-franchises'],
});
