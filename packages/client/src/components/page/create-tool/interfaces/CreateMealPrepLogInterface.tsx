// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// Types
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
// React
import React, { ChangeEvent } from "react";
// Data
import { defaultMealPrepLogImageUrl } from "@/data";
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
  createMealPrepLog,
  selectLoadingCreateMealPrepLog,
  selectMealPrepLogFormModalErrorMessage,
  selectTemplateMealPrepLog,
  updateLoadingCreateMealPrepLog,
  updateTemplateMealPrepLog,
} from "@/redux/slices/mealPrepLogsSlice";
import { State } from "@/redux/api/store";
// Hooks and helpers
import selectEntityById from "@/helpers/selectEntityById";
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import handleToggleEntityProperty from "@/helpers/handleToggleEntityProperty";
import useUpdateEntityMacrosBasedOnComponent from "@/hooks/useUpdateEntityMacrosBasedOnComponent";
import handleOnCreateMealPrepLogSubmit from "@/helpers/handleOnCreateMealPrepLogSubmit";

const CreateMealPrepLogInterface = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const mealPrepLogFormModalErrorMessage = useAppSelector(
    selectMealPrepLogFormModalErrorMessage
  );

  const templateMealPrepLog = useAppSelector(selectTemplateMealPrepLog);

  const instanceTemplatesIds = useAppSelector(selectAllInstanceTemplatesIds);
  const instanceTemplateChosen = useAppSelector(
    (state: State) =>
      selectEntityById(
        state,
        templateMealPrepLog?.instanceTemplateId || "",
        "instanceTemplate"
      ) as InstanceTemplateTemplate
  );

  const loadingCreateMealPrepLog = useAppSelector(
    selectLoadingCreateMealPrepLog
  );
  const loadingGetUserInstanceTemplates = useAppSelector(
    selectLoadingGetUserInstanceTemplates
  );
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  useUpdateEntityMacrosBasedOnComponent(
    instanceTemplateChosen,
    updateTemplateMealPrepLog
  );
  useGetEntityComponents(
    loadingGetUserInstanceTemplates,
    getAllUserInstanceTemplates
  );
  useShowCreatedEntity(
    loadingCreateMealPrepLog,
    `Successfully added Meal Prep Log: ${templateMealPrepLog.name}.`,
    mealPrepLogFormModalErrorMessage,
    updateLoadingCreateMealPrepLog
  );
  useUpdateEntityTemplateImageUrl(updateTemplateMealPrepLog);

  console.log(templateMealPrepLog.instanceTemplate);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Meal Prep Log</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateMealPrepLog.name}
              labelContent="Meal Prep Log Name:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateMealPrepLog({
                    key: "name",
                    value: e.target.value,
                  })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent="Meal Prep Log Image:"
              defaultImageUsedUrl={defaultMealPrepLogImageUrl}
              entityPropertyLoadingStatus={loadingCloudinaryImage}
              entityProperty={templateMealPrepLog.imageUrl as string}
              onEntityPropertyValueChange={(
                sourceOfImages: ChangeEvent<HTMLInputElement>
              ) => {
                if (sourceOfImages?.target.files) {
                  dispatch(
                    createCloudinaryImage({
                      entity: "mealPrepLogs",
                      imageFile:
                        sourceOfImages?.target?.files[0] || sourceOfImages,
                    })
                  );
                }
              }}
            />
            <TextFormControl
              entityProperty={templateMealPrepLog.date}
              labelContent="Meal Prep Log Date:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateMealPrepLog({
                    key: "date",
                    value: e.target.value,
                  })
                )
              }
              type="date"
            />
            <CheckboxFormControl
              labelContent="Completed?:"
              entityProperty={String(templateMealPrepLog.completed)}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateMealPrepLog({
                    key: "completed",
                    value: e.target.value === "true" ? false : true,
                  })
                )
              }
            />
            <TextFormControl
              entityProperty={templateMealPrepLog.cookingDuration}
              labelContent="Cooking Duration:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateMealPrepLog({
                    key: "cookingDuration",
                    value: e.target.valueAsNumber,
                  })
                )
              }
              type="number"
            />
            <PrimaryButton
              content="Add Meal Prep Log"
              type="functional"
              disabled={
                loadingCreateMealPrepLog === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) =>
                handleOnCreateMealPrepLogSubmit(
                  e,
                  templateMealPrepLog,
                  profile.id,
                  dispatch
                )
              }
            />
          </form>
        </div>
        <EntityPreview
          entity={templateMealPrepLog}
          entityType="mealPrepLog"
          type="preview"
        />
      </div>
      <div className={createToolStyles.createInterfaceComponentsContainer}>
        <SelectFormControl
          labelContent="Instance Template Used:"
          entityPropertyOptions={instanceTemplatesIds}
          entityPropertyChosenOptions={
            templateMealPrepLog.instanceTemplateId as string
          }
          entityTypeUsed="instanceTemplate"
          onEntityPropertyValueChange={(id) =>
            handleToggleEntityProperty(
              templateMealPrepLog.instanceTemplateId === id,
              updateTemplateMealPrepLog,
              "instanceTemplateId",
              id,
              dispatch
            )
          }
          areOptionsLoading={loadingGetUserInstanceTemplates === "PENDING"}
          canSelectMultipleEntities={false}
        />
      </div>
    </section>
  );
};

export default CreateMealPrepLogInterface;
