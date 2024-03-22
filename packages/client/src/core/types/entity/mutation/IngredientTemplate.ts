import { Ingredient, Macros } from "@prisma/client";

type OptionalIngredient<T> = {
  [K in keyof T]?: T[K];
};

type IngredientTemplate = OptionalIngredient<Ingredient> & {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  macros: Macros;
};

export default IngredientTemplate;
