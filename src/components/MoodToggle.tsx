import { MOODS } from "../data/moods.data";
import { Mood } from "../types/Mood";
import { cn } from "../lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Coffee, Rocket, UtensilsCrossed } from "lucide-react";

const moodIcons = {
  LAZY: Coffee,
  QUICK_AND_EASY: Rocket,
  SLOW_AND_DELICIOUS: UtensilsCrossed,
} as const;

interface MoodToggleProps {
  value?: Mood;
  onValueChange: (value?: Mood) => void;
}

export function MoodToggle({ value, onValueChange }: MoodToggleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.values(MOODS).map((mood: Mood) => {
        const Icon = moodIcons[mood.id as keyof typeof moodIcons];
        return (
          <Card
            key={mood.id}
            className={cn(
              "cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]",
              "border border-gray-200 shadow-sm hover:shadow text-left",
              value?.id === mood.id && "border-2 border-black bg-black/5"
            )}
            onClick={() =>
              onValueChange(value?.id === mood.id ? undefined : mood)
            }
          >
            <CardHeader>
              <div className="flex flex-row items-start space-x-2">
                <Icon
                  className="w-6 h-6 shrink-0 text-gray-600"
                  strokeWidth={1.5}
                />
                <CardTitle className="text-md font-semibold">
                  {mood.title}
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-gray-500/90 mt-2 leading-relaxed">
                {mood.description}
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
