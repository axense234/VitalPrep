import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

const UserClient = prismaClient.user;
const UserNotificationSettingsClient = prismaClient.notificationSettings;
const MealPrepLogClient = prismaClient.mealPrepLog;
const MealPrepPlanClient = prismaClient.mealPrepPlan;
const InstanceTemplateClient = prismaClient.instanceTemplate;
const DayTemplateClient = prismaClient.dayTemplate;
const RecipeClient = prismaClient.recipe;
const IngredientClient = prismaClient.ingredient;
const UtensilClient = prismaClient.utensil;

const connectToPostgres = async () => {
  await prismaClient.$connect();
};

export {
  UserClient,
  MealPrepLogClient,
  MealPrepPlanClient,
  InstanceTemplateClient,
  DayTemplateClient,
  RecipeClient,
  IngredientClient,
  UtensilClient,
  UserNotificationSettingsClient,
  connectToPostgres,
};
