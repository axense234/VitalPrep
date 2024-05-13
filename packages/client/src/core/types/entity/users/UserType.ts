import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  MealPrepLog,
  MealPrepPlan,
  NotificationSettings,
  Recipe,
  User,
  Utensil,
} from "@prisma/client";

type UserType = User & {
  notificationSettings: NotificationSettings;
  utensils: Utensil[];
  ingredients: Ingredient[];
  recipes: Recipe[];
  dayTemplates: DayTemplate[];
  instanceTemplates: InstanceTemplate[];
  mealPrepPlans: MealPrepPlan[];
  mealPrepLogs: MealPrepLog[];
};

export default UserType;
