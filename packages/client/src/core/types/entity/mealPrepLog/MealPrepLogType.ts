import {
  Macros,
  Ingredient,
  Utensil,
  Recipe,
  DayTemplate,
  InstanceTemplate,
  MealPrepLog,
} from "@prisma/client";

type MealPrepLogType = MealPrepLog & {
  macros: Macros;
  ingredients?: Ingredient[];
  utensils?: Utensil[];
  recipes?: Recipe[];
  dayTemplates?: DayTemplate[];
  instanceTemplate: InstanceTemplate;
};

export default MealPrepLogType;
