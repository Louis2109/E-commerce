# Backend - Mervason Marketplace API

Ce dossier contiendra l'API Node.js du projet (Phase 2).

## Structure Prévue

Simple et fonctionnelle

## Technologies

- **Node.js** : Runtime JavaScript
- **Express.js** : Framework web
- **PostgreSQL** : Base de données
- **Prisma** : ORM moderne
- **JWT** : Authentification
- **Bcrypt** : Hachage mots de passe
- **Multer** : Upload de fichiers
- **Cloudinary** : Stockage d'images
- **Nodemailer** : Envoi d'emails

## APIs Principales

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Refresh token

### Produits

- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détail produit
- `POST /api/products` - Créer produit (vendeur)
- `PUT /api/products/:id` - Modifier produit
- `DELETE /api/products/:id` - Supprimer produit

### Commandes

- `POST /api/orders` - Créer commande
- `GET /api/orders` - Historique commandes
- `GET /api/orders/:id` - Détail commande
- `PUT /api/orders/:id/status` - Mettre à jour statut

### Paiements

- `POST /api/payments/stripe` - Paiement Stripe
- `POST /api/payments/webhook` - Webhooks paiement

## Base de Données

### Modèles Principaux

```sql
-- Users (clients et vendeurs)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'client',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  vendor_id INTEGER REFERENCES users(id),
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL NOT NULL,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Sécurité

- **Validation** : Joi/Zod pour toutes les entrées
- **Rate Limiting** : Express-rate-limit
- **CORS** : Configuration stricte
- **Helmet** : Headers de sécurité
- **Sanitization** : XSS protection

## Déploiement

- Auto-deployment depuis GitHub
- Base de données PostgreSQL
- Variables d'environnement sécurisées
- Monitoring et logs
- Backups automatiques

## Documentation API

Une documentation interactive sera générée avec **Swagger/OpenAPI** accessible sur `/api/docs`.
