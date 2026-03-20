# Body Look Care (BLC) - Frontend

Storefront e-commerce React pour Body Look Care, connecté à un backend Medusa v2.

## Stack

- **Frontend** : React (CRA + Craco) + Tailwind CSS + Radix UI
- **Backend** : Medusa v2 (headless commerce)
- **SDK** : @medusajs/js-sdk
- **Déploiement** : Vercel (frontend) + Railway (backend Medusa)

## Installation

```bash
cd frontend
cp .env.example .env   # puis remplir les variables
npm install --legacy-peer-deps
npm start
```

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `REACT_APP_BACKEND_URL` | URL du backend Medusa (ex: `http://localhost:9000`) |
| `REACT_APP_MEDUSA_PUBLISHABLE_KEY` | Clé publique Medusa (Publishable API Key) |

## Déploiement Vercel

Le fichier `vercel.json` à la racine configure le build automatiquement.

## Documentation complète

Voir [DOC_PROJET_BLC.md](DOC_PROJET_BLC.md) pour l'architecture détaillée.
