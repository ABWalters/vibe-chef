import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/Header";
import { RecipeCard } from "~/components/RecipeCard";
import { RecipeForm } from "~/components/RecipeForm";

export const Route = createFileRoute("/vibe/$vibeId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-rose-50/20">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-serif mb-10 leading-tight">
              What do you feel
              <br />
              like eating?
            </h1>
            <div className="w-full max-w-md">
              <RecipeForm />
            </div>
          </div>
          <div className="flex items-start justify-center md:sticky md:top-8">
            <RecipeCard
              title="Grilled Chicken Salad"
              description="A satisfying salad with juicy grilled chicken, fresh vegetables, and a simple dressing."
              imageUrl="/recipe-image.jpg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
