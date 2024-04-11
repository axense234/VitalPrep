// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
// React
import { ChangeEvent, useEffect, useRef } from "react";
// Data
import { defaultMealPrepPlanImageUrl } from "@/data";
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
  updateLoadingCreateMealPrepPlan,
  updateNumberOfInstanceTemplates,
  updateTemplateMealPrepPlan,
} from "@/redux/slices/mealPrepPlansSlice";

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
      dispatch(getAllUserInstanceTemplates(profile.id));
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
                          templateMealPrepPlan.instanceTemplates || []
                        }
                        entityTypeUsed="instanceTemplate"
                        onEntityPropertyValueChange={(id) =>
                          handleUpdateArrayEntities(
                            templateMealPrepPlan.instanceTemplates,
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
            <h3 style={{ color: "#DDD9D5" }}>Meal Prep Timing:</h3>
            <ul className={createToolStyles.createInterfaceDayTemplateRecipes}>
              {numberOfInstanceTemplatesIterable.map(
                (instanceTemplateOption) => {
                  return (
                    <li key={instanceTemplateOption.id}>
                      <TextFormControl
                        direction="row"
                        entityProperty={
                          templateMealPrepPlan.instanceTemplatesTimings &&
                          templateMealPrepPlan.instanceTemplatesTimings[
                            instanceTemplateOption.id - 1
                          ] instanceof Date
                            ? templateMealPrepPlan.instanceTemplatesTimings[
                                instanceTemplateOption.id - 1
                              ]
                                .toISOString()
                                .slice(0, 16)
                            : ""
                        }
                        labelColor="#DDD9D5"
                        labelContent={`Number #${instanceTemplateOption.id} Instance Timing:`}
                        onEntityPropertyValueChange={(e) => {
                          const newInstanceTemplateTimings = [
                            ...(templateMealPrepPlan.instanceTemplatesTimings as Date[]),
                          ];

                          const newValue = e.target.value
                            ? new Date(e.target.value)
                            : new Date();

                          newInstanceTemplateTimings[
                            instanceTemplateOption.id - 1
                          ] = newValue;

                          dispatch(
                            updateTemplateMealPrepPlan({
                              key: "instanceTemplatesTimings",
                              value: newInstanceTemplateTimings,
                            })
                          );
                        }}
                        required={true}
                        type="datetime-local"
                        inputHeight={36}
                        labelFontSize={28}
                        backgroundColor="#012433"
                        border={"1.5px solid #120a06"}
                        padding={16}
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
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
          disabled={
            loadingCreateMealPrepPlan === "PENDING" ||
            loadingCloudinaryImage === "PENDING"
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(
              createMealPrepPlan({
                templateMealPrepPlan: templateMealPrepPlan,
                userId: profile.id,
              })
            );
          }}
        />
      </form>
    </section>
  );
};

export default CreateMealPrepPlanInterface;
