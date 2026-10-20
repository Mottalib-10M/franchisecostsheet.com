/** Every page id the site is meant to have. Content tests accept links to these ids while pages are being
 *  written; the "all planned pages exist" test fails until each has its file. */
export const PLANNED_GUIDES: string[] = [
  'franchise-cost', 'franchise-fee', 'franchise-royalty-fees', 'item-19-franchise-earnings', 'franchise-disclosure-document',
  'cheapest-franchises', 'best-franchises-to-own', 'franchise-opportunities', 'fast-food-franchise-cost', 'fitness-franchise-cost',
  'compare-franchises', 'franchise-break-even', 'franchise-loan', 'franchise-for-sale', 'brands-that-do-not-franchise',
];
export const PLANNED_BRANDS: string[] = ["chick-fil-a", "mcdonalds", "wendys", "burger-king", "sonic", "culvers", "five-guys", "jack-in-the-box", "popeyes", "kfc", "taco-bell", "dominos", "pizza-hut", "little-caesars", "papa-johns", "marcos-pizza", "jersey-mikes", "jimmy-johns", "firehouse-subs", "arbys", "panera", "dunkin", "tropical-smoothie", "crumbl", "buffalo-wild-wings", "applebees", "ihop", "dennys", "baskin-robbins", "cold-stone", "nothing-bundt-cakes", "scooters-coffee", "freddys", "subway", "planet-fitness", "anytime-fitness", "orangetheory", "club-pilates", "european-wax-center", "great-clips", "dairy-queen", "ups-store", "mathnasium", "goddard-school", "the-joint", "valvoline", "take-5", "home-instead"];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, ...PLANNED_BRANDS.map((s) => `brand:${s}`)]);
