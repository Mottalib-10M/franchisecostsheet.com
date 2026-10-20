import { describe, expect, it } from 'vitest';
import { loanPayment, unitYear, paybackYears, breakEvenSales, paidToFranchisor, inRange } from '../src/lib/engine/franchise';
import { BRANDS, economics, getTool, TOOL_KINDS, catSales, i19 } from '../src/lib/tool-specs';
import P from '../src/data/params-2026.json';

describe('engine', () => {
  it('takes royalty and ad fund on sales, fixed fees on top', () => {
    const y = unitYear({ sales: 1_000_000, royaltyPct: 6, adPct: 4, fixedFees: 5000, marginPct: 20 });
    expect(y.operating).toBe(200_000);
    expect(y.fees).toBe(105_000);
    expect(y.cashBeforeDebt).toBe(95_000);
  });
  it('applies a profit share only to a positive remainder', () => {
    expect(unitYear({ sales: 1_000_000, royaltyPct: 15, adPct: 0, fixedFees: 0, marginPct: 35, profitSharePct: 50 }).cashBeforeDebt).toBe(100_000);
    expect(unitYear({ sales: 1_000_000, royaltyPct: 15, adPct: 0, fixedFees: 0, marginPct: 10, profitSharePct: 50 }).share).toBe(0);
  });
  it('computes a level loan payment', () => {
    expect(loanPayment({ principal: 120_000, ratePct: 0, years: 10 })).toBeCloseTo(12_000, 6);
    expect(loanPayment({ principal: 100_000, ratePct: 12, years: 1 }) / 12).toBeCloseTo(8884.88, 1);
  });
  it('gives payback and break-even, or null when impossible', () => {
    expect(paybackYears(500_000, 100_000)).toBe(5);
    expect(paybackYears(500_000, -1)).toBeNull();
    expect(breakEvenSales({ royaltyPct: 6, adPct: 4, fixedFees: 10_000, marginPct: 20 }, 40_000)).toBeCloseTo(500_000, 6);
    expect(breakEvenSales({ royaltyPct: 8, adPct: 4.5, fixedFees: 0, marginPct: 12 })).toBeNull();
  });
  it('sums fees over an agreement and reads a range', () => {
    expect(paidToFranchisor(40_000, 100_000, 10)).toBe(1_040_000);
    expect(inRange(100, 300, 0.5)).toBe(200);
  });
});

describe('brands data', () => {
  it('has consistent figures for every brand', () => {
    expect(BRANDS.length).toBeGreaterThanOrEqual(40);
    for (const b of BRANDS) {
      expect(b.invLow, b.slug).toBeGreaterThan(0);
      expect(b.invLow, b.slug).toBeLessThanOrEqual(b.invHigh);
      expect(b.feeHigh, b.slug).toBeLessThanOrEqual(b.invHigh);
      expect(b.url, b.slug).toMatch(/^https:\/\/cards\.web\.commerce\.state\.mn\.us\/documents\/%7B/);
      expect(b.issued, b.slug).toMatch(/^20(2[4-6])-\d\d-\d\d$/);
      expect(b.issued <= P.retrieved_at, b.slug).toBe(true);
      if (b.i19.published && i19(b) !== null) expect(i19(b)!, b.slug).toBeGreaterThan(50_000);
    }
  });
  it('defaults the sales of a brand without Item 19 to its category median', () => {
    const sub = BRANDS.find((b) => b.slug === 'subway')!;
    const e = economics(sub, { at: 'mid', sb: 'auto', so: 0, m: 15, lf: 0, lr: 10, ly: 10 });
    expect(e.sales).toBe(catSales('sandwiches').median);
  });
  it('runs every calculator with its defaults', () => {
    for (const k of TOOL_KINDS) {
      const spec = getTool(k);
      const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def]));
      const out = spec.run(v);
      expect(out.value, k).toBeTruthy();
      expect(JSON.stringify(out), k).not.toMatch(/NaN|undefined/);
    }
  });
});
