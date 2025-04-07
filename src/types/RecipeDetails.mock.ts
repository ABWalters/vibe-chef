import { RecipeDetails } from "./RecipeDetails";

export const mockRecipeDetails: RecipeDetails = {
  id: "1",
  name: "Energizing Green Smoothie Bowl",
  description:
    "A vibrant and nutritious smoothie bowl packed with superfoods to boost your energy levels.",
  prepTime: 10,
  cookTime: 0,
  macros: {
    protein: 25,
    carbs: 45,
    fat: 8,
    calories: 350,
  },
  dietary: ["Vegetarian", "Gluten-Free"],
  imageUrl: "/recipe-image.jpg",
  ingredients: [
    {
      name: "Frozen banana",
      amount: 1,
      unit: "large",
      notes: "Ripe banana, peeled and frozen overnight",
    },
    {
      name: "Baby spinach",
      amount: 2,
      unit: "cups",
      notes: "Fresh, packed",
    },
    {
      name: "Greek yogurt",
      amount: 1,
      unit: "cup",
      notes: "Plain, non-fat",
    },
    {
      name: "Almond milk",
      amount: 0.5,
      unit: "cup",
      notes: "Unsweetened",
    },
    {
      name: "Chia seeds",
      amount: 1,
      unit: "tablespoon",
    },
    {
      name: "Honey",
      amount: 1,
      unit: "tablespoon",
      notes: "Or maple syrup for vegan option",
    },
  ],
  instructions: [
    {
      step: 1,
      description:
        "Add frozen banana, spinach, Greek yogurt, and almond milk to a high-speed blender.",
      time: 2,
    },
    {
      step: 2,
      description:
        "Blend on high until smooth and creamy, scraping down sides as needed.",
      time: 3,
    },
    {
      step: 3,
      description:
        "Pour into a bowl and top with chia seeds and a drizzle of honey.",
      time: 2,
    },
    {
      step: 4,
      description:
        "Add any additional toppings of choice and serve immediately.",
      time: 3,
    },
  ],
  notes: [
    "For a thicker smoothie bowl, use less almond milk or add more frozen banana.",
    "Can be made ahead and frozen in portions for quick breakfast prep.",
  ],
  servings: 1,
  difficulty: "Easy",
  tips: [
    "Use frozen banana for a thicker, creamier texture",
    "Add protein powder for an extra protein boost",
    "Customize toppings with granola, fresh fruit, or nuts",
  ],
  nutritionPerServing: {
    protein: 25,
    carbs: 45,
    fat: 8,
    calories: 350,
    fiber: 7,
    sugar: 20,
  },
};
