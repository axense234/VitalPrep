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
// Data
import { pageTitleContent } from "@/data";

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

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    pageTitleContent.find((pageTitle) =>
      pageTitle.specificPagePath.startsWith("/recipe")
    ) || pageTitleContent[0];

  return (
    <div className={entityInfoStyles.entityInfoContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
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
