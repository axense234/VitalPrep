type RecipesIncludeObject = {
  recipeTutorial?: boolean;
  macros?: boolean;
  user?: boolean;
  utensils?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean;
  instanceTemplates?: boolean;
  mealPrepPlans?: boolean;
};
export default RecipesIncludeObject;
