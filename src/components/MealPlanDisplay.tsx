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
      <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 space-y-4">
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

          {/* Day Navigation */}
          <div className="flex items-center justify-between mb-8 bg-card p-4 rounded-lg border">
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

          <div className="space-y-12">
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
        }
      `}</style>
    </>
  );
};

export default MealPlanDisplay;
