import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Users, ChefHat, ListChecks } from "lucide-react";

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

interface MealDetailsDialogProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

const MealDetailsDialog = ({ meal, isOpen, onClose }: MealDetailsDialogProps) => {
  if (!meal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{meal.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">{meal.description}</p>

          <div className="flex flex-wrap gap-2">
            {meal.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" />
              <span className="font-medium">{meal.calories} cal</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">{meal.prepTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">{meal.servings} serving{meal.servings > 1 ? 's' : ''}</span>
            </div>
          </div>

          {meal.ingredients && meal.ingredients.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Ingredients</h3>
              </div>
              <ul className="space-y-2 pl-7">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm list-disc">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meal.instructions && meal.instructions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Instructions</h3>
              </div>
              <ol className="space-y-3 pl-7">
                {meal.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm list-decimal">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealDetailsDialog;
