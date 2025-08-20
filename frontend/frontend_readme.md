# 🤖 Frontend - Mervason Marketplace

Application React.js moderne pour la marketplace e-commerce Mervason avec interface utilisateur complète et responsive.

## 🚀 Technologies

- **React 18** - Bibliothèque UI avec hooks modernes
- **Vite** - Build tool ultra-rapide et HMR
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Navigation SPA
- **React Query** - Gestion état serveur et cache API
- **React Hook Form + Zod** - Formulaires avec validation
- **Framer Motion** - Animations fluides
- **Axios** - Client HTTP

## 📁 Structure du Projet

```
frontend/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── atoms/           # Boutons, inputs, etc.
│   │   ├── molecules/       # ProductCard, SearchBar, etc.
│   │   └── organisms/       # Header, Footer, ProductGrid
│   ├── pages/               # Pages principales
│   │   ├── Home.jsx         # Accueil
│   │   ├── Boutique.jsx     # Catalogue produits
│   │   ├── Product.jsx      # Détail produit
│   │   ├── Checkout.jsx     # Processus commande
│   │   ├── Auth/            # Connexion/Inscription
│   │   ├── Account/         # Espace client
│   │   └── Merchant/        # Espace vendeur
│   ├── hooks/               # Hooks personnalisés
│   ├── services/            # API calls et logique métier
│   ├── stores/              # État global (Zustand)
│   ├── utils/               # Fonctions utilitaires
│   ├── styles/              # Styles globaux et thèmes
│   ├── App.jsx              # Composant racine
│   └── main.jsx             # Point d'entrée
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Couleurs Principales

```css
/* Mode Clair */
--primary: #FFD700          /* Jaune doré Mervason */
--primary-dark: #E6C200     /* Variant foncé */
--background: #FFFFFF       /* Fond principal */
--surface: #F8F9FA         /* Cartes et sections */
--text-primary: #1A1A1A    /* Texte principal */
--accent-blue: #3B82F6     /* Liens et CTAs secondaires */

/* Mode Sombre */
--background-dark: #0F0F0F
--surface-dark: #1F1F1F
--text-primary-dark: #FFFFFF
```

### Typographie

- **Font Stack**: Inter (primary), Poppins (secondary)
- **Échelle**: H1(32px) → H2(24px) → H3(20px) → Body(16px) → Caption(14px)

### Breakpoints

- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

## 🗂️ Pages & Routes

### Routes Publiques

- `/` - Page d'accueil
- `/boutique` - Catalogue produits
- `/product/:id` - Détail produit
- `/categories/:slug` - Produits par catégorie
- `/promotions` - Offres spéciales
- `/auth/login` - Connexion
- `/auth/register` - Inscription
- `/contact` - Contact et support

### Routes Privées (Client connecté)

- `/account` - Profil utilisateur
- `/account/orders` - Historique commandes
- `/panier` - Panier d'achat
- `/favoris` - Liste favoris
- `/checkout` - Processus commande

### Routes Merchant (Vendeur abonné)

- `/merchant/subscribe` - Page abonnement
- `/merchant/dashboard` - Tableau de bord
- `/merchant/products` - Gestion produits
- `/merchant/orders` - Commandes reçues
- `/merchant/billing` - Facturation

## 🔧 Fonctionnalités Clés

### ✅ Interface Utilisateur

- [x] Header responsive avec navigation
- [x] Méga-menu catégories (desktop)
- [x] Bottom bar navigation (mobile)
- [x] Toggle dark/light mode
- [x] Search avec autocomplete
- [x] Badges temps réel (panier, favoris)

### ✅ E-commerce Core

- [x] Catalogue produits avec filtres/tri
- [x] Panier persistent (localStorage)
- [x] Favoris synchronisés
- [x] Checkout multi-étapes
- [x] Intégration WhatsApp fallback
- [x] Gestion commandes

### ✅ Authentification

- [x] Connexion/Inscription
- [x] Profil utilisateur
- [x] Guards de routes privées
- [x] Persistance session

### ✅ Merchant Features

- [x] Système abonnement
- [x] Gestion produits (CRUD)
- [x] Dashboard vendeur
- [x] Analytics basiques

## 🛠️ Composants Réutilisables

### Atoms

```jsx
<Button variant="primary|outline|ghost" size="sm|md|lg" />
<Input type="text|email|password" validation={schema} />
<Badge count={3} variant="primary|error|success" />
<ThemeToggle />
```

### Molecules

```jsx
<ProductCard product={data} onAddToCart={handler} />
<SearchBar onSearch={handler} suggestions={array} />
<CategoryMenu categories={data} />
<PriceRange min={0} max={1000} onChange={handler} />
```

### Organisms

```jsx
<Header user={data} cartCount={3} />
<ProductGrid products={array} loading={bool} />
<CheckoutForm onSubmit={handler} />
<MerchantSidebar role="merchant" />
```

## 🔄 État Global (Stores)

### User Store

```javascript
// Authentification et profil
const useUserStore = {
  user: null,
  isAuthenticated: false,
  login: (credentials) => {},
  logout: () => {},
  updateProfile: (data) => {},
};
```

### Cart Store

```javascript
// Panier d'achat
const useCartStore = {
  items: [],
  total: 0,
  addItem: (product, quantity) => {},
  removeItem: (productId) => {},
  clearCart: () => {},
};
```

### App Store

```javascript
// État application
const useAppStore = {
  theme: "light",
  toggleTheme: () => {},
  favorites: [],
  addToFavorites: (productId) => {},
};
```

## 🔌 Intégrations API

### Services

```javascript
// API calls centralisées
export const productService = {
  getAll: (filters) => api.get("/products", { params: filters }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get("/products/search", { params: { q: query } }),
};

export const orderService = {
  create: (orderData) => api.post("/orders", orderData),
  getHistory: () => api.get("/orders/history"),
};
```

### React Query

```javascript
// Cache et synchronisation
const useProducts = (filters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## 📱 Responsive Design

### Mobile First

- Navigation bottom bar
- Cards en grille 1 colonne → 2 → 4
- Menu hamburger
- Touch-friendly interactions

### Progressive Enhancement

- Desktop: méga-menu, hover states
- Tablet: layout intermédiaire
- PWA ready (icons, manifest)

## 🎭 Thèmes & Accessibilité

### Dark/Light Mode

```javascript
// Toggle automatique avec persistance
const { theme, toggleTheme } = useTheme()

// Classes conditionnelles
<div className={theme === 'dark' ? 'dark' : ''}>
```

### Accessibilité

- Focus indicators visibles
- Alt text sur images
- ARIA labels
- Contraste couleurs WCAG AA
- Navigation clavier

## 🚀 Performance

### Optimisations

- Code splitting par route
- Lazy loading images
- Virtual scrolling (listes longues)
- Debounced search
- Optimistic updates

### Bundle Analysis

```bash
npm run build
npm run analyze
```

## 🧪 Développement

### Installation

```bash
cd frontend
npm install
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Serveur développement
npm run build        # Build production
npm run preview      # Preview build
npm run lint         # ESLint
npm run format       # Prettier
```

### Variables d'Environnement

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WHATSAPP_NUMBER=237000000000
VITE_CLOUDINARY_CLOUD_NAME=mervason
```

## 📋 Prochaines Étapes

### Phase 1 - Foundation (Sprint 1)

- [x] Setup Vite + React + Tailwind
- [x] Design system et composants atoms
- [x] Routing et layout de base
- [x] Pages principales (Home, Boutique, Product)

### Phase 2 - Core Features (Sprint 2)

- [ ] Authentification complète
- [ ] Panier et favoris fonctionnels
- [ ] Checkout avec paiement
- [ ] Intégration API backend

### Phase 3 - Advanced (Sprint 3)

- [ ] Espace merchant
- [ ] Dashboard analytics
- [ ] Optimisations performance
- [ ] Tests e2e

## 🐛 Debugging

### Dev Tools

- React Developer Tools
- Redux DevTools (pour stores)
- Network tab pour API calls
- Lighthouse pour performance

### Logs Utiles

```javascript
// Debug API calls
console.log("API Response:", data);

// Performance monitoring
console.time("Component Render");
console.timeEnd("Component Render");
```

---

**Note**: Ce frontend est conçu pour fonctionner avec l'API backend Node.js et suit les spécifications UI définies dans `docs/Squelette-UI.md`.
