// SCSS
import createToolStyles from "@/scss/pages/CreateTool.module.scss";
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
import React, { ChangeEvent, FC } from "react";
// Data
import { defaultMealPrepLogImageUrl, defaultTemplateMealPrepLog } from "@/data";
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
  selectMealPrepLogFormModalErrorMessage,
  selectTemplateMealPrepLog,
  selectLoadingCreateMealPrepLog,
  selectLoadingUpdateMealPrepLog,
  selectLoadingGetUserMealPrepLog,
} from "@/redux/slices/mealPrepLogs/selectors";
import {
  updateLoadingCreateMealPrepLog,
  updateLoadingUpdateMealPrepLog,
  setTemplateMealPrepLog,
  updateTemplateMealPrepLog,
} from "@/redux/slices/mealPrepLogs/slice";
import { State } from "@/redux/api/store";
// Hooks and helpers
import selectEntityById from "@/helpers/selectEntityById";
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import handleToggleEntityProperty from "@/helpers/handleToggleEntityProperty";
import useUpdateEntityMacrosBasedOnComponent from "@/hooks/useUpdateEntityMacrosBasedOnComponent";
import handleOnCreateMealPrepLogSubmit from "@/helpers/handleOnCreateMealPrepLogSubmit";
import useSetDefaultEntityName from "@/hooks/useSetDefaultEntityName";
import useSetTemplateEntity from "@/hooks/useSetTemplateEntity";
import useGetUpsertEntityInterfaceDetails from "@/hooks/useGetUpsertEntityInterfaceDetails";
import handleOnUpsertEntitySubmit from "@/helpers/handleOnUpsertEntitySubmit";
import handleOnUpdateMealPrepLogSubmit from "@/helpers/handleOnUpdateMealPrepLogSubmit";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useParams } from "next/navigation";

const UpsertMealPrepLogInterface: FC<{
  interfaceType: "create" | "update";
}> = ({ interfaceType }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

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
  const loadingUpdateMealPrepLog = useAppSelector(
    selectLoadingUpdateMealPrepLog
  );
  const loadingGetMealPrepLog = useAppSelector(selectLoadingGetUserMealPrepLog);

  const loadingGetUserInstanceTemplates = useAppSelector(
    selectLoadingGetUserInstanceTemplates
  );
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  const translate = useTranslations("createTool.formLabels.mealPrepLog");

  const handleOnUpsertEntity = (e: React.SyntheticEvent) => {
    handleOnUpsertEntitySubmit(
      e,
      interfaceType,
      () =>
        handleOnCreateMealPrepLogSubmit(
          e,
          templateMealPrepLog,
          profile.id,
          dispatch
        ),
      () =>
        handleOnUpdateMealPrepLogSubmit(
          e,
          templateMealPrepLog,
          profile.id,
          dispatch
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
    loadingCreateEntity: loadingCreateMealPrepLog,
    loadingUpdateEntity: loadingUpdateMealPrepLog,
    translate: translate,
    updateLoadingCreateEntity: updateLoadingCreateMealPrepLog,
    updateLoadingUpdateEntity: updateLoadingUpdateMealPrepLog,
  });

  useSetTemplateEntity({
    defaultTemplateEntity: defaultTemplateMealPrepLog,
    entityId: id as string,
    entityType: "mealPrepLog",
    interfaceType: interfaceType,
    loadingGetEntity: loadingGetMealPrepLog,
    setTemplateEntity: setTemplateMealPrepLog,
  });

  useSetDefaultEntityName(
    () =>
      dispatch(
        updateTemplateMealPrepLog({
          key: "name",
          value: translate("defaultNameValue"),
        })
      ),
    templateMealPrepLog,
    interfaceType === "create"
  );

  useUpdateEntityMacrosBasedOnComponent(
    instanceTemplateChosen,
    updateTemplateMealPrepLog
  );
  useGetEntityComponents(
    loadingGetUserInstanceTemplates,
    getAllUserInstanceTemplates
  );
  useShowCreatedEntity(
    loadingUpsertEntity,
    `Successfully ${interfaceType === "create" ? "added" : "updated"} session log: ${templateMealPrepLog.name}.`,
    mealPrepLogFormModalErrorMessage,
    updateLoadingUpsertEntity
  );
  useUpdateEntityTemplateImageUrl(updateTemplateMealPrepLog);

  console.log(templateMealPrepLog.instanceTemplate);

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
                templateMealPrepLog.name || translate("defaultNameValue")
              }
              labelContent={translate("name")}
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
              labelContent={translate("image")}
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
              labelContent={translate("date")}
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
              labelContent={translate("completed")}
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
              labelContent={translate("cookingDuration")}
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
              content={usedButtonLabel}
              type="functional"
              disabled={
                loadingCreateMealPrepLog === "PENDING" ||
                loadingUpdateMealPrepLog === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => handleOnUpsertEntity(e)}
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
          labelContent={translate("selectFormControlsLabels.instanceTemplate")}
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

export default UpsertMealPrepLogInterface;
