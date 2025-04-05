import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RecipeCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function RecipeCard({ title, description, imageUrl }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-serif">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full rounded-b-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
