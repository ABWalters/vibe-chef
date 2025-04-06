/**
 * Represents the macro nutrient values for a target
 */
export interface MacroValues {
  protein?: number; // in grams
  carbs?: number; // in grams
  fat?: number; // in grams
  calories?: number; // total calories
}

/**
 * Represents a selectable macro target option
 */
export interface MacroTargetOption {
  id: string;
  title: string;
  description: string;
  values: MacroValues;
}

/**
 * Type for accessing a specific macro target from the data
 */
export type MacroTarget = MacroTargetOption;
