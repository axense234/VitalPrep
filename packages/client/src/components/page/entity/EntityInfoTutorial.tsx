// SCSS
import entityInfoTutorialStyles from "../../../scss/components/page/EntityInfo.module.scss";
// React
import { FC, useEffect, useState } from "react";
import { State } from "@/redux/api/store";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Types
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
// Hooks
import useVideoUrlFormat from "@/hooks/useVideoUrlFormat";
// Redux
import { useAppSelector } from "@/hooks/redux";

const EntityInfoTutorial: FC<{
  entityId: string;
}> = ({ entityId }) => {
  const recipe = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "recipe")
  ) as RecipeTemplate;

  const [usedRecipeVideoTutorial, setUsedRecipeVideoTutorial] =
    useState<string>("");

  console.log(recipe);

  useVideoUrlFormat(usedRecipeVideoTutorial, (value) =>
    setUsedRecipeVideoTutorial(value)
  );

  useEffect(() => {
    if (recipe?.recipeTutorial?.videoTutorial) {
      setUsedRecipeVideoTutorial(recipe.recipeTutorial.videoTutorial);
    }
  }, [recipe]);

  return (
    <div className={entityInfoTutorialStyles.entityInfoTutorialContainer}>
      <h4>Tutorial</h4>
      <div className={entityInfoTutorialStyles.entityInfoTutorialContent}>
        <div className={entityInfoTutorialStyles.entityInfoVideoTutorial}>
          <h5>Video Tutorial</h5>
          {usedRecipeVideoTutorial ? (
            <iframe
              src={usedRecipeVideoTutorial}
              title="Recipe Tutorial"
              aria-label="Recipe Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <h6>No Video Tutorial Available.</h6>
          )}
        </div>
        <div className={entityInfoTutorialStyles.entityInfoWrittenTutorial}>
          <h5>Written Tutorial</h5>
          {recipe?.recipeTutorial?.writtenTutorial ? (
            <p>{recipe?.recipeTutorial?.writtenTutorial}</p>
          ) : (
            <h6>No Written Tutorial Available.</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityInfoTutorial;
