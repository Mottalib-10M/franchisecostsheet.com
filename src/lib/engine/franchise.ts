/**
 * Franchise economics, pure functions (no data, no formatting). Every figure that enters comes from a
 * Franchise Disclosure Document (src/data/brands.json) or from the reader; every default from
 * params-2026.json. Tested in tests/engine.test.ts.
 *
 * Model of one unit for one year:
 *   operating profit before franchise fees = sales x margin (the reader's estimate: what is left of sales
 *     after food or goods, labor, rent, utilities and insurance, before royalty, ad fund, debt and owner pay);
 *   franchise fees = sales x (royalty % + ad fund %) + fixed yearly fees printed in Item 6;
 *   profit share (Chick-fil-A only) = a share of what remains, when it is positive;
 *   cash flow before debt = operating profit - franchise fees - profit share;
 *   debt service = level payments on the financed part of the investment;
 *   payback = investment / cash flow before debt (years); break-even sales = sales where cash flow after debt is 0.
 */
export interface UnitInput {
  sales: number;
  /** % of sales, 6 for 6 %. */
  royaltyPct: number;
  adPct: number;
  /** Fixed yearly fees in dollars (technology fee, flat royalty...). */
  fixedFees: number;
  /** Reader's margin before franchise fees, % of sales. */
  marginPct: number;
  /** Share of the remaining profit taken by the franchisor, % (0 for nearly every brand). */
  profitSharePct?: number;
}
export interface LoanInput { principal: number; ratePct: number; years: number }

export function loanPayment({ principal, ratePct, years }: LoanInput): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = ratePct / 100 / 12, n = Math.round(years * 12);
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  return monthly * 12;
}

export function unitYear(u: UnitInput, debtService = 0) {
  const sales = Math.max(0, u.sales);
  const operating = (sales * u.marginPct) / 100;
  const royalty = (sales * u.royaltyPct) / 100;
  const ad = (sales * u.adPct) / 100;
  const fees = royalty + ad + Math.max(0, u.fixedFees);
  const beforeShare = operating - fees;
  const share = beforeShare > 0 ? (beforeShare * (u.profitSharePct ?? 0)) / 100 : 0;
  const cashBeforeDebt = beforeShare - share;
  const cashAfterDebt = cashBeforeDebt - debtService;
  return { sales, operating, royalty, ad, fixed: Math.max(0, u.fixedFees), fees, share, cashBeforeDebt, debtService, cashAfterDebt, toFranchisor: fees + share };
}

/** Years to earn back the investment from the yearly cash flow before debt; null when the unit loses money. */
export function paybackYears(investment: number, cashBeforeDebt: number): number | null {
  if (cashBeforeDebt <= 0) return null;
  return investment / cashBeforeDebt;
}

/** Sales at which cash flow after debt is zero; null when the margin does not cover the % fees. */
export function breakEvenSales(u: Omit<UnitInput, 'sales'>, debtService = 0): number | null {
  const contrib = (u.marginPct - u.royaltyPct - u.adPct) / 100;
  if (contrib <= 0) return null;
  return (Math.max(0, u.fixedFees) + debtService) / contrib;
}

/** Everything paid to the franchisor over a number of years: initial fee once, then the yearly fees. */
export function paidToFranchisor(initialFee: number, yearlyFees: number, years: number): number {
  return initialFee + yearlyFees * Math.max(0, years);
}

/** Point in an Item 7 range: 0 = low end, 1 = high end. */
export const inRange = (low: number, high: number, at: number) => low + (high - low) * Math.min(1, Math.max(0, at));
