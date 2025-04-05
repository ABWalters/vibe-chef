import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RecipeCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function RecipeCard({ title, description, imageUrl }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden border-0 bg-white/50 shadow-none w-full">
      <CardHeader className="px-6 py-4 space-y-1.5">
        <CardTitle className="text-2xl font-serif">{title}</CardTitle>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {description}
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="relative aspect-square w-full">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full rounded-2xl bg-white/50"
          />
        </div>
      </CardContent>
    </Card>
  );
}
