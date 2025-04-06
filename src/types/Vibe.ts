/**
 * Represents the mood of the recipe the user wants to create
 */
export enum Mood {
  Lazy = "Lazy",
  QuickAndEasy = "Quick & Easy",
  SlowAndDelicious = "Slow & Delicious",
}

/**
 * Represents dietary preferences for the recipe
 */
export enum Dietary {
  Vegetarian = "Vegetarian",
  LowCarb = "Low-Carb",
}

/**
 * Represents the macro nutrients target for the recipe
 */
export interface MacroTargets {
  protein?: number; // in grams
  carbs?: number; // in grams
  fat?: number; // in grams
}

/**
 * Represents a vibe - the user's recipe preferences and requirements
 */
export interface Vibe {
  id: string;
  freeText: string;
  mood: Mood | null;
  dietary: Dietary[];
  macros: MacroTargets;
  ingredients: string[];
  createdAt: Date;
  updatedAt?: Date;
  userId?: string;
}
