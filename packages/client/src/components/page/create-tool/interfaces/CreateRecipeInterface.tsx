// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import EntityPreview from "@/components/shared/entity/EntityPreview";
import CreateRecipeTutorial from "../CreateRecipeTutorial";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
// Data
import { defaultEntityQueryValues, defaultUtensilImageUrl } from "@/data";
// React
import { useEffect, useRef } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllUserUtensils,
  selectAllUtensilsIds,
  selectLoadingGetUserUtensils,
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
  selectAllIngredients,
  selectAllIngredientsIds,
  selectLoadingGetUserIngredients,
} from "@/redux/slices/ingredientsSlice";
// Helpers
import calculateEntityMacrosBasedOnComponents from "@/helpers/calculateEntityMacrosBasedOnComponents";

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

  const ingredientsBasedOnIngredientIds = useAppSelector(
    selectAllIngredients
  ).filter((ingredient) => {
    return templateRecipe.ingredients.find(
      (trIngredientId) => trIngredientId === ingredient.id
    );
  }) as IngredientTemplate[];

  useEffect(() => {
    dispatch(
      updateTemplateRecipe({
        key: "macros",
        value: calculateEntityMacrosBasedOnComponents(
          ingredientsBasedOnIngredientIds.map(
            (ingredient: IngredientTemplate) => ingredient?.macros
          )
        ),
      })
    );
  }, [templateRecipe.ingredients]);

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
      dispatch(
        getAllUserIngredients({
          userId: profile.id,
          entityQueryValues: defaultEntityQueryValues,
        })
      );
    }
    if (
      loadingGetUserUtensils === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(
        getAllUserUtensils({
          userId: profile.id,
          entityQueryValues: defaultEntityQueryValues,
        })
      );
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
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Recipe</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateRecipe.name}
              labelContent="Recipe Name:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateRecipe({ key: "name", value: e.target.value })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent="Recipe Image:"
              defaultImageUsedUrl={defaultUtensilImageUrl}
              entityPropertyLoadingStatus={loadingCloudinaryImage}
              entityProperty={templateRecipe.imageUrl as string}
              onEntityPropertyValueChange={(e) => {
                if (e.target.files) {
                  dispatch(
                    createCloudinaryImage({
                      entity: "recipes",
                      imageFile: e.target.files[0],
                    })
                  );
                }
              }}
              labelFontSize={28}
            />
            <CreateRecipeTutorial />
            <PrimaryButton
              content="Create Recipe"
              type="functional"
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
                    showVideoTutorialContent: showVideoTutorialContent,
                    showWrittenTutorialContent: showWrittenTutorialContent,
                  })
                );
              }}
            />
          </form>
        </div>
        <EntityPreview
          entity={templateRecipe}
          entityType="recipe"
          type="preview"
        />
      </div>
      <div className={createToolStyles.createInterfaceComponentsContainer}>
        <SelectFormControl
          labelContent="Ingredients Used:"
          entityPropertyOptions={ingredientsIds}
          entityPropertyChosenOptions={
            (templateRecipe.ingredients as string[]) || []
          }
          entityTypeUsed="ingredient"
          onEntityPropertyValueChange={(id) =>
            handleUpdateArrayEntities(
              templateRecipe.ingredients as string[],
              id,
              "ingredients"
            )
          }
          areOptionsLoading={loadingGetUserIngredients === "PENDING"}
        />
        <SelectFormControl
          labelContent="Utensils Used:"
          entityPropertyOptions={utensilsIds}
          entityPropertyChosenOptions={
            (templateRecipe.utensils as string[]) || []
          }
          entityTypeUsed="utensil"
          onEntityPropertyValueChange={(id) =>
            handleUpdateArrayEntities(
              templateRecipe.utensils as string[],
              id,
              "utensils"
            )
          }
          areOptionsLoading={loadingGetUserUtensils === "PENDING"}
        />
      </div>
    </section>
  );
};

export default CreateRecipeInterface;
