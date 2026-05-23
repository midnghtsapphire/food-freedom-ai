# Research Engine (Demo)

This repo includes a lightweight, deterministic “research engine” used by the frontend demo meal-planner.

It is intentionally **offline-first** and does not require an OpenAI key to generate a 7‑day plan.

## What It Does

- Accepts a list of restriction IDs from the UI (see `src/components/DietaryRestrictions.tsx`)
- Filters a small recipe dataset where possible (allergen-style exclusions + some diet preferences)
- Generates a 7‑day meal plan deterministically (same inputs → same output)
- Falls back gracefully if a restriction can’t be satisfied by the current dataset

## Where The Data Lives

- Recipe dataset (the “data”): `src/research/recipe-db.ts`
- Types: `src/research/types.ts`
- Generator logic (the “engine”): `src/research/generate-meal-plan.ts`

## Adding / Updating Recipes

1. Edit `src/research/recipe-db.ts`
2. For each recipe:
   - `allergens`: restriction IDs that the recipe contains (e.g. `gluten`, `dairy`, `peanuts`)
   - `diets`: restriction IDs the recipe supports (e.g. `vegan`, `lowcarb`, `mediterranean`)
3. Run `npm test` to confirm `eslint` + `vite build` still pass.

## Notes

- This demo engine is not a medical device and does not provide medical advice.
- The dataset is intentionally small; unsupported or unmet restrictions are surfaced via UI toasts.

