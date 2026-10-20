# Écrire ou étoffer une page de Franchise Cost Sheet (us-franchise-costs)

Notice pour qui écrit les pages. À lire en entier avant d'écrire, avec `~/Documents/GitHub/RECETTE-SITE.md`.

**Le site** : ce que coûte une franchise aux États-Unis, enseigne par enseigne, lu dans son Franchise Disclosure
Document (FDD) : droit d'entrée (Item 5), redevances, fonds publicitaire et frais fixes (Item 6), investissement initial
(Item 7), chiffre d'affaires publié (Item 19), nombre d'unités (Item 20). Calculateur : retour sur investissement, point
mort, comparaison, prêt. **Anglais américain seul**, sous `/en/`. Éditeur : **Radif Partners** (jamais un nom de
personne). Aucune marque dans le nom du site ni dans le logo ; le site n'est affilié à aucune enseigne.

**La phrase de valeur ajoutée** (accueil, À propos, Méthode, rapport SERP) : `VALUE` dans `src/content/home.ts`.
Rapport SERP : `~/Documents/GitHub/reports/us-franchise-costs-serp-2026-10-20.md`.

## Interdits

- Pas de leads : aucun formulaire, aucun lien vers un courtier en franchise, un prêteur, un annuaire qui revend des
  contacts, ni vers le site commercial d'une enseigne. Le seul lien vers une enseigne est son FDD sur le portail CARDS.
- **Jamais de promesse de gain** : le site rapporte l'Item 19 tel qu'imprimé et calcule sur la marge que tape le
  lecteur. Pas de « bon investissement », pas de « we recommend ». La marge par défaut (15 %) est une valeur de départ,
  dite telle.
- **Un chiffre non sourçable ne se publie pas.** Tout chiffre d'enseigne vient du kit (`K.B(slug)`, `K.i19`, `K.eco`…),
  donc de `src/data/brands.json`. Un chiffre du FDD absent du JSON (un autre format, une remise) peut être cité s'il
  figure dans `data/fdd/<slug>.json` (citation, note) ; sinon il ne se publie pas.
- Starbucks, In-N-Out, Chipotle : pas de franchise aux États-Unis ; le dire (page `brands-that-do-not-franchise`, sources
  10-K à la SEC). 7-Eleven, Raising Cane's, Whataburger, Dutch Bros, Wingstop : aucun FDD récent sur le portail du
  Minnesota au 2026-10-20 ; ne rien chiffrer.
- Ne jamais lier ni copier un site du portefeuille (`~/Documents/GitHub/_trame/domaines-ovh.txt`).
- Un chiffre annoncé pour plus tard est « à venir », avec sa date (ex. le fonds publicitaire KFC à 4,5 % après le
  31 mars 2027).
- Ni tiret cadratin ni demi-cadratin, ni les tournures listées dans `tests/pages.test.ts` (BANNED).

## D'où viennent les chiffres

| Donnée | Source | Fichier |
|---|---|---|
| Faits de chaque FDD (Items 5, 6, 7, 19, 20), chacun avec sa citation | FDD « Clean » le plus récent déposé au Minnesota, portail CARDS (n° de document, date de réception, URL du PDF dans `source`) | `data/fdd/<slug>.json` |
| Catégorie de chaque enseigne | décision éditoriale | `data/categories.json` |
| Corrections décidées à la lecture (hebdomadaire × 52, partage de bénéfice, taux d'un nouveau franchisé) | le FDD lui-même, avec la raison (`why`) | `data/overrides.json` |
| Taux préférentiel (prime), plafond d'écart SBA 7(a) | Fed H.15, SBA | `src/data/params-2026.json` |

`python3 scripts/build-brands.py` relit ces fichiers, contrôle la cohérence et écrit `src/data/brands.json`. Les PDF
ne sont pas versionnés (trop lourds) : l'URL de chacun est dans `source.url`.

**Modèle du calculateur** (`src/lib/engine/franchise.ts`) : marge avant redevances = ventes × marge du lecteur ;
redevances = ventes × (royalty + fonds pub) + frais fixes annuels imprimés en dollars à l'Item 6 (lignes optionnelles,
conditionnelles ou payées à des tiers exclues) ; Chick-fil-A : 50 % du reste en plus ; retour = investissement ÷ flux
avant emprunt ; point mort = (frais fixes + annuités) ÷ (marge − royalty − pub). Ventes : Item 19 (moyenne, sinon
médiane) ; à défaut, médiane de l'Item 19 de la catégorie (3 enseignes au moins), sinon le chiffre du lecteur.

## Les fichiers d'une page (une page = un fichier)

| Page | Fichier | Route |
|---|---|---|
| Sujet + calculateur | `src/content/guides/<id>.ts` (`defineGuide`) | `/en/<slug>/` |
| Enseigne | `src/content/brands/<slug>.ts` (`defineBrand`, slug = clé de `brands.json`) | `/en/<slug>-franchise-cost/` |
| Accueil | `src/content/home.ts` | `/en/` |

Pages prévues : `src/lib/planned.ts`. Modèles (copier la structure, jamais les phrases) :
`src/content/guides/franchise-cost.ts` et `src/content/brands/subway.ts`.

Le gabarit affiche seul : H1, `intro`, le calculateur, le chapeau replié (`resume`), le corps (`body`), la FAQ, les
pages liées, les sources. Sur une enseigne : H1 fixé (« <Brand> franchise cost in 2026: <range> »), calculateur réglé
sur l'enseigne, fiche FDD générée sous le chapeau.

### Champs

| Champ | Règle |
|---|---|
| `title` | 50 à 60 caractères rendus, terme-clé en tête (« <Brand> Franchise Cost 2026… »), « 2026 », unique |
| `description` | 150 à 160 caractères rendus, « 2026 », unique |
| `resume` | un seul paragraphe de 120 mots ou plus : la réponse directe, chiffrée |
| `body` | guides 650 mots de prose au moins, enseignes 300 ; au moins un `h.mini(kind, { t, p, d })` |
| `faqs` | 3 à 8 questions, réponses de 40 à 90 mots, question unique sur tout le site |
| `related` | 3 ou 4 identifiants de pages (`brand:<slug>` pour une enseigne) |
| `sources` | clés de `params-2026.json > sources` (guides) |

Outils (`src/lib/tool-specs.ts`) : `roi` (enseigne → retour, flux, point mort ; `b`, `at`, `sb`, `so`, `m`, `lf`, `lr`,
`ly`), `compare` (2 ou 3 enseignes ; `a`, `c2`, `c3`, `m`, `at`), `fees` (redevances cumulées ; `sales`, `roy`, `ad`,
`fee`, `yrs`, `fx`), `breakeven` (`b`, `m`, `lf`, `at`, `lr`), `loan` (`amt`, `lr`, `ly`), `list` (`cat`, `sort`).

## Contrôler

    PAGE_FILES=<id>,brand:<slug> npx vitest run tests/pages.test.ts
    npx vitest run tests/pages.test.ts >/dev/null; python3 scripts/sim-pages.py --only <id>    # moins de 30 %

Puis, une seule fois et jamais en parallèle : `npm run check` et les contrôles de la recette.
