// React
import { FC, useEffect } from "react";
// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
// Components
import IngredientComponent from "./IngredientComponent";
import UtensilComponent from "./UtensilComponent";
import RecipeComponent from "./RecipeComponent";
import DayTemplateComponent from "./DayTemplateComponent";
import InstanceTemplateComponent from "./InstanceTemplateComponent";
import MealPrepPlanComponent from "./MealPrepPlanComponent";
// Next
import Link from "next/link";

type EntityComponentSchemeProps = EntityComponentProps & {
  entityType:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan";
  isALink: boolean;
};

const EntityComponent: FC<EntityComponentSchemeProps> = ({
  clicked,
  entityType,
  entityId,
  isALink,
}) => {
  const entityComponentShown = useSelectEntityComponentShown(
    entityType,
    clicked,
    entityId,
    isALink
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
  entityId: string,
  isALink: boolean
) => {
  let entityComponentShown = null;
  let entityComponentDestination = "";

  switch (entityType) {
    case "ingredient":
      entityComponentDestination = `/ingredient/${entityId}`;
      entityComponentShown = (
        <IngredientComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "utensil":
      entityComponentDestination = `/utensil/${entityId}`;
      entityComponentShown = (
        <UtensilComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "recipe":
      entityComponentDestination = `/recipe/${entityId}`;
      entityComponentShown = (
        <RecipeComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "dayTemplate":
      entityComponentDestination = `/dayTemplate/${entityId}`;
      entityComponentShown = (
        <DayTemplateComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "instanceTemplate":
      entityComponentDestination = `/instanceTemplate/${entityId}`;
      entityComponentShown = (
        <InstanceTemplateComponent clicked={clicked} entityId={entityId} />
      );
      break;
    case "mealPrepPlan":
      entityComponentDestination = `/mealPrepPlan/${entityId}`;
      entityComponentShown = (
        <MealPrepPlanComponent clicked={clicked} entityId={entityId} />
      );
      break;
    default:
      throw new Error("Invalid entity type!");
  }

  if (isALink) {
    return (
      <Link
        href={entityComponentDestination}
        className={entityComponentStyles.entityComponentLinkWrapper}
      >
        {entityComponentShown}
      </Link>
    );
  }
  return entityComponentShown;
};

export default EntityComponent;
