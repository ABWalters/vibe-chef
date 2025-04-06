import { Vibe, Mood, Dietary } from "./Vibe";

export const mockVibe: Vibe = {
  id: "vibe_123",
  freeText:
    "I want something spicy and filling that I can make in under 30 minutes",
  mood: Mood.QuickAndEasy,
  dietary: [Dietary.LowCarb],
  macros: {
    protein: 30,
    carbs: 20,
    fat: 15,
  },
  ingredients: ["chicken", "basil", "tomatoes"],
  createdAt: new Date("2024-03-15T10:00:00Z"),
  userId: "user_123",
};
