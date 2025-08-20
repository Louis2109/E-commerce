# 🤖 Backend - Mervason Marketplace API

API Node.js robuste pour la marketplace e-commerce avec authentification, gestion produits, commandes et paiements.

## 🚀 Technologies

- **Node.js 18+** - Runtime JavaScript serveur
- **Express.js** - Framework web minimaliste
- **PostgreSQL** - Base de données relationnelle
- **Prisma** - ORM moderne avec migrations
- **JWT** - Authentification stateless
- **Bcrypt** - Hachage sécurisé des mots de passe
- **Multer + Cloudinary** - Upload et stockage images
- **Nodemailer** - Envoi d'emails
- **Stripe/CinetPay** - Processeurs de paiement
- **Joi/Zod** - Validation des données

## 📁 Structure du Projet

```
backend/
├── prisma/                  # Schema et migrations DB
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── src/
│   ├── controllers/         # Logique métier des routes
│   │   ├── auth.js         # Authentification
│   │   ├── products.js     # Gestion produits
│   │   ├── orders.js       # Commandes
│   │   ├── payments.js     # Paiements
│   │   ├── merchants.js    # Espace vendeur
│   │   └── users.js        # Profils utilisateurs
│   ├── middleware/          # Middlewares personnalisés
│   │   ├── auth.js         # Vérification JWT
│   │   ├── validation.js   # Validation Joi/Zod
│   │   ├── upload.js       # Upload fichiers
│   │   └── rateLimiter.js  # Limitation requêtes
│   ├── routes/              # Définition des routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   └── merchants.js
│   ├── services/            # Services métier
│   │   ├── emailService.js
│   │   ├── paymentService.js
│   │   ├── imageService.js
│   │   └── whatsappService.js
│   ├── utils/               # Utilitaires
│   │   ├── logger.js
│   │   ├── errors.js
│   │   └── helpers.js
│   ├── config/              # Configuration
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── stripe.js
│   ├── app.js               # Configuration Express
│   └── server.js            # Point d'entrée
├── uploads/                 # Stockage temporaire
├── logs/                    # Fichiers de logs
├── .env                     # Variables d'environnement
├── package.json
└── README.md
```

## 🗃️ Modèle de Données

### Schéma Principal (Prisma)

```prisma
// Users - Clients et Vendeurs
model User {
  id          Int      @id @default(autoincrement())
  email       String   @unique
  password    String
  firstName   String?
  lastName    String?
  phone       String?
  role        Role     @default(CLIENT)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  orders      Order[]
  products    Product[]  // Si merchant
  favorites   Favorite[]
  subscription Subscription?

  @@map("users")
}

enum Role {
  CLIENT
  MERCHANT
  ADMIN
}

// Produits
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Decimal
  originalPrice Decimal?
  stock       Int      @default(0)
  isActive    Boolean  @default(true)
  images      String[] // URLs Cloudinary
  categoryId  Int
  merchantId  Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  category    Category @relation(fields: [categoryId], references: [id])
  merchant    User     @relation(fields: [merchantId], references: [id])
  orderItems  OrderItem[]
  favorites   Favorite[]

  @@map("products")
}

// Catégories
model Category {
  id        Int       @id @default(autoincrement())
  name      String
  slug      String    @unique
  icon      String?
  parentId  Int?
  isActive  Boolean   @default(true)

  // Relations
  products  Product[]
  parent    Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children  Category[] @relation("CategoryHierarchy")

  @@map("categories")
}

// Commandes
model Order {
  id          Int         @id @default(autoincrement())
  userId      Int
  total       Decimal
  status      OrderStatus @default(PENDING)
  shippingAddress Json
  paymentMethod   String
  paymentId   String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  // Relations
  user        User        @relation(fields: [userId], references: [id])
  items       OrderItem[]

  @@map("orders")
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

// Articles dans commande
model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  unitPrice Decimal

  // Relations
  order     Order   @relation(fields: [orderId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@map("order_items")
}

// Favoris
model Favorite {
  id        Int @id @default(autoincrement())
  userId    Int
  productId Int

  // Relations
  user      User    @relation(fields: [userId], references: [id])
  product   Product @relation(fields: [productId], references: [id])

  @@unique([userId, productId])
  @@map("favorites")
}

// Abonnements Merchant
model Subscription {
  id        Int      @id @default(autoincrement())
  userId    Int      @unique
  plan      String   // "basic", "premium"
  status    String   // "active", "cancelled", "expired"
  startDate DateTime
  endDate   DateTime
  createdAt DateTime @default(now())

  // Relations
  user      User     @relation(fields: [userId], references: [id])

  @@map("subscriptions")
}
```

## 🔗 API Endpoints

### Authentification (`/api/auth`)

```javascript
POST / api / auth / register; // Inscription
POST / api / auth / login; // Connexion
POST / api / auth / logout; // Déconnexion
POST / api / auth / refresh; // Refresh token
POST / api / auth / forgot; // Mot de passe oublié
POST / api / auth / reset; // Reset password
```

### Produits (`/api/products`)

```javascript
GET    /api/products          // Liste produits (filtres, pagination)
GET    /api/products/:id      // Détail produit
GET    /api/products/search   // Recherche produits
GET    /api/categories        // Liste catégories

// Routes protégées (merchant)
POST   /api/products          // Créer produit
PUT    /api/products/:id      // Modifier produit
DELETE /api/products/:id      // Supprimer produit
POST   /api/products/:id/images // Upload images
```

### Commandes (`/api/orders`)

```javascript
// Routes protégées (client)
POST   /api/orders            // Créer commande
GET    /api/orders            // Historique commandes user
GET    /api/orders/:id        // Détail commande

// Routes merchant
GET    /api/orders/merchant   // Commandes reçues
PUT    /api/orders/:id/status // Mettre à jour statut
```

### Paiements (`/api/payments`)

```javascript
POST / api / payments / stripe; // Process paiement Stripe
POST / api / payments / cinetpay; // Process paiement CinetPay
POST / api / payments / webhook; // Webhooks paiement
GET / api / payments / methods; // Méthodes disponibles
```

### Utilisateurs (`/api/users`)

```javascript
// Routes protégées
GET    /api/users/profile     // Profil utilisateur
PUT    /api/users/profile     // Modifier profil
GET    /api/users/favorites   // Liste favoris
POST   /api/users/favorites   // Ajouter favori
DELETE /api/users/favorites/:id // Retirer favori
```

### Merchant (`/api/merchant`)

```javascript
// Routes protégées (merchant uniquement)
GET / api / merchant / dashboard; // Statistiques
GET / api / merchant / products; // Mes produits
GET / api / merchant / orders; // Commandes reçues
GET / api / merchant / analytics; // Analytics avancées
POST / api / merchant / subscribe; // S'abonner (upgrade role)
GET / api / merchant / billing; // État abonnement
```

## 🛡️ Sécurité

### Authentification JWT

```javascript
// Génération token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);

// Middleware protection
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

### Validation des Données

```javascript
// Exemple avec Joi
const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().max(1000),
  categoryId: Joi.number().integer().positive().required(),
});

// Middleware validation
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
```

### Rate Limiting

```javascript
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests par IP
  message: "Trop de requêtes, réessayez plus tard",
});

app.use("/api/", apiLimiter);
```

## 💳 Intégrations Paiement

### Stripe

```javascript
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = "eur") => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // centimes
    currency,
    payment_method_types: ["card"],
  });
};
```

### CinetPay (Mobile Money Cameroun)

```javascript
const cinetpay = require("cinetpay-node");

const createPayment = async (orderData) => {
  return await cinetpay.payment.create({
    amount: orderData.total,
    currency: "XAF",
    notify_url: `${process.env.BASE_URL}/api/payments/webhook/cinetpay`,
    return_url: `${process.env.FRONTEND_URL}/order/success`,
  });
};
```

## 📧 Services

### Email Service

```javascript
// Configuration Nodemailer
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Templates emails
const sendOrderConfirmation = async (order, userEmail) => {
  const htmlTemplate = `
    <h2>Commande confirmée #${order.id}</h2>
    <p>Total: ${order.total}€</p>
  `;

  await transporter.sendMail({
    to: userEmail,
    subject: "Confirmation de commande",
    html: htmlTemplate,
  });
};
```

### WhatsApp Integration

```javascript
// Génération URL WhatsApp
const generateWhatsAppURL = (phone, product, total) => {
  const message = encodeURIComponent(
    `Bonjour! Je souhaite commander:\n` +
      `${product.name} - ${total}€\n` +
      `Référence: ${product.id}`
  );

  return `https://wa.me/${phone}?text=${message}`;
};
```

## 🗄️ Base de Données

### Configuration PostgreSQL

```javascript
// config/database.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query"] : [],
});

module.exports = prisma;
```

### Migrations

```bash
# Créer migration
npx prisma migrate dev --name init

# Deployer en production
npx prisma migrate deploy

# Générer client
npx prisma generate

# Reset database
npx prisma migrate reset
```

### Seeding

```javascript
// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Créer catégories par défaut
  await prisma.category.createMany({
    data: [
      { name: "Électronique", slug: "electronique", icon: "📱" },
      { name: "Mode", slug: "mode", icon: "👕" },
      { name: "Maison", slug: "maison", icon: "🏠" },
    ],
  });

  // Créer admin par défaut
  await prisma.user.create({
    data: {
      email: "admin@mervason.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
      firstName: "Admin",
      lastName: "Mervason",
    },
  });
}

main();
```

## 🔧 Configuration

### Variables d'Environnement

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mervason_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"

# API
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"

# Cloudinary
CLOUDINARY_CLOUD_NAME="mervason"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# CinetPay
CINETPAY_API_KEY="your-cinetpay-key"
CINETPAY_SITE_ID="your-site-id"

# Email
EMAIL_USER="noreply@mervason.com"
EMAIL_PASS="your-app-password"

# WhatsApp
WHATSAPP_BUSINESS_NUMBER="237000000000"
```

## 🧪 Développement

### Installation

```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement

# Setup database
npx prisma migrate dev
npx prisma db seed

# Démarrer serveur
npm run dev
```

### Scripts Disponibles

```bash
npm run dev          # Serveur développement (nodemon)
npm run start        # Serveur production
npm run build        # Build pour production
npm run test         # Tests unitaires
npm run migrate      # Migrations Prisma
npm run seed         # Seeding database
npm run studio       # Prisma Studio (GUI DB)
```

## 📊 Monitoring & Logs

### Logging

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Usage
logger.info("User registered", { userId: user.id });
logger.error("Payment failed", { orderId, error: err.message });
```

### Health Check

```javascript
// Route santé application
app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      error: error.message,
    });
  }
});
```

## 🚀 Déploiement

### Production Setup

```bash
# Build
npm run build

# Variables d'environnement production
export NODE_ENV=production
export DATABASE_URL="postgresql://..."

# Migrations
npm run migrate:deploy

# Démarrage
npm start
```

### Docker (Optionnel)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
EXPOSE 3001
CMD ["npm", "start"]
```

---

**Note**: Cette API est conçue pour supporter le frontend React.js et implémenter toutes les fonctionnalités définies dans `docs/Squelette-UI.md`.
