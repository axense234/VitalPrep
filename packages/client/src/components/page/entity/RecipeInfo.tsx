// SCSS
import entityInfoStyles from "@/scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityInfoTutorial from "./EntityInfoTutorial";
import EntityInfoComponents from "./EntityInfoComponents";
import EntityMutationMenu from "@/components/shared/entity/EntityMutationMenu";
import UpsertRecipeInterface from "../create-tool/interfaces/UpsertRecipeInterface";
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
// Translations
import { useTranslations } from "next-intl";
// Next
import { useSearchParams } from "next/navigation";

const RecipeInfo: FC<EntityInfoProps> = ({
  entityId,
  userId,
  hasEntityMutationMenu = true,
}) => {
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit");
  console.log(editMode);

  const dispatch = useAppDispatch();
  const loadingGetUserRecipe = useAppSelector(selectLoadingGetUserRecipe);

  const navigateToPathname = useNavigateToPathname();
  const handleOnDeleteEntity = useGetHandleOnDeleteEntity(
    "recipe",
    entityId,
    userId
  );

  const translate = useTranslations("warningOverlay.pageInfo");

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
          handleEntityModification={() =>
            navigateToPathname({ forcedQueryParams: { edit: "true" } })
          }
          handleEntityViewing={() =>
            navigateToPathname({ forcedQueryParams: {} })
          }
          entityType="recipe"
          entityName={translate("recipe")}
        />
      )}
      <div className={entityInfoStyles.entityInfoContent}>
        {editMode === "true" ? (
          <UpsertRecipeInterface interfaceType="update" />
        ) : (
          <>
            <EntityInfoDetails entityId={entityId} entityType="recipe" />
            <EntityInfoTutorial entityId={entityId} />
            <EntityInfoComponents entityId={entityId} entityType="recipe" />
            <EntityInfoAppearances entityId={entityId} entityType="recipe" />
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeInfo;
