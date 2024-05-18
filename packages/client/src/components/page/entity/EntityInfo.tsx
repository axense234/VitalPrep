"use client";

// Types
import EntityType from "@/core/types/entity/users/EntityType";
// Next
import { useParams } from "next/navigation";
// Components
import IngredientInfo from "./IngredientInfo";
import UtensilInfo from "./UtensilInfo";
import RecipeInfo from "./RecipeInfo";
import DayTemplateInfo from "./DayTemplateInfo";
import InstanceTemplateInfo from "./InstanceTemplateInfo";
import MealPrepPlanInfo from "./MealPrepPlanInfo";
import MealPrepLogInfo from "./MealPrepLogInfo";
import PageTitle from "@/components/shared/PageTitle";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
// Translations
import { usePathname } from "@/navigation";

const EntityInfo = () => {
  const pathname = usePathname();
  const { id: entityId } = useParams();
  const entityType = pathname.split("/")[1] as EntityType;

  const profile = useAppSelector(selectProfile);

  const entityInfoPageShown = useSelectEntityInfoPageShown(
    entityType,
    entityId as string,
    profile.id
  );

  if (entityInfoPageShown) {
    return entityInfoPageShown;
  }
  return (
    <PageTitle
      titleContent="View Entity Info"
      subtitleContent="loading entity..."
      backgroundImageSrc="https://res.cloudinary.com/birthdayreminder/image/upload/v1714922259/VitalPrep/pre_prepared_meals_pqenm1.png"
    />
  );
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
      case "mealPrepLog":
        entityComponentShown = (
          <MealPrepLogInfo entityId={entityId} userId={profileId} />
        );
        break;
      default:
        throw new Error("Invalid entity type!");
    }
  }

  return entityComponentShown;
};

export default EntityInfo;
