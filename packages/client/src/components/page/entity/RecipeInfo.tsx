// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityInfoDetails from "./EntityInfoDetails";
import EntityInfoAppearances from "./EntityInfoAppearances";
import EntityInfoTutorial from "./EntityInfoTutorial";
import EntityInfoComponents from "./EntityInfoComponents";
// React
import { FC, useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getUserRecipe,
  selectLoadingGetUserRecipe,
} from "@/redux/slices/recipesSlice";

const RecipeInfo: FC<{ entityId: string; userId: string }> = ({
  entityId,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const loadingGetUserRecipe = useAppSelector(selectLoadingGetUserRecipe);

  useEffect(() => {
    console.log(loadingGetUserRecipe, userId, entityId);
    if (loadingGetUserRecipe === "IDLE" && userId && entityId) {
      dispatch(getUserRecipe({ userId, recipeId: entityId }));
    }
  }, [entityId, userId, loadingGetUserRecipe]);

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle />
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
