// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// Data
import {
  defaultCreateDayTemplateImageUrls,
  defaultDayTemplateImageUrl,
} from "@/data";
// React
import { ChangeEvent } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
} from "@/redux/slices/generalSlice";
import {
  createDayTemplate,
  selectDayTemplateFormModalErrorMessage,
  selectLoadingCreateDayTemplate,
  selectNumberOfMeals,
  selectTemplateDayTemplate,
  updateLoadingCreateDayTemplate,
  updateNumberOfMeals,
  updateTemplateDayTemplate,
} from "@/redux/slices/dayTemplatesSlice";
import {
  getAllUserRecipes,
  selectAllRecipes,
  selectAllRecipesIds,
  selectLoadingGetUserRecipes,
} from "@/redux/slices/recipesSlice";
// Helpers and Hooks
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import useUpdateEntityMacrosBasedOnComponentEntities from "@/hooks/useUpdateEntityMacrosBasedOnComponentEntities";
import handleUpdateArrayEntities from "@/helpers/handleUpdateArrayEntities";
import useSliceEntityComponents from "@/hooks/useSliceEntityComponents";
import createArrayFromNumber from "@/helpers/createArrayFromNumber";

const CreateDayTemplateInterface = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const dayTemplateFormModalErrorMessage = useAppSelector(
    selectDayTemplateFormModalErrorMessage
  );

  const templateDayTemplate = useAppSelector(selectTemplateDayTemplate);
  const recipesIds = useAppSelector(selectAllRecipesIds);

  const numberOfMeals = useAppSelector(selectNumberOfMeals);
  const numberOfMealsIterable = createArrayFromNumber(numberOfMeals);

  const loadingCreateDayTemplate = useAppSelector(
    selectLoadingCreateDayTemplate
  );
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserRecipes = useAppSelector(selectLoadingGetUserRecipes);

  useUpdateEntityMacrosBasedOnComponentEntities(
    selectAllRecipes,
    templateDayTemplate?.recipes as string[],
    updateTemplateDayTemplate
  );
  useGetEntityComponents(loadingGetUserRecipes, getAllUserRecipes);
  useShowCreatedEntity(
    loadingCreateDayTemplate,
    `Successfully created day plan: ${templateDayTemplate.name}.`,
    dayTemplateFormModalErrorMessage,
    updateLoadingCreateDayTemplate
  );
  useUpdateEntityTemplateImageUrl(updateTemplateDayTemplate);
  useSliceEntityComponents(
    numberOfMeals,
    "recipes",
    updateTemplateDayTemplate,
    templateDayTemplate?.recipes as string[]
  );

  console.log(templateDayTemplate.recipes);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Day Plan</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateDayTemplate.name}
              labelContent="Name:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateDayTemplate({
                    key: "name",
                    value: e.target.value,
                  })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent="Image:"
              defaultImageUsedUrl={defaultDayTemplateImageUrl}
              entityPropertyLoadingStatus={loadingCloudinaryImage}
              entityProperty={templateDayTemplate.imageUrl as string}
              onEntityPropertyValueChange={(
                sourceOfImages: ChangeEvent<HTMLInputElement>
              ) => {
                if (sourceOfImages?.target.files) {
                  dispatch(
                    createCloudinaryImage({
                      entity: "dayTemplates",
                      imageFile:
                        sourceOfImages?.target?.files[0] || sourceOfImages,
                    })
                  );
                }
              }}
              onEntityPropertyOptionSelected={(imageUrl) => {
                dispatch(
                  updateTemplateDayTemplate({
                    key: "imageUrl",
                    value: imageUrl,
                  })
                );
              }}
              imageUrlOptions={defaultCreateDayTemplateImageUrls}
            />
            <TextFormControl
              entityProperty={numberOfMeals}
              labelContent="Number of Meals:"
              onEntityPropertyValueChange={(e) =>
                dispatch(updateNumberOfMeals(e.target.valueAsNumber))
              }
              type="number"
            />
            <PrimaryButton
              content="Create Day Plan"
              type="functional"
              disabled={
                loadingCreateDayTemplate === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => {
                e.preventDefault();
                dispatch(
                  createDayTemplate({
                    templateDayTemplate: templateDayTemplate,
                    userId: profile.id,
                  })
                );
              }}
            />
          </form>
        </div>
        <EntityPreview
          entity={templateDayTemplate}
          entityType="dayTemplate"
          type="preview"
        />
      </div>
      {numberOfMeals > 0 && (
        <div
          className={
            createToolStyles.createInterfaceMultipleComponentsContainer
          }
        >
          <h4>Recipes:</h4>
          <ul
            className={
              createToolStyles.createInterfaceMultipleComponentsSelectControls
            }
          >
            {numberOfMealsIterable.map((mealOption) => {
              return (
                <li key={mealOption.id}>
                  <SelectFormControl
                    labelContent={`Meal #${mealOption.id}:`}
                    entityPropertyOptions={recipesIds}
                    entityPropertyChosenOptions={
                      (templateDayTemplate.recipes as string[]) || []
                    }
                    entityTypeUsed="recipe"
                    onEntityPropertyValueChange={(id) =>
                      handleUpdateArrayEntities(
                        recipesIds,
                        templateDayTemplate?.recipes as string[],
                        id,
                        mealOption.id - 1,
                        "recipes",
                        updateTemplateDayTemplate,
                        dispatch
                      )
                    }
                    areOptionsLoading={loadingGetUserRecipes === "PENDING"}
                    showEntityExtraCondition={(id) => {
                      return (
                        templateDayTemplate.recipes[mealOption.id - 1] === id
                      );
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CreateDayTemplateInterface;
