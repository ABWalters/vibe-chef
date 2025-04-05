import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const moodEnum = z.enum(["Lazy", "Quick & Easy", "Slow & Delicious"]);
const dietaryEnum = z.enum(["Vegetarian", "Low-Carb"]);

type MoodOption = z.infer<typeof moodEnum>;
type DietaryOption = z.infer<typeof dietaryEnum>;

const formSchema = z.object({
  mood: moodEnum.nullable(),
  dietary: z.array(dietaryEnum),
  protein: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), "Must be a number")
    .refine((val) => !val || Number(val) >= 0, "Must be positive")
    .refine((val) => !val || Number(val) <= 300, "Must be less than 300g"),
  carbs: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), "Must be a number")
    .refine((val) => !val || Number(val) >= 0, "Must be positive")
    .refine((val) => !val || Number(val) <= 300, "Must be less than 300g"),
  fat: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), "Must be a number")
    .refine((val) => !val || Number(val) >= 0, "Must be positive")
    .refine((val) => !val || Number(val) <= 300, "Must be less than 300g"),
  ingredients: z
    .string()
    .min(1, "Please enter at least one ingredient")
    .max(200, "Ingredient list is too long"),
});

type RecipeFormData = z.infer<typeof formSchema>;

export function RecipeForm() {
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: null,
      dietary: [],
      protein: "",
      carbs: "",
      fat: "",
      ingredients: "",
    },
  });

  const onSubmit = (data: RecipeFormData) => {
    console.log(data);
    // TODO: Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Mood</h2>
          <div className="flex flex-wrap gap-2">
            <MoodToggle form={form} value="Lazy" />
            <MoodToggle form={form} value="Quick & Easy" />
            <MoodToggle form={form} value="Slow & Delicious" />
          </div>
          <FormMessage>{form.formState.errors.mood?.message}</FormMessage>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Dietary</h2>
          <div className="flex flex-wrap gap-2">
            <DietaryToggle form={form} value="Vegetarian" />
            <DietaryToggle form={form} value="Low-Carb" />
          </div>
          <FormMessage>{form.formState.errors.dietary?.message}</FormMessage>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Macro Targets</h2>
          <div className="grid grid-cols-3 gap-4">
            <MacroInput form={form} name="protein" label="Protein" />
            <MacroInput form={form} name="carbs" label="Carbs" />
            <MacroInput form={form} name="fat" label="Fat" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Ingredients</h2>
          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="chicken, basil, tomatoes"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Generate Recipe
        </Button>
      </form>
    </Form>
  );
}

function MoodToggle({
  form,
  value,
}: {
  form: ReturnType<typeof useForm<RecipeFormData>>;
  value: MoodOption;
}) {
  return (
    <FormField
      control={form.control}
      name="mood"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Toggle
              pressed={field.value === value}
              onPressedChange={() =>
                field.onChange(field.value === value ? null : value)
              }
              className="px-4 py-2"
            >
              {value}
            </Toggle>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function DietaryToggle({
  form,
  value,
}: {
  form: ReturnType<typeof useForm<RecipeFormData>>;
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
              pressed={field.value.includes(value)}
              onPressedChange={(pressed) => {
                const newValue = pressed
                  ? [...field.value, value]
                  : field.value.filter((v: string) => v !== value);
                field.onChange(newValue);
              }}
              className="px-4 py-2"
            >
              {value}
            </Toggle>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

function MacroInput({
  form,
  name,
  label,
}: {
  form: ReturnType<typeof useForm<RecipeFormData>>;
  name: keyof Pick<RecipeFormData, "protein" | "carbs" | "fat">;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="number"
                placeholder="0"
                className="pr-8"
                {...field}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                g
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
