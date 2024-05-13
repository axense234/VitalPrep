import {
  DayTemplate,
  InstanceTemplate,
  MealPrepLog,
  MealPrepPlan,
  Recipe,
  Utensil,
} from "@prisma/client";
import OptionalEntity from "../OptionalEntityType";

type UtensilTemplate = OptionalEntity<Utensil> & {
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplates?: InstanceTemplate[];
  mealPrepPlans?: MealPrepPlan[];
  mealPrepLogs?: MealPrepLog[];
};

export default UtensilTemplate;
