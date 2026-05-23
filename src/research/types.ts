export type RestrictionId = string;

export interface Meal {
  name: string;
  description: string;
  calories: number;
  prepTime: number;
  servings: number;
  tags: string[];
  ingredients?: string[];
  instructions?: string[];
}

export interface DailyMealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export interface MealPlan {
  days: DailyMealPlan[];
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface MealRecipe extends Meal {
  mealType: MealType;
  allergens: RestrictionId[];
  diets: RestrictionId[];
}

export interface MealPlanResult {
  mealPlan: MealPlan;
  unsupportedRestrictions: RestrictionId[];
  unmetRestrictions: RestrictionId[];
}

