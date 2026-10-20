#!/usr/bin/env python3
"""Builds src/data/brands.json from the facts read in each Franchise Disclosure Document.

Inputs (all in data/):
  fdd/<slug>.json      facts of one FDD, read in Items 5, 6, 7, 19 and 20, each with its verbatim quote
                       (schema: CONTRIBUTING-PAGES.md); `source` = Minnesota CARDS document, received date, URL.
  categories.json      category of each brand.
  overrides.json       corrections decided by hand after reading the document, each with its reason
                       (`why`): fixed yearly fees counted by the calculator, a weekly figure turned yearly...
Usage: python3 scripts/build-brands.py   (fails on any missing or inconsistent figure)
"""
import json, os, sys, glob, copy

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'data')
cats = json.load(open(os.path.join(D, 'categories.json')))
cat_of = {s: c for c, ss in cats.items() for s in ss}
ov = json.load(open(os.path.join(D, 'overrides.json')))

# Item 6 lines left out of the fixed yearly fees: optional, conditional or paid to third parties.
COND = ('optional', 'if ', '(only', '(onl', 'third-party', 'third party')

def merge(a, b):
    for k, v in b.items():
        if k == 'why': continue
        if isinstance(v, dict) and isinstance(a.get(k), dict): merge(a[k], v)
        else: a[k] = v
    return a

out, errs = [], []
for f in sorted(glob.glob(os.path.join(D, 'fdd', '*.json'))):
    x = json.load(open(f)); slug = x['slug']
    if os.path.basename(f) != f'{slug}.json': errs.append(f'{f}: slug differs'); continue
    if slug in ov:
        if not ov[slug].get('why'): errs.append(f'{slug}: override without a reason')
        x = merge(copy.deepcopy(x), ov[slug])
    if x.get('exclude'): continue
    if slug not in cat_of: errs.append(f'{slug}: no category'); continue
    src = x['source']; inv = x['invest']; fee = x['fee']; roy = x['royalty']; ad = x['adFund']; h = x['item19']; u = x['units']
    hd = h.get('headline') or {}
    # Fixed yearly fees: by default the Item 6 lines printed with a dollar amount per year (optional ones left out);
    # an override replaces them when the document counts them elsewhere (Chick-fil-A's 15 % already includes them).
    if 'fixedYear' in x: fixed = x['fixedYear']
    else:
        rows = [o for o in (x.get('otherRecurring') or []) if isinstance(o.get('annualUsd'), (int, float)) and o['annualUsd'] > 0 and not any(w in (o.get('amount', '') + ' ' + o.get('name', '')).lower() for w in COND)]
        fixed = {'usd': round(sum(o['annualUsd'] for o in rows)), 'note': ', '.join(o['name'] for o in rows) or None}
    row = {
        'slug': slug, 'brand': x['brand'], 'franchisor': x['franchisor'], 'category': cat_of[slug],
        'issued': x['issuanceDate'], 'amended': x.get('amendedDate'),
        'doc': src['doc'], 'received': src['received'], 'url': src['url'], 'pages': src['pages'],
        'format': x['format'],
        'invLow': inv['low'], 'invHigh': inv['high'], 'toFrLow': inv.get('toFranchisorLow'), 'toFrHigh': inv.get('toFranchisorHigh'), 'invQuote': inv['quote'],
        'feeLow': fee['low'], 'feeHigh': fee['high'], 'feeNote': fee.get('note'), 'feeQuote': fee['quote'],
        'royPct': roy.get('pct'), 'royPctHigh': roy.get('pctHigh'), 'royBasis': roy.get('basis') or 'gross sales', 'royFlat': roy.get('flat'), 'royQuote': roy['quote'],
        'fixedYear': fixed['usd'], 'fixedNote': fixed['note'],
        'adPct': ad.get('pct'), 'adPctHigh': ad.get('pctHigh'), 'adNote': ad.get('note'), 'adQuote': ad.get('quote') or '',
        'profitSharePct': x.get('profitSharePct', 0),
        'other': x.get('otherRecurring') or [],
        'transfer': (x.get('transferFee') or {}).get('amount'), 'transferUsd': (x.get('transferFee') or {}).get('usd'),
        'rentToFranchisor': x.get('rentToFranchisor'),
        'i19': {
            'published': bool(h.get('published')), 'label': hd.get('label'), 'value': hd.get('value'), 'count': hd.get('count'),
            'period': hd.get('period'), 'median': hd.get('median'), 'profitPct': h.get('profitPct'),
            'other': [o for o in (h.get('other') or []) if isinstance(o.get('value'), (int, float))],
            'quote': h.get('quote'), 'note': h.get('note'),
        },
        'units': {k: u.get(k) for k in ('year', 'franchised', 'company', 'total', 'franchisedNetChange', 'quote')},
        'special': x.get('special'),
    }
    # Consistency: a range is ordered, a fee is not above the investment, a royalty is a sane percentage.
    if not (0 < row['invLow'] <= row['invHigh']): errs.append(f'{slug}: investment range {row["invLow"]} {row["invHigh"]}')
    if row['feeLow'] > row['feeHigh'] or row['feeHigh'] > row['invHigh']: errs.append(f'{slug}: fee {row["feeLow"]} {row["feeHigh"]}')
    if row['royPct'] is None and not row['royFlat']: errs.append(f'{slug}: no royalty')
    if row['royPct'] is not None and not (0 <= row['royPct'] <= 30): errs.append(f'{slug}: royalty {row["royPct"]}')
    if row['royPct'] is None and row['royFlat'] and not row['fixedYear']: errs.append(f'{slug}: flat royalty not counted in fixedYear')
    if not row['issued']: errs.append(f'{slug}: no issuance date')
    out.append(row)

if errs:
    print('\n'.join(errs)); sys.exit(1)
out.sort(key=lambda r: r['brand'].lower())
json.dump(out, open(os.path.join(ROOT, 'src', 'data', 'brands.json'), 'w'), ensure_ascii=False, indent=1)
print(f'{len(out)} brands written to src/data/brands.json')
