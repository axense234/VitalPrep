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
  defaultInstanceTemplateImageUrl,
  defaultTemplateInstanceTemplate,
} from "@/data";
// React
import { ChangeEvent, FC } from "react";
// Translations
import { useTranslations } from "next-intl";
// Next
import { useParams } from "next/navigation";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectAllDayTemplatesIds,
  selectLoadingGetUserDayTemplates,
  selectAllDayTemplates,
} from "@/redux/slices/dayTemplates/selectors";
import { getAllUserDayTemplates } from "@/redux/slices/dayTemplates/thunks";
import {
  selectProfile,
  selectLoadingCloudinaryImage,
} from "@/redux/slices/general/selectors";
import { createCloudinaryImage } from "@/redux/slices/general/thunks";
import {
  selectInstanceTemplateFormModalErrorMessage,
  selectTemplateInstanceTemplate,
  selectLoadingCreateInstanceTemplate,
  selectLoadingUpdateInstanceTemplate,
  selectLoadingGetUserInstanceTemplate,
} from "@/redux/slices/instanceTemplates/selectors";
import {
  updateLoadingCreateInstanceTemplate,
  updateLoadingUpdateInstanceTemplate,
  setTemplateInstanceTemplate,
  updateTemplateInstanceTemplate,
} from "@/redux/slices/instanceTemplates/slice";
import {
  createInstanceTemplate,
  updateInstanceTemplate,
} from "@/redux/slices/instanceTemplates/thunks";
// Hooks and Helpers
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import useUpdateEntityMacrosBasedOnComponentEntities from "@/hooks/useUpdateEntityMacrosBasedOnComponentEntities";
import handleUpdateArrayEntities from "@/helpers/handleUpdateArrayEntities";
import useSliceEntityComponents from "@/hooks/useSliceEntityComponents";
import createArrayFromNumber from "@/helpers/createArrayFromNumber";
import useSetTemplateEntity from "@/hooks/useSetTemplateEntity";
import useGetUpsertEntityInterfaceDetails from "@/hooks/useGetUpsertEntityInterfaceDetails";
import handleOnUpsertEntitySubmit from "@/helpers/handleOnUpsertEntitySubmit";
import useSetDefaultEntityName from "@/hooks/useSetDefaultEntityName";

const UpsertInstanceTemplateInterface: FC<{
  interfaceType: "create" | "update";
}> = ({ interfaceType }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const profile = useAppSelector(selectProfile);
  const instanceTemplateFormModalErrorMessage = useAppSelector(
    selectInstanceTemplateFormModalErrorMessage
  );

  const templateInstanceTemplate = useAppSelector(
    selectTemplateInstanceTemplate
  );
  const dayTemplatesIds = useAppSelector(selectAllDayTemplatesIds);

  const loadingCreateInstanceTemplate = useAppSelector(
    selectLoadingCreateInstanceTemplate
  );
  const loadingUpdateInstanceTemplate = useAppSelector(
    selectLoadingUpdateInstanceTemplate
  );
  const loadingGetInstanceTemplate = useAppSelector(
    selectLoadingGetUserInstanceTemplate
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserDayTemplates = useAppSelector(
    selectLoadingGetUserDayTemplates
  );

  const numberOfDaysIterable = createArrayFromNumber(
    templateInstanceTemplate?.coverage
  );

  const translate = useTranslations("createTool.formLabels.instanceTemplate");

  const handleOnUpsertEntity = (e: React.SyntheticEvent) => {
    handleOnUpsertEntitySubmit(
      e,
      interfaceType,
      () =>
        dispatch(
          createInstanceTemplate({
            templateInstanceTemplate,
            userId: profile.id,
          })
        ),
      () =>
        dispatch(
          updateInstanceTemplate({
            templateInstanceTemplate,
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
    loadingCreateEntity: loadingCreateInstanceTemplate,
    loadingUpdateEntity: loadingUpdateInstanceTemplate,
    translate: translate,
    updateLoadingCreateEntity: updateLoadingCreateInstanceTemplate,
    updateLoadingUpdateEntity: updateLoadingUpdateInstanceTemplate,
  });

  useSetTemplateEntity({
    defaultTemplateEntity: defaultTemplateInstanceTemplate,
    entityId: id as string,
    entityType: "instanceTemplate",
    interfaceType: interfaceType,
    loadingGetEntity: loadingGetInstanceTemplate,
    setTemplateEntity: setTemplateInstanceTemplate,
  });

  useSetDefaultEntityName(
    () =>
      dispatch(
        updateTemplateInstanceTemplate({
          key: "name",
          value: translate("defaultNameValue"),
        })
      ),
    templateInstanceTemplate,
    interfaceType === "create"
  );

  useUpdateEntityMacrosBasedOnComponentEntities(
    selectAllDayTemplates,
    templateInstanceTemplate?.dayTemplates as string[],
    updateTemplateInstanceTemplate
  );
  useGetEntityComponents(loadingGetUserDayTemplates, getAllUserDayTemplates);
  useShowCreatedEntity(
    loadingUpsertEntity,
    `Successfully ${interfaceType === "create" ? "created" : "updated"} session model: ${templateInstanceTemplate.name}.`,
    instanceTemplateFormModalErrorMessage,
    updateLoadingUpsertEntity
  );
  useUpdateEntityTemplateImageUrl(updateTemplateInstanceTemplate);
  useSliceEntityComponents(
    templateInstanceTemplate?.coverage as number,
    "dayTemplates",
    updateTemplateInstanceTemplate,
    templateInstanceTemplate?.dayTemplates as []
  );

  console.log(templateInstanceTemplate.dayTemplates);

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
                templateInstanceTemplate.name || translate("defaultNameValue")
              }
              labelContent={translate("name")}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateInstanceTemplate({
                    key: "name",
                    value: e.target.value,
                  })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent={translate("image")}
              defaultImageUsedUrl={defaultInstanceTemplateImageUrl}
              entityPropertyLoadingStatus={loadingCloudinaryImage}
              entityProperty={templateInstanceTemplate.imageUrl as string}
              onEntityPropertyValueChange={(
                sourceOfImages: ChangeEvent<HTMLInputElement>
              ) => {
                if (sourceOfImages?.target.files) {
                  dispatch(
                    createCloudinaryImage({
                      entity: "instanceTemplates",
                      imageFile:
                        sourceOfImages?.target?.files[0] || sourceOfImages,
                    })
                  );
                }
              }}
            />
            <TextFormControl
              entityProperty={templateInstanceTemplate.coverage}
              labelContent={translate("nbOfEntities")}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateInstanceTemplate({
                    key: "coverage",
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
                loadingCreateInstanceTemplate === "PENDING" ||
                loadingUpdateInstanceTemplate === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => handleOnUpsertEntity(e)}
            />
          </form>
        </div>
        <EntityPreview
          entity={templateInstanceTemplate}
          entityType="instanceTemplate"
          type="preview"
        />
      </div>
      {templateInstanceTemplate.coverage &&
      templateInstanceTemplate?.coverage > 0 ? (
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
            {numberOfDaysIterable.map((dayOption) => {
              return (
                <li
                  key={dayOption.id}
                  className={
                    createToolStyles.createInterfaceMultipleComponentsSelectControlsListItem
                  }
                >
                  <SelectFormControl
                    labelContent={`${translate("selectFormControlsLabels.componentLabel")} #${dayOption.id}:`}
                    entityPropertyOptions={dayTemplatesIds}
                    entityPropertyChosenOptions={
                      (templateInstanceTemplate.dayTemplates as string[]) || []
                    }
                    entityTypeUsed="dayTemplate"
                    onEntityPropertyValueChange={(id) =>
                      handleUpdateArrayEntities(
                        dayTemplatesIds,
                        templateInstanceTemplate?.dayTemplates as string[],
                        id,
                        dayOption.id - 1,
                        "dayTemplates",
                        updateTemplateInstanceTemplate,
                        dispatch
                      )
                    }
                    areOptionsLoading={loadingGetUserDayTemplates === "PENDING"}
                    showEntityExtraCondition={(id) => {
                      return (
                        templateInstanceTemplate.dayTemplates[
                          dayOption.id - 1
                        ] === id
                      );
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
};

export default UpsertInstanceTemplateInterface;
