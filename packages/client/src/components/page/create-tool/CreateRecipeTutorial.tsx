// SCSS
import createRecipeTutorialStyles from "../../../scss/components/page/create-tool/CreateRecipeTutorial.module.scss";
// Components
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import TextAreaFormControl from "@/components/shared/form/TextAreaFormControl";
import VideoFormControl from "@/components/shared/form/VideoFormControl";
// Redux
import {
  changeShowVideoTutorialContent,
  updateTemplateRecipe,
  changeShowWrittenTutorialContent,
  selectShowVideoTutorialContent,
  selectShowWrittenTutorialContent,
  selectTemplateRecipe,
} from "@/redux/slices/recipesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const CreateRecipeTutorial = () => {
  const dispatch = useAppDispatch();
  const showVideoTutorialContent = useAppSelector(
    selectShowVideoTutorialContent
  );
  const showWrittenTutorialContent = useAppSelector(
    selectShowWrittenTutorialContent
  );

  const templateRecipe = useAppSelector(selectTemplateRecipe);

  return (
    <div className={createRecipeTutorialStyles.createRecipeTutorialContainer}>
      <h5>Tutorial:</h5>
      <div
        className={createRecipeTutorialStyles.createRecipeTutorialCheckboxes}
      >
        <CheckboxFormControl
          labelContent="Use Video Tutorial?:"
          entityProperty={String(showVideoTutorialContent)}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              changeShowVideoTutorialContent(!Boolean(showVideoTutorialContent))
            )
          }
        />
        {showVideoTutorialContent && (
          <VideoFormControl
            labelContent="Recipe Tutorial URL:"
            entityProperty={templateRecipe.videoTutorial}
            onEntityPropertyValueChange={(e) =>
              dispatch(
                updateTemplateRecipe({
                  key: "videoTutorial",
                  value: e.target.value,
                })
              )
            }
            onEntityPropertyValueUpdate={(urlInput) =>
              dispatch(
                updateTemplateRecipe({
                  key: "videoTutorial",
                  value: urlInput,
                })
              )
            }
          />
        )}
        <CheckboxFormControl
          labelContent="Use Written Tutorial?:"
          entityProperty={String(showWrittenTutorialContent)}
          onEntityPropertyValueChange={() =>
            dispatch(
              changeShowWrittenTutorialContent(
                !Boolean(showWrittenTutorialContent)
              )
            )
          }
        />
        {showWrittenTutorialContent && (
          <TextAreaFormControl
            entityProperty={templateRecipe.writtenTutorial}
            labelContent="Written Tutorial:"
            onEntityPropertyValueChange={(e) =>
              dispatch(
                updateTemplateRecipe({
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

export default CreateRecipeTutorial;