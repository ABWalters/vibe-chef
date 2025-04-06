import { MoodOption } from "../types/Mood";

/**
 * Available moods for recipe selection
 */
export const MOODS: Record<string, MoodOption> = {
  LAZY: {
    id: "LAZY",
    title: "Feeling Lazy",
    description:
      "Looking for something quick and simple to throw together with minimal effort",
  },
  QUICK_AND_EASY: {
    id: "QUICK_AND_EASY",
    title: "Quick & Easy",
    description: "Need something fast but still tasty - perfect for busy days",
  },
  SLOW_AND_DELICIOUS: {
    id: "SLOW_AND_DELICIOUS",
    title: "Slow & Delicious",
    description: "Ready to spend time creating something special and flavorful",
  },
} as const;
