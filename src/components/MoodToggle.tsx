import { MOODS } from "../data/moods.data";
import { Vibe } from "../types/Mood";
import { cn } from "../lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Coffee, Rocket, UtensilsCrossed } from "lucide-react";

const vibeIcons = {
  LAZY: Coffee,
  QUICK_AND_EASY: Rocket,
  SLOW_AND_DELICIOUS: UtensilsCrossed,
} as const;

interface VibeToggleProps {
  value?: Vibe;
  onValueChange: (value?: Vibe) => void;
}

export function VibeToggle({ value, onValueChange }: VibeToggleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.values(MOODS).map((vibe: Vibe) => {
        const Icon = vibeIcons[vibe.id as keyof typeof vibeIcons];
        return (
          <Card
            key={vibe.id}
            className={cn(
              "cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]",
              "border border-gray-200 shadow-sm hover:shadow text-left",
              value?.id === vibe.id && "border-2 border-black bg-black/5"
            )}
            onClick={() =>
              onValueChange(value?.id === vibe.id ? undefined : vibe)
            }
          >
            <CardHeader>
              <div className="flex flex-row items-start space-x-2">
                <Icon
                  className="w-6 h-6 shrink-0 text-gray-600"
                  strokeWidth={1.5}
                />
                <CardTitle className="text-md font-semibold">
                  {vibe.title}
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-gray-500/90 mt-2 leading-relaxed">
                {vibe.description}
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
