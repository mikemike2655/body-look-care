# Body Look Care (BLC) — Documentation Projet

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Stack technique](#stack-technique)
4. [Installation locale](#installation-locale)
5. [Structure du projet](#structure-du-projet)
6. [Frontend — Pages & Routes](#frontend--pages--routes)
7. [Intégration Medusa v2](#intégration-medusa-v2)
8. [Flux e-commerce](#flux-e-commerce)
9. [Données produits](#données-produits)
10. [Authentification](#authentification)
11. [Admin CMS](#admin-cms)
12. [Déploiement](#déploiement)
13. [Variables d'environnement](#variables-denvironnement)
14. [API Medusa — Endpoints utilisés](#api-medusa--endpoints-utilisés)
15. [Dépannage](#dépannage)

---

## Vue d'ensemble

**Body Look Care** est un e-commerce de soins naturels (drainage lymphatique, anti-cellulite) fondé par Marie-Julie Parant, infirmière. Le site vend des produits formulés en France avec les Laboratoires Lehning.

**Produits principaux :**
- Le Draineur (gélules drainage lymphatique)
- Miracle Cream (anti-cellulite)
- Miracle Scrub (gommage corps)
- Pack Découverte, Pack Transformation, Pack Cure Intensive

**URLs :**
- Production : [bodylookcare.shop](https://bodylookcare.shop)
- Repo GitHub : `github.com/mikemike2655/Blc`
- Branche principale : `medusa-frontend-v2`

---

## Architecture

```
┌─────────────────────┐     API REST      ┌──────────────────────┐
│   Frontend React    │ ◄──────────────►  │  Medusa v2 Backend   │
│   (port 3000)       │   /store/*        │  (port 9000)         │
│                     │                    │                      │
│  - CRA + Craco      │                    │  - Products          │
│  - Tailwind CSS     │                    │  - Cart              │
│  - Medusa JS SDK    │                    │  - Orders            │
│  - Embla Carousel   │                    │  - Auth/Customers    │
│  - Framer Motion    │                    │  - Regions           │
│  - Radix UI         │                    │  - Payment           │
└─────────────────────┘                    │  - Shipping          │
        │                                  └──────────┬───────────┘
        │                                             │
        │                                   ┌─────────▼──────────┐
        │                                   │   PostgreSQL       │
        │                                   │   (medusa_db)      │
        └───────────────────────────────────└────────────────────┘
```

**Principe :** Le frontend est un SPA React qui communique avec le backend Medusa v2 via le **Medusa JS SDK** (`@medusajs/js-sdk`). Aucun appel axios direct pour l'e-commerce — tout passe par le SDK.

Les pages statiques (RoutinePage, AboutPage, etc.) et l'admin CMS utilisent encore un backend FastAPI séparé (non inclus dans ce repo pour le moment).

---

## Stack technique

### Frontend

| Technologie | Version | Usage |
|---|---|---|
| React | 19.x | Framework UI |
| React Router | 7.x | Routing SPA |
| Craco | 7.x | Override CRA config (Tailwind, etc.) |
| Tailwind CSS | 3.x | Styles utilitaires |
| @medusajs/js-sdk | 2.13.x | Client API Medusa |
| Framer Motion | 12.x | Animations |
| Embla Carousel | 8.x | Carrousels (avis, galerie) |
| Radix UI | Latest | Composants UI (Dialog, Tabs, Accordion, Select, etc.) |
| Lucide React | 0.507 | Icônes |
| GrapesJS | 2.x | Éditeur visuel admin CMS |

### Backend

| Technologie | Version | Usage |
|---|---|---|
| Medusa | 2.13.1 | Backend headless e-commerce |
| PostgreSQL | 14.x | Base de données |
| Node.js | 20+ | Runtime |

---

## Installation locale

### Prérequis

- Node.js 20+
- PostgreSQL 14+
- npm

### 1. Cloner le repo

```bash
git clone https://github.com/mikemike2655/Blc.git
cd Blc
git checkout medusa-frontend-v2
```

### 2. Backend Medusa

```bash
# Démarrer PostgreSQL
brew services start postgresql@14

# Installer les dépendances
cd medusa-backend
npm install

# Créer la base de données (si première fois)
createdb medusa_db

# Lancer les migrations
npx medusa db:migrate

# Seed les données (si première fois)
npx medusa seed --seed-file ./src/scripts/seed.ts

# Créer un admin
npx medusa user -e admin@bodylookcare.com -p admin123

# Lancer le serveur
npx medusa develop
```

Le backend tourne sur **http://localhost:9000**
- Dashboard admin : **http://localhost:9000/app**
- API Store : **http://localhost:9000/store/**
- Health check : **http://localhost:9000/health**

### 3. Frontend React

```bash
cd frontend

# Installer les dépendances
npm install --legacy-peer-deps

# Lancer le dev server
npx craco start
```

Le frontend tourne sur **http://localhost:3000**

### 4. Vérification

```bash
# Vérifier que le backend répond
curl http://localhost:9000/health  # → OK

# Vérifier les produits
curl http://localhost:9000/store/products \
  -H "x-publishable-api-key: pk_874a4df357e19628ec1d807a0a926494c55b5f67dec40f985a1d1b77434ea6dc"
```

---

## Structure du projet

```
Blc/
├── frontend/                    # Application React (SPA)
│   ├── public/
│   │   ├── images/             # Images statiques (produits, PDV, célébrités)
│   │   └── uploads/            # Uploads CMS
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # AuthModal
│   │   │   ├── cart/           # CartDrawer
│   │   │   ├── common/         # Logo
│   │   │   ├── layout/         # Header, Footer, BottomNav
│   │   │   ├── product/        # ProductCard
│   │   │   └── ui/             # Composants Radix/shadcn (Button, Input, Tabs, etc.)
│   │   ├── context/
│   │   │   ├── AuthContext.js  # Auth Medusa (login, register, logout)
│   │   │   └── CartContext.js  # Panier Medusa (add, update, remove)
│   │   ├── contexts/
│   │   │   └── AdminContext.js # Auth admin CMS
│   │   ├── data/
│   │   │   └── products.js     # Données produits locales (descriptions riches)
│   │   ├── hooks/
│   │   │   ├── useContent.js   # Hook CMS (contenu dynamique)
│   │   │   ├── useJsonLd.js    # Schemas JSON-LD (SEO)
│   │   │   ├── usePageMeta.js  # Meta tags dynamiques
│   │   │   └── useReveal.js    # Animation scroll reveal
│   │   ├── lib/
│   │   │   ├── medusa.js       # Client Medusa SDK (singleton)
│   │   │   ├── medusaUtils.js  # normalizeProduct(), normalizeOrder()
│   │   │   └── utils.js        # cn(), formatPrice(), generateSessionId()
│   │   ├── pages/
│   │   │   ├── HomePage.js     # Page d'accueil (carousel, galerie, célébrités)
│   │   │   ├── ShopPage.js     # Boutique (grille produits Medusa)
│   │   │   ├── ProductPage.js  # Fiche produit (Medusa + données locales)
│   │   │   ├── CategoryPage.js # Catégorie (filtres, Medusa categories)
│   │   │   ├── SearchPage.js   # Recherche (Medusa search)
│   │   │   ├── CheckoutPage.js # Tunnel de commande (Medusa cart → order)
│   │   │   ├── AccountPage.js  # Compte client (profil, commandes, favoris)
│   │   │   ├── RoutinePage.js  # Quiz routine personnalisée
│   │   │   ├── AboutPage.js    # À propos
│   │   │   ├── DrainagePage.js # Page drainage lymphatique
│   │   │   ├── ContactPage.js  # Contact
│   │   │   ├── FAQPage.js      # FAQ
│   │   │   ├── FormationsMassagesPage.js
│   │   │   ├── IdeesCadeauxPage.js
│   │   │   ├── LegalPage.js    # Mentions légales / CGV
│   │   │   └── admin/          # Pages admin CMS (11 fichiers)
│   │   ├── styles/
│   │   │   └── grapesjs-dark.css
│   │   ├── App.js              # Router principal
│   │   └── index.css           # Tailwind + styles custom
│   ├── .env                    # Variables d'environnement
│   ├── craco.config.js         # Config Craco (PostCSS, Tailwind)
│   ├── tailwind.config.js      # Config Tailwind (couleurs BLC)
│   └── package.json
│
├── medusa-backend/              # Backend Medusa v2
│   ├── src/                    # Customisations (subscribers, workflows)
│   ├── medusa-config.ts        # Config Medusa (DB, CORS, modules)
│   ├── .env                    # Variables backend
│   └── package.json
│
├── vercel.json                  # Config déploiement Vercel
└── DOC_PROJET_BLC.md           # Ce fichier
```

---

## Frontend — Pages & Routes

| Route | Page | Source données | Description |
|---|---|---|---|
| `/` | HomePage | CMS + local | Accueil : hero, fondatrice, produits, galerie avant/après, célébrités, réseaux sociaux |
| `/boutique` | ShopPage | **Medusa** + local | Grille produits avec filtres catégories et tri |
| `/produit/:slug` | ProductPage | **Medusa** + local | Fiche produit complète (images, prix, description, composition, avis, FAQ) |
| `/categorie/:slug` | CategoryPage | **Medusa** | Produits par catégorie avec filtres avancés |
| `/recherche?q=` | SearchPage | **Medusa** | Recherche produits |
| `/checkout` | CheckoutPage | **Medusa** | Tunnel de commande (info → paiement → confirmation) |
| `/compte/*` | AccountPage | **Medusa** | Profil, commandes, favoris |
| `/routine` | RoutinePage | FastAPI/CMS | Quiz routine personnalisée |
| `/a-propos` | AboutPage | Local | Page à propos |
| `/drainage-lymphatique` | DrainagePage | Local | Page informative drainage |
| `/contact` | ContactPage | Local | Formulaire de contact |
| `/faq` | FAQPage | Local | Questions fréquentes |
| `/formations-massages` | FormationsMassagesPage | Local | Formations et massages |
| `/idees-cadeaux` | IdeesCadeauxPage | Local | Idées cadeaux |
| `/mentions-legales` | LegalPage | Local | Pages légales |
| `/admin/*` | Admin CMS | FastAPI | Dashboard admin (protégé) |

---

## Intégration Medusa v2

### Client SDK

```javascript
// frontend/src/lib/medusa.js
import Medusa from '@medusajs/js-sdk'

const medusa = new Medusa({
  baseUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:9000',
  publishableKey: process.env.REACT_APP_MEDUSA_PUBLISHABLE_KEY,
})

export default medusa
```

### Normalisation des données

Le fichier `medusaUtils.js` contient deux fonctions de normalisation :

**`normalizeProduct(product)`** — Convertit un produit Medusa v2 vers le format frontend :

| Champ Medusa | Champ Frontend | Transformation |
|---|---|---|
| `product.handle` | `id`, `slug` | Utilisé pour les routes et addToCart |
| `product.id` | `medusaId` | ID Medusa pour les appels API |
| `product.title` | `name` | — |
| `product.subtitle` | `subtitle` | — |
| `variant.calculated_price.calculated_amount` | `price` | ÷ 100 (cents → euros) |
| `variant.calculated_price.original_amount` | `comparePrice` | ÷ 100 |
| `product.metadata.rating` | `rating` | parseFloat |
| `product.metadata.reviews_count` | `reviewCount` | parseInt |
| `product.metadata.badge` | `badge` | — |
| `product.images[].url` | `images` | Array d'URLs |
| `variant.id` | `variantId` | Pour ajout au panier |

**`normalizeOrder(order)`** — Convertit une commande Medusa vers le format frontend (prix ÷ 100).

### Fusion données Medusa + locales

Les produits Medusa fournissent les données e-commerce (prix, stock, images) mais les données locales (`data/products.js`) fournissent le contenu riche :

```javascript
const { products } = await medusa.store.product.list({ handle: slug, region_id: REGION_ID });
const normalized = normalizeProduct(products[0]);
const local = productsData[normalized.id] || {};
const product = { ...local, ...normalized }; // Medusa overrides prix/images, local garde descriptions
```

**Données locales uniquement** (pas dans Medusa) :
- `fullDescription` (HTML riche)
- `composition` (ingrédients, certifications, sans...)
- `usage` (instructions, conseils, avertissements)
- `benefits` (liste d'avantages avec icônes)
- `marieJulieNote` (note personnelle de la fondatrice)
- `faq` (questions/réponses)
- `reviews` (avis clients)
- `includes` (contenu des packs)

---

## Flux e-commerce

### Panier (CartContext.js)

```
1. Utilisateur clique "Ajouter au panier"
2. addToCart(productHandle, quantity)
   ├── ensureCart() → medusa.store.cart.create({ region_id }) si pas de panier
   ├── medusa.store.product.list({ handle }) → récupère variant_id
   └── medusa.store.cart.createLineItem(cartId, { variant_id, quantity })
3. Cart ID stocké dans localStorage (clé: "medusa_cart_id")
4. CartDrawer s'ouvre automatiquement
```

**Opérations panier :**
- `addToCart(handle, qty)` → lookup produit par handle → createLineItem
- `updateQuantity(lineItemId, qty)` → updateLineItem / deleteLineItem si qty ≤ 0
- `removeFromCart(lineItemId)` → deleteLineItem

### Commande (CheckoutPage.js)

```
Étape 1 — Informations          Étape 2 — Paiement              Étape 3 — Confirmation
┌─────────────────┐             ┌──────────────────┐             ┌──────────────────┐
│ Email, Téléphone│             │ CB / PayPal      │             │ Merci ! ✓        │
│ Nom, Prénom     │──Continue──►│ (démo, pas réel) │──Payer────►│ Commande #N      │
│ Adresse         │             │                  │             │ Récapitulatif    │
└─────────────────┘             └──────────────────┘             └──────────────────┘
```

**Flow technique :**

```javascript
// 1. Mise à jour du panier (adresse + email)
await medusa.store.cart.update(cartId, {
  email, shipping_address: { first_name, last_name, address_1, city, postal_code, country_code: 'fr' }
});

// 2. Ajout méthode de livraison
const { shipping_options } = await medusa.store.shippingOption.list({ cart_id: cartId });
await medusa.store.cart.addShippingMethod(cartId, { option_id: shipping_options[0].id });

// 3. Création collection de paiement + session
const { payment_collection } = await medusa.store.paymentCollection.create({ cart_id: cartId });
await medusa.store.paymentCollection.initiatePaymentSession(payment_collection.id, {
  provider_id: 'pp_system_default'
});

// 4. Finalisation → crée la commande
const { type, order } = await medusa.store.cart.complete(cartId);
// type === 'order' → succès
```

---

## Données produits

### Produits dans Medusa (6 produits BLC)

| Handle | Nom | Prix (EUR) | Type |
|---|---|---|---|
| `le-draineur` | Le Draineur | 45.00 | Gélules |
| `miracle-cream` | Miracle Cream | 31.99 | Soin corps |
| `miracle-scrub` | Miracle Scrub | 29.99 | Soin corps |
| `pack-decouverte` | Pack Découverte | 49.99 | Pack |
| `pack-transformation` | Pack Transformation | 79.99 | Pack |
| `pack-cure-intensive` | Pack Cure Intensive | 109.99 | Pack |

> Note : Il y a aussi 3 produits Medusa par défaut (Sweatpants, Sweatshirt, Shorts) qui peuvent être supprimés depuis le dashboard admin.

### Region

| ID | Nom | Devise |
|---|---|---|
| `reg_01KM38KEBWAGY16DWNRPSRHG95` | Europe | EUR |

> **Important :** Le `region_id` doit être passé dans toutes les requêtes `product.list()` pour que les prix soient calculés.

### Publishable API Key

```
pk_874a4df357e19628ec1d807a0a926494c55b5f67dec40f985a1d1b77434ea6dc
```

---

## Authentification

### Client (AuthContext.js)

L'authentification utilise le système natif Medusa v2 :

```javascript
// Login
await medusa.auth.login('customer', 'emailpass', { email, password });
const { customer } = await medusa.store.customer.retrieve();

// Register
await medusa.auth.register('customer', 'emailpass', { email, password });
await medusa.auth.login('customer', 'emailpass', { email, password });
await medusa.store.customer.create({ email, first_name, last_name });

// Logout
await medusa.auth.logout();
```

**Favoris :** Stockés localement dans `localStorage` (clé: `blc_favorites`). Medusa n'a pas de système de favoris natif.

### Admin CMS

L'admin CMS (`/admin/*`) utilise un système d'authentification séparé via `AdminContext.js` connecté au backend FastAPI. Non lié à Medusa.

---

## Admin CMS

Accessible via `/admin` (nécessite un compte admin FastAPI).

| Route | Page | Description |
|---|---|---|
| `/admin` | Dashboard | Vue d'ensemble |
| `/admin/content` | Contenu | Édition contenu homepage (hero, sections) |
| `/admin/products` | Produits | Gestion produits (via FastAPI) |
| `/admin/orders` | Commandes | Suivi commandes |
| `/admin/pages` | Pages | Éditeur de pages (GrapesJS) |
| `/admin/media` | Médias | Bibliothèque d'images |
| `/admin/users` | Utilisateurs | Gestion utilisateurs admin |
| `/admin/settings` | Paramètres | Configuration du site |

> **Note :** L'admin CMS communique avec un backend FastAPI séparé (non inclus dans ce repo). Pour la gestion e-commerce (produits, prix, stock), utiliser le **dashboard Medusa** sur `http://localhost:9000/app`.

---

## Déploiement

### Frontend sur Vercel

Le fichier `vercel.json` est déjà configuré :

```json
{
  "buildCommand": "cd frontend && npm install --legacy-peer-deps && npx craco build",
  "outputDirectory": "frontend/build",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Étapes :**

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Importer le repo `mikemike2655/Blc`
3. Sélectionner la branche `medusa-frontend-v2`
4. Configurer les variables d'environnement (voir section ci-dessous)
5. Déployer

### Backend Medusa sur Railway / DigitalOcean

Le backend Medusa nécessite :
- PostgreSQL (base `medusa_db`)
- Node.js 20+
- Redis (optionnel, utilise in-memory par défaut)

**Railway (recommandé) :**

1. Créer un projet Railway
2. Ajouter un service PostgreSQL
3. Ajouter un service Node.js depuis le dossier `medusa-backend/`
4. Configurer les variables d'environnement
5. Le build command est `npm run build` et le start command est `npm run start`

**Important après déploiement du backend :**
- Mettre à jour `REACT_APP_BACKEND_URL` dans Vercel avec l'URL du backend Railway
- Ajouter l'URL Vercel dans `STORE_CORS`, `AUTH_CORS` du backend

---

## Variables d'environnement

### Frontend (`.env`)

```env
REACT_APP_BACKEND_URL=http://localhost:9000
REACT_APP_MEDUSA_PUBLISHABLE_KEY=pk_874a4df357e19628ec1d807a0a926494c55b5f67dec40f985a1d1b77434ea6dc
```

### Backend Medusa (`.env`)

```env
DATABASE_URL=postgres://user:password@localhost/medusa_db
STORE_CORS=http://localhost:3000,https://votre-domaine.vercel.app
ADMIN_CORS=http://localhost:9000,http://localhost:5173
AUTH_CORS=http://localhost:3000,http://localhost:9000,https://votre-domaine.vercel.app
JWT_SECRET=votre-secret-jwt-complexe
COOKIE_SECRET=votre-secret-cookie-complexe
REDIS_URL=redis://localhost:6379
```

> **Production :** Remplacer les secrets par des valeurs aléatoires longues. Ne jamais utiliser `supersecret`.

---

## API Medusa — Endpoints utilisés

Tous les appels passent par le SDK. Voici la correspondance :

### Produits

| SDK Call | HTTP Endpoint | Utilisé par |
|---|---|---|
| `medusa.store.product.list({ limit, region_id })` | `GET /store/products` | ShopPage, AccountPage |
| `medusa.store.product.list({ handle, region_id })` | `GET /store/products?handle=X` | ProductPage, CartContext |
| `medusa.store.product.list({ q, region_id })` | `GET /store/products?q=X` | SearchPage |
| `medusa.store.product.list({ category_id, region_id })` | `GET /store/products?category_id=X` | CategoryPage |

### Catégories

| SDK Call | HTTP Endpoint | Utilisé par |
|---|---|---|
| `medusa.store.productCategory.list({ handle })` | `GET /store/product-categories` | CategoryPage |

### Panier

| SDK Call | HTTP Endpoint | Utilisé par |
|---|---|---|
| `medusa.store.cart.create({ region_id })` | `POST /store/carts` | CartContext |
| `medusa.store.cart.retrieve(cartId)` | `GET /store/carts/:id` | CartContext |
| `medusa.store.cart.createLineItem(cartId, body)` | `POST /store/carts/:id/line-items` | CartContext |
| `medusa.store.cart.updateLineItem(cartId, itemId, body)` | `POST /store/carts/:id/line-items/:itemId` | CartContext |
| `medusa.store.cart.deleteLineItem(cartId, itemId)` | `DELETE /store/carts/:id/line-items/:itemId` | CartContext |
| `medusa.store.cart.update(cartId, body)` | `POST /store/carts/:id` | CheckoutPage |
| `medusa.store.cart.addShippingMethod(cartId, body)` | `POST /store/carts/:id/shipping-methods` | CheckoutPage |
| `medusa.store.cart.complete(cartId)` | `POST /store/carts/:id/complete` | CheckoutPage |

### Paiement

| SDK Call | HTTP Endpoint | Utilisé par |
|---|---|---|
| `medusa.store.paymentCollection.create({ cart_id })` | `POST /store/payment-collections` | CheckoutPage |
| `medusa.store.paymentCollection.initiatePaymentSession(id, body)` | `POST /store/payment-collections/:id/payment-sessions` | CheckoutPage |

### Livraison

| SDK Call | HTTP Endpoint | Utilisé par |
|---|---|---|
| `medusa.store.shippingOption.list({ cart_id })` | `GET /store/shipping-options` | CheckoutPage |

### Authentification

| SDK Call | HTTP Endpoint | Utilisé par |
|---|---|---|
| `medusa.auth.login('customer', 'emailpass', body)` | `POST /auth/customer/emailpass` | AuthContext |
| `medusa.auth.register('customer', 'emailpass', body)` | `POST /auth/customer/emailpass/register` | AuthContext |
| `medusa.auth.logout()` | `DELETE /auth/session` | AuthContext |
| `medusa.store.customer.retrieve()` | `GET /store/customers/me` | AuthContext |
| `medusa.store.customer.create(body)` | `POST /store/customers` | AuthContext |

### Commandes

| SDK Call | HTTP Endpoint | Utilisé par |
|---|---|---|
| `medusa.store.order.list()` | `GET /store/orders` | AccountPage |

---

## Dépannage

### Les prix affichent 0.00 €

**Cause :** Les requêtes produits ne passent pas le `region_id`. Sans region, Medusa ne calcule pas les prix.

**Solution :** Vérifier que toutes les requêtes `product.list()` incluent `region_id: 'reg_01KM38KEBWAGY16DWNRPSRHG95'`.

### "Cannot GET /" sur le backend

**Normal.** Medusa est une API headless. Il n'y a pas de page à `/`. Utiliser :
- `/health` pour vérifier le serveur
- `/app` pour le dashboard admin
- `/store/products` pour l'API

### Erreur CORS

**Cause :** L'URL du frontend n'est pas dans `STORE_CORS` / `AUTH_CORS` du backend.

**Solution :** Ajouter l'URL dans le `.env` du backend :
```env
STORE_CORS=http://localhost:3000,https://votre-app.vercel.app
AUTH_CORS=http://localhost:3000,https://votre-app.vercel.app
```

### "Payment collection has not been initiated for cart"

**Cause :** Le checkout n'a pas créé la payment collection avant de finaliser le cart.

**Solution :** Le flow correct est :
1. `paymentCollection.create({ cart_id })`
2. `paymentCollection.initiatePaymentSession(id, { provider_id: 'pp_system_default' })`
3. `cart.complete(cartId)`

### Le panier ne persiste pas après refresh

**Vérifier :** `localStorage.getItem('medusa_cart_id')` dans la console du navigateur. Si null, le panier n'a pas été créé. Ajouter un produit au panier pour initialiser.

### Build error : source maps @medusajs/js-sdk

**Normal.** Warnings sur les fichiers `.ts` source non inclus dans le package npm. N'affecte pas le build.

### npm install échoue avec peer deps

**Solution :** Toujours utiliser `npm install --legacy-peer-deps` pour le frontend (conflit React 19 / certains packages).

---

## Couleurs de la marque (Tailwind)

Définies dans `tailwind.config.js` :

| Nom | Hex | Usage |
|---|---|---|
| `brand-forest` | `#2D5A3D` | CTA, liens actifs, accents verts |
| `brand-sage` | `#8FAE8B` | Fond léger, bordures |
| `brand-cream` | `#FAF8F5` | Fond sections, badges |
| `brand-gold` | `#C4A34A` | Étoiles, badges best-seller |
| `brand-charcoal` | `#2C2C2C` | Texte principal |
| `brand-stone` | `#6B6B6B` | Texte secondaire |

---

*Dernière mise à jour : Mars 2026*
*Branche : `medusa-frontend-v2`*
