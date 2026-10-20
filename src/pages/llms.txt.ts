/** llms.txt (RECETTE §21), generated from the page registry. */
import { GUIDES, BRAND_PAGES, brandId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS, label } from '../i18n/nav';
import { BRANDS } from '../lib/tool-specs';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`, '',
    `> What it costs to buy and run a franchise in the United States, brand by brand: the initial franchise fee (Item 5), the royalty, ad fund and fixed yearly fees (Item 6), the estimated initial investment (Item 7), the sales figures the franchisor publishes (Item 19) and the number of units (Item 20), read in each brand's Franchise Disclosure Document as registered with the Minnesota Department of Commerce (${BRANDS.length} documents, each dated and linked). Calculators for payback, break-even sales, total fees over the agreement, brand comparisons and franchise loans, on a margin the reader chooses. Independent site published by Radif Partners; no broker, no lead form; general information, not an earnings claim or advice. Last updated ${LAST_UPDATED}.`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...GUIDES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## Franchise cost by brand', ...BRAND_PAGES.map((s) => `- [${label(brandId(s.slug))}](${SITE_URL}${route(brandId(s.slug), 'en')}): ${s.intro}`), '',
    '## About', `- [Where the figures come from](${SITE_URL}${route('method', 'en')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
