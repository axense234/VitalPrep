// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityInfoTutorial from "./EntityInfoTutorial";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserRecipe,
  selectLoadingGetUserRecipe,
} from "@/redux/slices/recipesSlice";
// Types
import EntityInfoProps from "@/core/interfaces/entity/EntityInfoProps";
// Hooks
import useGetHandleOnDeleteEntity from "@/hooks/useGetHandleOnDeleteEntity";
import useNavigateToPathname from "@/hooks/useNavigateToPathname";

const RecipeInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserRecipe = useAppSelector(selectLoadingGetUserRecipe);

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "recipe",
    entityId,
    userId
  );

  useEffect(() => {
    console.log(loadingGetUserRecipe, userId, entityId);
    if (loadingGetUserRecipe === "IDLE" && userId && entityId) {
      dispatch(getUserRecipe({ userId, recipeId: entityId }));
    }
  }, [entityId, userId, loadingGetUserRecipe]);

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
        <EntityInfoDetails entityId={entityId} entityType="recipe" />
        <EntityInfoTutorial entityId={entityId} />
        <EntityInfoComponents entityId={entityId} entityType="recipe" />
        <EntityInfoAppearances entityId={entityId} entityType="recipe" />
      </div>
    </div>
  );
};

export default RecipeInfo;
