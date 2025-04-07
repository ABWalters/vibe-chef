export interface RecipeSummary {
  id: string;
  name: string;
  description: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
  dietary: string[];
  imageUrl?: string;
}
