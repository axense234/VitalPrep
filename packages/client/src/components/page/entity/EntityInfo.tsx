"use client";

// Types
import EntityType from "@/core/types/entity/EntityType";
// Next
import { useParams, usePathname } from "next/navigation";
// Components
import IngredientInfo from "./IngredientInfo";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";

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
        break;
      case "recipe":
        break;
      case "dayTemplate":
        break;
      case "instanceTemplate":
        break;
      case "mealPrepPlan":
        break;
      default:
        throw new Error("Invalid entity type!");
    }
  }

  return entityComponentShown;
};

export default EntityInfo;
