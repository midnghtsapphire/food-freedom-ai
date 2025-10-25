import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface Restriction {
  id: string;
  label: string;
  category: "allergy" | "medical" | "preference";
}

const restrictions: Restriction[] = [
  // Allergies
  { id: "gluten", label: "Gluten", category: "allergy" },
  { id: "dairy", label: "Dairy", category: "allergy" },
  { id: "nuts", label: "Tree Nuts", category: "allergy" },
  { id: "peanuts", label: "Peanuts", category: "allergy" },
  { id: "shellfish", label: "Shellfish", category: "allergy" },
  { id: "eggs", label: "Eggs", category: "allergy" },
  { id: "soy", label: "Soy", category: "allergy" },
  
  // Medical Conditions
  { id: "diabetes", label: "Diabetes", category: "medical" },
  { id: "fodmap", label: "Low-FODMAP", category: "medical" },
  { id: "ibs", label: "IBS", category: "medical" },
  { id: "celiac", label: "Celiac Disease", category: "medical" },
  { id: "kidney", label: "Kidney Disease", category: "medical" },
  
  // Preferences
  { id: "vegan", label: "Vegan", category: "preference" },
  { id: "vegetarian", label: "Vegetarian", category: "preference" },
  { id: "keto", label: "Keto", category: "preference" },
  { id: "paleo", label: "Paleo", category: "preference" },
  { id: "halal", label: "Halal", category: "preference" },
  { id: "kosher", label: "Kosher", category: "preference" },
];

interface DietaryRestrictionsProps {
  onGeneratePlan: (selectedRestrictions: string[]) => void;
  isGenerating: boolean;
}

const DietaryRestrictions = ({ onGeneratePlan, isGenerating }: DietaryRestrictionsProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleRestriction = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "allergy":
        return "bg-destructive/10 border-destructive/20 text-destructive";
      case "medical":
        return "bg-accent/10 border-accent/20 text-accent-foreground";
      case "preference":
        return "bg-primary/10 border-primary/20 text-primary";
      default:
        return "bg-secondary";
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "allergy":
        return "Food Allergies";
      case "medical":
        return "Medical Conditions";
      case "preference":
        return "Dietary Preferences";
      default:
        return "";
    }
  };

  const categories = ["allergy", "medical", "preference"] as const;

  return (
    <section id="meal-planner" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Select Your Dietary Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose all that apply. Our AI will create a personalized meal plan that accommodates everything.
          </p>
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              {selected.map(id => {
                const restriction = restrictions.find(r => r.id === id);
                return restriction ? (
                  <Badge 
                    key={id} 
                    className={getCategoryColor(restriction.category)}
                  >
                    {restriction.label}
                  </Badge>
                ) : null;
              })}
            </div>
          )}
        </div>

        <div className="space-y-8">
          {categories.map(category => (
            <Card key={category} className="p-6 shadow-soft hover:shadow-medium transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">{getCategoryTitle(category)}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {restrictions
                  .filter(r => r.category === category)
                  .map(restriction => (
                    <div
                      key={restriction.id}
                      onClick={() => toggleRestriction(restriction.id)}
                      className={`
                        flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer
                        transition-all duration-200
                        ${selected.includes(restriction.id)
                          ? 'border-primary bg-primary/5 shadow-soft'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                        }
                      `}
                    >
                      <Checkbox 
                        checked={selected.includes(restriction.id)}
                        onCheckedChange={() => toggleRestriction(restriction.id)}
                      />
                      <label className="text-sm font-medium cursor-pointer flex-1">
                        {restriction.label}
                      </label>
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="hero"
            size="xl"
            onClick={() => onGeneratePlan(selected)}
            disabled={selected.length === 0 || isGenerating}
            className="min-w-[280px]"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating Your Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate My Meal Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DietaryRestrictions;
