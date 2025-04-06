import { createFileRoute, useParams } from "@tanstack/react-router";
import VibeSummary from "~/components/VibeSummary";
import { RecipeSuggestion } from "../../components/RecipeSuggestion";
import { useVibeStore } from "../../stores/vibeStore";
import { mockRecipes } from "../../types/Recipe.mock";

export const Route = createFileRoute("/_authed/vibe/$vibeId")({
  component: VibeDetails,
});

function VibeDetails() {
  const { vibeId } = useParams({ from: "/_authed/vibe/$vibeId" });
  const getVibeById = useVibeStore((state) => state.getVibeById);
  const vibe = getVibeById(vibeId);

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
            {mockRecipes.map((recipe) => (
              <RecipeSuggestion key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
