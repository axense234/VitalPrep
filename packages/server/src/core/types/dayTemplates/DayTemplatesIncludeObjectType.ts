type DayTemplatesIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  instanceTemplates?: boolean;
  mealPrepPlans?: boolean;
};

export default DayTemplatesIncludeObject;
