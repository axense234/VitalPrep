type RecipesIncludeObject = {
  recipeTutorial?: boolean;
  macros?: boolean;
  user?: boolean;
  utensils?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros?: boolean; recipes?: boolean } };
  instanceTemplates?:
    | boolean
    | { include: { macros?: boolean; dayTemplates?: boolean } };
  mealPrepPlans?:
    | boolean
    | { include: { macros?: boolean; instanceTemplates?: boolean } };
};
export default RecipesIncludeObject;
