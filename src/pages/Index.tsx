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
      
      // Detailed recipe database
      const breakfastRecipes = [
        {
          name: "Quinoa Berry Bowl",
          description: "Fluffy quinoa topped with fresh berries and a drizzle of maple syrup",
          calories: 380, prepTime: 15, servings: 1, tags: ["High-Fiber", "Energizing"],
          ingredients: ["1 cup cooked quinoa", "1/2 cup mixed fresh berries (blueberries, strawberries, raspberries)", "1 tbsp pure maple syrup", "1/4 tsp ground cinnamon", "2 tbsp chopped almonds", "1 tsp chia seeds"],
          instructions: ["Cook quinoa in water according to package directions (usually 15 minutes)", "Fluff cooked quinoa with a fork and transfer to a bowl", "Top with fresh mixed berries", "Drizzle with maple syrup", "Sprinkle with cinnamon, chopped almonds, and chia seeds", "Serve warm or chilled"]
        },
        {
          name: "Avocado Toast",
          description: "Whole grain toast with mashed avocado, cherry tomatoes, and herbs",
          calories: 350, prepTime: 10, servings: 1, tags: ["Heart-Healthy", "Quick"],
          ingredients: ["2 slices whole grain bread", "1 ripe avocado", "1/2 cup cherry tomatoes, halved", "1 tbsp fresh basil, chopped", "1 tsp lemon juice", "Sea salt and black pepper to taste", "Red pepper flakes (optional)", "Drizzle of olive oil"],
          instructions: ["Toast the whole grain bread until golden and crispy", "Mash the avocado in a small bowl with lemon juice, salt, and pepper", "Spread the mashed avocado evenly on both toast slices", "Top with halved cherry tomatoes", "Sprinkle with fresh chopped basil", "Add a pinch of red pepper flakes if desired", "Finish with a light drizzle of olive oil and serve immediately"]
        },
        {
          name: "Greek Yogurt Parfait",
          description: "Layered yogurt with granola, fresh berries, and honey drizzle",
          calories: 320, prepTime: 8, servings: 1, tags: ["Protein-Rich", "Probiotic"],
          ingredients: ["1 cup plain Greek yogurt", "1/3 cup granola", "1/2 cup mixed berries (blueberries, strawberries)", "1 tbsp honey", "1 tbsp sliced almonds", "1 tsp flaxseeds"],
          instructions: ["In a glass or bowl, add a layer of Greek yogurt", "Sprinkle a layer of granola over the yogurt", "Add a layer of fresh mixed berries", "Repeat layers once more", "Drizzle honey on top", "Garnish with sliced almonds and flaxseeds", "Serve immediately for best texture"]
        },
        {
          name: "Veggie Omelette",
          description: "Fluffy egg omelette with peppers, onions, and spinach",
          calories: 290, prepTime: 20, servings: 1, tags: ["Protein-Rich", "Low-Carb"],
          ingredients: ["3 large eggs", "1/4 cup diced bell peppers (red and yellow)", "1/4 cup diced onions", "1 cup fresh spinach leaves", "2 tbsp milk", "1 tbsp olive oil or butter", "Salt and black pepper to taste", "1 tbsp shredded cheese (optional)"],
          instructions: ["Whisk eggs with milk, salt, and pepper in a bowl until well combined", "Heat oil or butter in a non-stick pan over medium heat", "Sauté onions and bell peppers for 3-4 minutes until softened", "Add spinach and cook until wilted, about 1 minute", "Pour whisked eggs over the vegetables", "Let cook undisturbed for 2-3 minutes until edges set", "Gently fold omelette in half and cook for another 2 minutes", "Add cheese if desired, then slide onto plate and serve hot"]
        },
        {
          name: "Smoothie Bowl",
          description: "Blended acai bowl topped with fresh fruits and seeds",
          calories: 410, prepTime: 10, servings: 1, tags: ["Antioxidant", "Energizing"],
          ingredients: ["1 packet frozen acai puree (100g)", "1 frozen banana", "1/2 cup frozen mixed berries", "1/4 cup almond milk", "Toppings: 1/4 cup granola, 1/4 cup fresh strawberries, 1/4 cup blueberries, 1 tbsp coconut flakes, 1 tbsp chia seeds, 1 tsp honey"],
          instructions: ["Add frozen acai, banana, mixed berries, and almond milk to a blender", "Blend on high until smooth and thick (add more milk if too thick)", "Pour into a bowl", "Arrange toppings in sections: granola, fresh strawberries, blueberries", "Sprinkle with coconut flakes and chia seeds", "Drizzle with honey", "Serve immediately with a spoon"]
        },
        {
          name: "Chia Pudding",
          description: "Overnight chia seeds with vanilla, berries, and almond milk",
          calories: 340, prepTime: 5, servings: 1, tags: ["High-Fiber", "Make-Ahead"],
          ingredients: ["3 tbsp chia seeds", "1 cup unsweetened almond milk", "1/2 tsp vanilla extract", "1 tbsp maple syrup", "1/2 cup mixed fresh berries", "2 tbsp sliced almonds", "Pinch of cinnamon"],
          instructions: ["In a jar or bowl, combine chia seeds, almond milk, vanilla extract, and maple syrup", "Stir well to prevent clumping", "Cover and refrigerate for at least 4 hours or overnight", "Stir pudding before serving to ensure even consistency", "Top with fresh mixed berries", "Sprinkle with sliced almonds and a pinch of cinnamon", "Enjoy cold"]
        },
        {
          name: "Protein Pancakes",
          description: "Fluffy protein-packed pancakes with fresh fruit topping",
          calories: 450, prepTime: 25, servings: 1, tags: ["High-Protein", "Satisfying"],
          ingredients: ["1 scoop vanilla protein powder (30g)", "1 ripe banana, mashed", "2 large eggs", "1/4 cup oat flour", "1/4 tsp baking powder", "1/4 tsp cinnamon", "Cooking spray", "Toppings: 1/2 cup fresh berries, 1 tbsp almond butter, 1 tsp maple syrup"],
          instructions: ["In a bowl, mash the banana until smooth", "Add eggs and whisk together with the banana", "Mix in protein powder, oat flour, baking powder, and cinnamon until combined", "Heat a non-stick pan over medium heat and spray with cooking oil", "Pour 1/4 cup of batter per pancake into the pan", "Cook for 2-3 minutes until bubbles form on surface", "Flip and cook for another 2 minutes until golden brown", "Stack pancakes on a plate, top with fresh berries, almond butter, and maple syrup", "Serve warm"]
        }
      ];

      const lunchRecipes = [
        {
          name: "Mediterranean Chickpea Salad",
          description: "Fresh vegetables, chickpeas, olives, and herbs with a lemon-tahini dressing",
          calories: 420, prepTime: 20, servings: 1, tags: ["Protein-Rich", "Plant-Based"],
          ingredients: ["1 cup cooked chickpeas", "1 cup diced cucumber", "1 cup cherry tomatoes, halved", "1/4 cup diced red onion", "1/4 cup Kalamata olives, sliced", "1/4 cup crumbled feta cheese", "2 tbsp fresh parsley, chopped", "Dressing: 2 tbsp tahini, juice of 1 lemon, 1 tbsp olive oil, 1 garlic clove minced, salt and pepper"],
          instructions: ["Drain and rinse chickpeas, pat dry", "Dice cucumber, halve cherry tomatoes, and dice red onion", "In a large bowl, combine chickpeas, cucumber, tomatoes, onion, olives, and feta", "Make dressing: whisk together tahini, lemon juice, olive oil, minced garlic, salt, and pepper", "Add 1-2 tbsp water to thin dressing if needed", "Pour dressing over salad and toss well to combine", "Garnish with fresh parsley", "Let sit for 10 minutes to allow flavors to meld, or serve immediately"]
        },
        {
          name: "Grilled Chicken Wrap",
          description: "Grilled chicken with crisp lettuce, tomatoes, and cucumber in a whole wheat wrap",
          calories: 480, prepTime: 15, servings: 1, tags: ["High-Protein", "Balanced"],
          ingredients: ["1 whole wheat tortilla (10-inch)", "4 oz grilled chicken breast, sliced", "1 cup romaine lettuce, shredded", "1/2 cup sliced tomatoes", "1/4 cup sliced cucumber", "2 tbsp hummus", "1 tbsp Greek yogurt", "1 tsp lemon juice", "Salt and pepper to taste"],
          instructions: ["Season chicken breast with salt and pepper, then grill or pan-sear over medium-high heat for 5-6 minutes per side until cooked through", "Let chicken rest for 5 minutes, then slice thinly", "Warm the whole wheat tortilla in a dry pan for 30 seconds per side", "Spread hummus evenly over the center of the tortilla", "Layer shredded lettuce, sliced tomatoes, and cucumber", "Add sliced grilled chicken on top", "Mix Greek yogurt with lemon juice and drizzle over filling", "Fold in the sides of the tortilla and roll tightly from bottom to top", "Cut in half diagonally and serve"]
        },
        {
          name: "Quinoa Buddha Bowl",
          description: "Colorful bowl with quinoa, roasted vegetables, and tahini sauce",
          calories: 520, prepTime: 25, servings: 1, tags: ["Plant-Based", "Nutrient-Dense"],
          ingredients: ["3/4 cup cooked quinoa", "1/2 cup roasted sweet potato cubes", "1/2 cup roasted broccoli florets", "1/4 cup shredded red cabbage", "1/4 cup chickpeas, roasted", "1/4 avocado, sliced", "Tahini sauce: 2 tbsp tahini, 1 tbsp lemon juice, 1 garlic clove minced, 2-3 tbsp water, salt", "1 tbsp sesame seeds"],
          instructions: ["Preheat oven to 400°F (200°C)", "Toss sweet potato cubes and broccoli with olive oil, salt, and pepper", "Roast vegetables for 20 minutes until tender and slightly caramelized", "Toss chickpeas with olive oil and seasonings, roast for 15 minutes until crispy", "Cook quinoa according to package directions", "Make tahini sauce: whisk tahini, lemon juice, minced garlic, water, and salt until smooth", "Assemble bowl: place quinoa as base, arrange roasted vegetables, chickpeas, red cabbage, and avocado slices on top", "Drizzle with tahini sauce and sprinkle with sesame seeds", "Serve warm"]
        },
        {
          name: "Lentil Soup",
          description: "Hearty lentil soup with carrots, celery, and aromatic herbs",
          calories: 350, prepTime: 30, servings: 1, tags: ["High-Fiber", "Comforting"],
          ingredients: ["1/2 cup dry green or brown lentils", "1/2 cup diced carrots", "1/2 cup diced celery", "1/4 cup diced onion", "2 garlic cloves, minced", "2 cups vegetable broth", "1 bay leaf", "1 tsp cumin", "1/2 tsp dried thyme", "1 tbsp olive oil", "Salt and pepper to taste", "Fresh parsley for garnish"],
          instructions: ["Rinse lentils under cold water and drain", "Heat olive oil in a pot over medium heat", "Sauté onions, carrots, and celery for 5 minutes until softened", "Add minced garlic and cook for 1 minute until fragrant", "Add lentils, vegetable broth, bay leaf, cumin, thyme, salt, and pepper", "Bring to a boil, then reduce heat and simmer for 25-30 minutes until lentils are tender", "Remove bay leaf", "Taste and adjust seasonings as needed", "Ladle into bowl, garnish with fresh parsley, and serve hot"]
        },
        {
          name: "Caprese Sandwich",
          description: "Fresh mozzarella, tomatoes, and basil on whole grain bread",
          calories: 400, prepTime: 10, servings: 1, tags: ["Quick", "Fresh"],
          ingredients: ["2 slices whole grain bread", "4 oz fresh mozzarella, sliced", "1 large tomato, sliced", "6-8 fresh basil leaves", "1 tbsp balsamic glaze", "1 tbsp pesto (optional)", "1 tsp olive oil", "Salt and pepper to taste"],
          instructions: ["Lightly toast the whole grain bread slices", "If using pesto, spread a thin layer on one or both slices", "Layer fresh mozzarella slices on the bread", "Add tomato slices on top of the mozzarella", "Season tomatoes with a pinch of salt and pepper", "Layer fresh basil leaves over the tomatoes", "Drizzle with balsamic glaze and olive oil", "Top with the second slice of bread", "Cut in half and serve immediately"]
        },
        {
          name: "Asian Stir-Fry",
          description: "Colorful vegetables and tofu in a savory Asian-inspired sauce",
          calories: 460, prepTime: 20, servings: 1, tags: ["Plant-Based", "Flavorful"],
          ingredients: ["6 oz firm tofu, pressed and cubed", "1 cup broccoli florets", "1/2 cup sliced bell peppers (red and yellow)", "1/2 cup snap peas", "1/4 cup sliced carrots", "2 garlic cloves, minced", "1 tsp fresh ginger, grated", "Sauce: 2 tbsp soy sauce, 1 tbsp rice vinegar, 1 tsp sesame oil, 1 tsp honey, 1 tsp cornstarch", "2 tbsp vegetable oil", "1 tsp sesame seeds", "Serve over brown rice or cauliflower rice"],
          instructions: ["Press tofu to remove excess moisture, then cut into 1-inch cubes", "Mix sauce ingredients in a small bowl and set aside", "Heat 1 tbsp oil in a wok or large pan over high heat", "Add tofu cubes and cook for 5-7 minutes, turning occasionally until golden on all sides. Remove and set aside", "Add remaining oil to pan, then add garlic and ginger, stir-fry for 30 seconds", "Add broccoli, bell peppers, carrots, and snap peas. Stir-fry for 5-6 minutes until vegetables are tender-crisp", "Return tofu to pan and pour sauce over everything", "Toss well for 1-2 minutes until sauce thickens and coats everything", "Sprinkle with sesame seeds and serve immediately"]
        },
        {
          name: "Turkey Club Bowl",
          description: "Deconstructed turkey club with mixed greens and avocado",
          calories: 510, prepTime: 15, servings: 1, tags: ["High-Protein", "Low-Carb"],
          ingredients: ["2 cups mixed salad greens", "4 oz sliced turkey breast", "2 strips cooked bacon, crumbled", "1/2 cup cherry tomatoes, halved", "1/4 avocado, sliced", "1/4 cup shredded cheddar cheese", "1 hard-boiled egg, sliced", "Dressing: 2 tbsp Greek yogurt, 1 tsp Dijon mustard, 1 tsp lemon juice, salt and pepper"],
          instructions: ["Arrange mixed greens in a large bowl as the base", "Cook bacon until crispy, drain on paper towels, then crumble", "Hard-boil egg: boil for 10 minutes, cool in ice water, then peel and slice", "Arrange sliced turkey, crumbled bacon, cherry tomatoes, avocado slices, and egg slices on top of greens", "Sprinkle with shredded cheddar cheese", "Make dressing: mix Greek yogurt, Dijon mustard, lemon juice, salt, and pepper", "Drizzle dressing over the bowl", "Toss just before eating or enjoy as-is"]
        }
      ];

      const dinnerRecipes = [
        {
          name: "Herb-Crusted Salmon",
          description: "Wild-caught salmon with a herb crust, served with colorful roasted vegetables",
          calories: 520, prepTime: 35, servings: 1, tags: ["Heart-Healthy", "Omega-3"],
          ingredients: ["6 oz salmon fillet", "1 tbsp fresh dill, chopped", "1 tbsp fresh parsley, chopped", "1 tsp fresh thyme leaves", "1 garlic clove, minced", "1 tbsp Dijon mustard", "2 tbsp olive oil", "1 cup mixed vegetables (zucchini, bell peppers, carrots)", "1 lemon, sliced", "Salt and pepper to taste"],
          instructions: ["Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper", "Pat salmon dry with paper towels and place on the baking sheet", "Mix chopped dill, parsley, thyme, and minced garlic with Dijon mustard and 1 tbsp olive oil", "Spread herb mixture evenly over the top of the salmon", "Toss mixed vegetables with remaining olive oil, salt, and pepper", "Arrange vegetables around the salmon on the baking sheet", "Place lemon slices on top of salmon", "Bake for 15-20 minutes until salmon flakes easily with a fork and reaches internal temperature of 145°F", "Remove from oven and let rest for 3 minutes", "Serve salmon with roasted vegetables and a squeeze of fresh lemon"]
        },
        {
          name: "Stuffed Bell Peppers",
          description: "Bell peppers filled with seasoned rice, vegetables, and herbs",
          calories: 440, prepTime: 40, servings: 1, tags: ["Vegetarian", "Fiber-Rich"],
          ingredients: ["2 large bell peppers (any color)", "3/4 cup cooked brown rice", "1/2 cup black beans, drained", "1/4 cup diced tomatoes", "1/4 cup diced onions", "1/4 cup corn kernels", "1/4 cup shredded cheese", "1 garlic clove, minced", "1 tsp cumin", "1/2 tsp paprika", "1 tbsp olive oil", "Fresh cilantro for garnish", "Salt and pepper"],
          instructions: ["Preheat oven to 375°F (190°C)", "Cut tops off bell peppers and remove seeds and membranes", "Heat olive oil in a pan over medium heat", "Sauté onions for 3-4 minutes until softened, add garlic and cook 1 minute more", "In a bowl, combine cooked rice, black beans, diced tomatoes, corn, sautéed onions and garlic, cumin, paprika, salt, and pepper", "Stuff each bell pepper with the rice mixture, packing it firmly", "Place stuffed peppers upright in a baking dish", "Sprinkle shredded cheese on top of each pepper", "Cover dish with foil and bake for 30 minutes", "Remove foil and bake for 10 more minutes until cheese is melted and peppers are tender", "Garnish with fresh cilantro and serve hot"]
        },
        {
          name: "Grilled Portobello Steaks",
          description: "Grilled portobello mushrooms with balsamic glaze and roasted vegetables",
          calories: 380, prepTime: 25, servings: 1, tags: ["Plant-Based", "Low-Carb"],
          ingredients: ["2 large portobello mushroom caps", "2 tbsp balsamic vinegar", "1 tbsp olive oil", "2 garlic cloves, minced", "1 tsp fresh rosemary, chopped", "1 cup asparagus spears", "1/2 cup cherry tomatoes", "Salt and pepper to taste", "Fresh parsley for garnish"],
          instructions: ["Clean portobello caps with a damp cloth and remove stems", "Mix balsamic vinegar, olive oil, minced garlic, rosemary, salt, and pepper in a small bowl", "Brush both sides of mushroom caps generously with the marinade", "Let marinate for 10 minutes", "Preheat grill or grill pan to medium-high heat", "Grill mushroom caps for 4-5 minutes per side until tender and grill marks appear", "Meanwhile, toss asparagus and cherry tomatoes with olive oil, salt, and pepper", "Roast vegetables in oven at 400°F for 10-12 minutes or grill alongside mushrooms", "Slice portobello steaks and serve with roasted vegetables", "Drizzle with any remaining balsamic glaze and garnish with fresh parsley"]
        },
        {
          name: "Chicken Teriyaki",
          description: "Tender chicken in a homemade teriyaki sauce with steamed broccoli",
          calories: 490, prepTime: 30, servings: 1, tags: ["High-Protein", "Asian-Inspired"],
          ingredients: ["6 oz chicken breast, cut into bite-size pieces", "Teriyaki sauce: 3 tbsp soy sauce, 2 tbsp mirin or rice wine, 1 tbsp honey, 1 garlic clove minced, 1 tsp fresh ginger grated, 1 tsp cornstarch", "1 tbsp vegetable oil", "2 cups broccoli florets", "1 tsp sesame seeds", "1 green onion, sliced", "Serve over white or brown rice"],
          instructions: ["Make teriyaki sauce: whisk together soy sauce, mirin, honey, minced garlic, grated ginger, and cornstarch in a small bowl", "Cut chicken breast into bite-size pieces", "Heat oil in a large pan or wok over medium-high heat", "Add chicken pieces and cook for 6-8 minutes, stirring occasionally, until golden brown and cooked through", "Meanwhile, steam broccoli florets for 5-6 minutes until tender-crisp", "Pour teriyaki sauce over the cooked chicken", "Stir and cook for 2-3 minutes until sauce thickens and glazes the chicken", "Add steamed broccoli to the pan and toss to coat with sauce", "Sprinkle with sesame seeds and sliced green onions", "Serve hot over a bed of rice"]
        },
        {
          name: "Zucchini Noodles",
          description: "Spiralized zucchini with marinara sauce and vegetables",
          calories: 340, prepTime: 20, servings: 1, tags: ["Low-Carb", "Vegetarian"],
          ingredients: ["2 medium zucchini, spiralized", "1 cup marinara sauce (no added sugar)", "1/2 cup cherry tomatoes, halved", "1/4 cup diced bell peppers", "2 garlic cloves, minced", "1 tbsp olive oil", "1/4 tsp red pepper flakes", "Fresh basil leaves", "2 tbsp grated Parmesan cheese", "Salt and pepper"],
          instructions: ["Spiralize zucchini into noodles using a spiralizer or julienne peeler", "Place zucchini noodles in a colander, sprinkle with a pinch of salt, and let drain for 10 minutes to remove excess moisture", "Heat olive oil in a large pan over medium heat", "Sauté garlic for 30 seconds until fragrant", "Add bell peppers and cook for 2-3 minutes", "Add marinara sauce and cherry tomatoes, simmer for 5 minutes", "Pat zucchini noodles dry with paper towels", "Add zucchini noodles to the pan and toss with sauce for 2-3 minutes until just heated through (don't overcook)", "Season with red pepper flakes, salt, and pepper", "Serve immediately, topped with fresh basil and Parmesan cheese"]
        },
        {
          name: "Cauliflower Rice Bowl",
          description: "Cauliflower rice bowl with roasted chickpeas and tahini drizzle",
          calories: 420, prepTime: 25, servings: 1, tags: ["Plant-Based", "Low-Carb"],
          ingredients: ["2 cups riced cauliflower", "1 cup chickpeas, drained and patted dry", "1 tsp cumin", "1 tsp paprika", "1/2 tsp garlic powder", "1 cup baby kale or spinach", "1/4 cup diced cucumber", "1/4 cup shredded carrots", "Tahini dressing: 2 tbsp tahini, juice of 1/2 lemon, 1 garlic clove minced, 2 tbsp water, salt", "2 tbsp olive oil", "Salt and pepper"],
          instructions: ["Preheat oven to 400°F (200°C)", "Toss chickpeas with 1 tbsp olive oil, cumin, paprika, garlic powder, salt, and pepper", "Spread chickpeas on a baking sheet and roast for 20-25 minutes until crispy, shaking pan halfway through", "Heat remaining olive oil in a large pan over medium heat", "Add riced cauliflower and sauté for 5-7 minutes until tender", "Season cauliflower rice with salt and pepper", "Make tahini dressing: whisk tahini, lemon juice, minced garlic, water, and salt until smooth and creamy", "Assemble bowl: place cauliflower rice as base, add baby kale, cucumber, shredded carrots, and crispy chickpeas", "Drizzle generously with tahini dressing", "Serve warm"]
        },
        {
          name: "Baked Cod",
          description: "Flaky baked cod with lemon butter and asparagus",
          calories: 460, prepTime: 35, servings: 1, tags: ["Low-Carb", "Omega-3"],
          ingredients: ["6 oz cod fillet", "1 tbsp butter, melted", "1 lemon (half sliced, half for juice)", "2 garlic cloves, minced", "1 tsp fresh parsley, chopped", "1 cup asparagus spears, trimmed", "1 tbsp olive oil", "Salt and pepper to taste", "Lemon wedges for serving"],
          instructions: ["Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper", "Pat cod fillet dry with paper towels and place on one side of the baking sheet", "Mix melted butter with minced garlic, juice from half the lemon, and chopped parsley", "Brush the butter mixture over the cod fillet", "Place lemon slices on top of the cod", "Season with salt and pepper", "Toss asparagus with olive oil, salt, and pepper, and arrange on the other side of the baking sheet", "Bake for 15-18 minutes until cod flakes easily with a fork and reaches 145°F internal temperature", "Asparagus should be tender and slightly caramelized", "Serve cod with roasted asparagus and lemon wedges for squeezing"]
        }
      ];

      const snackRecipes = [
        [
          { name: "Apple with Almond Butter", description: "Crisp apple slices with creamy almond butter", calories: 180, prepTime: 5, servings: 1, tags: ["Quick", "Healthy"], 
            ingredients: ["1 medium apple, sliced", "2 tbsp almond butter", "Pinch of cinnamon (optional)"],
            instructions: ["Wash and core the apple", "Slice apple into 8-10 wedges", "Arrange apple slices on a plate", "Serve with almond butter for dipping or spread on each slice", "Sprinkle with cinnamon if desired"] },
          { name: "Vegetable Hummus Wrap", description: "Whole wheat wrap with hummus and fresh vegetables", calories: 160, prepTime: 10, servings: 1, tags: ["Fiber-Rich", "Plant-Based"],
            ingredients: ["1 small whole wheat tortilla", "3 tbsp hummus", "1/4 cup shredded carrots", "1/4 cup sliced cucumber", "1/4 cup sliced bell peppers", "Handful of spinach leaves"],
            instructions: ["Lay tortilla flat on a clean surface", "Spread hummus evenly over the entire tortilla", "Layer spinach leaves in the center", "Add shredded carrots, sliced cucumber, and bell peppers", "Roll tightly from one end to the other", "Cut in half diagonally and serve"] }
        ],
        [
          { name: "Veggie Sticks", description: "Colorful vegetable sticks with ranch dip", calories: 120, prepTime: 5, servings: 1, tags: ["Low-Calorie", "Crunchy"],
            ingredients: ["1/2 cup carrot sticks", "1/2 cup celery sticks", "1/2 cup bell pepper strips", "3 tbsp Greek yogurt ranch dip or hummus"],
            instructions: ["Wash and peel carrots, cut into sticks", "Wash celery, cut into sticks", "Wash bell peppers, remove seeds, cut into strips", "Arrange all vegetable sticks on a plate", "Serve with ranch dip or hummus for dipping"] },
          { name: "Protein Smoothie", description: "Creamy protein smoothie with banana and berries", calories: 190, prepTime: 5, servings: 1, tags: ["Protein-Rich", "Refreshing"],
            ingredients: ["1 scoop vanilla protein powder", "1 frozen banana", "1/2 cup frozen mixed berries", "1 cup unsweetened almond milk", "1 tbsp almond butter", "Ice cubes (optional)"],
            instructions: ["Add almond milk to blender first", "Add frozen banana and mixed berries", "Add protein powder and almond butter", "Blend on high for 60 seconds until smooth and creamy", "Add ice cubes if you prefer it thicker", "Pour into a glass and enjoy immediately"] }
        ],
        [
          { name: "Trail Mix", description: "Energy-boosting mix of nuts, seeds, and dried fruit", calories: 210, prepTime: 2, servings: 1, tags: ["Energy", "Portable"],
            ingredients: ["2 tbsp raw almonds", "2 tbsp raw cashews", "1 tbsp pumpkin seeds", "1 tbsp dried cranberries", "1 tbsp dark chocolate chips"],
            instructions: ["Combine almonds, cashews, and pumpkin seeds in a small bowl", "Add dried cranberries and dark chocolate chips", "Mix well", "Store in an airtight container or enjoy immediately"] },
          { name: "Nuts Mix", description: "Roasted mixed nuts with sea salt", calories: 200, prepTime: 2, servings: 1, tags: ["Protein-Rich", "Heart-Healthy"],
            ingredients: ["2 tbsp roasted almonds", "2 tbsp roasted cashews", "1 tbsp roasted pistachios", "Pinch of sea salt"],
            instructions: ["Combine all roasted nuts in a small bowl", "Sprinkle with a pinch of sea salt", "Toss to combine", "Enjoy as a crunchy snack"] }
        ],
        [
          { name: "Rice Cakes", description: "Brown rice cakes with avocado and sea salt", calories: 90, prepTime: 3, servings: 1, tags: ["Light", "Crunchy"],
            ingredients: ["2 plain brown rice cakes", "1/4 ripe avocado, mashed", "Pinch of sea salt", "Red pepper flakes (optional)"],
            instructions: ["Mash avocado in a small bowl", "Spread mashed avocado evenly on each rice cake", "Sprinkle with sea salt", "Add red pepper flakes if desired", "Serve immediately"] },
          { name: "Fresh Berries", description: "Mixed fresh berries with a touch of honey", calories: 100, prepTime: 3, servings: 1, tags: ["Antioxidant", "Sweet"],
            ingredients: ["1/2 cup fresh strawberries", "1/4 cup fresh blueberries", "1/4 cup fresh raspberries", "1 tsp honey (optional)"],
            instructions: ["Wash all berries gently under cold water", "Hull strawberries and cut larger ones in half", "Combine all berries in a bowl", "Drizzle with honey if desired", "Enjoy fresh"] }
        ],
        [
          { name: "Fruit Salad", description: "Refreshing mix of seasonal fresh fruits", calories: 150, prepTime: 8, servings: 1, tags: ["Refreshing", "Vitamin-C"],
            ingredients: ["1/2 cup diced watermelon", "1/2 cup diced pineapple", "1/4 cup sliced strawberries", "1/4 cup blueberries", "Juice of 1/2 lime", "Fresh mint leaves"],
            instructions: ["Wash and prepare all fruits", "Dice watermelon and pineapple into bite-size cubes", "Slice strawberries", "Combine all fruits in a bowl", "Squeeze fresh lime juice over the fruit", "Toss gently to combine", "Garnish with fresh mint leaves", "Chill or serve immediately"] },
          { name: "Cottage Cheese Bowl", description: "Creamy cottage cheese with fresh berries and seeds", calories: 140, prepTime: 5, servings: 1, tags: ["High-Protein", "Probiotic"],
            ingredients: ["1/2 cup low-fat cottage cheese", "1/4 cup fresh blueberries", "1/4 cup sliced strawberries", "1 tsp chia seeds", "1 tsp honey"],
            instructions: ["Scoop cottage cheese into a bowl", "Top with fresh blueberries and sliced strawberries", "Sprinkle chia seeds over the top", "Drizzle with honey", "Mix gently and enjoy"] }
        ],
        [
          { name: "Energy Balls", description: "No-bake energy balls with oats, dates, and nuts", calories: 170, prepTime: 10, servings: 1, tags: ["Energy", "No-Bake"],
            ingredients: ["1/4 cup rolled oats", "3 Medjool dates, pitted", "2 tbsp almond butter", "1 tbsp ground flaxseed", "1 tsp honey", "1 tsp vanilla extract", "Pinch of sea salt"],
            instructions: ["Add pitted dates to a food processor and pulse until finely chopped", "Add oats, almond butter, flaxseed, honey, vanilla, and salt", "Process until mixture comes together and is sticky", "Roll mixture into 4-5 small balls using your hands", "Refrigerate for at least 30 minutes to firm up", "Store in refrigerator and enjoy as needed"] },
          { name: "Celery Sticks", description: "Crisp celery sticks with peanut butter", calories: 70, prepTime: 5, servings: 1, tags: ["Low-Calorie", "Crunchy"],
            ingredients: ["3 celery stalks", "2 tbsp peanut butter or almond butter", "1 tsp raisins (optional)"],
            instructions: ["Wash celery stalks and trim ends", "Cut each stalk into 3-4 inch pieces", "Fill the celery groove with peanut butter or almond butter", "Top with a few raisins if desired (ants on a log style)", "Arrange on a plate and serve"] }
        ],
        [
          { name: "Cucumber Bites", description: "Refreshing cucumber rounds with herb cream cheese", calories: 80, prepTime: 8, servings: 1, tags: ["Low-Calorie", "Refreshing"],
            ingredients: ["1 medium cucumber", "3 tbsp light cream cheese", "1 tsp fresh dill, chopped", "1 tsp fresh chives, chopped", "Cherry tomatoes for topping", "Salt and pepper"],
            instructions: ["Wash cucumber and slice into 1/4-inch thick rounds", "Pat cucumber slices dry with paper towel", "Mix cream cheese with chopped dill, chives, salt, and pepper", "Spread or pipe a small amount of herb cream cheese on each cucumber round", "Top each with a halved cherry tomato", "Arrange on a serving plate", "Serve chilled"] },
          { name: "Dark Chocolate", description: "High-quality dark chocolate squares", calories: 150, prepTime: 1, servings: 1, tags: ["Antioxidant", "Treat"],
            ingredients: ["3 squares dark chocolate (70% cacao or higher)", "5-6 raw almonds (optional)"],
            instructions: ["Enjoy 3 squares of high-quality dark chocolate", "Pair with a few raw almonds for a satisfying combination", "Let the chocolate melt slowly in your mouth", "Store remaining chocolate in a cool, dry place"] }
        ]
      ];

      for (let day = 0; day < 7; day++) {
        days.push({
          breakfast: breakfastRecipes[day],
          lunch: lunchRecipes[day],
          dinner: dinnerRecipes[day],
          snacks: snackRecipes[day]
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
