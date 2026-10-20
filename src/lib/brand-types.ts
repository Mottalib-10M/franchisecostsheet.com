/** One row of src/data/brands.json (scripts/build-brands.py): the figures of one Franchise Disclosure Document. */
export type Category = 'burgers' | 'chicken' | 'pizza' | 'sandwiches' | 'mexican' | 'coffee-treats' | 'casual-dining' | 'fitness' | 'services' | 'beauty-wellness' | 'education-childcare' | 'auto' | 'home-services' | 'senior-care' | 'retail';
export interface Item19 {
  published: boolean;
  label: string | null; value: number | null; count: number | null; period: string | null; median: number | null;
  profitPct: number | null;
  other: Array<{ label: string; value: number }>;
  quote: string | null; note: string | null;
}
export interface Brand {
  slug: string; brand: string; franchisor: string; category: Category;
  /** FDD issuance date (YYYY-MM-DD) and amendment date if printed. */
  issued: string; amended: string | null;
  /** Minnesota CARDS document number, date received, download link, page count. */
  doc: string; received: string; url: string; pages: number;
  format: string;
  invLow: number; invHigh: number; toFrLow: number | null; toFrHigh: number | null; invQuote: string;
  feeLow: number; feeHigh: number; feeNote: string | null; feeQuote: string;
  royPct: number | null; royPctHigh: number | null; royBasis: string; royFlat: string | null; royQuote: string;
  /** Flat royalty or fixed fees counted per year by the calculator, with what they are. */
  fixedYear: number; fixedNote: string | null;
  adPct: number | null; adPctHigh: number | null; adNote: string | null; adQuote: string;
  profitSharePct: number;
  other: Array<{ name: string; amount: string; annualUsd: number | null }>;
  transfer: string | null; transferUsd: number | null;
  rentToFranchisor: string | null;
  i19: Item19;
  units: { year: number; franchised: number | null; company: number | null; total: number | null; franchisedNetChange: number | null; quote: string };
  special: string | null;
}
