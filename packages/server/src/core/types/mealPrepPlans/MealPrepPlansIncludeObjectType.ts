type MealPrepPlansIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros?: boolean; recipes?: boolean } };
  instanceTemplates?: boolean | { include: { macros: boolean } };
  instanceTemplatesTimings?: boolean;
};
export default MealPrepPlansIncludeObject;
