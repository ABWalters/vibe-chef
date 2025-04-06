import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Vibe } from "../types/Vibe";

const VibeSummary = ({ vibe }: { vibe: Vibe }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vibe Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Description:</p>
          <p className="text-sm">{vibe.freeText}</p>
        </div>
        {vibe.mood && (
          <div>
            <p className="text-sm font-medium">Mood:</p>
            <div className="mt-1">
              <span className="bg-slate-100 text-slate-800 text-sm px-3 py-1 rounded-full">
                {vibe.mood.title}
              </span>
            </div>
          </div>
        )}
        <div>
          <p className="text-sm font-medium">Dietary Preferences:</p>
          <div className="flex gap-2 mt-1">
            {vibe.dietary.map((diet) => (
              <span
                key={diet}
                className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded"
              >
                {diet}
              </span>
            ))}
          </div>
        </div>
        {vibe.macros && (
          <div>
            <p className="text-sm font-medium">Macro Targets:</p>
            <div className="grid grid-cols-2 gap-2 text-sm mt-1">
              <p>Protein: {vibe.macros.values.protein}g</p>
              <p>Carbs: {vibe.macros.values.carbs}g</p>
              <p>Fat: {vibe.macros.values.fat}g</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VibeSummary;
