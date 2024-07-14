// SCSS
import createToolStyles from "@/scss/pages/CreateTool.module.scss";
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
  defaultTemplateDayTemplate,
} from "@/data";
// React
import { ChangeEvent, FC } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectDayTemplateFormModalErrorMessage,
  selectTemplateDayTemplate,
  selectNumberOfMeals,
  selectLoadingCreateDayTemplate,
  selectLoadingUpdateDayTemplate,
  selectLoadingGetUserDayTemplate,
} from "@/redux/slices/dayTemplates/selectors";
import {
  updateLoadingCreateDayTemplate,
  updateLoadingUpdateDayTemplate,
  setTemplateDayTemplate,
  updateTemplateDayTemplate,
  updateNumberOfMeals,
} from "@/redux/slices/dayTemplates/slice";
import {
  createDayTemplate,
  updateDayTemplate,
} from "@/redux/slices/dayTemplates/thunks";
import {
  selectProfile,
  selectLoadingCloudinaryImage,
} from "@/redux/slices/general/selectors";
import { createCloudinaryImage } from "@/redux/slices/general/thunks";
import {
  selectAllRecipesIds,
  selectLoadingGetUserRecipes,
  selectAllRecipes,
} from "@/redux/slices/recipes/selectors";
import { getAllUserRecipes } from "@/redux/slices/recipes/thunks";
// Helpers and Hooks
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import useUpdateEntityMacrosBasedOnComponentEntities from "@/hooks/useUpdateEntityMacrosBasedOnComponentEntities";
import handleUpdateArrayEntities from "@/helpers/handleUpdateArrayEntities";
import useSliceEntityComponents from "@/hooks/useSliceEntityComponents";
import createArrayFromNumber from "@/helpers/createArrayFromNumber";
import useSetDefaultEntityName from "@/hooks/useSetDefaultEntityName";
import useSetTemplateEntity from "@/hooks/useSetTemplateEntity";
import useGetUpsertEntityInterfaceDetails from "@/hooks/useGetUpsertEntityInterfaceDetails";
import handleOnUpsertEntitySubmit from "@/helpers/handleOnUpsertEntitySubmit";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useParams } from "next/navigation";
// Types
import UpsertEntityInterfaceProps from "@/core/interfaces/entity/UpsertEntityInterfaceProps";

const UpsertDayTemplateInterface: FC<UpsertEntityInterfaceProps> = ({
  interfaceType,
}) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

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
  const loadingUpdateDayTemplate = useAppSelector(
    selectLoadingUpdateDayTemplate
  );
  const loadingGetDayTemplate = useAppSelector(selectLoadingGetUserDayTemplate);

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserRecipes = useAppSelector(selectLoadingGetUserRecipes);

  const translate = useTranslations("createTool.formLabels.dayTemplate");

  const handleOnUpsertEntity = (e: React.SyntheticEvent) => {
    handleOnUpsertEntitySubmit(
      e,
      interfaceType,
      () =>
        dispatch(
          createDayTemplate({
            templateDayTemplate,
            userId: profile.id,
          })
        ),
      () =>
        dispatch(
          updateDayTemplate({
            templateDayTemplate,
            userId: profile.id,
          })
        )
    );
  };

  const {
    loadingUpsertEntity,
    updateLoadingUpsertEntity,
    usedButtonLabel,
    usedSectionTitle,
  } = useGetUpsertEntityInterfaceDetails({
    interfaceType: interfaceType,
    loadingCreateEntity: loadingCreateDayTemplate,
    loadingUpdateEntity: loadingUpdateDayTemplate,
    translate: translate,
    updateLoadingCreateEntity: updateLoadingCreateDayTemplate,
    updateLoadingUpdateEntity: updateLoadingUpdateDayTemplate,
  });

  useSetTemplateEntity({
    defaultTemplateEntity: defaultTemplateDayTemplate,
    entityId: id as string,
    entityType: "dayTemplate",
    interfaceType: interfaceType,
    loadingGetEntity: loadingGetDayTemplate,
    setTemplateEntity: setTemplateDayTemplate,
  });

  useSetDefaultEntityName(
    () =>
      dispatch(
        updateTemplateDayTemplate({
          key: "name",
          value: translate("defaultNameValue"),
        })
      ),
    templateDayTemplate,
    interfaceType === "create"
  );

  useUpdateEntityMacrosBasedOnComponentEntities(
    selectAllRecipes,
    templateDayTemplate?.recipes as string[],
    updateTemplateDayTemplate
  );
  useGetEntityComponents(loadingGetUserRecipes, getAllUserRecipes);
  useShowCreatedEntity(
    loadingUpsertEntity,
    `Successfully ${interfaceType === "create" ? "created" : "updated"} day plan: ${templateDayTemplate.name}.`,
    dayTemplateFormModalErrorMessage,
    updateLoadingUpsertEntity
  );
  useUpdateEntityTemplateImageUrl(updateTemplateDayTemplate);
  useSliceEntityComponents(
    numberOfMeals,
    "recipes",
    updateTemplateDayTemplate,
    templateDayTemplate?.recipes as []
  );

  console.log(templateDayTemplate.recipes);

  return (
    <section className={createToolStyles.createInterface}>
      <h2>{usedSectionTitle}</h2>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>{translate("formTitle")}</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateDayTemplate.name || ""}
              labelContent={translate("name")}
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
              labelContent={translate("image")}
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
              labelContent={translate("nbOfEntities")}
              onEntityPropertyValueChange={(e) =>
                dispatch(updateNumberOfMeals(e.target.valueAsNumber))
              }
              type="number"
            />
            <PrimaryButton
              content={usedButtonLabel}
              type="functional"
              disabled={
                loadingCreateDayTemplate === "PENDING" ||
                loadingUpdateDayTemplate === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => handleOnUpsertEntity(e)}
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
          <h4>{translate("selectFormControlsLabels.componentsLabel")}</h4>
          <ul
            className={
              createToolStyles.createInterfaceMultipleComponentsSelectControls
            }
          >
            {numberOfMealsIterable.map((mealOption) => {
              return (
                <li key={mealOption.id}>
                  <SelectFormControl
                    labelContent={`${translate("selectFormControlsLabels.componentLabel")} #${mealOption.id}:`}
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

export default UpsertDayTemplateInterface;
