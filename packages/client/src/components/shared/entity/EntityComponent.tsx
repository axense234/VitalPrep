// React
import { FC } from "react";
// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// Components
import IngredientComponent from "./IngredientComponent";
import UtensilComponent from "./UtensilComponent";
import RecipeComponent from "./RecipeComponent";
import DayTemplateComponent from "./DayTemplateComponent";
import InstanceTemplateComponent from "./InstanceTemplateComponent";
import MealPrepPlanComponent from "./MealPrepPlanComponent";
import EntityCard from "./EntityCard";
// Next
import Link from "next/link";
// Types
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import EntityType from "@/core/types/entity/EntityType";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedViewOption } from "@/redux/slices/generalSlice";
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";
import MealPrepLogComponent from "./MealPrepLogComponent";

type EntityComponentSchemeProps = {
  isALink: boolean;
  clicked: boolean;
  entityId: string;
  selectedViewOption?: "grid" | "list";
  entityType: EntityType;
  entity?:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate;
};

const EntityComponent: FC<EntityComponentSchemeProps> = ({
  clicked,
  entityType,
  entityId,
  entity,
  isALink,
  selectedViewOption,
}) => {
  const selectedViewOptionFromState = useAppSelector(selectSelectedViewOption);
  const usedSelectedViewOption =
    selectedViewOption || selectedViewOptionFromState;

  const entityComponentShown = useSelectEntityComponentShown(
    entityType,
    clicked,
    entityId,
    isALink,
    usedSelectedViewOption,
    entity
  );

  if (entityComponentShown) {
    return entityComponentShown;
  }
  return null;
};

const useSelectEntityComponentShown = (
  entityType: EntityType,
  clicked: boolean,
  entityId: string,
  isALink: boolean,
  selectedViewOption: "grid" | "list",
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
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as IngredientTemplate}
            entityType={entityType}
            entityId={entityId}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <IngredientComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
          />
        );
      }
      break;
    case "utensil":
      entityComponentDestination = `/utensil/${entityId || entity?.id}`;
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as UtensilTemplate}
            entityType={entityType}
            entityId={entityId}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <UtensilComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
          />
        );
      }
      break;
    case "recipe":
      entityComponentDestination = `/recipe/${entityId || entity?.id}`;
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as RecipeTemplate}
            entityType={entityType}
            entityId={entityId}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <RecipeComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
          />
        );
      }
      break;
    case "dayTemplate":
      entityComponentDestination = `/dayTemplate/${entityId || entity?.id}`;
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as DayTemplateTemplate}
            entityType={entityType}
            entityId={entityId}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <DayTemplateComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
          />
        );
      }
      break;
    case "instanceTemplate":
      entityComponentDestination = `/instanceTemplate/${entityId || entity?.id}`;
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as InstanceTemplateTemplate}
            entityType={entityType}
            entityId={entityId}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <InstanceTemplateComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
          />
        );
      }
      break;
    case "mealPrepPlan":
      entityComponentDestination = `/mealPrepPlan/${entityId || entity?.id}`;
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as MealPrepPlanTemplate}
            entityType={entityType}
            entityId={entityId}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <MealPrepPlanComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
          />
        );
      }
      break;
    case "mealPrepLog":
      entityComponentDestination = `/mealPrepLog/${entityId || entity?.id}`;
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as MealPrepLogTemplate}
            entityType={entityType}
            entityId={entityId}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <MealPrepLogComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
          />
        );
      }
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
