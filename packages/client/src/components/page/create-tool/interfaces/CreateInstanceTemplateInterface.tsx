// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Data
import { defaultInstanceTemplateImageUrl } from "@/data";
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
  selectAllDayTemplatesIds,
  selectLoadingGetUserDayTemplates,
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

  useEffect(() => {
    if (
      loadingGetUserDayTemplates === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(getAllUserDayTemplates(profile.id));
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

  return (
    <section className={createToolStyles.createInterface}>
      <PopupModal hasBorder={false} modalType="form" />
      <h2>Create Instance Template</h2>
      <form className={createToolStyles.createInterfaceForm}>
        <TextFormControl
          direction="row"
          entityProperty={templateInstanceTemplate.name}
          labelColor="#120A06"
          labelContent="Instance Template Name:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateInstanceTemplate({
                key: "name",
                value: e.target.value,
              })
            )
          }
          required={true}
          type="text"
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Instance Template Image:"
          direction="column"
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
                  imageFile: sourceOfImages?.target?.files[0] || sourceOfImages,
                })
              );
            }
          }}
          labelFontSize={28}
        />
        <TextFormControl
          direction="row"
          entityProperty={templateInstanceTemplate.coverage}
          labelColor="#120A06"
          labelContent="Number of Days Covered:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateInstanceTemplate({
                key: "coverage",
                value: e.target.valueAsNumber,
              })
            )
          }
          required={true}
          type="number"
          inputHeight={36}
          labelFontSize={28}
        />
        {templateInstanceTemplate.coverage &&
          templateInstanceTemplate.coverage > 0 && (
            <div
              className={
                createToolStyles.createInterfaceDayTemplateRecipesContainer
              }
            >
              <h3>Individual Day Templates:</h3>
              <ul
                className={createToolStyles.createInterfaceDayTemplateRecipes}
              >
                {numberOfDaysIterable.map((dayOption) => {
                  return (
                    <li key={dayOption.id}>
                      <SelectFormControl
                        labelColor="#120A06"
                        labelContent={`Day #${dayOption.id}:`}
                        required={true}
                        entityPropertyOptions={dayTemplatesIds}
                        entityPropertyChosenOptions={
                          templateInstanceTemplate.dayTemplates || []
                        }
                        entityTypeUsed="dayTemplate"
                        onEntityPropertyValueChange={(id) =>
                          handleUpdateArrayEntities(
                            templateInstanceTemplate.dayTemplates,
                            id,
                            dayOption.id - 1,
                            "dayTemplates"
                          )
                        }
                        labelFontSize={28}
                        areOptionsLoading={
                          loadingGetUserDayTemplates === "PENDING"
                        }
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
          )}
        <PrimaryButton
          backgroundColor="#012433"
          textColor="#DDD9D5"
          content="Create Instance Template"
          type="functional"
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
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
    </section>
  );
};

export default CreateInstanceTemplateInterface;
