// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Data
import {
  defaultEntityQueryValues,
  defaultInstanceTemplateImageUrl,
} from "@/data";
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
// React
import { ChangeEvent, useEffect, useRef } from "react";
import {
  getAllUserDayTemplates,
  selectAllDayTemplates,
  selectAllDayTemplatesIds,
  selectLoadingGetUserDayTemplates,
  updateTemplateDayTemplate,
} from "@/redux/slices/dayTemplatesSlice";
import SelectFormControl from "@/components/shared/form/SelectFormControl";
import {
  createInstanceTemplate,
  selectInstanceTemplateFormModalErrorMessage,
  selectLoadingCreateInstanceTemplate,
  selectTemplateInstanceTemplate,
  updateLoadingCreateInstanceTemplate,
  updateTemplateInstanceTemplate,
} from "@/redux/slices/instanceTemplatesSlice";
import EntityPreview from "@/components/shared/entity/EntityPreview";
import calculateEntityMacrosBasedOnComponents from "@/helpers/calculateEntityMacrosBasedOnComponents";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";

const CreateInstanceTemplateInterface = () => {
  const dispatch = useAppDispatch();
  const hasEffectRun = useRef(false);
  const profile = useAppSelector(selectProfile);
  const instanceTemplateFormModalErrorMessage = useAppSelector(
    selectInstanceTemplateFormModalErrorMessage
  );
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  const templateInstanceTemplate = useAppSelector(
    selectTemplateInstanceTemplate
  );
  const dayTemplatesIds = useAppSelector(selectAllDayTemplatesIds);

  const loadingCreateInstanceTemplate = useAppSelector(
    selectLoadingCreateInstanceTemplate
  );
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetUserDayTemplates = useAppSelector(
    selectLoadingGetUserDayTemplates
  );

  const numberOfDaysIterable = Array.from(
    { length: templateInstanceTemplate.coverage || 0 },
    (_, index) => ({
      id: index + 1,
    })
  );

  const handleUpdateArrayEntities = (
    entityIds: string[] = [],
    entityId: string,
    entityIndex: number,
    entityType: "ingredients" | "utensils" | "recipes" | "dayTemplates"
  ) => {
    if (
      entityIds?.find((id) => id === entityId) &&
      templateInstanceTemplate.dayTemplates[entityIndex] === entityId
    ) {
      const newEntityIds = [...entityIds];
      newEntityIds[entityIndex] = "";
      dispatch(
        updateTemplateInstanceTemplate({
          key: entityType,
          value: newEntityIds,
        })
      );
    } else {
      const newEntityIds = [...entityIds];
      newEntityIds[entityIndex] = entityId;
      dispatch(
        updateTemplateInstanceTemplate({
          key: entityType,
          value: newEntityIds,
        })
      );
    }
  };

  console.log(templateInstanceTemplate.dayTemplates);

  const dayTemplatesBasedOnDayTemplateIds = useAppSelector(
    selectAllDayTemplates
  ).filter((dayTemplate) => {
    return templateInstanceTemplate.dayTemplates.find(
      (titDayTemplateId) => titDayTemplateId === dayTemplate.id
    );
  }) as DayTemplateTemplate[];

  useEffect(() => {
    dispatch(
      updateTemplateInstanceTemplate({
        key: "macros",
        value: calculateEntityMacrosBasedOnComponents(
          dayTemplatesBasedOnDayTemplateIds.map(
            (dayTemplate: DayTemplateTemplate) => dayTemplate?.macros
          )
        ),
      })
    );
  }, [templateInstanceTemplate.dayTemplates]);

  useEffect(() => {
    if (
      loadingGetUserDayTemplates === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(
        getAllUserDayTemplates({
          userId: profile.id,
          entityQueryValues: defaultEntityQueryValues,
        })
      );
    }
    hasEffectRun.current = true;
  }, [loadingGetUserDayTemplates, loadingProfile]);

  useEffect(() => {
    if (loadingCreateInstanceTemplate === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully created instance template: ${templateInstanceTemplate.name}.`
        )
      );
    } else if (loadingCreateInstanceTemplate === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(instanceTemplateFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateInstanceTemplate("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateInstanceTemplate]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateInstanceTemplate({
          key: "imageUrl",
          value: templateImageUrl,
        })
      );
    }
  }, [loadingCloudinaryImage]);

  useEffect(() => {
    if (
      templateInstanceTemplate.coverage &&
      templateInstanceTemplate?.coverage >= 1
    ) {
      dispatch(
        updateTemplateInstanceTemplate({
          key: "dayTemplates",
          value: templateInstanceTemplate.dayTemplates.slice(
            0,
            templateInstanceTemplate.coverage
          ),
        })
      );
    }
  }, [templateInstanceTemplate.coverage]);

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
                        templateInstanceTemplate.dayTemplates as string[],
                        id,
                        dayOption.id - 1,
                        "dayTemplates"
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
