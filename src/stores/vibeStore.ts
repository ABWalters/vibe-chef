import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vibe } from "../types/Vibe";
import { RecipeSummary } from "../types/RecipeSummary";

interface VibeState {
  vibes: Record<string, Vibe>;
  recipes: Record<string, RecipeSummary[]>; // Map vibeId to array of recipes
  addVibe: (vibe: Vibe) => void;
  getVibeById: (id: string) => Vibe | undefined;
  getRecipesForVibe: (vibeId: string) => RecipeSummary[] | undefined;
  addRecipesToVibe: (vibeId: string, recipes: RecipeSummary[]) => void;
  getRecipeById: (id: string) => RecipeSummary | undefined;
}

export const useVibeStore = create<VibeState>()(
  persist(
    (set, get) => ({
      vibes: {},
      recipes: {},
      addVibe: (vibe: Vibe) =>
        set((state) => ({
          vibes: { ...state.vibes, [vibe.id]: vibe },
        })),
      getVibeById: (id: string) => get().vibes[id],
      getRecipesForVibe: (vibeId: string) => get().recipes[vibeId],
      addRecipesToVibe: (vibeId: string, recipes: RecipeSummary[]) =>
        set((state) => ({
          recipes: { ...state.recipes, [vibeId]: recipes },
        })),
      getRecipeById: (id: string) => {
        // Search through all recipes in all vibes
        const allRecipes = Object.values(get().recipes).flat();
        return allRecipes.find((recipe) => recipe.id === id);
      },
    }),
    {
      name: "vibe-storage",
    }
  )
);
