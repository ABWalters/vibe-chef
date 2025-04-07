import { createFileRoute, useParams } from "@tanstack/react-router";
import { useVibeStore } from "../../stores/vibeStore";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MacrosBadge } from "~/components/MacrosBadge";
import { Clock, Leaf } from "lucide-react";
import { RecipeDetails } from "~/components/RecipeDetails";
import { mockRecipeDetails } from "~/types/RecipeDetails.mock";

export const Route = createFileRoute("/_authed/recipe/$recipeId")({
  component: RecipeDetailsPage,
});

function RecipeDetailsPage() {
  const { recipeId } = useParams({ from: "/_authed/recipe/$recipeId" });
  const getRecipeById = useVibeStore((state) => state.getRecipeById);
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // TODO: Replace with actual recipe details from API
  const recipeDetails = mockRecipeDetails;

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
          <RecipeDetails recipe={recipeDetails} />
        </div>
      </div>
    </div>
  );
}
