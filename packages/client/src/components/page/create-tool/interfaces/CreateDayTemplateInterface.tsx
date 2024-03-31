// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Data
import {
  defaultCreateDayTemplateImageUrls,
  defaultDayTemplateImageUrl,
} from "@/data";
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
// React
import { ChangeEvent, useEffect, useRef } from "react";
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
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import {
  getAllUserRecipes,
  selectAllRecipesIds,
  selectLoadingGetUserRecipes,
} from "@/redux/slices/recipesSlice";

const CreateDayTemplateInterface = () => {
  const dispatch = useAppDispatch();
  const hasEffectRun = useRef(false);
  const templateDayTemplate = useAppSelector(selectTemplateDayTemplate);
  const profile = useAppSelector(selectProfile);

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
  const dayTemplateFormModalErrorMessage = useAppSelector(
    selectDayTemplateFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  const loadingProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetUserRecipes = useAppSelector(selectLoadingGetUserRecipes);

  const handleUpdateArrayEntities = (
    entityIds: string[] = [],
    entityId: string,
    entityType: "ingredients" | "utensils" | "recipes"
  ) => {
    if (entityIds?.find((id) => id === entityId)) {
      dispatch(
        updateTemplateDayTemplate({
          key: entityType,
          value: entityIds.filter((id) => id !== entityId),
        })
      );
    } else {
      dispatch(
        updateTemplateDayTemplate({
          key: entityType,
          value: [entityId],
        })
      );
    }
  };

  useEffect(() => {
    if (
      loadingGetUserRecipes === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(getAllUserRecipes(profile.id));
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

  return (
    <section className={createToolStyles.createInterface}>
      <PopupModal hasBorder={false} modalType="form" />
      <h2>Create Day Template</h2>
      <form className={createToolStyles.createInterfaceForm}>
        <TextFormControl
          direction="row"
          entityProperty={templateDayTemplate.name}
          labelColor="#120A06"
          labelContent="Day Template Name:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateDayTemplate({ key: "name", value: e.target.value })
            )
          }
          required={true}
          type="text"
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Day Template Image:"
          direction="column"
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
                  imageFile: sourceOfImages?.target?.files[0] || sourceOfImages,
                })
              );
            }
          }}
          onEntityPropertyOptionSelected={(imageUrl) => {
            dispatch(
              updateTemplateDayTemplate({ key: "imageUrl", value: imageUrl })
            );
          }}
          labelFontSize={28}
          imageUrlOptions={defaultCreateDayTemplateImageUrls}
        />
        <TextFormControl
          direction="row"
          entityProperty={numberOfMeals}
          labelColor="#120A06"
          labelContent="Number of Meals:"
          onEntityPropertyValueChange={(e) =>
            dispatch(updateNumberOfMeals(e.target.valueAsNumber))
          }
          required={true}
          type="number"
          inputHeight={36}
          labelFontSize={28}
        />
        {numberOfMeals > 0 && (
          <div
            className={
              createToolStyles.createInterfaceDayTemplateRecipesContainer
            }
          >
            <h3>Recipes:</h3>
            <ul className={createToolStyles.createInterfaceDayTemplateRecipes}>
              {numberOfMealsIterable.map((mealOption) => {
                return (
                  <li key={mealOption.id}>
                    <SelectFormControl
                      labelColor="#120A06"
                      labelContent={`Meal #${mealOption.id}:`}
                      required={true}
                      entityPropertyOptions={recipesIds}
                      entityPropertyChosenOptions={
                        templateDayTemplate.recipes || []
                      }
                      entityTypeUsed="recipe"
                      onEntityPropertyValueChange={(id) =>
                        handleUpdateArrayEntities(
                          templateDayTemplate.recipes,
                          id,
                          "recipes"
                        )
                      }
                      labelFontSize={28}
                      areOptionsLoading={loadingGetUserRecipes === "PENDING"}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <PrimaryButton
          backgroundColor="#013310"
          textColor="#DDD9D5"
          content="Create Day Template"
          type="functional"
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
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
    </section>
  );
};

export default CreateDayTemplateInterface;
