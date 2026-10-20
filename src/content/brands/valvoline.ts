import { defineBrand } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const b = K.B('valvoline');
const o = (frag: string) => b.i19.other.find((x) => x.label.includes(frag))!.value;
const avg = K.i19(b)!;
const t5 = K.B('take-5');
const jl = K.B('jiffy-lube');

export default defineBrand({
  slug: 'valvoline',
  title: 'Valvoline Franchise Cost 2026: Royalty Steps and Real Estate',
  description: `Valvoline Instant Oil Change franchise cost in 2026: ${K.range(b)} with leased or bought land, a ${K.usd(b.feeLow)} fee and a royalty that climbs to ${K.rate(b.royPct)}.`,
  intro: `Valvoline's Item 7 runs from a leased conversion to a center built on land the franchisee buys, which is why its range spans more than three million dollars.`,
  resume: `Valvoline Instant Oil Change Franchising, Inc. estimates ${K.range(b)} to open one service center, in the disclosure document issued ${K.day(b.issued)}. The low end is a leased site, up to $639,550; buying the land and building costs $1,773,750 to $3,483,550. Between ${K.usd(b.toFrLow!)} and ${K.usd(b.toFrHigh!)} goes to the franchisor or an affiliate, including the ${K.usd(b.feeLow)} license fee and the first stock of Valvoline products. The royalty on adjusted gross revenue starts at 2 % in the first twelve months and 3 % in the next twelve, then reaches ${K.rate(b.royPct)}, or a graduated 4 % to 6 % for owners above the volume thresholds. The general system fund takes up to 2 %, capped at ${K.usd(b.fixedYear)} a year for centers opened in fiscal 2026. Item 19 reports average net sales of ${K.usd(avg)} for ${K.num(b.i19.count!)} franchised centers in the ${b.i19.period}.`,
  body: (h) => `
<h2>Real estate is inside the range</h2>
<p>Unlike most brands on this site, Valvoline counts the site in Item 7. A center on leased land and improvements is estimated at ${K.usd(b.invLow)} to $639,550; a franchisee who buys the land and the building needs $1,773,750 to ${K.usd(b.invHigh)}. Both ground-up builds and conversions of another oil change shop fall within these totals. The calculator on this page opens at the low end, the leased site; the middle of the range mixes the two plans, so switch to the high end to study a purchase.</p>
<h2>Three royalty rates in the first three years</h2>
<p>A single new center pays 2 % of adjusted gross revenue for its first twelve months and 3 % for the next twelve, then ${K.rate(b.royPct)}. An existing franchisee whose centers together exceed $1,000,000 of revenue can move to a graduated rate between 4 % and 6 %. Item 19 adds that the 4 % rate applies at $5,000,000 or more of combined revenue and that 95 % of franchised centers paid 4 %, a threshold that one center at the Item 19 average does not reach on its own. The calculator uses the standard ${K.rate(b.royPct)}; the mini-simulator below lets you set the royalty to 2, 3 or 4 % and compare.</p>
${h.mini('fees', { t: 'Valvoline: royalty and fund on the Item 19 average', p: ['roy', 'sales', 'yrs'], d: { sales: avg, roy: b.royPct!, ad: 0, fx: b.fixedYear, fee: b.feeLow, yrs: 10 } })}
<h2>Advertising, products and other obligations</h2>
<p>The general system fund charges up to 2 % of revenue until it reaches the cap, ${K.usd(b.fixedYear)} for centers opened in fiscal 2026 and never more than $7,500. Separately, the center must spend at least 3 % of revenue on local advertising. A national advertising fund may be created at the beginning of fiscal 2027 (to come, amount not yet set). Motor oil, filters and lubricants must be bought from the franchisor, an affiliate or a designated supplier: $28,750 to $62,050 at opening, then for as long as the center runs. Owners must honor national fleet pricing and a satisfaction guarantee at their own cost, and remodel when asked, up to the greater of $50,000 or 2 % of five years of revenue. Signs may be leased from the franchisor at $375 to $650 a month for ten years.</p>
<h2>A license fee that shrinks with each center</h2>
<p>The ${K.usd(b.feeLow)} fee is paid half at signing and half with the first royalty. A second center costs $20,000 if built new or $5,000 as a qualifying conversion, a third $5,000. Under a development agreement each center costs $2,500 to $5,000 plus a $5,000 development fee, with at least three centers. Buying a center from a franchisee costs $5,000, then $2,500 for each further center from the same seller; the seller pays a transfer fee of up to $30,000.</p>
<h2>Item 19: franchised sales, company contribution</h2>
<p>Franchised centers report net sales only: ${K.usd(avg)} on average, ${K.usd(b.i19.median!)} at the median, from ${K.usd(o('lowest franchisee'))} to ${K.usd(o('highest franchisee'))}, with an average ticket of $${K.dec(o('Average Ticket'), 2)} and ${K.dec(o('oil changes per day'))} oil changes a day. Costs appear only for the 785 company-operated centers, which averaged ${K.usd(o('785 comparable'))} in sales and a contribution of ${K.usd(o('Average Contribution in dollars'))}, or ${K.usd(o('Average Contribution Less 4%'))} after a 4 % royalty. That contribution is before rent, overhead, depreciation and taxes, and the document prints it in dollars only, not as a share of sales. The top quarter of company centers kept ${K.usd(o('top 25%'))} after royalty, the bottom quarter ${K.usd(o('bottom 25%'))}. Your margin, ${K.rate(K.P.calc.defaultMarginPct)} by default, is your own estimate and should include rent if you lease.</p>
<h2>Units and other oil change brands</h2>
<p>Item 20 counts ${K.num(b.units.franchised!)} franchised and ${K.num(b.units.company!)} company centers at the end of fiscal ${b.units.year}, ${K.num(b.units.franchisedNetChange!)} more franchised than a year earlier. ${h.a('brand:take-5', 'Take 5 Oil Change')} estimates ${K.range(t5)} for a ground-up center without real estate and reports ${K.usd(K.i19(t5)!)} in average sales; Jiffy Lube estimates ${K.range(jl)} and reports ${K.usd(K.i19(jl)!)}.</p>
`,
  faqs: [
    { q: 'What royalty does a new Valvoline Instant Oil Change franchisee pay?', a: `A single new center pays 2 % of adjusted gross revenue in its first twelve months, 3 % in the second twelve, then ${K.rate(b.royPct)}. A graduated rate from 4 % to 6 % is open to existing franchisees whose centers together exceed $1,000,000 of revenue. Item 19 says 95 % of franchised centers paid 4 %, the rate at $5,000,000 or more.` },
    { q: 'Does the Valvoline investment include buying land?', a: `It can. Item 7 covers both a leased site, ${K.usd(b.invLow)} to $639,550, and the purchase of land and building, $1,773,750 to ${K.usd(b.invHigh)}, for either a new build or a conversion. The total range of ${K.range(b)} therefore mixes two very different plans, and the calculator's low and high settings follow them.` },
    { q: 'Must Valvoline franchisees buy their oil from Valvoline?', a: `Yes. Motor oils, filters, lubricants and other Valvoline products must be bought from the franchisor, an affiliate or a supplier it designates. Item 7 puts the opening stock at $28,750 to $62,050, and the obligation continues after opening. National fleet pricing and a satisfaction guarantee must also be honored at the franchisee's cost.` },
    { q: 'What profit figures does Valvoline print in Item 19?', a: `Only for its 785 company-operated centers: an average contribution of ${K.usd(o('Average Contribution in dollars'))}, or ${K.usd(o('Average Contribution Less 4%'))} after a 4 % royalty, on average sales of ${K.usd(o('785 comparable'))}. It is before rent, overhead, depreciation and taxes. Franchised centers are shown with net sales only, ${K.usd(avg)} on average.` },
  ],
  related: ['brand:take-5', 'franchise-royalty-fees', 'item-19-franchise-earnings', 'franchise-loan'],
  toolArg: { at: 'low' },
});
