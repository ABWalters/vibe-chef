import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { Recipe } from "../types/Recipe";
import { Vibe } from "../types/Vibe";

// Schema that matches our Recipe type but in a format suitable for LLM generation
const recipeGenerationSchema = z.object({
  recipes: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      prepTime: z.number(),
      cookTime: z.number(),
      macros: z
        .object({
          protein: z.number(),
          carbs: z.number(),
          fat: z.number(),
          calories: z.number(),
        })
        .optional(),
      dietary: z.array(z.string()),
      ingredients: z.array(
        z.object({
          name: z.string(),
          amount: z.string(),
          unit: z.string().optional(),
        })
      ),
      instructions: z.array(z.string()),
    })
  ),
});

export type GeneratedRecipe = z.infer<
  typeof recipeGenerationSchema
>["recipes"][0];

export async function generateRecipes(
  vibe: Vibe,
  count: number = 3
): Promise<Recipe[]> {
  const prompt = createPromptFromVibe(vibe, count);

  try {
    const { object } = await generateObject({
      model: openai("gpt-4-turbo"),
      schema: recipeGenerationSchema,
      prompt: `Generate ${count} recipes based on these requirements: ${prompt}`,
    });

    // Convert the generated recipes to our Recipe type
    return object.recipes.map((recipe, index) => ({
      id: `generated_${index}`,
      name: recipe.name,
      description: recipe.description,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      macros: recipe.macros,
      dietary: recipe.dietary,
    }));
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Failed to generate recipes");
  }
}

function createPromptFromVibe(vibe: Vibe, count: number): string {
  let prompt = `Generate ${count} unique recipes that match the following criteria:\n`;

  // Add the user's free text description
  prompt += `- Main request: ${vibe.freeText}\n`;

  // Add mood-based context if available
  if (vibe.mood) {
    prompt += `- Mood: ${vibe.mood.title} - ${vibe.mood.description}\n`;
  }

  // Add dietary restrictions
  if (vibe.dietary?.length > 0) {
    prompt += `- Dietary requirements: ${vibe.dietary.join(", ")}\n`;
  }

  // Add macro targets if specified
  if (vibe.macros) {
    prompt += "- Macro nutrient targets:\n";
    if (vibe.macros.values.protein)
      prompt += `  * Protein: ~${vibe.macros.values.protein}g\n`;
    if (vibe.macros.values.carbs)
      prompt += `  * Carbs: ~${vibe.macros.values.carbs}g\n`;
    if (vibe.macros.values.fat)
      prompt += `  * Fat: ~${vibe.macros.values.fat}g\n`;
    if (vibe.macros.values.calories)
      prompt += `  * Calories: ~${vibe.macros.values.calories}\n`;
  }

  prompt +=
    "\nEnsure each recipe includes a descriptive name, clear instructions, accurate prep and cook times, and appropriate dietary tags. Make the descriptions engaging and appetizing.";

  return prompt;
}
