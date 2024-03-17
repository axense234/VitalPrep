import { Ingredient } from "@prisma/client";

type OptionalIngredient<T> = {
  [K in keyof T]?: T[K];
};

type IngredientTemplate = OptionalIngredient<Ingredient> & {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  enabled?: string;
};

export default IngredientTemplate;
