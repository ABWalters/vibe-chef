import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { RecipeSummary } from "../types/RecipeSummary";
import { RecipeDetails } from "../types/RecipeDetails";
import { Vibe } from "../types/Vibe";
import { env } from "../config/env";
import { uuidv7 } from "uuidv7";

// Schema for generating recipe details
const recipeDetailsGenerationSchema = z.object({
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      unit: z.string(),
      notes: z.string().optional(),
    })
  ),
  instructions: z.array(
    z.object({
      step: z.number(),
      description: z.string(),
      time: z.number().optional(),
    })
  ),
  notes: z.array(z.string()).optional(),
  servings: z.number(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tips: z.array(z.string()).optional(),
  nutritionPerServing: z
    .object({
      protein: z.number(),
      carbs: z.number(),
      fat: z.number(),
      calories: z.number(),
      fiber: z.number().optional(),
      sugar: z.number().optional(),
    })
    .optional(),
});

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

const openai = createOpenAI({
  apiKey: env.VITE_OPENAI_API_KEY,
});

export async function generateRecipeDetails(
  recipe: RecipeSummary
): Promise<RecipeDetails> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: recipeDetailsGenerationSchema,
      prompt: `Generate detailed recipe information for the following recipe:
      
Name: ${recipe.name}
Description: ${recipe.description}
Prep Time: ${recipe.prepTime} minutes
Cook Time: ${recipe.cookTime} minutes
${
  recipe.macros
    ? `Macros:
- Protein: ${recipe.macros.protein}g
- Carbs: ${recipe.macros.carbs}g
- Fat: ${recipe.macros.fat}g
- Calories: ${recipe.macros.calories}`
    : ""
}
Dietary: ${recipe.dietary.join(", ")}

Please provide:
1. A detailed list of ingredients with precise measurements and helpful notes
2. Step-by-step instructions with timing estimates
3. Useful tips and notes for success
4. Number of servings
5. Difficulty level
6. Detailed nutritional information per serving

Make sure the instructions are clear and easy to follow, and the ingredient measurements are precise and practical.`,
    });

    // Combine the generated details with the original recipe summary
    return {
      ...recipe,
      ...object,
    };
  } catch (error) {
    console.error("Error generating recipe details:", error);
    throw new Error("Failed to generate recipe details");
  }
}

export async function generateRecipes(
  vibe: Vibe,
  count: number = 3
): Promise<RecipeSummary[]> {
  const prompt = createPromptFromVibe(vibe, count);

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: recipeGenerationSchema,
      prompt: `Generate ${count} recipes based on these requirements: ${prompt}`,
    });

    // Convert the generated recipes to our Recipe type
    return object.recipes.map((recipe) => ({
      id: uuidv7(),
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
