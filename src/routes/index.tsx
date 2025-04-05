import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { RecipeForm } from "../components/RecipeForm";

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
          <div>{/* Recipe card will go here */}</div>
        </div>
      </main>
    </div>
  );
}
