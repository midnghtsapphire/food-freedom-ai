import { useState } from "react";
import Hero from "@/components/Hero";
import DietaryRestrictions from "@/components/DietaryRestrictions";
import MealPlanDisplay from "@/components/MealPlanDisplay";
import { useToast } from "@/hooks/use-toast";

interface Meal {
  name: string;
  description: string;
  calories: number;
  prepTime: number;
  servings: number;
  tags: string[];
}

interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

const Index = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateMealPlan = async (restrictions: string[]) => {
    if (restrictions.length === 0) {
      toast({
        title: "No restrictions selected",
        description: "Please select at least one dietary restriction to generate a meal plan.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI generation with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock meal plan generation
      const mockPlan: MealPlan = {
        breakfast: {
          name: "Quinoa Berry Bowl",
          description: "Fluffy quinoa topped with fresh berries, almond butter, and a drizzle of maple syrup",
          calories: 380,
          prepTime: 15,
          servings: 1,
          tags: restrictions.slice(0, 3),
        },
        lunch: {
          name: "Mediterranean Chickpea Salad",
          description: "Fresh vegetables, chickpeas, olives, and herbs with a lemon-tahini dressing",
          calories: 420,
          prepTime: 20,
          servings: 1,
          tags: restrictions.slice(0, 3),
        },
        dinner: {
          name: "Herb-Crusted Salmon with Roasted Vegetables",
          description: "Wild-caught salmon with a herb crust, served with colorful roasted vegetables",
          calories: 520,
          prepTime: 35,
          servings: 1,
          tags: restrictions.slice(0, 3),
        },
        snacks: [
          {
            name: "Apple Slices with Almond Butter",
            description: "Crisp apple slices paired with creamy almond butter",
            calories: 180,
            prepTime: 5,
            servings: 1,
            tags: ["Quick", "Healthy"],
          },
          {
            name: "Vegetable Sticks with Hummus",
            description: "Colorful veggie sticks with homemade hummus",
            calories: 120,
            prepTime: 10,
            servings: 1,
            tags: ["Protein-Rich", "Fiber"],
          },
        ],
      };

      setMealPlan(mockPlan);
      
      toast({
        title: "Meal plan generated!",
        description: `Created a personalized plan accommodating ${restrictions.length} dietary restrictions.`,
      });

      // Scroll to meal plan
      setTimeout(() => {
        document.querySelector('[class*="bg-gradient-to-b"]')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);

    } catch (error) {
      toast({
        title: "Error generating meal plan",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Hero />
      <DietaryRestrictions onGeneratePlan={generateMealPlan} isGenerating={isGenerating} />
      <MealPlanDisplay mealPlan={mealPlan} />
    </main>
  );
};

export default Index;
