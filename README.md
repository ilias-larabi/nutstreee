# 🌳 Nutstree — Documentation Complète du Projet Shopify

> **Boutique :** [nutstreee.myshopify.com](https://nutstreee.myshopify.com)  
> **Dépôt GitHub :** [github.com/ilias-larabi/nutstreee](https://github.com/ilias-larabi/nutstreee)  
> **Thème de base :** Shopify Dawn (OS 2.0)  
> **Activité :** Vente de fruits secs, miel, épices et coffrets cadeaux artisanaux — Livraison au Maroc  
> **Dernière mise à jour :** 19 Juillet 2026

---

## 📋 Table des matières

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Architecture du thème](#2-architecture-du-thème)
3. [Page d'accueil — Sections personnalisées](#3-page-daccueil--sections-personnalisées)
4. [Optimisations Mobile](#4-optimisations-mobile)
5. [Historique des commits Git](#5-historique-des-commits-git)
6. [Guide de personnalisation Shopify](#6-guide-de-personnalisation-shopify)
7. [Guide d'import des produits](#7-guide-dimport-des-produits)
8. [Palette de couleurs & Typographie](#8-palette-de-couleurs--typographie)
9. [Structure des fichiers modifiés](#9-structure-des-fichiers-modifiés)

---

## 1. Vue d'ensemble du projet

Nutstree est une boutique e-commerce marocaine spécialisée dans la vente de **fruits secs artisanaux torréfiés**, miel, épices et coffrets cadeaux. Le thème a été entièrement repensé à partir du thème Dawn de Shopify (Online Store 2.0) pour créer une expérience **premium, gourmande et mobile-first**.

### Objectifs atteints
- ✅ Design premium inspiré des codes "épicerie fine artisanale"
- ✅ Mobile-first : expérience optimisée sur smartphone (marché marocain)
- ✅ Page d'accueil complète en 7 sections dynamiques
- ✅ Barre "Ajouter au panier" sticky sur les fiches produits
- ✅ Support bilingue Français / Arabe (règles bidi CSS)
- ✅ Images lazy-loaded avec srcset responsive
- ✅ Zones tactiles 44-48px (norme Apple HIG / Material Design)
- ✅ Code Shopify OS 2.0 conforme (sections Liquid + schemas JSON)

---

## 2. Architecture du thème

```
nutstreee-theme/
├── assets/                        # CSS, JS, images statiques
│   ├── base.css                   # CSS global Dawn (non modifié)
│   ├── nutstree-mobile.css        # 🆕 CSS mobile : touch targets + bidi
│   ├── sticky-add-to-cart.css     # 🆕 CSS barre sticky panier
│   ├── sticky-add-to-cart.js      # 🆕 JS barre sticky panier
│   ├── component-menu-drawer.css  # ✏️ Couleurs menu mobile Nutstree
│   └── product-sachet.png         # 🆕 Image produit (fond transparent)
├── layout/
│   └── theme.liquid               # ✏️ Injection CSS mobile + sticky ATC
├── sections/
│   ├── hero-3d.liquid             # ✏️ Hero mobile-first (REFONTE TOTALE)
│   ├── nutstree-reassurance.liquid      # 🆕 Bandeau réassurance 4 icônes
│   ├── nutstree-storytelling.liquid     # 🆕 Section "Notre Histoire"
│   ├── nutstree-reviews.liquid          # 🆕 Avis clients carousel
│   ├── nutstree-newsletter.liquid       # 🆕 Newsletter -10% terracotta
│   ├── premium-collection-list.liquid   # 🆕 Grille catégories premium
│   ├── announcement-bar.liquid    # ✏️ Icône camion + flex align
│   ├── cart-icon-bubble.liquid    # ✏️ Bulle panier couleur brand
│   └── storytelling.liquid        # ✏️ Image produit (remplacement placeholder)
├── snippets/
│   └── sticky-add-to-cart.liquid  # 🆕 HTML barre sticky panier
└── templates/
    └── index.json                  # ✏️ Configuration page d'accueil complète

Légende : 🆕 Nouveau · ✏️ Modifié
```

---

## 3. Page d'accueil — Sections personnalisées

La page d'accueil est orchestrée par `templates/index.json` avec **7 sections dans l'ordre** :

### Section 1 — Hero Premium (`hero-3d.liquid`)
> **Problème résolu :** L'ancienne version avait 75% de blanc inutile sur mobile, le sachet était invisible au premier écran.

**Fonctionnalités :**
- Layout **2 colonnes côte à côte dès le mobile** : texte à gauche, produit à droite — plus de scroll pour voir le produit
- Titre avec `<em>` en terracotta pour l'emphase visuelle (ex: "torréfié *avec passion*")
- **Bouton CTA terracotta** avec animation `pulse` pour attirer le doigt
- Bouton secondaire "Nos catégories" (outline)
- **Preuve sociale** : ★★★★★ "200+ clients satisfaits au Maroc" sous les boutons
- **Badge flottant** sur l'image (ex: "100% Artisanal")
- Animation d'entrée `fade-up` (texte) + `fade-scale` (image)
- Image flottante avec animation CSS `translateY` en boucle
- Filigrane texte opacité 2% en arrière-plan

**Personnalisation dans Shopify :**
| Champ | Description |
|---|---|
| Surtitre | Texte rouge au-dessus du titre (ex: "Fruits secs d'exception") |
| Titre principal | Accepte `<em>` pour l'italique coloré |
| Description | Masquée sur mobile pour rester épuré |
| Bouton principal | Texte + lien |
| Bouton secondaire | Texte + lien |
| Photo produit | PNG sans fond recommandé |
| Badge flottant | Texte affiché sur l'image |
| Filigrane | Texte en arrière-plan (très transparent) |
| Nb. clients | Chiffre preuve sociale (ex: "200+") |

---

### Section 2 — Réassurance (`nutstree-reassurance.liquid`)
**4 blocs dynamiques** avec icônes SVG sur-mesure.

**Icônes disponibles :** 🌿 Feuille · 🚚 Camion · ⭐ Étoile · 🔒 Cadenas · 🎁 Cadeau · ✔ Check

**Comportement mobile :** Scroll horizontal fluide (pas de retour à la ligne).

**Pré-configuré avec :**
1. "100% Naturel" — Sans additifs ni conservateurs
2. "Livraison Express" — Partout au Maroc
3. "Qualité Artisanale" — Sélectionné à la source
4. "Paiement Sécurisé" — 100% sécurisé & fiable

---

### Section 3 — Nos Produits Phares (`featured-collection`)
Section Dawn native, reconfigurée :
- **4 produits** affichés (au lieu de 8)
- **Quick Add activé** : bouton "Ajouter au panier" directement sur la carte
- **Swipe mobile** activé (carousel horizontal)
- Pointe vers la collection `all` → affichera vos vrais produits dès l'import

> ℹ️ Les T-shirts/chaussures disparaîtront automatiquement dès que vous importerez vos produits (fruits secs, miel...) dans l'admin Shopify.

---

### Section 4 — Notre Histoire (`nutstree-storytelling.liquid`)
**Design :** Fond vert olive foncé `#3B4F2A` — contraste fort avec les sections crème.

**Layout desktop :** Photo à gauche (50%) + texte + stats à droite (50%).
**Layout mobile :** Image pleine largeur, texte en dessous.

**Fonctionnalités :**
- Badge "Fondé en 2018" superposé sur l'image (personnalisable)
- 3 statistiques clés configurables (200+ clients, 15+ produits, 100% naturel)
- Bouton "Découvrir notre histoire" → vers `/pages/notre-histoire` ou personnalisable
- Dégradé sombre sur l'image pour la lisibilité

**Pour ajouter une vraie photo :** Shopify Admin → Personnaliser → Section "Notre Histoire" → Champ "Photo"

---

### Section 5 — Catégories (`premium-collection-list.liquid`)
**Grille responsive :** 2 colonnes mobile · 3 colonnes desktop (configurable 2-5).

**6 catégories pré-configurées :**
1. Fruits secs
2. Miel
3. Chocolat
4. Fruits confits
5. Épices
6. Cadeaux / Coffrets

**Comportement :** Chaque carte cherche automatiquement l'image de la collection Shopify correspondante. Il suffit de lier chaque bloc à sa collection dans l'éditeur.

**Hover effects :**
- Zoom fluide de l'image (`scale(1.08)`)
- Ombre portée renforcée
- Surélévation de la carte (`translateY(-5px)`)

**Bouton "Voir toutes les catégories"** → `/collections`

---

### Section 6 — Avis Clients (`nutstree-reviews.liquid`)
**Design :** Fond vert clair `#EEF0E8` pour rompre la monotonie crème.

**Fonctionnalités :**
- 3 avis pré-remplis (Casablanca, Rabat, Marrakech)
- Carousel horizontal sur mobile, grille 3 colonnes sur desktop
- Étoiles dorées configurables (1-5)
- Avatar circulaire généré automatiquement (initiale du prénom)
- Devis géant en filigrane sur chaque carte
- Hover : surélévation + ombre portée

**Avis pré-configurés :**
- Fatima Z. (Casablanca) — Pistaches
- Karim M. (Rabat) — Coffret cadeau
- Zineb A. (Marrakech) — Miel + Amandes

> Pour ajouter/modifier des avis : Shopify → Personnaliser → Section "Avis Clients" → Cliquer sur chaque bloc

---

### Section 7 — Newsletter `-10%` (`nutstree-newsletter.liquid`)
**Design :** Dégradé terracotta `#C0622A → #8B3E18` (pleine largeur).

**Fonctionnalités :**
- Badge "-10% Offre de bienvenue" bien visible
- Formulaire email **natif Shopify** (compatible Klaviyo, Mailchimp, etc.)
- Preuve sociale : avatars générés + "500+ gourmands déjà inscrits"
- Message de succès configurable après inscription
- Cercles décoratifs en arrière-plan

**Comment fonctionne la réduction :** Le code promo `-10%` doit être créé manuellement dans Shopify Admin → Remises, puis envoyé via votre app email (Klaviyo recommandé).

---

## 4. Optimisations Mobile

### A. Touch Targets — `assets/nutstree-mobile.css`
Fichier CSS chargé sur **toutes les pages** du site.

| Élément | Taille avant | Taille après |
|---|---|---|
| Hamburger menu | ~36px | 44px (padding 0.65rem) |
| Bouton "Ajouter au panier" | ~42px | **48px** |
| Pastilles de variantes (poids) | ~36px | **44px** + gap 0.6rem |
| Swatches (couleurs) | ~36px | **44px** |
| Boutons quantité ±/+ | ~36px | **44px** |
| Select dropdown variantes | ~36px | **44px** |

### B. Support Bilingue FR / Arabe
```css
/* Empêche le segment arabe d'inverser le sens de lecture FR */
.card__information, .card__heading {
  unicode-bidi: isolate;
}

/* Troncature propre 2 lignes pour les titres mixtes */
.card__heading {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
}

/* Fix wrapping dans flex (texte ne déborde plus) */
.card__content, .card__information {
  min-width: 0;
}
```

### C. Barre Sticky "Ajouter au panier"

**Fichiers :**
- `snippets/sticky-add-to-cart.liquid` — HTML
- `assets/sticky-add-to-cart.css` — Style
- `assets/sticky-add-to-cart.js` — Logique

**Comportement détaillé :**
```
1. IntersectionObserver observe le bouton ATC principal
2. Dès que le bouton sort du viewport → barre glisse depuis le bas
3. MutationObserver observe l'input[.product-variant-id]
4. Changement de variante (ex: 35g → 70g) → prix + titre + dispo mis à jour
5. Variante épuisée → bouton grisé automatiquement
6. Clic → fetch('/cart/add.json') → animation "✓ Ajouté !"
7. dispatch('cart:refresh') → mise à jour du compteur panier header
```

**Spécificité iPhone :**
```css
padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
/* Espace automatique pour l'encoche / barre home iPhone */
```

**Chargement conditionnel :** La barre n'est injectée **que sur les fiches produits** :
```liquid
{% if template.name == 'product' %}
  {% render 'sticky-add-to-cart' %}
{% endif %}
```

### D. Images & Performance
- `loading="lazy"` sur toutes les images de grille
- `loading="eager"` + `fetchpriority="high"` sur l'image hero
- `srcset` multi-résolutions (165w, 360w, 533w, 720w, 940w, 1066w)
- `sizes` adaptatifs selon la grille mobile/tablet/desktop
- `width` et `height` explicites → évite le Layout Shift (CLS)

---

## 5. Historique des commits Git

| Hash | Date | Description |
|---|---|---|
| `70b3586` | 19 Juil 2026 | Mobile Perfect : touch targets, bidi, sticky ATC |
| `c702cc3` | 19 Juil 2026 | Refonte complète page d'accueil (7 sections) |
| `35725a4` | 17 Juil 2026 | Section Catégories Premium |
| `54abca9` | 17 Juil 2026 | Raffinements : icône camion, bulle panier, hero |
| `c837ff4` | 17 Juil 2026 | Remplacement placeholders sacs par produit |
| `18385a2` | 17 Juil 2026 | Image produit PNG fond transparent |
| `fee44c4` | 17 Juil 2026 | Suppression mix-blend-mode (support PNG) |
| `ce721be` | 17 Juil 2026 | Commit initial — sections OS 2.0 premium |

---

## 6. Guide de personnalisation Shopify

### Comment accéder à l'éditeur de thème
1. Admin Shopify → **Boutique en ligne → Thèmes**
2. Sur votre thème : **"Personnaliser"**
3. Sélectionnez **"Page d'accueil"** dans le menu en haut

### Modifier chaque section

| Pour modifier | Dans l'éditeur, cliquer sur |
|---|---|
| Titre hero, CTA, image produit | Section "Hero Premium Nutstree" |
| 4 badges de réassurance | Section "Réassurance Nutstree" → chaque bloc |
| Produits phares | Section "Nos produits phares" |
| Photo/texte/stats histoire | Section "Notre Histoire" |
| Images/liens catégories | Section "Découvrez nos univers" → chaque bloc |
| Avis clients | Section "Avis Clients" → chaque bloc |
| Newsletter | Section "Newsletter Premium" |

### Lier les catégories à vos collections
1. Créez vos 6 collections dans Admin → **Produits → Collections**
2. Dans l'éditeur, ouvrez "Découvrez nos univers"
3. Cliquez sur chaque bloc (Fruits secs, Miel...) → **Champ "Collection Shopify"** → Sélectionnez

### Ajouter des photos aux sections
- **Hero :** Champ "Photo produit" → PNG fond transparent recommandé (800x800px+)
- **Notre Histoire :** Champ "Photo" → Image de l'atelier, de la torréfaction, de la nature
- **Catégories :** Champ "Image" dans chaque bloc → ou laissez vide → utilise l'image de la collection

---

## 7. Guide d'import des produits

### Option A — Fichier CSV Shopify
1. Décompressez votre ZIP de produits
2. Admin → **Produits → Importer**
3. Chargez le `.csv` → Shopify importe tout automatiquement

### Option B — Import manuel (photos uniquement)
Pour chaque produit :
1. Admin → **Produits → Ajouter un produit**
2. **Titre :** Nom du produit (ex: "Amandes grillées au miel")
3. **Médias :** Glissez la photo (fond blanc ou transparent)
4. **Prix :** Entrez le prix en MAD
5. **Organisation** (droite) → **Collections** → Sélectionnez la bonne catégorie
6. **Statut :** Actif → **Enregistrer**

### Bonnes pratiques pour les photos
- Format recommandé : **WebP** ou JPG
- Taille minimale : **800×800px** (carré)
- Fond : Blanc uni ou transparent
- Poids max : 500KB (compressé)

---

## 8. Palette de couleurs & Typographie

### Couleurs

| Rôle | Couleur | Hex | Utilisation |
|---|---|---|---|
| Vert olive (primaire) | 🟢 | `#3B4F2A` | Titres, boutons, icônes |
| Terracotta (accent) | 🟠 | `#C0622A` | CTA, badges, newsletter |
| Doré (secondaire) | 🟡 | `#C5A55A` | Étoiles, stats, badges |
| Crème (fond principal) | 🟡 | `#F5F0E6` | Fond hero, sections crème |
| Fond blanc cassé | ⬜ | `#FEFCF8` | Bandeau réassurance |
| Vert clair (reviews) | 🟩 | `#EEF0E8` | Fond section avis |
| Quasi-noir | ⬛ | `#1E1E1E` | Textes principaux |
| Gris-vert (secondaire) | ⬜ | `#6B6B5C` | Textes secondaires, descriptions |

### Typographie

| Rôle | Police | Poids | Utilisation |
|---|---|---|---|
| Titres | **Playfair Display** | 600-900 | Tous les `h1`, `h2`, `h3` premium |
| Corps | **Inter** | 400-700 | Textes courants, boutons, labels |

> Les polices sont chargées depuis Google Fonts via le CSS des sections. Aucune configuration Shopify requise.

---

## 9. Structure des fichiers modifiés

### Fichiers créés (🆕 11 fichiers)

| Fichier | Rôle | Taille approx. |
|---|---|---|
| `sections/hero-3d.liquid` | Hero mobile-first (refonte) | ~470 lignes |
| `sections/nutstree-reassurance.liquid` | Bandeau 4 icônes | ~230 lignes |
| `sections/nutstree-storytelling.liquid` | Notre Histoire | ~330 lignes |
| `sections/nutstree-reviews.liquid` | Avis clients | ~340 lignes |
| `sections/nutstree-newsletter.liquid` | Newsletter -10% | ~310 lignes |
| `sections/premium-collection-list.liquid` | Grille catégories | ~340 lignes |
| `snippets/sticky-add-to-cart.liquid` | HTML barre sticky | ~56 lignes |
| `assets/nutstree-mobile.css` | CSS mobile global | ~118 lignes |
| `assets/sticky-add-to-cart.css` | CSS barre sticky | ~138 lignes |
| `assets/sticky-add-to-cart.js` | JS barre sticky | ~169 lignes |
| `assets/product-sachet.png` | Image produit PNG | 191 KB |

### Fichiers modifiés (✏️ 6 fichiers)

| Fichier | Modification |
|---|---|
| `templates/index.json` | 7 sections, ordre et config complète |
| `layout/theme.liquid` | Injection CSS mobile + sticky ATC conditionnel |
| `sections/announcement-bar.liquid` | Icône camion SVG + flexbox |
| `sections/cart-icon-bubble.liquid` | Couleur bulle panier → terracotta |
| `assets/component-menu-drawer.css` | Fond crème menu mobile |
| `sections/storytelling.liquid` | Remplacement placeholder sacs par produit |

---

## 🔗 Liens utiles

| Ressource | URL |
|---|---|
| Boutique Shopify | https://nutstreee.myshopify.com |
| Admin Shopify | https://admin.shopify.com/store/nutstreee |
| Dépôt GitHub | https://github.com/ilias-larabi/nutstreee |
| Shopify Dawn (thème base) | https://github.com/Shopify/dawn |
| Shopify OS 2.0 Docs | https://shopify.dev/docs/themes/os20 |

---

*Documentation générée le 19 Juillet 2026 — Projet Nutstree par Antigravity AI*
