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
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
// React
import React, { ChangeEvent, useEffect, useRef } from "react";
// Data
import { defaultEntityQueryValues, defaultMealPrepPlanImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
  selectTemplateImageUrl,
  setTemplateModalMessage,
} from "@/redux/slices/generalSlice";
import {
  getAllUserInstanceTemplates,
  selectAllInstanceTemplates,
  selectAllInstanceTemplatesIds,
  selectLoadingGetUserInstanceTemplates,
} from "@/redux/slices/instanceTemplatesSlice";
import {
  createMealPrepPlan,
  selectLoadingCreateMealPrepPlan,
  selectMealPrepPlanFormModalErrorMessage,
  selectMealPrepPlanTemplate,
  selectNumberOfInstanceTemplates,
  updateInstanceTemplatesTiming,
  updateLoadingCreateMealPrepPlan,
  updateNumberOfInstanceTemplates,
  updateTemplateMealPrepPlan,
} from "@/redux/slices/mealPrepPlansSlice";

// Helpers
import calculateEntityMacrosBasedOnComponents from "@/helpers/calculateEntityMacrosBasedOnComponents";

const CreateMealPrepPlanInterface = () => {
  const dispatch = useAppDispatch();
  const hasEffectRun = useRef(false);
  const profile = useAppSelector(selectProfile);
  const mealPrepPlanFormModalErrorMessage = useAppSelector(
    selectMealPrepPlanFormModalErrorMessage
  );
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

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

  const numberOfInstanceTemplatesIterable = Array.from(
    { length: numberOfInstanceTemplates || 0 },
    (_, index) => ({
      id: index + 1,
    })
  );

  const onCreateMealPrepPlanSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      numberOfInstanceTemplates !==
      templateMealPrepPlan.instanceTemplatesTimings.length
    ) {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(
        setTemplateModalMessage("Please verify the Meal Prep Plan Timings!")
      );
    } else if (
      numberOfInstanceTemplates ===
      templateMealPrepPlan.instanceTemplatesTimings.length
    ) {
      dispatch(
        createMealPrepPlan({
          templateMealPrepPlan: templateMealPrepPlan,
          userId: profile.id,
        })
      );
    }
  };

  const handleUpdateArrayEntities = (
    entityIds: string[] = [],
    entityId: string,
    entityIndex: number,
    entityType:
      | "ingredients"
      | "utensils"
      | "recipes"
      | "dayTemplates"
      | "instanceTemplates"
  ) => {
    if (
      entityIds?.find((id) => id === entityId) &&
      templateMealPrepPlan.instanceTemplates[entityIndex] === entityId
    ) {
      const newEntityIds = [...entityIds];
      newEntityIds[entityIndex] = "";
      dispatch(
        updateTemplateMealPrepPlan({
          key: entityType,
          value: newEntityIds,
        })
      );
    } else {
      const newEntityIds = [...entityIds];
      newEntityIds[entityIndex] = entityId;
      dispatch(
        updateTemplateMealPrepPlan({
          key: entityType,
          value: newEntityIds,
        })
      );
    }
  };

  const instanceTemplatesBasedOnInstanceTemplateIds = useAppSelector(
    selectAllInstanceTemplates
  ).filter((instanceTemplate) => {
    return templateMealPrepPlan.instanceTemplates.find(
      (tmppInstanceTemplateId) => tmppInstanceTemplateId === instanceTemplate.id
    );
  }) as InstanceTemplateTemplate[];

  useEffect(() => {
    dispatch(
      updateTemplateMealPrepPlan({
        key: "macros",
        value: calculateEntityMacrosBasedOnComponents(
          instanceTemplatesBasedOnInstanceTemplateIds.map(
            (instanceTemplate: InstanceTemplateTemplate) =>
              instanceTemplate?.macros
          )
        ),
      })
    );
  }, [templateMealPrepPlan.instanceTemplates]);

  useEffect(() => {
    if (
      loadingGetUserInstanceTemplates === "IDLE" &&
      profile.id &&
      !hasEffectRun.current
    ) {
      dispatch(
        getAllUserInstanceTemplates({
          userId: profile.id,
          entityQueryValues: defaultEntityQueryValues,
        })
      );
    }
    hasEffectRun.current = true;
  }, [loadingGetUserInstanceTemplates, profile.id]);

  useEffect(() => {
    if (loadingCreateMealPrepPlan === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully created Meal Prep Plan: ${templateMealPrepPlan.name}.`
        )
      );
    } else if (loadingCreateMealPrepPlan === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(mealPrepPlanFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateMealPrepPlan("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateMealPrepPlan]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateMealPrepPlan({
          key: "imageUrl",
          value: templateImageUrl,
        })
      );
    }
  }, [loadingCloudinaryImage]);

  useEffect(() => {
    if (numberOfInstanceTemplates > 0) {
      dispatch(
        updateTemplateMealPrepPlan({
          key: "instanceTemplates",
          value: templateMealPrepPlan.instanceTemplates.slice(
            0,
            numberOfInstanceTemplates
          ),
        })
      );
    }
  }, [numberOfInstanceTemplates]);

  console.log(templateMealPrepPlan.instanceTemplatesTimings);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Meal Prep Plan</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateMealPrepPlan.name}
              labelContent="Meal Prep Plan Name:"
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
              labelContent="Meal Prep Plan Image:"
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
              labelContent="Number of Instances Used:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateNumberOfInstanceTemplates(e.target.valueAsNumber)
                )
              }
              type="number"
            />
            <PrimaryButton
              content="Create Meal Prep Plan"
              type="functional"
              disabled={
                loadingCreateMealPrepPlan === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => onCreateMealPrepPlanSubmit(e)}
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
          <h4>Individual Instance Templates:</h4>
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
                    labelContent={`Number #${instanceTemplateOption.id} Instance:`}
                    entityPropertyOptions={instanceTemplatesIds}
                    entityPropertyChosenOptions={
                      (templateMealPrepPlan.instanceTemplates as string[]) || []
                    }
                    entityTypeUsed="instanceTemplate"
                    onEntityPropertyValueChange={(id) =>
                      handleUpdateArrayEntities(
                        templateMealPrepPlan.instanceTemplates as string[],
                        id,
                        instanceTemplateOption.id - 1,
                        "instanceTemplates"
                      )
                    }
                    areOptionsLoading={
                      loadingGetUserInstanceTemplates === "PENDING"
                    }
                    showEntityExtraCondition={(id) => {
                      return (
                        templateMealPrepPlan.instanceTemplates[
                          instanceTemplateOption.id - 1
                        ] === id
                      );
                    }}
                  />
                  <div
                    key={instanceTemplateOption.id}
                    className={
                      createToolStyles.createInterfaceMealPrepPlanTimingContainer
                    }
                  >
                    <WeekdayFormControl
                      labelContent="Weekday:"
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
                      labelContent="Session Starting Time:"
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
