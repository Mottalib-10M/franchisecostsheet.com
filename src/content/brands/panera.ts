import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('panera');
const e = K.eco('panera');
const ar = K.B('arbys');
const x19 = K.i19(b)!;
const oth = (re: RegExp) => b.i19.other.find((x) => re.test(x.label))!.value;

export default defineBrand({
  slug: 'panera',
  title: 'Panera Bread Franchise Cost 2026: Fee, Royalty and AUV',
  description: `Panera Bread franchise cost in 2026: ${K.range(b)} for a Core cafe, a ${K.usd(b.feeLow)} fee, ${K.rate(b.royPct)} royalty on net sales and ${K.usd(x19)} average franchisee sales.`,
  intro: `Panera mostly sells franchises two cafes at a time, and the cafe it describes is a large one: no brand in the sandwich category on this site asks more to open.`,
  resume: `Panera, LLC estimates in its disclosure document of ${K.day(b.issued)} that one Core Panera Bread bakery-cafe of about 3,200 to 3,500 square feet in a non-urban market costs ${K.range(b)} to open, excluding real estate and landlord allowances. The franchisor receives the ${K.usd(b.feeLow)} initial fee and up to $300,000 more if you buy its optional development and construction services. Panera primarily signs area development agreements for at least two cafes; a single cafe is offered only in certain situations. Royalty is ${K.rate(b.royPct)} of net sales and the National Advertising Fund takes ${K.rate(b.adPct)}, with a 0.4 % marketing administration fee and 2.0 % of local advertising besides. Item 19 reports average net sales of ${K.usd(x19)} for ${K.num(b.i19.count!)} franchisee-owned cafes open all of fiscal 2025, without a median. Panera had ${K.num(b.units.total!)} cafes at the end of ${b.units.year}, half of them company-owned.`,
  body: (h) => `
<h2>Why the range is so wide</h2>
<p>The ${K.range(b)} is for the Core format outside dense urban markets, real estate and landlord allowances left out. The top of the range includes up to $300,000 of optional services paid to Panera: development services and real estate selection with construction management, at $150,000 each. Panera may also sell a franchisee a cafe it has developed itself, at its total development cost plus a development fee, currently $150,000. If you own the premises, Panera may require an option on the lease or a prime lease and sublease with Panera at fair market rent, so the property can end up tied to the franchisor.</p>
<h2>Development fee instead of franchise fee</h2>
<p>Under an area development agreement, the development fee is $50,000 times the number of cafes, so $100,000 for the minimum of two, and it is credited so no separate franchise fee is due. Without such an agreement, the fee is ${K.usd(b.feeLow)} per Core or Small Box cafe. Non-traditional cafes pay half, currently $25,000. In fiscal 2025 Panera actually collected initial fees from $12,500 to $35,000 and development fees from $15,000 to $20,000, below the list price. A transfer costs ${K.usd(b.transferUsd!)}.</p>
<h2>What goes back to Panera each period</h2>
<p>The ${K.rate(b.royPct)} royalty and the ${K.rate(b.adPct)} national fund are counted on net sales; non-traditional cafes pay 2.6 % to the fund. Raising the fund needs a vote of 66 % of all cafes or 51 % of franchised ones. The 0.4 % marketing administration fee and 1.75 % on digital net sales are percentages too, but the calculator does not add them. Local advertising is 2.0 %, which franchisees may temporarily reduce to 0.5 % through fiscal 2026. Monthly charges for the cafe network ($250 to $375), cafe technology ($425 to $500 with a drive-thru) and two kiosks ($230 to $275) are printed as ranges and left out of the calculator's fixed fees.</p>
${h.mini('roi', { t: 'Panera Bread: payback at your own margin', p: ['m', 'at', 'lf', 'lr'], d: { b: 'panera' } })}
<h2>Company figures, franchisee figures</h2>
<p>The ${K.usd(x19)} average covers franchisee-owned cafes only, and ranges from $463,536 to $5,876,372; 483 cafes, 45.0 %, were at or above it. Company cafes (1,087) averaged ${K.usd(oth(/^Average Net Sales, company-owned Bakery-Cafes/))}. The profit lines also come from company cafes alone: average EBITDA of ${K.usd(oth(/^Average EBITDA, company-owned Bakery-Cafes \(1,087\)/))}, ${K.dec(b.i19.profitPct!)} % of average gross revenues, before any royalty or franchise fee amortization a franchisee would pay. Subtracting ${K.rate(K.pctFees(b))} of royalty and national fund from that rate gives a rough idea of a franchisee's position, but a company cafe does not carry the same rent, debt or overhead. The calculator's starting margin of ${K.rate(K.P.calc.defaultMarginPct)} is a placeholder; at that value the middle of the range pays back in ${K.dec(e.pay!)} years.</p>
<h2>Scale against other sandwich brands</h2>
<p>Franchised cafes went from 1,105 to ${K.num(b.units.franchised!)} in 2025 while company cafes grew to ${K.num(b.units.company!)}. Item 20 includes non-traditional locations. Among sandwich brands, ${h.a('brand:arbys', "Arby's")} is the nearest in building budget at ${K.range(ar)}, with average sales of ${K.usd(K.i19(ar)!)}, about half the Panera figure.</p>
`,
  faqs: [
    { q: 'How much does it cost to open a Panera Bread bakery-cafe?', a: `Item 7 puts one Core cafe of about 3,200 to 3,500 square feet at ${K.range(b)}, excluding real estate and landlord allowances. The franchise fee of ${K.usd(b.feeLow)} is included, as are up to $300,000 of optional development and construction services that Panera can sell you.` },
    { q: 'Can you buy a single Panera franchise?', a: `Only in certain situations. Panera primarily offers area development agreements for at least two cafes, with a development fee of $50,000 per cafe, $100,000 for two, credited so no separate franchise fee is owed. A single cafe outside such an agreement pays the ${K.usd(b.feeLow)} fee.` },
    { q: 'Does Panera publish franchisee profits?', a: `No. Item 19 gives franchisee-owned cafes' average net sales, ${K.usd(x19)} in fiscal 2025, but the EBITDA figure of ${K.dec(b.i19.profitPct!)} % comes from company-owned cafes and is measured before the royalty and fee amortization a franchisee would pay. No median is printed for franchisee cafes.` },
  ],
  related: ['brand:arbys', 'brand:jersey-mikes', 'franchise-royalty-fees', 'franchise-loan'],
});
