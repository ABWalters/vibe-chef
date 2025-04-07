import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vibe } from "../types/Vibe";
import { Recipe } from "../types/Recipe";

interface VibeState {
  vibes: Record<string, Vibe>;
  recipes: Record<string, Recipe[]>; // Map vibeId to array of recipes
  addVibe: (vibe: Vibe) => void;
  getVibeById: (id: string) => Vibe | undefined;
  getRecipesForVibe: (vibeId: string) => Recipe[] | undefined;
  addRecipesToVibe: (vibeId: string, recipes: Recipe[]) => void;
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
      addRecipesToVibe: (vibeId: string, recipes: Recipe[]) =>
        set((state) => ({
          recipes: { ...state.recipes, [vibeId]: recipes },
        })),
    }),
    {
      name: "vibe-storage",
    }
  )
);
