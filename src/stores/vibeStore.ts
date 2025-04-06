import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vibe } from "../types/Vibe";

interface VibeState {
  vibes: Record<string, Vibe>;
  addVibe: (vibe: Vibe) => void;
  getVibeById: (id: string) => Vibe | undefined;
}

export const useVibeStore = create<VibeState>()(
  persist(
    (set, get) => ({
      vibes: {},
      addVibe: (vibe: Vibe) =>
        set((state) => ({
          vibes: { ...state.vibes, [vibe.id]: vibe },
        })),
      getVibeById: (id: string) => get().vibes[id],
    }),
    {
      name: "vibe-storage",
    }
  )
);
