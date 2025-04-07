import { createFileRoute } from "@tanstack/react-router";
import { RecipeForm } from "~/components/RecipeForm";

export const Route = createFileRoute("/_authed/cook")({
  component: CookPage,
});

function CookPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-serif mb-10 leading-tight">
            What do you feel
            <br />
            like eating?
          </h1>
          <div className="w-full max-w-2xl">
            <RecipeForm />
          </div>
        </div>
      </div>
    </main>
  );
}
