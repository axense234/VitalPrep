// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// Data
import { defaultInstanceTemplateImageUrl } from "@/data";
// React
import { ChangeEvent } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getAllUserDayTemplates,
  selectAllDayTemplates,
  selectAllDayTemplatesIds,
  selectLoadingGetUserDayTemplates,
} from "@/redux/slices/dayTemplatesSlice";
import {
  createInstanceTemplate,
  selectInstanceTemplateFormModalErrorMessage,
  selectLoadingCreateInstanceTemplate,
  selectTemplateInstanceTemplate,
  updateLoadingCreateInstanceTemplate,
  updateTemplateInstanceTemplate,
} from "@/redux/slices/instanceTemplatesSlice";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
} from "@/redux/slices/generalSlice";
// Hooks
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import useUpdateEntityMacrosBasedOnComponentEntities from "@/hooks/useUpdateEntityMacrosBasedOnComponentEntities";
import handleUpdateArrayEntities from "@/helpers/handleUpdateArrayEntities";
import useSliceEntityComponents from "@/hooks/useSliceEntityComponents";
import createArrayFromNumber from "@/helpers/createArrayFromNumber";

const CreateInstanceTemplateInterface = () => {
  const dispatch = useAppDispatch();
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
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingGetUserDayTemplates = useAppSelector(
    selectLoadingGetUserDayTemplates
  );

  const numberOfDaysIterable = createArrayFromNumber(
    templateInstanceTemplate?.coverage
  );

  useUpdateEntityMacrosBasedOnComponentEntities(
    selectAllDayTemplates,
    templateInstanceTemplate?.dayTemplates as string[],
    updateTemplateInstanceTemplate
  );
  useGetEntityComponents(loadingGetUserDayTemplates, getAllUserDayTemplates);
  useShowCreatedEntity(
    loadingCreateInstanceTemplate,
    `Successfully created instance template: ${templateInstanceTemplate.name}.`,
    instanceTemplateFormModalErrorMessage,
    updateLoadingCreateInstanceTemplate
  );
  useUpdateEntityTemplateImageUrl(updateTemplateInstanceTemplate);
  useSliceEntityComponents(
    templateInstanceTemplate?.coverage as number,
    "dayTemplates",
    updateTemplateInstanceTemplate,
    templateInstanceTemplate?.dayTemplates as string[]
  );

  console.log(templateInstanceTemplate.dayTemplates);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Instance Template</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateInstanceTemplate.name}
              labelContent="Instance Template Name:"
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
              labelContent="Instance Template Image:"
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
              labelContent="Number of Days Covered:"
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
              content="Create Instance Template"
              type="functional"
              disabled={
                loadingCreateInstanceTemplate === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => {
                e.preventDefault();
                dispatch(
                  createInstanceTemplate({
                    templateInstanceTemplate: templateInstanceTemplate,
                    userId: profile.id,
                  })
                );
              }}
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
          <h4>Individual Day Templates:</h4>
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
                    labelContent={`Day #${dayOption.id}:`}
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

export default CreateInstanceTemplateInterface;
