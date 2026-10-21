import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('the-joint');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const avg = K.i19(b)!;
const e = K.eco('the-joint');
const ew = K.B('european-wax-center');
const me = K.B('massage-envy');
const yr = b.issued.slice(0, 4);

export default defineBrand({
  slug: 'the-joint',
  title: 'The Joint Chiropractic Franchise Cost: Fees and Profit',
  description: `The Joint Chiropractic franchise cost: ${K.range(b)}, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty with a monthly floor, from the ${yr} disclosure document still on file.`,
  intro: `The Joint's latest clean disclosure document on file in Minnesota dates from ${yr}, so its sales and profit figures describe ${b.i19.period}.`,
  resume: `The Joint Corp. estimates ${K.range(b)} to open one chiropractic clinic of 1,000 to 1,400 square feet in leased space, in the disclosure document issued ${K.day(b.issued)}, the most recent clean version on file with Minnesota. Only ${K.usd(b.toFrLow!)} goes to the franchisor: the ${K.usd(b.feeLow)} franchise fee and a $1,000 design fee. After opening, the clinic pays a royalty of ${K.rate(b.royPct)} of gross sales or $700 a month, whichever is greater, a brand fund fee of ${K.rate(b.adPct)} that may rise to ${K.rate(b.adPctHigh)}, and a technology fee counted here at ${K.usd(b.fixedYear)} a year. It must also spend at least 5 % of sales, or $3,000 a month, on local advertising. Item 19 reports average gross sales of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised clinics in ${b.i19.period}, and an average net profit of ${K.rate(b.i19.profitPct)} for the 330 clinics that sent a profit and loss statement.`,
  body: (h) => `
<h2>A ${yr} document, ${b.i19.period} figures</h2>
<p>No newer clean disclosure document for The Joint was on file in Minnesota when this page was written, so every figure here comes from the edition of ${K.day(b.issued)}. Its sales and profit tables describe ${b.i19.period}, and Item 20 stops at the end of ${b.units.year}. A buyer today should ask the franchisor for its current document and check whether the fees below have changed.</p>
<h2>Who owns the clinic</h2>
<p>Some states do not let a non-chiropractor own a chiropractic practice. There, the franchisee runs a Managed Clinic: a professional corporation owns the practice and employs the chiropractors, and the franchisee manages the business for it. Elsewhere the franchisee owns a Franchised Clinic directly. The Item 7 range of ${K.range(b)} applies to both.</p>
<h2>Fee discounts and the royalty floor</h2>
<p>The ${K.usd(b.feeLow)} fee drops by $6,000 for veterans, by $10,000 for each additional clinic, and by $19,900 under the DC Path to Ownership program, which brings it to $20,000; the discounts cannot be combined. The royalty is ${K.rate(b.royPct)} of gross sales with a $700 monthly minimum, paid on the 1st and 16th. The minimum starts 30 days after the earlier of the required opening date and the actual opening, and a clinic that opens late is charged an imputed royalty of $700 a month. The technology fee is $599 a month today and can go to $799 on 30 days' notice.</p>
<h2>Advertising adds up</h2>
<p>Three advertising lines apply: the brand fund at ${K.rate(b.adPct)} (up to ${K.rate(b.adPctHigh)}), a local advertising commitment of the greater of 5 % of sales or $3,000 a month spent with outside vendors, and $20,000 to $25,000 of grand opening advertising. Royalty and marketing therefore take at least 14 % of sales. The calculator counts the royalty, the brand fund and the technology fee; the local spend is an operating cost, so it belongs in the margin you type. At the default ${K.rate(K.P.calc.defaultMarginPct)}, the middle of the range gives ${K.usd(e.y.cashBeforeDebt)} a year before any loan.</p>
${h.mini('roi', { t: 'The Joint: payback with your own margin', p: ['m', 'at', 'lf'], d: { b: 'the-joint' } })}
<h2>Profit by clinic size</h2>
<p>Item 19 shows wide spreads. The top quarter of clinics averaged ${K.usd(o('Quartile 1'))} in sales and the bottom quarter ${K.usd(o('Quartile 4 (174'))}; 304 of ${K.num(b.i19.count!)}, 44 %, reached the average. The 330 clinics with a profit and loss statement averaged ${K.usd(o('330 franchised clinics with P&L'))} in sales and ${K.usd(o('Average Net Profit (dollar amount), 330'))} in net profit, ${K.rate(b.i19.profitPct)}, with labor at ${K.rate(o('Labor Expense'))} and facilities at ${K.rate(o('Facilities'))}. That profit leaves out the owner's pay and an operations manager. Clinics above $1 million earned ${K.rate(o('as % of Gross Sales, $1 Million'))} on average, while the bottom quarter lost ${K.rate(-o('Quartile 4 (83'))} of sales. The document says one of these tables covers 29 clinics, yet it lists 27.</p>
<h2>Units and nearby categories</h2>
<p>At the end of ${b.units.year} the system had ${K.num(b.units.franchised!)} franchised clinics, ${K.num(b.units.franchisedNetChange!)} more than a year before, and ${K.num(b.units.company!)} company clinics. In beauty and wellness, ${h.a('brand:european-wax-center', 'European Wax Center')} estimates ${K.range(ew)} and Massage Envy ${K.range(me)}, both with larger average sales.</p>
`,
  faqs: [
    { q: 'What is the minimum royalty at The Joint Chiropractic?', a: `The royalty is the greater of ${K.rate(b.royPct)} of gross sales or $700 a month, paid twice monthly. The minimum begins 30 days after the earlier of the required opening date or the actual opening. If the clinic opens after its required date, The Joint charges an imputed royalty of $700 a month for the delay.` },
    { q: 'Can a non-chiropractor own The Joint franchise?', a: `Yes, with a structure that depends on the state. Where the law requires it, the franchisee operates a Managed Clinic: a professional corporation owns the chiropractic practice and employs the chiropractors, and the franchisee manages the business side. In other states the franchisee owns a Franchised Clinic. Item 7 gives the same range of ${K.range(b)} for both.` },
    { q: 'How much do The Joint clinics spend on advertising?', a: `The brand fund takes ${K.rate(b.adPct)} of gross sales, with a ceiling of ${K.rate(b.adPctHigh)}. On top, each clinic must spend the greater of 5 % of sales or $3,000 a month on local advertising, and $20,000 to $25,000 on its grand opening. Added to the ${K.rate(b.royPct)} royalty, that is at least 14 % of sales.` },
    { q: 'Why are The Joint figures from an older disclosure document?', a: `The most recent clean document on file in Minnesota is the one issued ${K.day(b.issued)}. Its Item 19 covers ${b.i19.period} and its Item 20 ends with ${b.units.year}. Fees, the investment range and the clinic count may have changed since, so the current document from the franchisor is the one to compare against.` },
  ],
  related: ['brand:european-wax-center', 'brand:great-clips', 'franchise-disclosure-document', 'franchise-royalty-fees'],
});
