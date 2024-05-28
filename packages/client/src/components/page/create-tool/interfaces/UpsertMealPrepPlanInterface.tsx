// SCSS
import createToolStyles from "@/scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import WeekdayFormControl from "@/components/shared/form/WeekdayFormControl";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// React
import React, { ChangeEvent, FC, useEffect } from "react";
// Data
import {
  defaultMealPrepPlanImageUrl,
  defaultTemplateMealPrepPlan,
} from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectProfile,
  selectLoadingCloudinaryImage,
} from "@/redux/slices/general/selectors";
import { createCloudinaryImage } from "@/redux/slices/general/thunks";
import {
  selectAllInstanceTemplatesIds,
  selectLoadingGetUserInstanceTemplates,
} from "@/redux/slices/instanceTemplates/selectors";
import { getAllUserInstanceTemplates } from "@/redux/slices/instanceTemplates/thunks";
import {
  selectMealPrepPlanFormModalErrorMessage,
  selectNumberOfInstanceTemplates,
  selectMealPrepPlanTemplate,
  selectLoadingCreateMealPrepPlan,
  selectLoadingUpdateMealPrepPlan,
  selectLoadingGetUserMealPrepPlan,
  selectAllMealPrepPlans,
} from "@/redux/slices/mealPrepPlans/selectors";
import {
  updateLoadingCreateMealPrepPlan,
  updateLoadingUpdateMealPrepPlan,
  setTemplateMealPrepPlan,
  updateTemplateMealPrepPlan,
  updateNumberOfInstanceTemplates,
  updateInstanceTemplatesTiming,
} from "@/redux/slices/mealPrepPlans/slice";
// Hooks and Helpers
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useUpdateEntityMacrosBasedOnComponentEntities from "@/hooks/useUpdateEntityMacrosBasedOnComponentEntities";
import useSliceEntityComponents from "@/hooks/useSliceEntityComponents";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import handleUpdateArrayEntities from "@/helpers/handleUpdateArrayEntities";
import handleOnCreateMealPrepPlanSubmit from "@/helpers/handleOnCreateMealPrepPlanSubmit";
import createArrayFromNumber from "@/helpers/createArrayFromNumber";
import useSetDefaultEntityName from "@/hooks/useSetDefaultEntityName";
import useGetUpsertEntityInterfaceDetails from "@/hooks/useGetUpsertEntityInterfaceDetails";
import handleOnUpsertEntitySubmit from "@/helpers/handleOnUpsertEntitySubmit";
import handleOnUpdateMealPrepPlanSubmit from "@/helpers/handleOnUpdateMealPrepPlanSubmit";
import useSetTemplateEntity from "@/hooks/useSetTemplateEntity";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useParams } from "next/navigation";

const UpsertMealPrepPlanInterface: FC<{
  interfaceType: "create" | "update";
}> = ({ interfaceType }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const profile = useAppSelector(selectProfile);
  const mealPrepPlanFormModalErrorMessage = useAppSelector(
    selectMealPrepPlanFormModalErrorMessage
  );

  const numberOfInstanceTemplates = useAppSelector(
    selectNumberOfInstanceTemplates
  );

  const templateMealPrepPlan = useAppSelector(selectMealPrepPlanTemplate);
  const instanceTemplatesIds = useAppSelector(selectAllInstanceTemplatesIds);

  console.log(templateMealPrepPlan);

  const loadingCreateMealPrepPlan = useAppSelector(
    selectLoadingCreateMealPrepPlan
  );
  const loadingUpdateMealPrepPlan = useAppSelector(
    selectLoadingUpdateMealPrepPlan
  );
  const loadingGetMealPrepPlan = useAppSelector(
    selectLoadingGetUserMealPrepPlan
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserInstanceTemplates = useAppSelector(
    selectLoadingGetUserInstanceTemplates
  );

  const translate = useTranslations("createTool.formLabels.mealPrepPlan");

  const numberOfInstanceTemplatesIterable = createArrayFromNumber(
    numberOfInstanceTemplates
  );
  console.log(templateMealPrepPlan.instanceTemplatesTimings);

  const handleOnUpsertEntity = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleOnUpsertEntitySubmit(
      e,
      interfaceType,
      () =>
        handleOnCreateMealPrepPlanSubmit({
          e,
          templateMealPrepPlan,
          numberOfInstanceTemplates,
          profileId: profile.id,
          dispatch,
        }),
      () =>
        handleOnUpdateMealPrepPlanSubmit({
          e,
          templateMealPrepPlan,
          numberOfInstanceTemplates,
          profileId: profile.id,
          dispatch,
        })
    );
  };

  const {
    loadingUpsertEntity,
    updateLoadingUpsertEntity,
    usedButtonLabel,
    usedSectionTitle,
  } = useGetUpsertEntityInterfaceDetails({
    interfaceType: interfaceType,
    loadingCreateEntity: loadingCreateMealPrepPlan,
    loadingUpdateEntity: loadingUpdateMealPrepPlan,
    translate: translate,
    updateLoadingCreateEntity: updateLoadingCreateMealPrepPlan,
    updateLoadingUpdateEntity: updateLoadingUpdateMealPrepPlan,
  });

  useSetTemplateEntity({
    defaultTemplateEntity: defaultTemplateMealPrepPlan,
    entityId: id as string,
    entityType: "mealPrepPlan",
    interfaceType: interfaceType,
    loadingGetEntity: loadingGetMealPrepPlan,
    setTemplateEntity: setTemplateMealPrepPlan,
  });

  useSetDefaultEntityName(
    () =>
      dispatch(
        updateTemplateMealPrepPlan({
          key: "name",
          value: translate("defaultNameValue"),
        })
      ),
    templateMealPrepPlan,
    interfaceType === "create"
  );

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
    loadingUpsertEntity,
    `Successfully ${interfaceType === "create" ? "created" : "updated"} meal prep plan: ${templateMealPrepPlan.name}.`,
    mealPrepPlanFormModalErrorMessage,
    updateLoadingUpsertEntity
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

  console.log(templateMealPrepPlan);

  return (
    <section className={createToolStyles.createInterface}>
      <h2>{usedSectionTitle}</h2>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>{translate("formTitle")}</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={
                templateMealPrepPlan.name || translate("defaultNameValue")
              }
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
              content={usedButtonLabel}
              type="functional"
              disabled={
                loadingCreateMealPrepPlan === "PENDING" ||
                loadingUpdateMealPrepPlan === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => {
                handleOnUpsertEntity(e);
              }}
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

export default UpsertMealPrepPlanInterface;
