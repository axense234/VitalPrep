const selectFormBackgroundColor = (
  entityTypeUsed:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan"
) => {
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
    default:
      return "#00000";
  }
};

export default selectFormBackgroundColor;
