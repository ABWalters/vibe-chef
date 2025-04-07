import { useAuthStore } from "~/store/authStore";

export function useAuth() {
  const { session, user, isLoading, isAuthenticated, signOut, refreshSession } =
    useAuthStore();

  return {
    session,
    user,
    isLoading,
    isAuthenticated,
    signOut,
    refreshSession,

    // Helper functions
    userEmail: user?.email || null,
    userId: user?.id || null,

    // Check if user has verified email
    isEmailVerified: !!user?.email_confirmed_at,
  };
}
