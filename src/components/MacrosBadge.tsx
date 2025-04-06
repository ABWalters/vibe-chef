import { MacroValues } from "~/types/MacroTarget";

interface MacrosBadgeProps {
  macros: MacroValues;
  className?: string;
}

export function MacrosBadge({ macros, className = "" }: MacrosBadgeProps) {
  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      {macros.protein !== undefined && (
        <span className="bg-slate-100 px-2 py-1 rounded">
          {macros.protein}g protein
        </span>
      )}
      {macros.carbs !== undefined && (
        <span className="bg-slate-100 px-2 py-1 rounded">
          {macros.carbs}g carbs
        </span>
      )}
      {macros.fat !== undefined && (
        <span className="bg-slate-100 px-2 py-1 rounded">
          {macros.fat}g fat
        </span>
      )}
      {macros.calories !== undefined && (
        <span className="bg-slate-100 px-2 py-1 rounded">
          {macros.calories} cal
        </span>
      )}
    </div>
  );
}
