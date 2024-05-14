import EntitySortingOption from "./EntitySortingOption";

type EntitySortingOptions = {
  ingredient: EntitySortingOption[];
  utensil: EntitySortingOption[];
  recipe: EntitySortingOption[];
  dayTemplate: EntitySortingOption[];
  instanceTemplate: EntitySortingOption[];
  mealPrepPlan: EntitySortingOption[];
  mealPrepLog: EntitySortingOption[];
};

export default EntitySortingOptions;
