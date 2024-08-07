type UsersIncludeObject = {
  ingredients?: boolean | { include: { macros: boolean } };
  utensils?: boolean;
  recipes?: boolean | { include: { macros: boolean } };
  dayTemplates?: boolean | { include: { macros?: boolean; recipes?: boolean } };
  instanceTemplates?: boolean | { include: { macros: boolean } };
  mealPrepPlans?:
    | boolean
    | { include: { macros?: boolean; instanceTemplates?: boolean } };
  mealPrepLogs?: boolean;
  notificationSettings?: boolean;
};
export default UsersIncludeObject;
