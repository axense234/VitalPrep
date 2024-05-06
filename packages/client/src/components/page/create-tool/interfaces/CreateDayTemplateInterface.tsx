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
  defaultEntityQueryValues,
} from "@/data";
// Types
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
// React
import { ChangeEvent, useEffect, useRef } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectLoadingGetProfile,
  selectProfile,
  selectTemplateImageUrl,
  setTemplateModalMessage,
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
// Helpers
import calculateEntityMacrosBasedOnComponents from "@/helpers/calculateEntityMacrosBasedOnComponents";

const CreateDayTemplateInterface = () => {
  const dispatch = useAppDispatch();
  const hasEffectRun = useRef(false);
  const profile = useAppSelector(selectProfile);
  const dayTemplateFormModalErrorMessage = useAppSelector(
    selectDayTemplateFormModalErrorMessage
  );
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  const templateDayTemplate = useAppSelector(selectTemplateDayTemplate);
  const recipesIds = useAppSelector(selectAllRecipesIds);

  const numberOfMeals = useAppSelector(selectNumberOfMeals);
  const numberOfMealsIterable = Array.from(
    { length: numberOfMeals },
    (_, index) => ({
      id: index + 1,
    })
  );

  const loadingCreateDayTemplate = useAppSelector(
    selectLoadingCreateDayTemplate
  );
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetUserRecipes = useAppSelector(selectLoadingGetUserRecipes);

  const handleUpdateArrayEntities = (
    entityIds: string[] = [],
    entityId: string,
    entityIndex: number,
    entityType: "ingredients" | "utensils" | "recipes"
  ) => {
    if (
      entityIds?.find((id) => id === entityId) &&
      templateDayTemplate.recipes[entityIndex] === entityId
    ) {
      const newEntityIds = [...entityIds];
      newEntityIds[entityIndex] = "";
      dispatch(
        updateTemplateDayTemplate({
          key: entityType,
          value: newEntityIds,
        })
      );
    } else {
      const newEntityIds = [...entityIds];
      newEntityIds[entityIndex] = entityId;
      dispatch(
        updateTemplateDayTemplate({
          key: entityType,
          value: newEntityIds,
        })
      );
    }
  };

  const recipesBasedOnRecipeIds = useAppSelector(selectAllRecipes).filter(
    (recipe) => {
      return templateDayTemplate.recipes.find(
        (tdtRecipeId) => tdtRecipeId === recipe.id
      );
    }
  ) as RecipeTemplate[];

  useEffect(() => {
    dispatch(
      updateTemplateDayTemplate({
        key: "macros",
        value: calculateEntityMacrosBasedOnComponents(
          recipesBasedOnRecipeIds.map(
            (recipe: RecipeTemplate) => recipe?.macros
          )
        ),
      })
    );
  }, [templateDayTemplate.recipes]);

  useEffect(() => {
    if (
      loadingGetUserRecipes === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(
        getAllUserRecipes({
          userId: profile.id,
          entityQueryValues: defaultEntityQueryValues,
        })
      );
    }
    hasEffectRun.current = true;
  }, [loadingGetUserRecipes, loadingProfile]);

  useEffect(() => {
    if (loadingCreateDayTemplate === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully created day template: ${templateDayTemplate.name}.`
        )
      );
    } else if (loadingCreateDayTemplate === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(dayTemplateFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateDayTemplate("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateDayTemplate]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateDayTemplate({ key: "imageUrl", value: templateImageUrl })
      );
    }
  }, [loadingCloudinaryImage]);

  useEffect(() => {
    if (numberOfMeals >= 1) {
      dispatch(
        updateTemplateDayTemplate({
          key: "recipes",
          value: templateDayTemplate.recipes.slice(0, numberOfMeals),
        })
      );
    }
  }, [numberOfMeals]);

  console.log(templateDayTemplate.recipes);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Day Template</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateDayTemplate.name}
              labelContent="Day Template Name:"
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
              labelContent="Day Template Image:"
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
              content="Create Day Template"
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
                        templateDayTemplate.recipes as string[],
                        id,
                        mealOption.id - 1,
                        "recipes"
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
