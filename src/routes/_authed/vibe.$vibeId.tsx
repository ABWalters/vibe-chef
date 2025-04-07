import { createFileRoute, useParams } from "@tanstack/react-router";
import VibeSummary from "~/components/VibeSummary";
import { RecipeSuggestion } from "../../components/RecipeSuggestion";
import { useVibeStore } from "../../stores/vibeStore";
import { generateRecipes } from "../../services/recipeGenerator";
import { useEffect, useState } from "react";
import { Recipe } from "../../types/Recipe";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authed/vibe/$vibeId")({
  component: VibeDetails,
});

function VibeDetails() {
  const { vibeId } = useParams({ from: "/_authed/vibe/$vibeId" });
  const getVibeById = useVibeStore((state) => state.getVibeById);
  const getRecipesForVibe = useVibeStore((state) => state.getRecipesForVibe);
  const addRecipesToVibe = useVibeStore((state) => state.addRecipesToVibe);

  const vibe = getVibeById(vibeId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get recipes from store
  const storedRecipes = getRecipesForVibe(vibeId);

  useEffect(() => {
    async function loadRecipes() {
      if (!vibe) return;

      // If we already have recipes for this vibe, don't generate new ones
      if (storedRecipes && storedRecipes.length > 0) return;

      try {
        setLoading(true);
        setError(null);
        const generatedRecipes = await generateRecipes(vibe);
        addRecipesToVibe(vibeId, generatedRecipes);
      } catch (err) {
        setError("Failed to generate recipes. Please try again.");
        console.error("Error generating recipes:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, [vibe, vibeId, storedRecipes, addRecipesToVibe]);

  if (!vibe) {
    return <div>Vibe not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-8">
        {/* Vibe Details - Left Third */}
        <div className="w-1/3">
          <VibeSummary vibe={vibe} />
        </div>

        {/* Generated Recipes - Right Two Thirds */}
        <div className="w-2/3">
          <div className="flex flex-col space-y-4">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-3 text-gray-500">
                  Generating recipes...
                </span>
              </div>
            ) : error ? (
              <div className="text-red-500 p-4 text-center">{error}</div>
            ) : storedRecipes && storedRecipes.length > 0 ? (
              storedRecipes.map((recipe) => (
                <RecipeSuggestion key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div className="text-gray-500 p-4 text-center">
                No recipes found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
