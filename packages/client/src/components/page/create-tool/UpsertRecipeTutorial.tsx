// SCSS
import createRecipeTutorialStyles from "@/scss/components/page/create-tool/CreateRecipeTutorial.module.scss";
// Components
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import TextAreaFormControl from "@/components/shared/form/TextAreaFormControl";
import VideoFormControl from "@/components/shared/form/VideoFormControl";
// Redux
import {
  changeShowVideoTutorialContent,
  changeShowWrittenTutorialContent,
  selectShowVideoTutorialContent,
  selectShowWrittenTutorialContent,
  selectTemplateRecipe,
  updateTemplateRecipeTutorial,
} from "@/redux/slices/recipesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Translations
import { useTranslations } from "next-intl";

const UpsertRecipeTutorial = () => {
  const dispatch = useAppDispatch();
  const showVideoTutorialContent = useAppSelector(
    selectShowVideoTutorialContent
  );
  const showWrittenTutorialContent = useAppSelector(
    selectShowWrittenTutorialContent
  );

  const templateRecipe = useAppSelector(selectTemplateRecipe);

  const translate = useTranslations("createTool.formLabels.recipe.tutorial");

  return (
    <div className={createRecipeTutorialStyles.createRecipeTutorialContainer}>
      <h5>Tutorial:</h5>
      <div
        className={createRecipeTutorialStyles.createRecipeTutorialCheckboxes}
      >
        <CheckboxFormControl
          labelContent={translate("videoTutorialCheckboxLabel")}
          entityProperty={String(showVideoTutorialContent)}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              changeShowVideoTutorialContent(
                e.target.value === "true" ? false : true
              )
            )
          }
        />
        {showVideoTutorialContent && (
          <VideoFormControl
            labelContent={translate("videoTutorialUrlPrompt")}
            entityProperty={templateRecipe.recipeTutorial?.videoTutorial}
            onEntityPropertyValueChange={(e) =>
              dispatch(
                updateTemplateRecipeTutorial({
                  key: "videoTutorial",
                  value: e.target.value,
                })
              )
            }
            onEntityPropertyValueUpdate={(urlInput) =>
              dispatch(
                updateTemplateRecipeTutorial({
                  key: "videoTutorial",
                  value: urlInput,
                })
              )
            }
          />
        )}
        <CheckboxFormControl
          labelContent={translate("writtenTutorialCheckboxLabel")}
          entityProperty={String(showWrittenTutorialContent)}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              changeShowWrittenTutorialContent(
                e.target.value === "true" ? false : true
              )
            )
          }
        />
        {showWrittenTutorialContent && (
          <TextAreaFormControl
            entityProperty={templateRecipe?.recipeTutorial?.writtenTutorial}
            labelContent={translate("writtenTutorialUrlPrompt")}
            onEntityPropertyValueChange={(e) =>
              dispatch(
                updateTemplateRecipeTutorial({
                  key: "writtenTutorial",
                  value: e.target.value,
                })
              )
            }
            maxInputLength={10000}
          />
        )}
      </div>
    </div>
  );
};

export default UpsertRecipeTutorial;
