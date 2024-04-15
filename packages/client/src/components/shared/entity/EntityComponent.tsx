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
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";

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
  entity,
}) => {
  const entityComponentShown = useSelectEntityComponentShown(
    entityType,
    clicked,
    entityId,
    isALink,
    entity
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
  isALink: boolean,
  entity?:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate
) => {
  let entityComponentShown = null;
  let entityComponentDestination = "";

  console.log(entityId);

  switch (entityType) {
    case "ingredient":
      entityComponentDestination = `/ingredient/${entityId || entity?.id}`;
      entityComponentShown = (
        <IngredientComponent
          clicked={clicked}
          entityId={entityId}
          entity={entity}
        />
      );
      break;
    case "utensil":
      entityComponentDestination = `/utensil/${entityId || entity?.id}`;
      entityComponentShown = (
        <UtensilComponent
          clicked={clicked}
          entityId={entityId}
          entity={entity}
        />
      );
      break;
    case "recipe":
      entityComponentDestination = `/recipe/${entityId || entity?.id}`;
      entityComponentShown = (
        <RecipeComponent
          clicked={clicked}
          entityId={entityId}
          entity={entity}
        />
      );
      break;
    case "dayTemplate":
      entityComponentDestination = `/dayTemplate/${entityId || entity?.id}`;
      entityComponentShown = (
        <DayTemplateComponent
          clicked={clicked}
          entityId={entityId}
          entity={entity}
        />
      );
      break;
    case "instanceTemplate":
      entityComponentDestination = `/instanceTemplate/${entityId || entity?.id}`;
      entityComponentShown = (
        <InstanceTemplateComponent
          clicked={clicked}
          entityId={entityId}
          entity={entity}
        />
      );
      break;
    case "mealPrepPlan":
      entityComponentDestination = `/mealPrepPlan/${entityId || entity?.id}`;
      entityComponentShown = (
        <MealPrepPlanComponent
          clicked={clicked}
          entityId={entityId}
          entity={entity}
        />
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
