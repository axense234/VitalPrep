import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  Macros,
  MealPrepLog,
  MealPrepPlan,
  Recipe,
  Utensil,
} from "@prisma/client";
import OptionalEntity from "../OptionalEntityType";

type DayTemplateTemplate = OptionalEntity<DayTemplate> & {
  recipes: string[] | Recipe[];
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default DayTemplateTemplate;
