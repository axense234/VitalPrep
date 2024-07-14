type InstanceTemplatesIncludeObject = {
  macros?: boolean;
  user?: boolean;
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros?: boolean; recipes?: boolean } };
  mealPrepPlans?:
    | boolean
    | { include: { macros?: boolean; instanceTemplates?: true } };
};
export default InstanceTemplatesIncludeObject;
