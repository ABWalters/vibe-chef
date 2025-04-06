import { MacroTargetOption } from "../types/MacroTarget";

/**
 * Available macro target presets for recipe selection
 */
export const MACRO_TARGETS: Record<string, MacroTargetOption> = {
  HIGH_PROTEIN_LUNCH: {
    id: "HIGH_PROTEIN_LUNCH",
    title: "High Protein Lunch",
    description:
      "Perfect for post-workout or when you need sustained energy throughout the day",
    values: {
      protein: 40,
      carbs: 30,
      fat: 15,
      calories: 500,
    },
  },
  HEALTHY_SNACK: {
    id: "HEALTHY_SNACK",
    title: "Healthy Snack",
    description: "A light, nutritious option to keep you going between meals",
    values: {
      protein: 10,
      carbs: 15,
      fat: 8,
      calories: 200,
    },
  },
  DECADENT_DINNER: {
    id: "DECADENT_DINNER",
    title: "Decadent Dinner",
    description: "A rich, satisfying meal perfect for special occasions",
    values: {
      calories: 800,
    },
  },
  LOW_CARB_MEAL: {
    id: "LOW_CARB_MEAL",
    title: "Low Carb Meal",
    description: "A keto-friendly option focusing on proteins and healthy fats",
    values: {
      protein: 35,
      carbs: 10,
      fat: 30,
      calories: 450,
    },
  },
  BALANCED_MEAL: {
    id: "BALANCED_MEAL",
    title: "Balanced Meal",
    description: "A well-rounded option with balanced macronutrients",
    values: {
      protein: 25,
      carbs: 35,
      fat: 20,
      calories: 600,
    },
  },
} as const;
