type EntitySortingOption = {
  label: string;
  value: string;
};

type EntitySortingOptions = {
  ingredient: EntitySortingOption[];
  utensil: EntitySortingOption[];
  recipe: EntitySortingOption[];
  dayTemplate: EntitySortingOption[];
  instanceTemplate: EntitySortingOption[];
  mealPrepPlan: EntitySortingOption[];
};

export default EntitySortingOptions;
