import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RecipeDetails as RecipeDetailsType } from "../types/RecipeDetails";
import { Clock, ChefHat, Users } from "lucide-react";

interface RecipeDetailsProps {
  recipe: RecipeDetailsType;
}

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Ingredients Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              <span>Ingredients</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4" />
              <span>Serves {recipe.servings}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start justify-between">
                <span className="font-medium">{ingredient.name}</span>
                <div className="text-slate-600 text-right">
                  <span>
                    {ingredient.amount} {ingredient.unit}
                  </span>
                  {ingredient.notes && (
                    <p className="text-xs text-slate-500">{ingredient.notes}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>Instructions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.step} className="flex gap-4">
                <div className="flex-none">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm font-medium">
                    {instruction.step}
                  </span>
                </div>
                <div className="flex-1">
                  <p>{instruction.description}</p>
                  {instruction.time && (
                    <p className="mt-1 text-sm text-slate-500">
                      Approximately {instruction.time} minutes
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Tips and Notes Card */}
      {(recipe.tips || recipe.notes) && (
        <Card>
          <CardHeader>
            <CardTitle>Tips & Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recipe.tips && (
              <div>
                <h3 className="font-medium mb-2">Tips</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {recipe.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {recipe.notes && (
              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {recipe.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Nutrition Card */}
      {recipe.nutritionPerServing && (
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Per Serving</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-lg font-medium">
                  {recipe.nutritionPerServing.calories}
                </p>
                <p className="text-sm text-slate-600">Calories</p>
              </div>
              <div>
                <p className="text-lg font-medium">
                  {recipe.nutritionPerServing.protein}g
                </p>
                <p className="text-sm text-slate-600">Protein</p>
              </div>
              <div>
                <p className="text-lg font-medium">
                  {recipe.nutritionPerServing.carbs}g
                </p>
                <p className="text-sm text-slate-600">Carbs</p>
              </div>
              <div>
                <p className="text-lg font-medium">
                  {recipe.nutritionPerServing.fat}g
                </p>
                <p className="text-sm text-slate-600">Fat</p>
              </div>
              {recipe.nutritionPerServing.fiber && (
                <div>
                  <p className="text-lg font-medium">
                    {recipe.nutritionPerServing.fiber}g
                  </p>
                  <p className="text-sm text-slate-600">Fiber</p>
                </div>
              )}
              {recipe.nutritionPerServing.sugar && (
                <div>
                  <p className="text-lg font-medium">
                    {recipe.nutritionPerServing.sugar}g
                  </p>
                  <p className="text-sm text-slate-600">Sugar</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
