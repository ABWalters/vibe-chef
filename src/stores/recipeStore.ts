import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RecipeDetails } from "../types/RecipeDetails";

interface RecipeState {
  recipeDetails: Record<string, RecipeDetails>;
  addRecipeDetails: (recipeId: string, details: RecipeDetails) => void;
  getRecipeDetails: (recipeId: string) => RecipeDetails | undefined;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipeDetails: {},
      addRecipeDetails: (recipeId: string, details: RecipeDetails) =>
        set((state) => ({
          recipeDetails: { ...state.recipeDetails, [recipeId]: details },
        })),
      getRecipeDetails: (recipeId: string) => get().recipeDetails[recipeId],
    }),
    {
      name: "recipe-storage",
    }
  )
);
