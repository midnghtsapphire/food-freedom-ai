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
  ingredients?: string[];
  instructions?: string[];
}

interface DailyMealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

interface MealPlan {
  days: DailyMealPlan[];
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

      // Generate 7 days of meal plans
      const days: DailyMealPlan[] = [];
      
      for (let day = 0; day < 7; day++) {
        days.push({
          breakfast: {
            name: ["Quinoa Berry Bowl", "Avocado Toast", "Greek Yogurt Parfait", "Veggie Omelette", "Smoothie Bowl", "Chia Pudding", "Protein Pancakes"][day],
            description: [
              "Fluffy quinoa topped with fresh berries and a drizzle of maple syrup",
              "Whole grain toast with mashed avocado, cherry tomatoes, and herbs",
              "Layered yogurt with granola, fresh berries, and honey drizzle",
              "Fluffy egg omelette with peppers, onions, and spinach",
              "Blended acai bowl topped with fresh fruits and seeds",
              "Overnight chia seeds with vanilla, berries, and almond milk",
              "Fluffy protein-packed pancakes with fresh fruit topping"
            ][day],
            calories: [380, 350, 320, 290, 410, 340, 450][day],
            prepTime: [15, 10, 8, 20, 10, 5, 25][day],
            servings: 1,
            tags: ["High-Fiber", "Energizing"],
            ingredients: ["Quinoa", "Fresh berries", "Maple syrup", "Cinnamon"],
            instructions: ["Cook quinoa according to package", "Top with fresh berries", "Drizzle with maple syrup", "Add a sprinkle of cinnamon"]
          },
          lunch: {
            name: ["Mediterranean Chickpea Salad", "Grilled Chicken Wrap", "Quinoa Buddha Bowl", "Lentil Soup", "Caprese Sandwich", "Asian Stir-Fry", "Turkey Club Bowl"][day],
            description: [
              "Fresh vegetables, chickpeas, olives, and herbs with a lemon-tahini dressing",
              "Grilled chicken with crisp lettuce, tomatoes, and cucumber in a whole wheat wrap",
              "Colorful bowl with quinoa, roasted vegetables, and tahini sauce",
              "Hearty lentil soup with carrots, celery, and aromatic herbs",
              "Fresh mozzarella, tomatoes, and basil on whole grain bread",
              "Colorful vegetables and tofu in a savory Asian-inspired sauce",
              "Deconstructed turkey club with mixed greens and avocado"
            ][day],
            calories: [420, 480, 520, 350, 400, 460, 510][day],
            prepTime: [20, 15, 25, 30, 10, 20, 15][day],
            servings: 1,
            tags: ["Protein-Rich", "Balanced"],
            ingredients: ["Chickpeas", "Mixed vegetables", "Lemon", "Tahini", "Olive oil"],
            instructions: ["Chop all vegetables", "Mix chickpeas with vegetables", "Prepare tahini dressing", "Combine and serve"]
          },
          dinner: {
            name: ["Herb-Crusted Salmon", "Stuffed Bell Peppers", "Grilled Portobello Steaks", "Chicken Teriyaki", "Zucchini Noodles", "Cauliflower Rice Bowl", "Baked Cod"][day],
            description: [
              "Wild-caught salmon with a herb crust, served with colorful roasted vegetables",
              "Bell peppers filled with seasoned rice, vegetables, and herbs",
              "Grilled portobello mushrooms with balsamic glaze and roasted vegetables",
              "Tender chicken in a homemade teriyaki sauce with steamed broccoli",
              "Spiralized zucchini with marinara sauce and vegetables",
              "Cauliflower rice bowl with roasted chickpeas and tahini drizzle",
              "Flaky baked cod with lemon butter and asparagus"
            ][day],
            calories: [520, 440, 380, 490, 340, 420, 460][day],
            prepTime: [35, 40, 25, 30, 20, 25, 35][day],
            servings: 1,
            tags: ["Heart-Healthy", "Omega-3"],
            ingredients: ["Salmon fillet", "Fresh herbs", "Olive oil", "Mixed vegetables", "Lemon"],
            instructions: ["Preheat oven to 400°F", "Season salmon with herbs", "Roast vegetables", "Bake salmon for 15-20 minutes", "Serve with vegetables"]
          },
          snacks: [
            {
              name: ["Apple with Almond Butter", "Veggie Sticks", "Trail Mix", "Rice Cakes", "Fruit Salad", "Energy Balls", "Cucumber Bites"][day],
              description: "Quick and nutritious snack option",
              calories: [180, 120, 210, 90, 150, 170, 80][day],
              prepTime: 5,
              servings: 1,
              tags: ["Quick", "Healthy"],
              ingredients: ["Main ingredient", "Complementary items"],
              instructions: ["Prepare ingredients", "Combine and serve"]
            },
            {
              name: ["Vegetable Hummus Wrap", "Protein Smoothie", "Nuts Mix", "Fresh Berries", "Cottage Cheese Bowl", "Celery Sticks", "Dark Chocolate"][day],
              description: "Another great snack to keep you energized",
              calories: [160, 190, 200, 100, 140, 70, 150][day],
              prepTime: [10, 5, 2, 3, 5, 5, 1][day],
              servings: 1,
              tags: ["Protein-Rich", "Satisfying"],
              ingredients: ["Primary component", "Supporting ingredients"],
              instructions: ["Quick preparation steps"]
            }
          ]
        });
      }

      const mockPlan: MealPlan = { days };
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
