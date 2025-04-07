import { createFileRoute, useParams } from "@tanstack/react-router";
import { useVibeStore } from "../../stores/vibeStore";
import { useRecipeStore } from "../../stores/recipeStore";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MacrosBadge } from "~/components/MacrosBadge";
import { Clock, Leaf, Loader2 } from "lucide-react";
import { RecipeDetails } from "~/components/RecipeDetails";
import { generateRecipeDetails } from "~/services/recipeGenerator";
import { useEffect } from "react";

export const Route = createFileRoute("/_authed/recipe/$recipeId")({
  component: RecipeDetailsPage,
});

function RecipeDetailsPage() {
  const { recipeId } = useParams({ from: "/_authed/recipe/$recipeId" });
  const getRecipeById = useVibeStore((state) => state.getRecipeById);
  const getRecipeDetails = useRecipeStore((state) => state.getRecipeDetails);
  const addRecipeDetails = useRecipeStore((state) => state.addRecipeDetails);

  const recipe = getRecipeById(recipeId);
  const recipeDetails = getRecipeDetails(recipeId);

  useEffect(() => {
    async function generateDetails() {
      if (!recipe || recipeDetails) return;
      const details = await generateRecipeDetails(recipe);
      addRecipeDetails(recipeId, details);
    }

    generateDetails();
  }, [recipe, recipeId, recipeDetails, addRecipeDetails]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-8">
        {/* Left Column - 1/3 width */}
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <div>{recipe.name}</div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {recipe.prepTime}m • {recipe.cookTime}m
                    </span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">{recipe.description}</p>

              <div className="space-y-2">
                {recipe.macros && <MacrosBadge macros={recipe.macros} />}
                <div className="flex flex-wrap gap-2">
                  {recipe.dietary.map((diet: string) => (
                    <span
                      key={diet}
                      className="bg-white border border-emerald-200 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      <Leaf className="h-3 w-3" />
                      {diet}
                    </span>
                  ))}
                </div>
              </div>

              {recipe.imageUrl && (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 2/3 width */}
        <div className="w-2/3">
          {!recipeDetails ? (
            <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-100 min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="ml-3 text-gray-500">
                Loading recipe details...
              </span>
            </div>
          ) : (
            <RecipeDetails recipe={recipeDetails} />
          )}
        </div>
      </div>
    </div>
  );
}
