import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "~/store/authStore";

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: ({ location }) => {
    // Get the current auth state directly from the store
    const { isAuthenticated, isLoading } = useAuthStore.getState();

    // Don't redirect if still loading
    if (isLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }

    throw redirect({
      to: "/cook",
    });
  },
});

function Home() {
  return <div>Hello World</div>;
}
