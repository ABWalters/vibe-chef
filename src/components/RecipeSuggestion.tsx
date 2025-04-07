import { RecipeSummary } from "../types/RecipeSummary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MacrosBadge } from "./MacrosBadge";
import { Clock, Leaf } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface RecipeCardProps {
  recipe: RecipeSummary;
}

export function RecipeSuggestion({ recipe }: RecipeCardProps) {
  return (
    <Link
      to="/recipe/$recipeId"
      params={{ recipeId: recipe.id }}
      className="block"
    >
      <Card className="h-full transition-all hover:shadow-md hover:scale-[1.02]">
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
          <CardDescription>{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="-mt-3 space-y-2">
            {recipe.macros && <MacrosBadge macros={recipe.macros} />}
            <div className="flex flex-wrap gap-2">
              {recipe.dietary.map((diet) => (
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
        </CardContent>
      </Card>
    </Link>
  );
}
