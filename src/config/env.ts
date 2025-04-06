import { z } from "zod";

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  // Add other environment variables as needed
});

// This will throw an error if validation fails
const parsedEnv = envSchema.parse({
  VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
});

export const env = parsedEnv;
