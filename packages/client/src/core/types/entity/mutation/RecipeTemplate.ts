import { Macros, Recipe } from "@prisma/client";

type OptionalRecipe<T> = {
  [K in keyof T]?: T[K];
};

type RecipeTemplate = OptionalRecipe<Recipe> & {
  ingredients: string[];
  utensils: string[];
  writtenTutorial: string;
  videoTutorial: string;
  macros: Macros;
};

export default RecipeTemplate;
