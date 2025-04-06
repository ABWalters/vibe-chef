import { Recipe } from "./Recipe";

export const mockRecipes: Recipe[] = [
  {
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
    dietary: ["Vegetarian"],
    imageUrl: "/recipe-image.jpg",
  },
  {
    id: "2",
    name: "Cozy Butternut Squash Soup",
    description: "A warming and comforting soup perfect for chilly days.",
    prepTime: 15,
    cookTime: 30,
    macros: {
      protein: 5,
      carbs: 25,
      fat: 12,
      calories: 220,
    },
    dietary: ["Vegetarian"],
    imageUrl: "/recipe-image.jpg",
  },
  {
    id: "3",
    name: "Low-Carb Chicken Stir-Fry",
    description:
      "A quick and healthy stir-fry loaded with protein and vegetables.",
    prepTime: 15,
    cookTime: 15,
    macros: {
      protein: 35,
      carbs: 10,
      fat: 15,
      calories: 310,
    },
    dietary: ["Low-Carb"],
    imageUrl: "/recipe-image.jpg",
  },
];
