import { useState } from "react";
import Hero from "@/components/Hero";
import DietaryRestrictions from "@/components/DietaryRestrictions";
import MealPlanDisplay from "@/components/MealPlanDisplay";
import S2MOverview from "@/components/S2MOverview";
import { useToast } from "@/hooks/use-toast";
import { generateMealPlan } from "@/research/generate-meal-plan";
import type { MealPlan } from "@/research/types";

const Index = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const onGeneratePlan = async (restrictions: string[]) => {
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = generateMealPlan(restrictions);
      setMealPlan(result.mealPlan);

      if (result.unsupportedRestrictions.length > 0) {
        toast({
          title: "Some restrictions aren’t supported (demo)",
          description: `Ignored: ${result.unsupportedRestrictions.join(", ")}`,
        });
      }

      if (result.unmetRestrictions.length > 0) {
        toast({
          title: "Some restrictions couldn’t be satisfied",
          description: `Fallback used for: ${result.unmetRestrictions.join(", ")}`,
        });
      }

      toast({
        title: "Meal plan generated!",
        description: "Your personalized 7-day meal plan is ready. Click any meal for details.",
      });
    } catch {
      toast({
        title: "Error generating meal plan",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <DietaryRestrictions onGeneratePlan={onGeneratePlan} isGenerating={isGenerating} />
      <MealPlanDisplay mealPlan={mealPlan} />
      <S2MOverview />
    </div>
  );
};

export default Index;
