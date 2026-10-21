import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('take-5');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const avg = K.i19(b)!;
const y1 = o('Average Year 1');
const e = K.eco('take-5');
const va = K.B('valvoline');
const jl = K.B('jiffy-lube');

export default defineBrand({
  slug: 'take-5',
  title: 'Take 5 Oil Change Franchise Cost: Supplies and EBITDA',
  description: `Take 5 Oil Change franchise cost, 2025 FDD: ${K.range(b)} for a ground-up center without real estate, ${K.rate(b.royPct)} royalty, ${K.rate(b.adPct)} marketing, ${K.usd(avg)} sales.`,
  intro: `Take 5's current document is the June ${b.issued.slice(0, 4)} edition amended in December, so its sales and unit figures stop at fiscal ${b.units.year}.`,
  resume: `Take 5 Franchisor SPV LLC estimates ${K.range(b)} to open a new ground-up Take 5 Oil Change center on a ground lease, real estate costs excluded, in the disclosure document issued ${K.day(b.issued)} and amended ${K.day(b.amended!)}. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} of that goes to Take 5 or its affiliates: the ${K.usd(b.feeLow)} franchise fee, a $20,000 grand opening contribution, a $3,000 software installation fee, and the equipment package and opening inventory, which must be bought from them. The center then pays a royalty of ${K.rate(b.royPct)} and marketing fund contributions of ${K.rate(b.adPct)} of gross sales every week. Item 19 reports average gross sales of ${K.usd(avg)} and a median of ${K.usd(b.i19.median!)} for ${K.num(b.i19.count!)} franchised centers open at least a full year in the ${b.i19.period}. Item 20 counts ${K.num(b.units.total!)} centers at the end of fiscal ${b.units.year}, of which ${K.num(b.units.company!)} run by an affiliate.`,
  body: (h) => `
<h2>Ground-up or conversion</h2>
<p>The range above is for a center built from the ground up on leased land; the cost of the real estate itself is left out. Converting an existing building is estimated at $287,145 to $1,013,587, with the same ${K.usd(b.feeLow)} fee. The document notes that during fiscal 2024 franchisees actually paid between $0 and $35,000 in initial fees, through incentive programs. An area developer pays a development fee equal to half of the combined initial fees, credited against each fee as centers open. Take 5 or an affiliate may also lease or sublease the premises to the franchisee, at a rent that "varies based on the Center's market area".</p>
<h2>What must be bought from the franchisor</h2>
<p>The equipment package, $29,497 to $39,388, and the opening inventory, $23,000 to $35,000, come from Take 5, its supply affiliate Spire Supply or another affiliate. Item 19 states that products sold to franchised centers carry a markup. A buyer therefore pays the franchisor twice: through fees on sales and through margin on supplies. Software costs $249 a month, or $416 with the optional surveillance module, and can rise each year by inflation plus 2 %, up to 5 %. Card processing adds about 1 % to 3 % of sales.</p>
<h2>Weekly royalty and fund</h2>
<p>Every Friday, the center pays ${K.rate(b.royPct)} royalty and ${K.rate(b.adPct)} to the marketing funds on the previous week's gross sales: ${K.rate(K.pctFees(b))} in all, ${K.usd(e.y.fees)} a year on the Item 19 average. Selling the center costs a training and transfer fee the document prints as 50 % of the current franchise fee and also as "currently $17,500", which is not half of ${K.usd(b.feeLow)}; a 10 % resale fee is added if Take 5 finds the buyer.</p>
${h.mini('roi', { t: 'Take 5: payback on first-year sales', p: ['so', 'm', 'at'], d: { b: 'take-5', sb: 'own', so: y1 } })}
<h2>Item 19: franchised sales, affiliate profit</h2>
<p>Franchised centers open more than a year ranged from $409,268 to $3,637,350; those open more than two years averaged ${K.usd(o('223 franchised'))}. Sales grow with age: centers opened in fiscal 2020 to 2023 averaged ${K.usd(y1)} in their first year and ${K.usd(o('Year 3'))} in their third, and the average center served ${K.num(o('cars per day'))} cars a day. Profit is shown only for 298 affiliate-owned ground-up centers, adjusted as if they paid the franchisee's royalty, fund, software, supply markup and insurance. Their four-wall EBITDA averaged ${K.usd(o('4-Wall EBITDA in dollars'))}, ${K.rate(b.i19.profitPct)} of sales on ${K.usd(o('298 affiliate-owned Centers open'))} average sales, with occupancy at ${K.usd(o('Occupancy'))}; the weaker half earned ${K.rate(o('bottom 50%'))} and the stronger half ${K.rate(o('top 50%'))}. That margin is after fees, while the calculator's is before them and is your own figure, ${K.rate(K.P.calc.defaultMarginPct)} by default. The EBITDA also leaves out debt service, owner draw and managers above the shop.</p>
<h2>A young franchise network</h2>
<p>Franchised centers grew by ${K.num(b.units.franchisedNetChange!)} in fiscal ${b.units.year}, to ${K.num(b.units.franchised!)}, but the affiliate still runs most locations. ${h.a('brand:valvoline', 'Valvoline Instant Oil Change')}, the other large network, prints ${K.usd(K.i19(va)!)} in average franchised net sales; Jiffy Lube estimates ${K.range(jl)} to open and averages ${K.usd(K.i19(jl)!)}.</p>
`,
  faqs: [
    { q: 'Which Take 5 purchases must go through the franchisor?', a: `The equipment package of $29,497 to $39,388 and opening inventory of $23,000 to $35,000 must be bought from Take 5, Spire Supply or another affiliate. Item 19 notes a franchisor markup on products sold to franchised centers. A $20,000 grand opening contribution and a $3,000 software installation fee are also paid to Take 5 at signing.` },
    { q: 'How much does a Take 5 center sell in its first year?', a: `Item 19 shows that franchised centers opened in fiscal 2020 to 2023 averaged ${K.usd(y1)} in their first year, against ${K.usd(o('Year 3'))} in their third year for the centers that reached it. Centers open more than a year averaged ${K.usd(avg)} in fiscal ${b.units.year}. First-year cash flow is therefore usually below what the average suggests.` },
    { q: 'Is the Take 5 four-wall EBITDA from franchised centers?', a: `No. The ${K.rate(b.i19.profitPct)} four-wall EBITDA comes from 298 affiliate-owned ground-up centers, adjusted to include the ${K.rate(b.royPct)} royalty, the ${K.rate(b.adPct)} marketing fund, software fees, the supply markup and insurance a franchisee would pay. It excludes depreciation, debt service, administrative costs and the owner's draw. Franchised centers report gross sales only.` },
  ],
  related: ['brand:valvoline', 'franchise-break-even', 'item-19-franchise-earnings', 'compare-franchises'],
});
