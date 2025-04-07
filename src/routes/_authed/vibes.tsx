import { createFileRoute, Link } from "@tanstack/react-router";
import { Vibe } from "~/types/Vibe";
import { formatDistanceToNow } from "date-fns";
import { useVibeStore } from "~/stores/vibeStore";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authed/vibes")({
  component: VibesPage,
});

function VibesPage() {
  const vibes = useVibeStore((state) => state.vibes);

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Your Vibes</h1>
      <div className="space-y-4">
        {Object.values(vibes).map((vibe: Vibe, index: number) => (
          <div key={vibe.id}>
            <Link
              to="/vibe/$vibeId"
              params={{ vibeId: vibe.id }}
              className="flex items-center justify-between group hover:bg-accent/50 p-4 rounded-lg cursor-pointer block"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">
                    {vibe.mood ? vibe.mood.title : "Custom Vibe"}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(vibe.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 line-clamp-1">
                  {vibe.freeText}
                </p>
                {vibe.dietary.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {vibe.dietary.map((diet) => (
                      <Badge key={diet} variant="secondary">
                        {diet}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </Link>
            {index < Object.values(vibes).length - 1 && (
              <Separator className="mt-4" />
            )}
          </div>
        ))}
      </div>
      {Object.keys(vibes).length === 0 && (
        <div className="text-center text-muted-foreground">
          No vibes created yet. Create your first vibe to get started!
        </div>
      )}
    </div>
  );
}
