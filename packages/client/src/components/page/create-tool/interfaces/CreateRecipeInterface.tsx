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
// Data
import { defaultUtensilImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllUserUtensils,
  selectAllUtensilsIds,
  selectLoadingGetUserUtensils,
} from "@/redux/slices/utensilsSlice";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
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
// Helpers and Hooks
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useUpdateEntityMacrosBasedOnComponentEntities from "@/hooks/useUpdateEntityMacrosBasedOnComponentEntities";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import handleUpdateMultipleArrayEntities from "@/helpers/handleUpdateMultipleArrayEntities";

const CreateRecipeInterface = () => {
  const dispatch = useAppDispatch();
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

  const ingredientsIds = useAppSelector(selectAllIngredientsIds);
  const utensilsIds = useAppSelector(selectAllUtensilsIds);

  const loadingCreateRecipe = useAppSelector(selectLoadingCreateRecipe);
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserUtensils = useAppSelector(selectLoadingGetUserUtensils);
  const loadingGetUserIngredients = useAppSelector(
    selectLoadingGetUserIngredients
  );

  useGetEntityComponents(loadingGetUserIngredients, getAllUserIngredients);
  useGetEntityComponents(loadingGetUserUtensils, getAllUserUtensils);
  useUpdateEntityMacrosBasedOnComponentEntities(
    selectAllIngredients,
    templateRecipe.ingredients as string[],
    updateTemplateRecipe
  );
  useShowCreatedEntity(
    loadingCreateRecipe,
    `Successfully created recipe: ${templateRecipe.name}.`,
    recipeFormModalErrorMessage,
    updateLoadingCreateRecipe
  );
  useUpdateEntityTemplateImageUrl(updateTemplateRecipe);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Recipe</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateRecipe.name}
              labelContent="Name:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateRecipe({ key: "name", value: e.target.value })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent="Image:"
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
            handleUpdateMultipleArrayEntities(
              templateRecipe.ingredients as string[],
              id,
              "ingredients",
              updateTemplateRecipe,
              dispatch
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
            handleUpdateMultipleArrayEntities(
              templateRecipe.utensils as string[],
              id,
              "utensils",
              updateTemplateRecipe,
              dispatch
            )
          }
          areOptionsLoading={loadingGetUserUtensils === "PENDING"}
        />
      </div>
    </section>
  );
};

export default CreateRecipeInterface;
