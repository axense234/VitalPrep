// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
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
  selectLoadingGetProfile,
  selectProfile,
  selectTemplateImageUrl,
  setTemplateModalMessage,
} from "@/redux/slices/generalSlice";
import {
  getAllUserInstanceTemplates,
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
import WeekdayFormControl from "@/components/shared/form/WeekdayFormControl";

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
  const loadingProfile = useAppSelector(selectLoadingGetProfile);
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

  useEffect(() => {
    if (
      loadingGetUserInstanceTemplates === "IDLE" &&
      loadingProfile &&
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
  }, [loadingGetUserInstanceTemplates, loadingProfile]);

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

  console.log(templateMealPrepPlan.instanceTemplatesTimings);

  return (
    <section className={createToolStyles.createInterface}>
      <PopupModal hasBorder={false} modalType="form" />
      <h2>Create Meal Prep Plan</h2>
      <form className={createToolStyles.createInterfaceForm}>
        <TextFormControl
          direction="row"
          entityProperty={templateMealPrepPlan.name}
          labelColor="#DDD9D5"
          labelContent="Meal Prep Plan Name:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateMealPrepPlan({
                key: "name",
                value: e.target.value,
              })
            )
          }
          required={true}
          type="text"
          inputHeight={36}
          labelFontSize={28}
          backgroundColor="#42171C"
          border={"1.5px solid #120a06"}
          padding={16}
        />
        <ImageFormControl
          labelColor="#DDD9D5"
          labelContent="Meal Prep Plan Image:"
          direction="column"
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
                  imageFile: sourceOfImages?.target?.files[0] || sourceOfImages,
                })
              );
            }
          }}
          labelFontSize={28}
          backgroundColor="#42171C"
          border={"1.5px solid #120a06"}
          padding={16}
        />
        <TextFormControl
          direction="row"
          entityProperty={numberOfInstanceTemplates}
          labelColor="#DDD9D5"
          labelContent="Number of Instances Used:"
          onEntityPropertyValueChange={(e) =>
            dispatch(updateNumberOfInstanceTemplates(e.target.valueAsNumber))
          }
          required={true}
          type="number"
          inputHeight={36}
          labelFontSize={28}
          backgroundColor="#42171C"
          border={"1.5px solid #120a06"}
          padding={16}
        />
        {numberOfInstanceTemplates && numberOfInstanceTemplates > 0 ? (
          <div
            className={
              createToolStyles.createInterfaceDayTemplateRecipesContainer
            }
            style={{ backgroundColor: "#42171C" }}
          >
            <h3 style={{ color: "#DDD9D5" }}>Individual Instance Templates:</h3>
            <ul className={createToolStyles.createInterfaceDayTemplateRecipes}>
              {numberOfInstanceTemplatesIterable.map(
                (instanceTemplateOption) => {
                  return (
                    <li key={instanceTemplateOption.id}>
                      <SelectFormControl
                        labelColor="#DDD9D5"
                        labelContent={`Number #${instanceTemplateOption.id} Instance:`}
                        required={true}
                        entityPropertyOptions={instanceTemplatesIds}
                        entityPropertyChosenOptions={
                          (templateMealPrepPlan.instanceTemplates as string[]) ||
                          []
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
                        labelFontSize={28}
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
                        backgroundColor="#42171C"
                      />
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        ) : null}
        {numberOfInstanceTemplates && numberOfInstanceTemplates > 0 ? (
          <div
            className={
              createToolStyles.createInterfaceDayTemplateRecipesContainer
            }
            style={{ backgroundColor: "#42171C" }}
          >
            <h3 style={{ color: "#DDD9D5" }}>Meal Prep Timings:</h3>
            <ul className={createToolStyles.createInterfaceMealPrepPlanTimings}>
              {numberOfInstanceTemplatesIterable.map(
                (instanceTemplateOption) => {
                  return (
                    <li
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
                        fontSize={28}
                      />
                      <TextFormControl
                        direction="row"
                        entityProperty={
                          templateMealPrepPlan.instanceTemplatesTimings[
                            instanceTemplateOption.id - 1
                          ]?.sessionStartingTime
                        }
                        labelColor="#DDD9D5"
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
                        required={true}
                        type="time"
                        inputHeight={36}
                        labelFontSize={28}
                      />
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        ) : null}
        <PrimaryButton
          backgroundColor="#42171C"
          textColor="#DDD9D5"
          content="Create Meal Prep Plan"
          type="functional"
          fontSize={24}
          height={64}
          width={560}
          disabled={
            loadingCreateMealPrepPlan === "PENDING" ||
            loadingCloudinaryImage === "PENDING"
          }
          onClickFunction={(e) => onCreateMealPrepPlanSubmit(e)}
        />
      </form>
    </section>
  );
};

export default CreateMealPrepPlanInterface;
