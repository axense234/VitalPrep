import { Ingredient, Macros } from "@prisma/client";

type IngredientTemplate = Ingredient & {
  macros: Macros;
};
export default IngredientTemplate;
