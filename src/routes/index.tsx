import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { RecipeForm } from "../components/RecipeForm";
import { RecipeCard } from "../components/RecipeCard";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-serif mb-8">
              What do you feel
              <br />
              like eating?
            </h1>
            <RecipeForm />
          </div>
          <div className="flex items-start md:sticky md:top-8">
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
