# Assets Inventory

## Brand + Product Assets

- `src/assets/hero-meal-prep.jpg` — homepage hero visual for meal-planning value proposition
- `public/favicon.ico` — browser/favicon identity
- `public/placeholder.svg` — fallback visual asset

## UI Assets + Components

- `src/components/Hero.tsx` — homepage hero section and primary conversion CTA
- `src/components/DietaryRestrictions.tsx` — interactive dietary selector
- `src/components/MealPlanDisplay.tsx` — generated weekly plan output
- `src/components/MealDetailsDialog.tsx` — meal detail modal

## Backend + Data Assets

- `src/research/recipe-db.ts` — demo recipe dataset used by generator
- `src/research/generate-meal-plan.ts` — deterministic plan engine
- `server/routes/` — API route modules for auth and billing

## Deployment/Operational Assets

- `Dockerfile` and `docker-compose.yml` — containerized runtime setup
- `DEPLOYMENT_GUIDE.md` — deployment workflow and verification steps
- `.env.example` — required environment variable template
