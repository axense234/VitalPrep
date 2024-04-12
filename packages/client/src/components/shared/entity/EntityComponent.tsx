// React
import { FC, useEffect } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
// Components
import IngredientComponent from "./IngredientComponent";
import UtensilComponent from "./UtensilComponent";
import RecipeComponent from "./RecipeComponent";
import DayTemplateComponent from "./DayTemplateComponent";
import InstanceTemplateComponent from "./InstanceTemplateComponent";
import MealPrepPlanComponent from "./MealPrepPlanComponent";

type EntityComponentSchemeProps = EntityComponentProps & {
  entityType:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan";
};

const EntityComponent: FC<EntityComponentSchemeProps> = ({
  clicked,
  entityType,
  entityId,
}) => {
  let entityComponentShown = useSelectEntityComponentShown(
    entityType,
    clicked,
    entityId
  );

  if (entityComponentShown) {
    return entityComponentShown;
  }
  return null;
};

const useSelectEntityComponentShown = (
  entityType:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan",
  clicked: boolean,
  entityId: string
) => {
  let entityComponentShown = null;

  switch (entityType) {
    case "ingredient":
      entityComponentShown = (
        <IngredientComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "utensil":
      entityComponentShown = (
        <UtensilComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "recipe":
      entityComponentShown = (
        <RecipeComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "dayTemplate":
      entityComponentShown = (
        <DayTemplateComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "instanceTemplate":
      entityComponentShown = (
        <InstanceTemplateComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "mealPrepPlan":
      entityComponentShown = (
        <MealPrepPlanComponent clicked={clicked} entityId={entityId} />
      );
      break;
    default:
      throw new Error("Invalid entity type!");
  }

  return entityComponentShown;
};

export default EntityComponent;
