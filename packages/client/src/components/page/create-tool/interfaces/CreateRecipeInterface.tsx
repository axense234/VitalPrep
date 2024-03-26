// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
// Data
import { defaultUtensilImageUrl } from "@/data";
// React
import { useEffect, useRef } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createUtensil,
  getAllUserUtensils,
  selectAllUtensilsIds,
  selectLoadingGetUserUtensils,
  updateTemplateUtensil,
} from "@/redux/slices/utensilsSlice";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectLoadingGetOAuthProfile,
  selectLoadingGetProfile,
  selectProfile,
  selectTemplateImageUrl,
  setTemplateModalMessage,
} from "@/redux/slices/generalSlice";
import {
  changeShowVideoTutorialContent,
  changeShowWrittenTutorialContent,
  createRecipe,
  selectLoadingCreateRecipe,
  selectRecipeFormModalErrorMessage,
  selectShowVideoTutorialContent,
  selectShowWrittenTutorialContent,
  selectTemplateRecipe,
  updateLoadingCreateRecipe,
  updateTemplateRecipe,
} from "@/redux/slices/recipesSlice";
import {
  getAllUserIngredients,
  selectAllIngredientsIds,
  selectLoadingGetUserIngredients,
} from "@/redux/slices/ingredientsSlice";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";

const CreateRecipeInterface = () => {
  const dispatch = useAppDispatch();
  const hasEffectRun = useRef(false);
  const profile = useAppSelector(selectProfile);

  const showVideoTutorialContent = useAppSelector(
    selectShowVideoTutorialContent
  );
  const showWrittenTutorialContent = useAppSelector(
    selectShowWrittenTutorialContent
  );

  const recipeFormModalErrorMessage = useAppSelector(
    selectRecipeFormModalErrorMessage
  );
  const templateRecipe = useAppSelector(selectTemplateRecipe);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  const ingredientsIds = useAppSelector(selectAllIngredientsIds);
  const utensilsIds = useAppSelector(selectAllUtensilsIds);

  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);
  const loadingCreateRecipe = useAppSelector(selectLoadingCreateRecipe);
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserIngredients = useAppSelector(
    selectLoadingGetUserIngredients
  );
  const loadingGetUserUtensils = useAppSelector(selectLoadingGetUserUtensils);
  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;

  const handleUpdateArrayEntities = (
    entityIds: string[] = [],
    entityId: string,
    entityType: "ingredients" | "utensils"
  ) => {
    if (entityIds?.find((id) => id === entityId)) {
      dispatch(
        updateTemplateRecipe({
          key: entityType,
          value: entityIds.filter((id) => id !== entityId),
        })
      );
    } else {
      dispatch(
        updateTemplateRecipe({
          key: entityType,
          value: [...entityIds, entityId],
        })
      );
    }
  };

  useEffect(() => {
    if (
      loadingGetUserIngredients === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(getAllUserIngredients(profile.id));
    }
    if (
      loadingGetUserUtensils === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(getAllUserUtensils(profile.id));
    }
    hasEffectRun.current = true;
  }, [loadingGetUserIngredients, loadingGetUserUtensils, loadingProfile]);

  useEffect(() => {
    if (loadingCreateRecipe === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully created recipe: ${templateRecipe.name}.`
        )
      );
    } else if (loadingCreateRecipe === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(recipeFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateRecipe("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateRecipe]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateRecipe({ key: "imageUrl", value: templateImageUrl })
      );
    }
  }, [loadingCloudinaryImage]);

  return (
    <section className={createToolStyles.createInterface}>
      <PopupModal hasBorder={false} modalType="form" />
      <h2>Create Recipe</h2>
      <form className={createToolStyles.createInterfaceForm}>
        <TextFormControl
          direction="row"
          entityProperty={templateRecipe.name}
          labelColor="#120A06"
          labelContent="Recipe Name:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateRecipe({ key: "name", value: e.target.value })
            )
          }
          required={true}
          type="text"
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Recipe Image:"
          direction="row"
          defaultImageUsedUrl={defaultUtensilImageUrl}
          entityPropertyLoadingStatus={loadingCloudinaryImage}
          entityProperty={templateRecipe.imageUrl as string}
          onEntityPropertyValueChange={(e) => {
            if (e.target.files) {
              dispatch(
                createCloudinaryImage({
                  entity: "utensils",
                  imageFile: e.target.files[0],
                })
              );
            }
          }}
          labelFontSize={28}
        />
        <SelectFormControl
          labelColor="#120A06"
          labelContent="Ingredients:"
          required={true}
          entityPropertyOptions={ingredientsIds}
          entityPropertyChosenOptions={templateRecipe.ingredients || []}
          entityTypeUsed="ingredient"
          onEntityPropertyValueChange={(id) =>
            handleUpdateArrayEntities(
              templateRecipe.ingredients,
              id,
              "ingredients"
            )
          }
          labelFontSize={28}
          areOptionsLoading={loadingGetUserIngredients === "PENDING"}
        />
        <SelectFormControl
          labelColor="#120A06"
          labelContent="Utensils:"
          required={true}
          entityPropertyOptions={utensilsIds}
          entityPropertyChosenOptions={templateRecipe.utensils || []}
          entityTypeUsed="utensil"
          onEntityPropertyValueChange={(id) =>
            handleUpdateArrayEntities(templateRecipe.utensils, id, "utensils")
          }
          labelFontSize={28}
          areOptionsLoading={loadingGetUserUtensils === "PENDING"}
        />
        <div className={createToolStyles.createInterfaceRecipeTutorial}>
          <h3>Tutorial:</h3>
          <div
            className={createToolStyles.createInterfaceRecipeTutorialCheckboxes}
          >
            <CheckboxFormControl
              direction="row"
              labelColor="#120A06"
              labelContent="Use Video Tutorial?:"
              entityProperty={String(showVideoTutorialContent)}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  changeShowVideoTutorialContent(!showVideoTutorialContent)
                )
              }
              labelFontSize={26}
            />
            <CheckboxFormControl
              direction="row"
              labelColor="#120A06"
              labelContent="Use Written Tutorial?:"
              entityProperty={String(showWrittenTutorialContent)}
              onEntityPropertyValueChange={() =>
                dispatch(
                  changeShowWrittenTutorialContent(!showWrittenTutorialContent)
                )
              }
              labelFontSize={26}
            />
          </div>
        </div>
        <PrimaryButton
          backgroundColor="#8B0000"
          textColor="#DDD9D5"
          content="Create Recipe"
          type="functional"
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
          disabled={
            loadingCreateRecipe === "PENDING" ||
            loadingCloudinaryImage === "PENDING"
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(
              createRecipe({
                templateRecipe: templateRecipe,
                userId: profile.id,
              })
            );
          }}
        />
      </form>
    </section>
  );
};

export default CreateRecipeInterface;
