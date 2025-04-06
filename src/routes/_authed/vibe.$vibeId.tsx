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
  const vibe = getVibeById(vibeId);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecipes() {
      if (!vibe) return;

      try {
        setLoading(true);
        setError(null);
        const generatedRecipes = await generateRecipes(vibe);
        setRecipes(generatedRecipes);
      } catch (err) {
        setError("Failed to generate recipes. Please try again.");
        console.error("Error generating recipes:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, [vibe]);

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
            ) : (
              recipes.map((recipe) => (
                <RecipeSuggestion key={recipe.id} recipe={recipe} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
