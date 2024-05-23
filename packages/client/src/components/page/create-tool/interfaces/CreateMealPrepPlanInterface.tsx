// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import WeekdayFormControl from "@/components/shared/form/WeekdayFormControl";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// React
import React, { ChangeEvent, useEffect } from "react";
// Data
import { defaultMealPrepPlanImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
} from "@/redux/slices/generalSlice";
import {
  getAllUserInstanceTemplates,
  selectAllInstanceTemplatesIds,
  selectLoadingGetUserInstanceTemplates,
} from "@/redux/slices/instanceTemplatesSlice";
import {
  selectAllMealPrepPlans,
  selectLoadingCreateMealPrepPlan,
  selectMealPrepPlanFormModalErrorMessage,
  selectMealPrepPlanTemplate,
  selectNumberOfInstanceTemplates,
  updateInstanceTemplatesTiming,
  updateLoadingCreateMealPrepPlan,
  updateNumberOfInstanceTemplates,
  updateTemplateMealPrepPlan,
} from "@/redux/slices/mealPrepPlansSlice";
// Hooks
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useUpdateEntityMacrosBasedOnComponentEntities from "@/hooks/useUpdateEntityMacrosBasedOnComponentEntities";
import useSliceEntityComponents from "@/hooks/useSliceEntityComponents";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import handleUpdateArrayEntities from "@/helpers/handleUpdateArrayEntities";
import handleOnCreateMealPrepPlanSubmit from "@/helpers/handleOnCreateMealPrepPlanSubmit";
import createArrayFromNumber from "@/helpers/createArrayFromNumber";
// Translations
import { useTranslations } from "next-intl";

const CreateMealPrepPlanInterface = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const mealPrepPlanFormModalErrorMessage = useAppSelector(
    selectMealPrepPlanFormModalErrorMessage
  );

  const numberOfInstanceTemplates = useAppSelector(
    selectNumberOfInstanceTemplates
  );

  const templateMealPrepPlan = useAppSelector(selectMealPrepPlanTemplate);
  const instanceTemplatesIds = useAppSelector(selectAllInstanceTemplatesIds);

  const loadingCreateMealPrepPlan = useAppSelector(
    selectLoadingCreateMealPrepPlan
  );
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserInstanceTemplates = useAppSelector(
    selectLoadingGetUserInstanceTemplates
  );

  const numberOfInstanceTemplatesIterable = createArrayFromNumber(
    numberOfInstanceTemplates
  );

  const translate = useTranslations("createTool.formLabels.mealPrepPlan");

  useUpdateEntityMacrosBasedOnComponentEntities(
    selectAllMealPrepPlans,
    templateMealPrepPlan.instanceTemplates as string[],
    updateTemplateMealPrepPlan
  );
  useUpdateEntityTemplateImageUrl(updateTemplateMealPrepPlan);
  useGetEntityComponents(
    loadingGetUserInstanceTemplates,
    getAllUserInstanceTemplates
  );
  useShowCreatedEntity(
    loadingCreateMealPrepPlan,
    `Successfully created Meal Prep Plan: ${templateMealPrepPlan.name}.`,
    mealPrepPlanFormModalErrorMessage,
    updateLoadingCreateMealPrepPlan
  );
  useSliceEntityComponents(
    numberOfInstanceTemplates,
    "instanceTemplates",
    updateTemplateMealPrepPlan,
    templateMealPrepPlan?.instanceTemplates as []
  );
  useSliceEntityComponents(
    numberOfInstanceTemplates,
    "instanceTemplatesTimings",
    updateTemplateMealPrepPlan,
    templateMealPrepPlan?.instanceTemplatesTimings as []
  );

  console.log(templateMealPrepPlan.instanceTemplatesTimings, "here");
  console.log(templateMealPrepPlan?.instanceTemplates as string[]);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>{translate("formTitle")}</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateMealPrepPlan.name}
              labelContent={translate("name")}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateMealPrepPlan({
                    key: "name",
                    value: e.target.value,
                  })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent={translate("image")}
              defaultImageUsedUrl={defaultMealPrepPlanImageUrl}
              entityPropertyLoadingStatus={loadingCloudinaryImage}
              entityProperty={templateMealPrepPlan.imageUrl as string}
              onEntityPropertyValueChange={(
                sourceOfImages: ChangeEvent<HTMLInputElement>
              ) => {
                if (sourceOfImages?.target.files) {
                  dispatch(
                    createCloudinaryImage({
                      entity: "mealPrepPlans",
                      imageFile:
                        sourceOfImages?.target?.files[0] || sourceOfImages,
                    })
                  );
                }
              }}
            />
            <TextFormControl
              entityProperty={numberOfInstanceTemplates}
              labelContent={translate("nbOfEntities")}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateNumberOfInstanceTemplates(e.target.valueAsNumber)
                )
              }
              type="number"
            />
            <PrimaryButton
              content={translate("createButtonLabel")}
              type="functional"
              disabled={
                loadingCreateMealPrepPlan === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) =>
                handleOnCreateMealPrepPlanSubmit(
                  e,
                  templateMealPrepPlan,
                  numberOfInstanceTemplates,
                  profile.id,
                  dispatch
                )
              }
            />
          </form>
        </div>
        <EntityPreview
          entity={templateMealPrepPlan}
          entityType="mealPrepPlan"
          type="preview"
        />
      </div>
      {numberOfInstanceTemplates > 0 ? (
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
            {numberOfInstanceTemplatesIterable.map((instanceTemplateOption) => {
              return (
                <li
                  key={instanceTemplateOption.id}
                  className={
                    createToolStyles.createInterfaceMultipleComponentsSelectControlsListItem
                  }
                >
                  <SelectFormControl
                    labelContent={translate(
                      "selectFormControlsLabels.componentLabel",
                      { id: instanceTemplateOption.id }
                    )}
                    entityPropertyOptions={instanceTemplatesIds}
                    entityPropertyChosenOptions={
                      (templateMealPrepPlan.instanceTemplates as string[]) || []
                    }
                    entityTypeUsed="instanceTemplate"
                    onEntityPropertyValueChange={(id) =>
                      handleUpdateArrayEntities(
                        instanceTemplatesIds,
                        templateMealPrepPlan?.instanceTemplates as string[],
                        id,
                        instanceTemplateOption.id - 1,
                        "instanceTemplates",
                        updateTemplateMealPrepPlan,
                        dispatch
                      )
                    }
                    areOptionsLoading={
                      loadingGetUserInstanceTemplates === "PENDING"
                    }
                    showEntityExtraCondition={(id) => {
                      return templateMealPrepPlan?.instanceTemplates
                        ? templateMealPrepPlan.instanceTemplates[
                            instanceTemplateOption.id - 1
                          ] === id
                        : false;
                    }}
                  />
                  <div
                    key={instanceTemplateOption.id}
                    className={
                      createToolStyles.createInterfaceMealPrepPlanTimingContainer
                    }
                  >
                    <WeekdayFormControl
                      labelContent={translate(
                        "selectFormControlsLabels.weekdayLabel"
                      )}
                      onEntityPropertyValueChange={(weekday: string) =>
                        dispatch(
                          updateInstanceTemplatesTiming({
                            index: instanceTemplateOption.id - 1,
                            load: { key: "weekday", value: weekday },
                          })
                        )
                      }
                      currentEntityValue={
                        templateMealPrepPlan.instanceTemplatesTimings[
                          instanceTemplateOption.id - 1
                        ]?.weekday
                      }
                    />
                    <TextFormControl
                      entityProperty={
                        templateMealPrepPlan.instanceTemplatesTimings[
                          instanceTemplateOption.id - 1
                        ]?.sessionStartingTime
                      }
                      labelContent={translate(
                        "selectFormControlsLabels.timeLabel"
                      )}
                      onEntityPropertyValueChange={(e) =>
                        dispatch(
                          updateInstanceTemplatesTiming({
                            index: instanceTemplateOption.id - 1,
                            load: {
                              key: "sessionStartingTime",
                              value: e.target.value,
                            },
                          })
                        )
                      }
                      type="time"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
};

export default CreateMealPrepPlanInterface;
