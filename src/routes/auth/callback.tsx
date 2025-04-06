import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "~/store/authStore";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const { supabase, setSession } = useAuthStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error during auth callback:", error.message);
        throw redirect({ to: "/login" });
      }

      if (session) {
        setSession(session);
        throw redirect({ to: "/" });
      }
    };

    handleAuthCallback();
  }, [supabase, setSession]);

  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Verifying your login...</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}
