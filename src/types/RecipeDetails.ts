import { RecipeSummary } from "./RecipeSummary";

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface Instruction {
  step: number;
  description: string;
  time?: number; // in minutes
}

export interface RecipeDetails extends RecipeSummary {
  ingredients: Ingredient[];
  instructions: Instruction[];
  notes?: string[];
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tips?: string[];
  nutritionPerServing?: {
    protein: number; // in grams
    carbs: number; // in grams
    fat: number; // in grams
    calories: number;
    fiber?: number; // in grams
    sugar?: number; // in grams
  };
}
