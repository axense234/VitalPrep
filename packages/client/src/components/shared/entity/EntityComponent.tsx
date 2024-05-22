// React
import { FC } from "react";
// Components
import IngredientComponent from "./IngredientComponent";
import UtensilComponent from "./UtensilComponent";
import RecipeComponent from "./RecipeComponent";
import DayTemplateComponent from "./DayTemplateComponent";
import InstanceTemplateComponent from "./InstanceTemplateComponent";
import MealPrepPlanComponent from "./MealPrepPlanComponent";
import MealPrepLogComponent from "./MealPrepLogComponent";
import EntityCard from "./EntityCard";
// Types
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import EntityComponentSchemeProps from "@/core/interfaces/entity/EntityComponentSchemeProps";
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectProfile,
  selectSelectedViewOption,
} from "@/redux/slices/generalSlice";
// Helpers
import getDeleteEntityFunction from "@/helpers/getDeleteEntityFunction";
// Hooks
import useNavigateToPathname from "@/hooks/useNavigateToPathname";

const EntityComponent: FC<EntityComponentSchemeProps> = ({
  clicked,
  entityType,
  entityId,
  entity,
  isALink,
  selectedViewOption,
  hasEntityMutationMenu = true,
}) => {
  const profile = useAppSelector(selectProfile);
  const selectedViewOptionFromState = useAppSelector(selectSelectedViewOption);
  const usedSelectedViewOption =
    selectedViewOption || selectedViewOptionFromState;

  const entityComponentShown = useSelectEntityComponentShown({
    entityType,
    clicked,
    entityId,
    isALink,
    entity,
    selectedViewOption: usedSelectedViewOption,
    hasEntityMutationMenu,
    profile,
  });

  if (entityComponentShown) {
    return entityComponentShown;
  }
  return null;
};

const useSelectEntityComponentShown: FC<EntityComponentSchemeProps> = ({
  clicked,
  entityId,
  entityType,
  isALink,
  entity,
  selectedViewOption,
  hasEntityMutationMenu,
  profile,
}) => {
  let entityComponentShown = null;

  const dispatch = useAppDispatch();
  const navigateToPathname = useNavigateToPathname();

  switch (entityType) {
    case "ingredient":
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as IngredientTemplate}
            entityType={entityType}
            entityId={entityId}
            size="medium"
            isALink={true}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <IngredientComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
            isALink={isALink}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      }
      break;
    case "utensil":
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as UtensilTemplate}
            entityType={entityType}
            entityId={entityId}
            isALink={true}
            size="medium"
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <UtensilComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
            isALink={isALink}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      }
      break;
    case "recipe":
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as RecipeTemplate}
            entityType={entityType}
            entityId={entityId}
            isALink={true}
            size="medium"
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <RecipeComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
            isALink={isALink}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      }
      break;
    case "dayTemplate":
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as DayTemplateTemplate}
            entityType={entityType}
            entityId={entityId}
            isALink={true}
            size="medium"
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <DayTemplateComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
            isALink={isALink}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      }
      break;
    case "instanceTemplate":
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as InstanceTemplateTemplate}
            entityType={entityType}
            entityId={entityId}
            isALink={true}
            size="medium"
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <InstanceTemplateComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
            isALink={isALink}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      }
      break;
    case "mealPrepPlan":
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as MealPrepPlanTemplate}
            entityType={entityType}
            entityId={entityId}
            isALink={true}
            size="medium"
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <MealPrepPlanComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
            isALink={isALink}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      }
      break;
    case "mealPrepLog":
      if (selectedViewOption === "grid") {
        entityComponentShown = (
          <EntityCard
            entity={entity as MealPrepLogTemplate}
            entityType={entityType}
            entityId={entityId}
            isALink={true}
            size="medium"
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      } else if (selectedViewOption === "list") {
        entityComponentShown = (
          <MealPrepLogComponent
            clicked={clicked}
            entityId={entityId}
            entity={entity}
            isALink={isALink}
            hasEntityMutationMenu={hasEntityMutationMenu}
            deleteEntityFunction={getDeleteEntityFunction(
              entityType,
              dispatch,
              entity?.id || entityId,
              profile?.id as string
            )}
            updateEntityFunction={() => navigateToPathname({})}
          />
        );
      }
      break;
    default:
      throw new Error("Invalid entity type!");
  }

  return entityComponentShown;
};

export default EntityComponent;
