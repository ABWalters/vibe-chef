import { Recipe } from "../types/Recipe";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MacrosBadge } from "./MacrosBadge";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeSuggestion({ recipe }: RecipeCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">
              Prep Time: {recipe.prepTime} mins
            </p>
            <p className="text-sm font-medium">
              Cook Time: {recipe.cookTime} mins
            </p>
          </div>
          {recipe.macros && <MacrosBadge macros={recipe.macros} />}
          <div>
            <div className="flex gap-2">
              {recipe.dietary.map((diet) => (
                <span
                  key={diet}
                  className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded"
                >
                  {diet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
