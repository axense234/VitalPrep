type InstanceTemplatesIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros: boolean } };
  mealPrepPlans?: boolean;
};
export default InstanceTemplatesIncludeObject;
