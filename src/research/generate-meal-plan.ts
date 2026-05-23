import { recipeDb } from "@/research/recipe-db";
import type { MealPlanResult, MealRecipe, MealType, RestrictionId } from "@/research/types";

const supportedRestrictions = new Set<RestrictionId>([
  "gluten",
  "wheat",
  "dairy",
  "nuts",
  "peanuts",
  "shellfish",
  "eggs",
  "soy",
  "fish",
  "sesame",
  "mustard",
  "sulfites",
  "corn",
  "nightshades",
  "citrus",
  "coconut",
  "lactose",
  "celiac",
  "vegan",
  "vegetarian",
  "pescatarian",
  "keto",
  "paleo",
  "lowcarb",
  "highprotein",
  "whole30",
  "mediterranean",
  "noredmeat",
]);

const allergyLikeRestrictions = new Set<RestrictionId>([
  "gluten",
  "wheat",
  "dairy",
  "nuts",
  "peanuts",
  "shellfish",
  "eggs",
  "soy",
  "fish",
  "sesame",
  "mustard",
  "sulfites",
  "corn",
  "nightshades",
  "citrus",
  "coconut",
  "lactose",
  "celiac",
]);

const dietPreferenceRestrictions = new Set<RestrictionId>([
  "vegan",
  "vegetarian",
  "pescatarian",
  "keto",
  "paleo",
  "lowcarb",
  "highprotein",
  "whole30",
  "mediterranean",
  "noredmeat",
]);

function hashStringToUInt32(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickBySeed<T>(items: readonly T[], seed: string): T {
  const idx = hashStringToUInt32(seed) % items.length;
  return items[idx];
}

function unique<T>(values: readonly T[]): T[] {
  return Array.from(new Set(values));
}

function filterRecipes(recipes: readonly MealRecipe[], restrictions: readonly RestrictionId[]): MealRecipe[] {
  return recipes.filter((recipe) => {
    for (const restriction of restrictions) {
      if (allergyLikeRestrictions.has(restriction) && recipe.allergens.includes(restriction)) return false;
      if (dietPreferenceRestrictions.has(restriction) && !recipe.diets.includes(restriction)) return false;
    }
    return true;
  });
}

function buildDaySeed(restrictions: readonly RestrictionId[], dayIndex: number, mealType: MealType): string {
  const key = restrictions.slice().sort().join(",");
  return `${key}::day=${dayIndex}::meal=${mealType}`;
}

export function generateMealPlan(
  restrictions: RestrictionId[],
  options?: { days?: number; snacksPerDay?: number },
): MealPlanResult {
  const days = options?.days ?? 7;
  const snacksPerDay = options?.snacksPerDay ?? 2;

  const unsupportedRestrictions = unique(restrictions.filter((r) => !supportedRestrictions.has(r)));
  const enforceableRestrictions = restrictions.filter((r) => supportedRestrictions.has(r));

  const unmetRestrictions: RestrictionId[] = [];

  const dayPlans = Array.from({ length: days }, (_, dayIndex) => {
    const buildMeal = (mealType: Exclude<MealType, "snack">) => {
      const candidates = recipeDb[mealType];
      const filtered = filterRecipes(candidates, enforceableRestrictions);
      const usable = filtered.length > 0 ? filtered : candidates;
      if (filtered.length === 0 && enforceableRestrictions.length > 0) unmetRestrictions.push(...enforceableRestrictions);
      return pickBySeed(usable, buildDaySeed(enforceableRestrictions, dayIndex, mealType));
    };

    const breakfast = buildMeal("breakfast");
    const lunch = buildMeal("lunch");
    const dinner = buildMeal("dinner");

    const snackCandidates = recipeDb.snack;
    const snackFiltered = filterRecipes(snackCandidates, enforceableRestrictions);
    const usableSnacks = snackFiltered.length > 0 ? snackFiltered : snackCandidates;
    if (snackFiltered.length === 0 && enforceableRestrictions.length > 0) unmetRestrictions.push(...enforceableRestrictions);

    const snacks = Array.from({ length: snacksPerDay }, (_, snackIndex) =>
      pickBySeed(usableSnacks, `${buildDaySeed(enforceableRestrictions, dayIndex, "snack")}::i=${snackIndex}`),
    );

    return { breakfast, lunch, dinner, snacks };
  });

  return {
    mealPlan: { days: dayPlans },
    unsupportedRestrictions,
    unmetRestrictions: unique(unmetRestrictions),
  };
}

