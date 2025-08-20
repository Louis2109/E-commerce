# Mervason Marketplace — UI Spec (Frontend)

> But : Définir **le squelette complet des interfaces** (pages, sections, composants, actions, redirections, états, responsive, thèmes) pour guider le développement React/Tailwind et l’ass- **Catalogue** :

- `loading`: skeletons
- `empty`: illustration + "Aucun produit" + CTA "Voir tout"
- `error`: message + bouton `Réessayer`ce GitHub Copilot.
  > Portée V1 alignée sur le cahier des charges (visiteur → client → commerçant par abonnement, paiement en ligne + WhatsApp).

---

## 0) Tech & conventions

- **Stack** : React (Vite) + Tailwind CSS, React Router, React Query (fetch/cache API), React Hook Form + Zod (forms), Framer Motion (micro-animations).
- **Thèmes** : `light` & `dark` via classe `dark` sur `<html>`.
- **Breakpoints** (Tailwind par défaut) :  
  `sm: ≥640px` · `md: ≥768px` · `lg: ≥1024px` · `xl: ≥1280px`.
- **Tokens (ex.)** :
  - Colors : `primary(#FFD700 - jaune)`, `accent(#333333)`, `surface`, `bg`, `text`, `muted` (déclinés light/dark).
  - Radius : `lg=16px`, `xl=24px`. Ombres douces (cards/buttons).
  - Typo : Poppins/Inter — H1 32/40, H2 24/32, H3 20/28, body 16/24.
- **Nom des routes** : kebab-case (`/product/:id`, `/merchant/subscribe`).
- **Événements (analytics)** : `view_*`, `click_*`, `submit_*`, `purchase_success`, `upgrade_to_merchant`.

---

## 1) Shell applicatif

### 1.1 Layout global

- **Header** (sticky):
  - Gauche : logo (redirige `/`)
  - Centre : barre de recherche (desktop), navigation principale
  - Droite : icônes `search`(mobile), `cart` avec badge, `favorites`, `profile` (menu)
- **Main** : container responsive `max-w-7xl mx-auto px-4 sm:px-6`
- **Footer** :
  - Liens : Qui sommes-nous, Livraison & Retours, Aide & Support, Programme Partenaire
  - Newsletter (optional V1), réseaux sociaux, WhatsApp
- **Dark/Light Mode Toggle** : switch dans header (desktop) ou menu profil (mobile)

### 1.2 Navigation

#### Navigation Principale (Header)

- **🏠 Accueil** - Page d'atterrissage et présentation
- **🏷️ Catégories** - Navigation par type de produit (méga-menu)
- **🛍️ Boutique** - Catalogue de tous les produits par boutique du commerçant (vitrine des boutiques en ligne)
- **🔥 Promotions** - Offres spéciales et réductions
- **📞 Contact** - Support et assistance

#### Navigation Secondaire (Footer)

- **Qui sommes-nous** - À propos de Mervason
- **Livraison & Retours** - Informations logistiques
- **Aide & Support** - FAQ et centre d'aide
- **Programme Partenaire** - Devenir vendeur sur la plateforme et creer ta propre boutique en ligne.

#### Navigation Mobile (Bottom Bar)

- **🏠 Accueil** - Retour à la page principale
- **🔍 Recherche** - Modal de recherche rapide
- **🛒 Panier** - Avec badge du nombre d'articles
- **❤️ Favoris** - Produits sauvegardés
- **👤 Compte** - Profil et authentification

#### Méga-Menu Catégories (Desktop)

```
Électronique          Mode & Beauté         Maison & Jardin
├─ Smartphones        ├─ Vêtements Homme    ├─ Mobilier
├─ Ordinateurs        ├─ Vêtements Femme    ├─ Décoration
├─ Audio/Vidéo        ├─ Chaussures         ├─ Électroménager
└─ Accessoires        └─ Cosmétiques        └─ Jardinage

Sport & Loisirs       Auto & Moto           Services
├─ Fitness            ├─ Pièces Auto        ├─ Livraison
├─ Outdoor            ├─ Accessoires        ├─ Installation
└─ Jeux               └─ Entretien          └─ SAV
```

---

## 2) Cartographie des pages (V1)

### 2.1 Accueil (Landing)

- **URL** : `/`
- **Objectif** : présenter la proposition de valeur et pousser vers boutique/inscription.
- **Structure** :
  1. **Hero** : titre, sous-titre, CTA `Découvrir` → `/boutique`
  2. **Produits phares** (grid 2–4 cols)
  3. **Catégories** (chips/tiles)
  4. **Bannière promo** (code, %)
  5. **Témoignages** (V1 simple)
- **Composants** : `Hero`, `ProductCard`, `CategoryChip`, `PromoBanner`, `Testimonial`
- **Actions/Redirs** :
  - CTA Hero → `/boutique`
  - Click ProductCard → `/product/:id`
  - Click Catégorie → `/boutique?cat=:slug`

### 2.2 Boutique (Catalogue)

- **URL** : `/boutique` (ancien `/catalog`)
- **Objectif** : parcourir/filtrer/ordonner les produits.
- **Structure** :
  - **FilterBar** (search, chips catégories, prix min/max, ordre prix|nouveau)
  - **ProductGrid** (infinite scroll/pagination)
- **Composants** : `SearchInput`, `FilterChip`, `PriceRange`, `SortSelect`, `ProductCard`
- **Actions/Redirs** :
  - Search/filters → met à jour query params
  - Click ProductCard → `/product/:id`

### 2.3 Page produit (Fiche)

- **URL** : `/product/:id`
- **Objectif** : permettre au client d’acheter directement ou contacter le vendeur.
- **Structure** :
  - **Gallery** (1 image V1), **Title**, **Price**, **Rating**, **Short desc**
  - **Actions** : `Acheter maintenant`, `Contacter sur WhatsApp`
  - **Détails** : description, caractéristiques, vendeur (lien vers boutique)
  - **Produits similaires**
- **Composants** : `ImageGallery`, `PriceTag`, `RatingStars`, `BuyNow`, `WhatsAppButton`, `AccordionDetails`
- **Actions/Redirs** :
  - Acheter maintenant → `/checkout`
  - WhatsApp → `https://wa.me/<phone>?text=...productId`

### 2.4 Auth (Connexion / Inscription / Mot de passe)

- **URL** : `/auth/login`, `/auth/register`, `/auth/forgot`
- **Objectif** : accès client (achat) et voie vers commerçant.
- **Structure** :
  - **Forms** : email/tel, password (Zod validations)
  - **Upsell** : “Devenir commerçant ?” → lien `/merchant/subscribe`

### 2.5 Checkout

- **URL** : `/checkout`
- **Objectif** : payer ou WhatsApp fallback.
- **Structure (étapes)** :
  1. **Adresse & Contact** (pré-rempli si profil)
  2. **Mode de paiement** : Visa / OM / MoMo / WhatsApp
  3. **Récap & Confirmation**
- **Composants** : `Stepper`, `AddressForm`, `PaymentMethod`, `OrderSummary`
- **Actions/Redirs** :
  - Submit paiement → gateway (ex. CinetPay) puis retour `/order/success?ref=...`
  - Choix WhatsApp → redirection WA avec message prérempli

### 2.6 Panier & Favoris

- **URL** : `/panier`, `/favoris`
- **Objectif** : gérer les produits sélectionnés et sauvegardés.
- **Structure** :
  - **Panier** : liste produits, quantités, total, CTA checkout
  - **Favoris** : grid de produits sauvegardés, bouton "Ajouter au panier"
- **Composants** : `CartItem`, `QuantitySelector`, `FavoriteCard`, `CartSummary`

### 2.7 Pages Catégories

- **URL** : `/categories/:slug`
- **Objectif** : navigation par type de produit avec filtres spécialisés.
- **Structure** : similaire à Boutique mais avec filtres pré-appliqués par catégorie.

### 2.8 Page Promotions

- **URL** : `/promotions`
- **Objectif** : mettre en avant les offres spéciales et codes promo.
- **Structure** : bannières promotionnelles, grille de produits en promotion, codes de réduction.

### 2.9 Compte client

- **URL** : `/account`
- **Objectif** : gérer infos + historique commandes.
- **Structure** :
  - **Tabs** : Profil | Commandes | Paiements (simple V1)
  - **Profil** : nom, email, tel, mdp
  - **Commandes** : table/tiles (statut, date, total, lien détail)

### 2.10 Abonnement commerçant

- **URL** : `/merchant/subscribe`
- **Objectif** : payer l’abonnement pour activer le rôle vendeur.
- **Structure** : pitch bénéfices, prix, CTA `S’abonner`.
- **Actions/Redirs** :
  - Paiement success → rôle `merchant` + redir `/merchant/dashboard`

### 2.11 Espace vendeur (après abonnement)

- **Dashboard**
  - **URL** : `/merchant/dashboard`
  - **Objectif** : vue d’ensemble simple (V1 : métriques basiques)
  - **Structure** : cartes KPI (ventes, produits actifs), boutons raccourcis
- **Mes produits**
  - **URL** : `/merchant/products`
  - **Objectif** : CRUD produits
  - **Structure** : table/grid, boutons `Créer`, `Éditer`, `Supprimer`
  - **Form produit** : titre, prix, stock, catégorie, images (V1 : 1 image)
- **Abonnement**
  - **URL** : `/merchant/billing`
  - **Objectif** : état abonnement, renouvellement (si applicable)

### 2.12 Pages légales & contact

- **URL** : `/legal/terms`, `/legal/privacy`, `/contact`
- **Objectif** : crédibilité + support.

---

## 3) Composants (Design System V1)

- **Atoms**
  - `Button` (jaune primaire, outline, ghost, sm/md/lg, loading state)
  - `Input`, `Select`, `Checkbox`, `Radio`, `TextArea`
  - `Badge`, `Chip`, `Tag`
  - `PriceTag`, `RatingStars`, `Avatar`
  - `ThemeToggle` (dark/light mode switch)
- **Molecules**
  - `ProductCard` (img 4:3, title, price, rating, CTA)
  - `FilterBar` (SearchInput + FilterChip + SortSelect + PriceRange)
  - `OrderStep` (timeline)
  - `CartItem`, `FavoriteCard`
  - `CategoryMenu` (méga-menu avec sous-catégories)
- **Organisms**
  - `Header`, `Footer`, `ProductGrid`, `CheckoutForm`, `ProfileTabs`, `MerchantTable`
  - `MobileBottomBar`, `MegaMenu`, `SearchModal`
- **Patterns**
  - **Skeletons** pour loading
  - **Empty States** (aucun produit)
  - **Toasts** feedback (success, error)

---

## 4) Redirections & règles d’accès

- **Routes publiques** : `/`, `/boutique`, `/product/:id`, `/categories/:slug`, `/promotions`, `/auth/*`, `/contact`, `/legal/*`
- **Routes privées (client)** : `/checkout`, `/account`, `/panier`, `/favoris`, `/order/:id`  
  → rediriger vers `/auth/login?redirect=<route>` si non connecté.
- **Routes vendeur (role=merchant)** : `/merchant/*`  
  → si **non merchant** : rediriger `/merchant/subscribe`.
- **Après paiement** :
  - Achat → `/order/success?ref=...`
  - Abonnement → `/merchant/dashboard`
- **WhatsApp fallback** : ouvrir `wa.me/<phone>?text=<encoded-context>`

---

## 5) États & erreurs (exemples)

- **Catalogue** :

  - `loading`: skeletons
  - `empty`: illustration + “Aucun produit” + CTA “Voir tout”
  - `error`: message + bouton `Réessayer`

- **Checkout** :
  - `processing`: désactive boutons + spinner
  - `payment_failed`: afficher cause + CTA réessayer ou WhatsApp

---

## 6) Responsive & thèmes

- **Mobile-first** : 1 colonne (cards en `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-4`)
- **Header** : search inline (desktop), icône (mobile, ouvre modal)
- **Sticky CTAs** : `Acheter maintenant` et `WhatsApp` visibles en mobile
- **Dark mode** : surfaces sombres, texte clair, jaune primaire inchangé.

---

## 7) Exemples d’interactions (pseudo)

- **Buy Now**
  - `click_buy_now(productId)` → `checkoutStore.set(productId)` → redirect `/checkout`
- **Checkout**
  - `submit_checkout(form)` → `POST /orders` → redirect `/order/success?ref=...`
- **Upgrade to merchant**
  - `click_subscribe()` → `POST /billing/session` → open gateway → success → `PATCH /users/me{role=merchant}` → redirect `/merchant/dashboard`

---

## 8) Contenus & textes (V1)

- **Hero** :
  - Titre : “Trouvez & vendez des produits uniques”
  - Sous-titre : “Achetez en ligne, payez par Visa, OM, MoMo ou WhatsApp”
  - CTA : “Découvrir”
- **Empty states** :
  - Catalog vide : “Aucun produit ne correspond…”
- **Messages clés** : courts, actionnables, positifs.

---

## 9) Accessibilité & performance

- Contraste AA, focus visible, cibles tactiles ≥ 44px
- Images : lazy-loading, `aspect-[4/3]`, formats WebP/AVIF
- Formulaires : messages d’erreur clairs, labels reliés
- SEO (si Next) : balises meta / schema.org (V2)

---

## 10) Hors-scope V1 (roadmap V2)

- Multi-images produit, variantes (taille/couleur), avis clients
- Facturation PDF, coupons avancés, tableau de bord analytics détaillé
- Admin global, modération, notifs temps réel

---
