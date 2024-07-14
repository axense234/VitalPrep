type UtensilsIncludeObject = {
  user?: boolean;
  recipes?: boolean | { include: { macros: true } };
  dayTemplates?: boolean | { include: { macros?: boolean; recipes?: boolean } };
  instanceTemplates?:
    | boolean
    | { include: { macros?: boolean; dayTemplates?: boolean } };
  mealPrepPlans?:
    | boolean
    | { include: { macros?: boolean; instanceTemplates?: boolean } };
};

export default UtensilsIncludeObject;
