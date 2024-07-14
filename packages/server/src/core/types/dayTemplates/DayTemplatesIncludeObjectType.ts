type DayTemplatesIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  instanceTemplates?:
    | boolean
    | { include: { macros?: boolean; dayTemplates?: boolean } };
  mealPrepPlans?:
    | boolean
    | { include: { macros?: boolean; instanceTemplates?: boolean } };
};

export default DayTemplatesIncludeObject;
