import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MacroTarget } from "../types/MacroTarget";
import { Vibe } from "../types/Mood";
import { MacroTargetToggle } from "./MacroTargetToggle";
import { VibeToggle } from "./MoodToggle";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Toggle } from "./ui/toggle";
import { Utensils } from "lucide-react";

const dietaryEnum = z.enum(["Vegetarian", "Low-Carb"]);
type DietaryOption = z.infer<typeof dietaryEnum>;

const vibeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const formSchema = z.object({
  freeText: z
    .string()
    .min(20, "Please describe what you're looking for in more detail")
    .max(1000, "Text must be less than 1000 characters"),
  vibe: vibeSchema.required(),
  dietary: z.array(dietaryEnum),
  macros: z.custom<MacroTarget>().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function RecipeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietary: [],
    },
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
    // TODO: Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-base font-medium text-muted-foreground">
            Tell me what you're looking for
          </h2>
          <FormField
            control={form.control}
            name="freeText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe what kind of recipe you're looking for... (e.g., 'I want something spicy and filling that I can make in under 30 minutes')"
                    className="bg-white/50 border border-gray-200 shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium text-muted-foreground">
            What's your vibe?
          </h2>
          <FormField
            control={form.control}
            name="vibe"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <VibeToggle
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium text-muted-foreground">
            Dietary (Optional)
          </h2>
          <div className="flex flex-wrap gap-2">
            <DietaryToggle form={form} value="Vegetarian" />
            <DietaryToggle form={form} value="Low-Carb" />
          </div>
          <FormMessage>{form.formState.errors.dietary?.message}</FormMessage>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-medium text-muted-foreground">
            Macro Goals (Optional)
          </h2>
          <FormField
            control={form.control}
            name="macros"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MacroTargetToggle
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full relative overflow-hidden bg-gradient-to-r from-black via-gray-800 to-black text-white hover:from-black hover:via-gray-700 hover:to-black transition-all duration-300 py-7 text-lg font-medium tracking-wide rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] group"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Let's Get Cooking
            <Utensils
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
              strokeWidth={2}
            />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </Button>
      </form>
    </Form>
  );
}

function DietaryToggle({
  form,
  value,
}: {
  form: ReturnType<typeof useForm<FormSchema>>;
  value: DietaryOption;
}) {
  return (
    <FormField
      control={form.control}
      name="dietary"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Toggle
              pressed={(field.value ?? []).includes(value)}
              onPressedChange={(pressed) => {
                const newValue = pressed
                  ? [...(field.value ?? []), value]
                  : (field.value ?? []).filter((v: string) => v !== value);
                field.onChange(newValue);
              }}
              className="px-4 py-1.5 bg-white/50 hover:bg-white/80 data-[state=on]:bg-black data-[state=on]:text-white rounded-full text-sm border border-gray-200 shadow-sm"
            >
              {value}
            </Toggle>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
