import { Vibe, Dietary } from "./Vibe";
import { MOODS } from "../data/moods.data";
import { MACRO_TARGETS } from "../data/macroTargets.data";

export const mockVibe: Vibe = {
  id: "vibe_123",
  freeText:
    "I want something spicy and filling that I can make in under 30 minutes",
  mood: MOODS.QUICK_AND_EASY,
  dietary: [Dietary.LowCarb],
  macros: MACRO_TARGETS.HIGH_PROTEIN_LUNCH,
  ingredients: ["chicken", "basil", "tomatoes"],
  createdAt: new Date("2024-03-15T10:00:00Z"),
  userId: "user_123",
};
