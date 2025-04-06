import { MACRO_TARGETS } from "../data/macroTargets.data";
import { MacroTarget } from "../types/MacroTarget";
import { cn } from "../lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dumbbell, Carrot, Cookie, Scale, IceCream } from "lucide-react";

const macroIcons = {
  HIGH_PROTEIN_LUNCH: Dumbbell,
  HEALTHY_SNACK: Carrot,
  DECADENT_DINNER: Cookie,
  LOW_CARB_MEAL: Scale,
  BALANCED_MEAL: Scale,
  HEALTHY_DESSERT: IceCream,
} as const;

interface MacroTargetToggleProps {
  value?: MacroTarget;
  onValueChange: (value?: MacroTarget) => void;
}

function formatMacroValues(values: MacroTarget["values"]): string {
  if (!values) return "";

  const parts = [
    values.protein && `P:${values.protein}g`,
    values.carbs && `C:${values.carbs}g`,
    values.fat && `F:${values.fat}g`,
    values.calories && `${values.calories}cal`,
  ].filter(Boolean);

  return parts.join(" · ");
}

export function MacroTargetToggle({
  value,
  onValueChange,
}: MacroTargetToggleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.values(MACRO_TARGETS).map((target: MacroTarget) => {
        const Icon = macroIcons[target.id as keyof typeof macroIcons];
        const macroText = formatMacroValues(target.values);

        return (
          <Card
            key={target.id}
            className={cn(
              "cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]",
              "border border-gray-200 shadow-sm hover:shadow text-left",
              value?.id === target.id && "border-2 border-black bg-black/5"
            )}
            onClick={() =>
              onValueChange(value?.id === target.id ? undefined : target)
            }
          >
            <CardHeader>
              <div className="flex flex-row items-start space-x-2">
                <Icon
                  className="w-6 h-6 shrink-0 text-gray-600"
                  strokeWidth={1.5}
                />
                <CardTitle className="text-md font-semibold">
                  {target.title}
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-gray-500/90 mt-2 leading-relaxed">
                {target.description}
              </CardDescription>
              {macroText && (
                <div className="mt-2">
                  <span className="inline-block max-w-full text-xs bg-gray-100 px-2 py-1 rounded-full truncate">
                    {macroText}
                  </span>
                </div>
              )}
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
