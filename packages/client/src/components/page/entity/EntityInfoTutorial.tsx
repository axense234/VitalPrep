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
// Translations
import { useTranslations } from "next-intl";

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

  const translate = useTranslations("entityTutorial");

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
          <h5>{translate("videoTutorial.title")}</h5>
          {usedRecipeVideoTutorial ? (
            <iframe
              src={usedRecipeVideoTutorial}
              title={translate("iframeTitle")}
              aria-label={translate("iframeTitle")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <h6>{translate("videoTutorial.notFoundMessage")}</h6>
          )}
        </div>
        <div className={entityInfoTutorialStyles.entityInfoWrittenTutorial}>
          <h5>{translate("writtenTutorial.title")}</h5>
          {recipe?.recipeTutorial?.writtenTutorial ? (
            <p>{recipe?.recipeTutorial?.writtenTutorial}</p>
          ) : (
            <h6>{translate("writtenTutorial.notFoundMessage")}</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityInfoTutorial;
