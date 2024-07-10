type MealPrepLogsIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros: boolean } };
  instanceTemplate?: boolean | { include: { macros: boolean } };
};
export default MealPrepLogsIncludeObject;
