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
// React
import React, { ChangeEvent, useEffect, useRef } from "react";
// Data
import { defaultEntityQueryValues, defaultMealPrepLogImageUrl } from "@/data";
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
  createMealPrepLog,
  selectLoadingCreateMealPrepLog,
  selectMealPrepLogFormModalErrorMessage,
  selectTemplateMealPrepLog,
  updateLoadingCreateMealPrepLog,
  updateTemplateMealPrepLog,
} from "@/redux/slices/mealPrepLogsSlice";
import selectEntityById from "@/helpers/selectEntityById";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import { State } from "@/redux/api/store";

const CreateMealPrepLogInterface = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const mealPrepLogFormModalErrorMessage = useAppSelector(
    selectMealPrepLogFormModalErrorMessage
  );
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  const templateMealPrepLog = useAppSelector(selectTemplateMealPrepLog);

  const instanceTemplatesIds = useAppSelector(selectAllInstanceTemplatesIds);
  const instanceTemplateChosen = useAppSelector((state: State) =>
    selectEntityById(
      state,
      templateMealPrepLog?.instanceTemplateId || "",
      "instanceTemplate"
    )
  );

  const loadingCreateMealPrepLog = useAppSelector(
    selectLoadingCreateMealPrepLog
  );
  const loadingGetUserInstanceTemplates = useAppSelector(
    selectLoadingGetUserInstanceTemplates
  );
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  const handleUpdateArrayEntities = (entityId: string) => {
    if (templateMealPrepLog.instanceTemplateId === entityId) {
      dispatch(
        updateTemplateMealPrepLog({
          key: "instanceTemplateId",
          value: "",
        })
      );
    } else {
      dispatch(
        updateTemplateMealPrepLog({
          key: "instanceTemplateId",
          value: entityId,
        })
      );
    }
  };

  const onCreateMealPrepLogSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      createMealPrepLog({
        templateMealPrepLog: {
          ...templateMealPrepLog,
          date:
            (new Date(
              templateMealPrepLog.date as Date
            ).toISOString() as unknown as Date) || new Date().toISOString(),
        },
        userId: profile.id,
      })
    );
  };

  useEffect(() => {
    if (instanceTemplateChosen) {
      dispatch(
        updateTemplateMealPrepLog({
          key: "macros",
          value: (instanceTemplateChosen as InstanceTemplateTemplate)?.macros,
        })
      );
    }
  }, [instanceTemplateChosen]);

  useEffect(() => {
    if (loadingGetUserInstanceTemplates === "IDLE" && profile.id) {
      console.log(profile);
      dispatch(
        getAllUserInstanceTemplates({
          userId: profile.id,
          entityQueryValues: defaultEntityQueryValues,
        })
      );
    }
  }, [loadingGetUserInstanceTemplates, profile.id]);

  useEffect(() => {
    if (loadingCreateMealPrepLog === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully added Meal Prep Log: ${templateMealPrepLog.name}.`
        )
      );
    } else if (loadingCreateMealPrepLog === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(mealPrepLogFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateMealPrepLog("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateMealPrepLog]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateMealPrepLog({
          key: "imageUrl",
          value: templateImageUrl,
        })
      );
    }
  }, [loadingCloudinaryImage]);

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
              onClickFunction={(e) => onCreateMealPrepLogSubmit(e)}
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
          onEntityPropertyValueChange={(id) => handleUpdateArrayEntities(id)}
          areOptionsLoading={loadingGetUserInstanceTemplates === "PENDING"}
          canSelectMultipleEntities={false}
        />
      </div>
    </section>
  );
};

export default CreateMealPrepLogInterface;
