import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Flame, Users, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import MealDetailsDialog from "./MealDetailsDialog";

interface Meal {
  name: string;
  description: string;
  calories: number;
  prepTime: number;
  servings: number;
  tags: string[];
  ingredients?: string[];
  instructions?: string[];
}

interface DailyMealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

interface MealPlanDisplayProps {
  mealPlan: {
    days: DailyMealPlan[];
  } | null;
}

const MealPlanDisplay = ({ mealPlan }: MealPlanDisplayProps) => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);

  if (!mealPlan) return null;

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsDialogOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const currentDayPlan = mealPlan.days[currentDay];

  const renderMealCard = (meal: Meal, mealType: string) => (
    <Card 
      key={`${mealType}-${meal.name}`} 
      className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
      onClick={() => handleMealClick(meal)}
    >
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
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20 print:py-0">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 space-y-4 print:hidden">
            <h2 className="text-4xl md:text-5xl font-bold">
              Your Personalized 7-Day Meal Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here's your custom meal plan designed specifically for your dietary needs.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrint}
              className="mt-4"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Meal Plan
            </Button>
          </div>

          {/* Day Navigation - Hidden in Print */}
          <div className="flex items-center justify-between mb-8 bg-card p-4 rounded-lg border print:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDay(Math.max(0, currentDay - 1))}
              disabled={currentDay === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold">{dayNames[currentDay]}</h3>
              <p className="text-sm text-muted-foreground">Day {currentDay + 1} of 7</p>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDay(Math.min(6, currentDay + 1))}
              disabled={currentDay === 6}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Screen View - Single Day */}
          <div className="space-y-12 print:hidden">
            {/* Breakfast */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">☀️</span> Breakfast
              </h3>
              {renderMealCard(currentDayPlan.breakfast, "breakfast")}
            </div>

            {/* Lunch */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">🌤️</span> Lunch
              </h3>
              {renderMealCard(currentDayPlan.lunch, "lunch")}
            </div>

            {/* Dinner */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">🌙</span> Dinner
              </h3>
              {renderMealCard(currentDayPlan.dinner, "dinner")}
            </div>

            {/* Snacks */}
            {currentDayPlan.snacks.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-accent">🍎</span> Snacks
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {currentDayPlan.snacks.map((snack, index) => renderMealCard(snack, `snack-${index}`))}
                </div>
              </div>
            )}
          </div>

          {/* Print View - All 7 Days with Full Details */}
          <div className="hidden print:block">
            <h1 className="text-3xl font-bold text-center mb-8">7-Day Meal Plan</h1>
            {mealPlan.days.map((dayPlan, dayIndex) => (
              <div key={dayIndex} className="mb-12 page-break-inside-avoid">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-primary">
                  {dayNames[dayIndex]} - Day {dayIndex + 1}
                </h2>

                {/* Breakfast */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">☀️ Breakfast: {dayPlan.breakfast.name}</h3>
                  <p className="text-sm mb-2">{dayPlan.breakfast.description}</p>
                  <div className="flex gap-4 text-sm mb-3">
                    <span>🔥 {dayPlan.breakfast.calories} cal</span>
                    <span>⏱️ {dayPlan.breakfast.prepTime} min</span>
                    <span>👥 {dayPlan.breakfast.servings} serving(s)</span>
                  </div>
                  {dayPlan.breakfast.ingredients && dayPlan.breakfast.ingredients.length > 0 && (
                    <div className="mb-2">
                      <p className="font-semibold text-sm">Ingredients:</p>
                      <ul className="list-disc list-inside text-sm ml-2">
                        {dayPlan.breakfast.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {dayPlan.breakfast.instructions && dayPlan.breakfast.instructions.length > 0 && (
                    <div>
                      <p className="font-semibold text-sm">Instructions:</p>
                      <ol className="list-decimal list-inside text-sm ml-2">
                        {dayPlan.breakfast.instructions.map((step, i) => (
                          <li key={i} className="mb-1">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* Lunch */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">🌤️ Lunch: {dayPlan.lunch.name}</h3>
                  <p className="text-sm mb-2">{dayPlan.lunch.description}</p>
                  <div className="flex gap-4 text-sm mb-3">
                    <span>🔥 {dayPlan.lunch.calories} cal</span>
                    <span>⏱️ {dayPlan.lunch.prepTime} min</span>
                    <span>👥 {dayPlan.lunch.servings} serving(s)</span>
                  </div>
                  {dayPlan.lunch.ingredients && dayPlan.lunch.ingredients.length > 0 && (
                    <div className="mb-2">
                      <p className="font-semibold text-sm">Ingredients:</p>
                      <ul className="list-disc list-inside text-sm ml-2">
                        {dayPlan.lunch.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {dayPlan.lunch.instructions && dayPlan.lunch.instructions.length > 0 && (
                    <div>
                      <p className="font-semibold text-sm">Instructions:</p>
                      <ol className="list-decimal list-inside text-sm ml-2">
                        {dayPlan.lunch.instructions.map((step, i) => (
                          <li key={i} className="mb-1">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* Dinner */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">🌙 Dinner: {dayPlan.dinner.name}</h3>
                  <p className="text-sm mb-2">{dayPlan.dinner.description}</p>
                  <div className="flex gap-4 text-sm mb-3">
                    <span>🔥 {dayPlan.dinner.calories} cal</span>
                    <span>⏱️ {dayPlan.dinner.prepTime} min</span>
                    <span>👥 {dayPlan.dinner.servings} serving(s)</span>
                  </div>
                  {dayPlan.dinner.ingredients && dayPlan.dinner.ingredients.length > 0 && (
                    <div className="mb-2">
                      <p className="font-semibold text-sm">Ingredients:</p>
                      <ul className="list-disc list-inside text-sm ml-2">
                        {dayPlan.dinner.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {dayPlan.dinner.instructions && dayPlan.dinner.instructions.length > 0 && (
                    <div>
                      <p className="font-semibold text-sm">Instructions:</p>
                      <ol className="list-decimal list-inside text-sm ml-2">
                        {dayPlan.dinner.instructions.map((step, i) => (
                          <li key={i} className="mb-1">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* Snacks */}
                {dayPlan.snacks.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">🍎 Snacks</h3>
                    {dayPlan.snacks.map((snack, snackIndex) => (
                      <div key={snackIndex} className="mb-4 ml-4">
                        <h4 className="font-semibold text-sm mb-1">{snack.name}</h4>
                        <p className="text-sm mb-2">{snack.description}</p>
                        <div className="flex gap-4 text-sm mb-2">
                          <span>🔥 {snack.calories} cal</span>
                          <span>⏱️ {snack.prepTime} min</span>
                          <span>👥 {snack.servings} serving(s)</span>
                        </div>
                        {snack.ingredients && snack.ingredients.length > 0 && (
                          <div className="mb-2">
                            <p className="font-semibold text-xs">Ingredients:</p>
                            <ul className="list-disc list-inside text-xs ml-2">
                              {snack.ingredients.map((ing, i) => (
                                <li key={i}>{ing}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {snack.instructions && snack.instructions.length > 0 && (
                          <div>
                            <p className="font-semibold text-xs">Instructions:</p>
                            <ol className="list-decimal list-inside text-xs ml-2">
                              {snack.instructions.map((step, i) => (
                                <li key={i} className="mb-1">{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Week Overview */}
          <div className="mt-12 print:hidden">
            <h3 className="text-xl font-semibold mb-4">Week at a Glance</h3>
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map((day, index) => (
                <Button
                  key={day}
                  variant={currentDay === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentDay(index)}
                  className="text-xs"
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MealDetailsDialog 
        meal={selectedMeal}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .page-break-inside-avoid {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
};

export default MealPlanDisplay;
