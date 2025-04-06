import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MacroTarget } from "../types/MacroTarget";
import { MacroTargetToggle } from "./MacroTargetToggle";
import { MoodToggle } from "./MoodToggle";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Toggle } from "./ui/toggle";

const dietaryEnum = z.enum(["Vegetarian", "Low-Carb"]);
type DietaryOption = z.infer<typeof dietaryEnum>;

const moodSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

const formSchema = z.object({
  freeText: z
    .string()
    .min(20, "Please describe what you're looking for in more detail")
    .max(1000, "Text must be less than 1000 characters"),
  mood: moodSchema.required(),
  dietary: z.array(dietaryEnum),
  macros: z.custom<MacroTarget>().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function RecipeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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
            What's your mood?
          </h2>
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MoodToggle
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
          className="w-full bg-black text-white hover:bg-black/90 transition-all duration-200 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          Generate Recipe
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
                  ? [...field.value, value]
                  : field.value.filter((v: string) => v !== value);
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
