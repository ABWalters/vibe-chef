import { useRouter } from "@tanstack/react-router";
import { useMutation } from "~/hooks/useMutations";
import { useAuthStore } from "~/store/authStore";
import { Auth } from "./Auth";

export function Login() {
  const router = useRouter();
  const supabase = useAuthStore((state) => state.supabase);

  const loginMutation = useMutation({
    fn: async ({ email }: { email: string }) => {
      const { error, data } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return {
          error: true,
          message: error.message,
        };
      }

      return {
        error: false,
        message: "Check your email for the magic link!",
      };
    },
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        // We don't navigate here since the user needs to click the magic link
        return;
      }
    },
  });

  return (
    <Auth
      actionText="Send Magic Link"
      status={loginMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;

        loginMutation.mutate({ email });
      }}
      afterSubmit={
        loginMutation.data ? (
          <div
            className={
              loginMutation.data.error ? "text-red-400" : "text-green-400"
            }
          >
            {loginMutation.data.message}
          </div>
        ) : null
      }
    />
  );
}
