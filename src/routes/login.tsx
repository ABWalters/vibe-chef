import { createFileRoute, Navigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Mail } from "lucide-react";
import { createClient } from "../utils/supabase/client";
import { useAuth } from "~/hooks/useAuth";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { create } from "domain";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function LoginPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Redirect if already authenticated
  if (isAuthenticated && !authLoading) {
    return <Navigate to="/" />;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      const { error } = await createClient().auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send magic link"
      );
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50/50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="border-blue-100 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Sign in
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to receive a magic link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
                <AlertDescription>
                  Magic link sent! Check your email inbox.
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
                      Sending magic link...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Send magic link
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-gray-500 text-center">
              <p>No password needed! We'll send you a secure login link.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
