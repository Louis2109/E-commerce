# 🤖 Mervason Marketplace - Test Interfaces

Ce dossier contient les interfaces HTML/CSS/JavaScript pour tester et valider le design system du projet E-commerce Mervason Marketplace.

## 📁 Structure du projet

```
test/
├── index.html              # Page d'accueil
├── boutique.html            # Page boutique (ancien catalog.html)
├── catalog.html             # Ancienne page (maintenant redirigée)
├── product.html             # Page détail produit
├── checkout.html            # Processus de commande
├── panier.html              # Page panier d'achat
├── favoris.html             # Page favoris/wishlist
├── promotions.html          # Page promotions et offres spéciales
├── styles.css               # Styles CSS personnalisés
├── README.md                # Documentation principale
├── auth/
│   ├── login.html          # Page de connexion
│   └── register.html       # Page d'inscription
└── scripts/
    ├── main.ts             # Fichier TypeScript principal
    ├── main.js             # Fichier JavaScript compilé
    ├── catalog.js          # Logique du catalogue/boutique
    ├── product.js          # Logique de la page produit
    ├── auth.js             # Logique d'authentification
    ├── checkout.js         # Logique de commande
    ├── panier.js           # Logique du panier
    ├── favoris.js          # Logique des favoris
    └── promotions.js       # Logique des promotions
```

## 🎨 Design System

Le projet utilise **Tailwind CSS** avec un design system complet basé sur `design-system.json` :

### Typographie

- **Fonts**: Inter (primary), Poppins (secondary), avec fallbacks système
- **Échelle**: H1 (32px), H2 (24px), H3 (20px), Subtitle (18px), Body (16px), Caption (14px), Overline (12px)
- **Poids**: 300-700 avec poids spécifiques selon le contexte

### Couleurs & Thèmes

#### Mode clair

- **Primary**: `#FFD700` (Jaune doré)
- **Primary Dark**: `#E6C200`
- **Accent Blue**: `#3B82F6`
- **Surface**: `#F8F9FA`
- **Surface Secondary**: `#F5F5F5`
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

#### Mode sombre

- **Background**: `#0F0F0F`
- **Surface**: `#1F1F1F`
- **Surface Secondary**: `#2A2A2A`
- **Accent Blue**: `#60A5FA`
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#B0B0B0`

### Radius & Spacing

- **Radius**: sm (8px), md (12px), lg (16px), xl (24px), pill (999px)
- **Spacing**: Système basé sur 4px (1=4px, 2=8px, 3=12px, etc.)

### Shadows & Elevation

- **Level 1**: Éléments de base (cards)
- **Level 2**: Éléments en hover
- **Level 3**: Modals et overlays

### Animations & Motion

- **Easing**: Standard, Enter, Exit, Bounce
- **Durée**: Fast (120ms), Normal (200ms), Slow (320ms), Long (480ms)
- **Animations**: Fade-in, Slide-up, Bounce-in

### Système de Composants

Le design system implémente un système de classes CSS modulaires :

#### Boutons

```css
.btn-primary    /* Bouton principal (jaune doré) */
/* Bouton principal (jaune doré) */
.btn-outline    /* Bouton contour */
.btn-ghost; /* Bouton transparent */
```

#### Cards

```css
.card           /* Card de base */
/* Card de base */
.product-card; /* Card produit avec hover effects */
```

#### Typographie

```css
.text-h1, .text-h2, .text-h3     /* Hiérarchie des titres */
.text-subtitle, .text-body        /* Corps de texte */
.text-caption, .text-overline; /* Textes secondaires */
```

#### Inputs

```css
.input-field/* Champs de saisie standardisés */;
```

#### Animations

```css
.animate-fade-in    /* Apparition en fondu */
/* Apparition en fondu */
.animate-slide-up   /* Glissement vers le haut */
.animate-bounce-in; /* Entrée avec rebond */
```

#### Shadows

```css
.shadow-level-1    /* Ombre légère */
/* Ombre légère */
.shadow-level-2    /* Ombre moyenne */
.shadow-level-3; /* Ombre profonde */
```

#### 🌙 Comment utiliser le Dark Mode

**Méthode 1 : Via le toggle dans le header**

1. Cliquez sur l'icône 🌙 (mode sombre) ou ☀️ (mode clair) dans le header
2. Le changement est immédiat et sauvegardé automatiquement
3. Disponible sur toutes les pages

**Méthode 2 : Via JavaScript (pour développeurs)**

```javascript
// Toggle entre les modes
window.appState.toggleDarkMode();

// Forcer le mode sombre
window.appState.setDarkMode(true);

// Forcer le mode clair
window.appState.setDarkMode(false);

// Vérifier le mode actuel
const isDarkMode = window.appState.getDarkMode();
```

**Méthode 3 : Détection automatique**

- Le système détecte automatiquement la préférence du navigateur au premier chargement
- Si vous avez défini "Dark" dans vos paramètres système, le site s'adaptera automatiquement

**Persistance**

- Le choix est sauvegardé dans `localStorage`
- Il persiste entre les sessions de navigation
- Compatible avec tous les navigateurs modernes

### Breakpoints

- `sm`: ≥640px
- `md`: ≥768px
- `lg`: ≥1024px
- `xl`: ≥1280px

## 🔧 Fonctionnalités implémentées

### ✅ Interface utilisateur

- [x] Header responsive avec navigation
- [x] Footer avec liens utiles
- [x] Navigation mobile (bottom bar)
- [x] Menu profil avec toggle dark mode
- [x] Design responsive mobile-first

### ✅ Pages principales

- [x] **Accueil** : Hero, produits phares, catégories, bannière promo
- [x] **Boutique** : Filtres, recherche, tri, pagination (anciennement Catalogue)
- [x] **Produit** : Galerie, détails, accordéon, produits similaires
- [x] **Panier** : Gestion des articles, quantités, résumé commande
- [x] **Favoris** : Liste de souhaits, tri, gestion
- [x] **Promotions** : Ventes flash, codes promo, countdown timers
- [x] **Authentification** : Connexion, inscription avec validation
- [x] **Commande** : Processus en 3 étapes (adresse, paiement, confirmation)

### ✅ Nouvelles Fonctionnalités (Mise à jour e-commerce)

- [x] **Navigation repensée** : 🏠 Accueil | 🏷️ Catégories | 🛍️ Boutique | 🔥 Promotions | 📞 Contact
- [x] **Bottom Bar Mobile** : Navigation rapide (Accueil, Recherche, Panier, Favoris, Compte)
- [x] **Badges en temps réel** : Compteurs d'articles dans panier et favoris
- [x] **Toggle Dark/Light Mode** : Basculement instantané avec icône dans le header
- [x] **Méga-menu Catégories** : 6 sections principales avec sous-catégories
- [x] **Pages dédiées** : Panier, Favoris, Promotions avec fonctionnalités complètes
- [x] **Gestion localStorage** : Panier et favoris persistants entre les sessions

### ✅ Fonctionnalités JavaScript/TypeScript

- [x] Gestion d'état global (utilisateur, panier, thème)
- [x] Système de notifications (toasts)
- [x] Validation de formulaires
- [x] Analytics (tracking d'événements)
- [x] Gestion avancée du panier (quantités, suppression, badges)
- [x] Système de favoris complet (tri, filtres)
- [x] Countdown timers pour promotions
- [x] Support WhatsApp
- [x] Stockage local (localStorage)
- [x] Dark/Light mode toggle avec persistance

### ✅ Composants réutilisables

- [x] Cards produit avec rating
- [x] Système de notation (étoiles)
- [x] Buttons avec variantes
- [x] Accordéons
- [x] Steppers
- [x] Loading states
- [x] Empty states

## 🚀 Utilisation

### Lancement rapide

1. Ouvrir `index.html` dans un navigateur moderne
2. Naviguer entre les pages via les liens
3. Tester les fonctionnalités :
   - **🌙 Dark Mode** : Cliquer sur l'icône 🌙/☀️ dans le header
   - **🛒 Panier** : Ajouter des produits et gérer les quantités
   - **❤️ Favoris** : Sauvegarder des produits pour plus tard
   - **🔥 Promotions** : Découvrir les offres et codes promo
   - Recherche et filtres dans la boutique
   - Navigation mobile avec bottom bar
   - Processus de commande complet
   - Authentification

### 🌓 Guide d'utilisation du Dark Mode

**Où le trouver :**

- Sur toutes les pages : Header → Icône 🌙 (mode sombre) / ☀️ (mode clair)
- Disponible sur desktop et mobile

**Fonctionnement :**

- **Clic simple** : Bascule entre les modes instantanément
- **Sauvegarde automatique** : Votre choix est mémorisé dans localStorage
- **Responsive** : Fonctionne sur mobile et desktop
- **Détection système** : S'adapte à vos préférences navigateur par défaut

### 📱 Navigation Mobile

**Bottom Bar (mobile uniquement) :**

- 🏠 **Accueil** : Retour à la page principale
- 🔍 **Recherche** : Modal de recherche rapide
- 🛒 **Panier** : Accès direct avec badge du nombre d'articles
- ❤️ **Favoris** : Liste de souhaits avec badge
- 👤 **Compte** : Authentification et profil

### 🛒 Gestion du Panier

**Fonctionnalités :**

- Ajout de produits depuis n'importe quelle page
- Modification des quantités
- Suppression d'articles
- Calcul automatique du total avec frais de livraison
- Badges temps réel sur toutes les pages
- Sauvegarde localStorage (persistant entre les sessions)
- Redirection vers checkout

### ❤️ Système de Favoris

**Fonctionnalités :**

- Ajout/suppression de favoris depuis les pages produit et promotions
- Tri par : récent, prix, nom
- Ajout au panier depuis les favoris
- Badges temps réel
- Sauvegarde localStorage

**Pages compatibles :**

- ✅ Accueil (`index.html`)
- ✅ Catalogue (`catalog.html`)
- ✅ Page produit (`product.html`)
- ✅ Checkout (`checkout.html`)
- ✅ Authentification (`auth/login.html`, `auth/register.html`)

**Éléments qui changent :**

- Arrière-plans (blanc ↔ sombre)
- Couleurs de texte (noir ↔ blanc)
- Couleurs des cartes et surfaces
- Bordures et séparateurs
- Icônes et boutons

### Données de test

- **Login** : Utilisez `password123` comme mot de passe avec n'importe quel email/téléphone
- **Produits** : Données générées automatiquement via JavaScript
- **Paiement** : Simulation avec 90% de taux de succès

## 📱 Responsive Design

### Mobile (≤768px)

- Navigation bottom bar
- Recherche mobile (modal)
- Cards produit adaptées
- Processus de commande optimisé
- CTAs sticky sur page produit

### Desktop (≥1024px)

- Navigation header complète
- Sidebars pour filtres
- Grilles multi-colonnes
- Hover effects

## 🎯 Fonctionnalités avancées

### Accessibilité

- Support des lecteurs d'écran
- Navigation au clavier
- Contraste élevé (AA)
- Focus visible
- Textes alternatifs

### Performance

- Images lazy loading
- Debouncing sur recherche
- Skeleton loaders
- Optimisations CSS

### UX/UI

- Micro-animations
- Feedback utilisateur
- États de chargement
- Messages d'erreur clairs
- Empty states

## 🔮 Intégrations simulées

### Paiement

- **Visa/MasterCard** : Gateway simulé
- **Orange Money** : Redirection simulée
- **MTN Mobile Money** : Redirection simulée
- **WhatsApp** : Génération de message et redirection

### Analytics

- Events tracking (console.log)
- User journey mapping
- Conversion funnel

## 🧪 Tests

### Navigation

1. **Parcours utilisateur** : Accueil → Catalogue → Produit → Commande
2. **Authentification** : Inscription → Connexion → Commande
3. **Recherche et filtres** : Tester toutes les options
4. **🌙 Dark Mode** :
   - Tester sur toutes les pages
   - Vérifier la persistance après rechargement
   - Valider l'adaptation responsive

### Responsive

1. Tester sur mobile (DevTools ou appareil réel)
2. Vérifier la bottom navigation mobile
3. Tester les formulaires sur mobile
4. Valider les sticky elements
5. **Dark mode responsive** : Tester le toggle sur mobile

### Fonctionnalités Dark Mode

1. **Test de base** :

   ```bash
   # Ouvrir index.html
   # Cliquer profil → "Mode sombre"
   # Vérifier : fond noir, texte blanc
   ```

2. **Test de persistance** :

   ```bash
   # Activer le dark mode
   # Recharger la page (F5)
   # Vérifier : mode sombre conservé
   ```

3. **Test multi-pages** :

   ```bash
   # Activer dark mode sur index.html
   # Naviguer vers catalog.html
   # Vérifier : dark mode actif
   ```

4. **Test navigateur** :
   ```bash
   # Régler système en mode sombre
   # Ouvrir site en navigation privée
   # Vérifier : dark mode auto-détecté
   ```

### Fonctionnalités

1. Ajouter produits au panier
2. Processus de commande complet
3. Validation formulaires
4. Messages d'erreur
5. WhatsApp integration

## 📋 Notes importantes

- **TypeScript** : Les fichiers `.ts` sont fournis pour référence, utiliser les `.js` compilés
- **Tailwind** : CDN utilisé pour simplicité, remplacer par build process en production
- **Données** : Mock data générée côté client, remplacer par API calls
- **Paiement** : Simulations uniquement, intégrer vrais gateways en production

## 🎨 Personnalisation

### Couleurs et Thèmes

**Modifier les couleurs principales :**

```javascript
// Dans le script Tailwind (head des pages HTML)
colors: {
    'primary': '#FFD700',        // Couleur principale (jaune doré)
    'primary-dark': '#E6C200',   // Variante sombre
    'accent': '#333333',         // Couleur d'accent
    'surface': '#F8F9FA',        // Surface claire
    // Ajouter vos couleurs personnalisées ici
}
```

**Personnaliser le Dark Mode :**

```css
/* Dans styles.css - Modifier les classes dark: */
.dark .bg-white {
  background-color: #1a1a1a;
}
.dark .text-gray-900 {
  color: #f1f1f1;
}
.dark .border-gray-200 {
  border-color: #374151;
}

/* Ajouter vos propres styles dark mode */
.dark .my-custom-element {
  background-color: #2d3748;
  color: #e2e8f0;
}
```

**Variables CSS personnalisées :**

```css
:root {
  /* Mode clair */
  --primary-color: #ffd700;
  --bg-color: #ffffff;
  --text-color: #000000;
}

.dark {
  /* Mode sombre */
  --primary-color: #e6c200;
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}
```

### Contenu et Messages

**Modifier les textes d'interface :**

- Textes statiques : directement dans les fichiers HTML
- Messages dynamiques : dans les fichiers JavaScript (`/scripts/`)
- Labels du dark mode : dans le menu profil des pages HTML

**Personnaliser les messages du dark mode :**

```html
<!-- Dans le menu profil de chaque page HTML -->
<div
  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
  onclick="toggleDarkMode()"
>
  <span class="dark-mode-text">🌙 Mon Thème Sombre</span>
</div>
```

### Mock Data

**Modifier les données de test :**

- Produits : `main.js` → fonction `generateMockProducts()`
- Utilisateurs : `auth.js` → données de test
- Catégories : `main.js` → array `categories`

---

**Statut** : ✅ Interface complète et fonctionnelle  
**Tech Stack** : HTML5, CSS3, JavaScript ES6+, Tailwind CSS  
**Compatibilité** : Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## 📚 Documentation complémentaire

- **`DARK_MODE_GUIDE.md`** : Guide détaillé pour utiliser et personnaliser le dark mode
- **`docs/design-system.json`** : Spécifications du design system
- **`docs/Squelette UI.md`** : Structure et composants UI

---

_Cette interface sert de base pour l'implémentation React/Vite du projet principal._
