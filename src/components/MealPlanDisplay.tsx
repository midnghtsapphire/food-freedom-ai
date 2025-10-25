import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Users } from "lucide-react";

interface Meal {
  name: string;
  description: string;
  calories: number;
  prepTime: number;
  servings: number;
  tags: string[];
}

interface MealPlanDisplayProps {
  mealPlan: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  } | null;
}

const MealPlanDisplay = ({ mealPlan }: MealPlanDisplayProps) => {
  if (!mealPlan) return null;

  const renderMealCard = (meal: Meal, mealType: string) => (
    <Card key={`${mealType}-${meal.name}`} className="p-6 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-xl font-semibold mb-1">{meal.name}</h4>
            <p className="text-sm text-muted-foreground">{meal.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {meal.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-accent" />
            <span>{meal.calories} cal</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            <span>{meal.prepTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            <span>{meal.servings} serving{meal.servings > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Your Personalized Meal Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's your custom meal plan designed specifically for your dietary needs.
          </p>
        </div>

        <div className="space-y-12">
          {/* Breakfast */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">☀️</span> Breakfast
            </h3>
            {renderMealCard(mealPlan.breakfast, "breakfast")}
          </div>

          {/* Lunch */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">🌤️</span> Lunch
            </h3>
            {renderMealCard(mealPlan.lunch, "lunch")}
          </div>

          {/* Dinner */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">🌙</span> Dinner
            </h3>
            {renderMealCard(mealPlan.dinner, "dinner")}
          </div>

          {/* Snacks */}
          {mealPlan.snacks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">🍎</span> Snacks
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mealPlan.snacks.map((snack, index) => renderMealCard(snack, `snack-${index}`))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MealPlanDisplay;
