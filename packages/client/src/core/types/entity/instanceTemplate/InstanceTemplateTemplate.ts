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

type InstanceTemplateTemplate = OptionalEntity<InstanceTemplate> & {
  dayTemplates: string[] | DayTemplate[];
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  recipes?: Recipe[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default InstanceTemplateTemplate;
