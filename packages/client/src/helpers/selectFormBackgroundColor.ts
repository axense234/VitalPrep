import EntityType from "@/core/types/entity/users/EntityType";

const selectFormBackgroundColor = (entityTypeUsed: EntityType) => {
  switch (entityTypeUsed) {
    case "ingredient":
      return "#FFAE00";
    case "utensil":
      return "#FF6000";
    case "recipe":
      return "#8B0000";
    case "dayTemplate":
      return "#013310";
    case "instanceTemplate":
      return "#012433";
    case "mealPrepLog":
      return "#d2b48c";
    default:
      return "#00000";
  }
};

export default selectFormBackgroundColor;
