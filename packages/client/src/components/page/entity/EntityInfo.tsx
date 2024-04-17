"use client";

// Types
import EntityType from "@/core/types/entity/EntityType";
// Next
import { useParams, usePathname } from "next/navigation";
// Components
import IngredientInfo from "./IngredientInfo";
import UtensilInfo from "./UtensilInfo";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
import RecipeInfo from "./RecipeInfo";
import DayTemplateInfo from "./DayTemplateInfo";
import InstanceTemplateInfo from "./InstanceTemplateInfo";
import MealPrepPlanInfo from "./MealPrepPlanInfo";

const EntityInfo = () => {
  const pathname = usePathname();
  const { id: entityId } = useParams();
  const entityType = pathname.split("/")[1] as EntityType;

  const profile = useAppSelector(selectProfile);

  console.log(entityType, entityId);

  const entityInfoPageShown = useSelectEntityInfoPageShown(
    entityType,
    entityId as string,
    profile.id
  );

  if (entityInfoPageShown) {
    return entityInfoPageShown;
  }
  return null;
};

const useSelectEntityInfoPageShown = (
  entityType: EntityType,
  entityId: string,
  profileId: string
) => {
  let entityComponentShown = null;

  if (profileId && entityId) {
    switch (entityType) {
      case "ingredient":
        entityComponentShown = (
          <IngredientInfo entityId={entityId} userId={profileId} />
        );
        break;
      case "utensil":
        entityComponentShown = (
          <UtensilInfo entityId={entityId} userId={profileId} />
        );
        break;
      case "recipe":
        entityComponentShown = (
          <RecipeInfo entityId={entityId} userId={profileId} />
        );
        break;
      case "dayTemplate":
        entityComponentShown = (
          <DayTemplateInfo entityId={entityId} userId={profileId} />
        );
        break;
      case "instanceTemplate":
        entityComponentShown = (
          <InstanceTemplateInfo entityId={entityId} userId={profileId} />
        );
        break;
      case "mealPrepPlan":
        entityComponentShown = (
          <MealPrepPlanInfo entityId={entityId} userId={profileId} />
        );
        break;
      default:
        throw new Error("Invalid entity type!");
    }
  }

  return entityComponentShown;
};

export default EntityInfo;
