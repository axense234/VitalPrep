import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepLog,
  MealPrepPlan,
  Recipe,
} from "@prisma/client";
import OptionalEntity from "../OptionalEntityType";

type IngredientTemplate = OptionalEntity<Ingredient> & {
  macros: Macros;
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default IngredientTemplate;
