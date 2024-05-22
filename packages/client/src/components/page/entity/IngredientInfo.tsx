// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserIngredient,
  selectLoadingGetUserIngredient,
} from "@/redux/slices/ingredientsSlice";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useNavigateToPathname from "@/hooks/useNavigateToPathname";
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";

const IngredientInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserIngredient = useAppSelector(
    selectLoadingGetUserIngredient
  );

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "ingredient",
    entityId,
    userId
  );

  useEffect(() => {
    if (loadingGetUserIngredient === "IDLE" && userId && entityId) {
      dispatch(getUserIngredient({ userId, ingredientId: entityId }));
    }
  }, [entityId, userId, loadingGetUserIngredient]);

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle />
      {hasEntityMutationMenu && (
        <EntityMutationMenu
          type="entityInfo"
          handleEntityDeletion={handleOnDeleteEntity}
          handleEntityModification={() => navigateToPathname({})}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        <EntityInfoDetails entityId={entityId} entityType="ingredient" />
        <EntityInfoAppearances entityId={entityId} entityType="ingredient" />
      </div>
    </div>
  );
};

export default IngredientInfo;
