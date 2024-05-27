// SCSS
import createToolStyles from "@/scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// Translations
import { useTranslations } from "next-intl";
// React
import { FC } from "react";
// Next
import { useParams } from "next/navigation";
// Data
import { defaultTemplateUtensil, defaultUtensilImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectLoadingCreateUtensil,
  selectLoadingGetUserUtensil,
  selectLoadingUpdateUtensil,
  setTemplateUtensil,
  updateLoadingUpdateUtensil,
  updateUtensil,
} from "@/redux/slices/utensilsSlice";
import {
  createUtensil,
  selectTemplateUtensil,
  selectUtensilFormModalErrorMessage,
  updateLoadingCreateUtensil,
  updateTemplateUtensil,
} from "@/redux/slices/utensilsSlice";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
} from "@/redux/slices/generalSlice";
// Hooks and Helpers
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useSetDefaultEntityName from "@/hooks/useSetDefaultEntityName";
import useSetTemplateEntity from "@/hooks/useSetTemplateEntity";
import useGetUpsertEntityInterfaceDetails from "@/hooks/useGetUpsertEntityInterfaceDetails";
import handleOnUpsertEntitySubmit from "@/helpers/handleOnUpsertEntitySubmit";

const UpsertUtensilInterface: FC<{ interfaceType: "create" | "update" }> = ({
  interfaceType,
}) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const templateUtensil = useAppSelector(selectTemplateUtensil);
  const profile = useAppSelector(selectProfile);

  const loadingCreateUtensil = useAppSelector(selectLoadingCreateUtensil);
  const loadingUpdateUtensil = useAppSelector(selectLoadingUpdateUtensil);
  const loadingGetUtensil = useAppSelector(selectLoadingGetUserUtensil);

  const utensilFormModalErrorMessage = useAppSelector(
    selectUtensilFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  const translate = useTranslations("createTool.formLabels.utensil");

  const handleOnUpsertEntity = (e: React.SyntheticEvent) => {
    handleOnUpsertEntitySubmit(
      e,
      interfaceType,
      () =>
        dispatch(
          createUtensil({
            templateUtensil,
            userId: profile.id,
          })
        ),
      () =>
        dispatch(
          updateUtensil({
            templateUtensil,
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
    loadingCreateEntity: loadingCreateUtensil,
    loadingUpdateEntity: loadingUpdateUtensil,
    translate: translate,
    updateLoadingCreateEntity: updateLoadingCreateUtensil,
    updateLoadingUpdateEntity: updateLoadingUpdateUtensil,
  });

  useSetTemplateEntity({
    defaultTemplateEntity: defaultTemplateUtensil,
    entityId: id as string,
    entityType: "utensil",
    interfaceType: interfaceType,
    loadingGetEntity: loadingGetUtensil,
    setTemplateEntity: setTemplateUtensil,
  });

  useSetDefaultEntityName(
    () =>
      dispatch(
        updateTemplateUtensil({
          key: "name",
          value: translate("defaultNameValue"),
        })
      ),
    templateUtensil,
    interfaceType === "create"
  );

  useShowCreatedEntity(
    loadingUpsertEntity,
    `Successfully ${interfaceType === "create" ? "created" : "updated"} utensil: ${templateUtensil.name}.`,
    utensilFormModalErrorMessage,
    updateLoadingUpsertEntity
  );
  useUpdateEntityTemplateImageUrl(updateTemplateUtensil);

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
                templateUtensil.name || translate("defaultNameValue")
              }
              labelContent={translate("name")}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateUtensil({ key: "name", value: e.target.value })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent={translate("image")}
              defaultImageUsedUrl={defaultUtensilImageUrl}
              entityPropertyLoadingStatus={loadingCloudinaryImage}
              entityProperty={templateUtensil.imageUrl as string}
              onEntityPropertyValueChange={(e) => {
                if (e.target.files) {
                  dispatch(
                    createCloudinaryImage({
                      entity: "utensils",
                      imageFile: e.target.files[0],
                    })
                  );
                }
              }}
            />

            <PrimaryButton
              content={usedButtonLabel}
              type="functional"
              disabled={
                loadingCreateUtensil === "PENDING" ||
                loadingUpdateUtensil === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => handleOnUpsertEntity(e)}
            />
          </form>
        </div>
        <EntityPreview
          entity={templateUtensil}
          entityType="utensil"
          type="preview"
        />
      </div>
    </section>
  );
};

export default UpsertUtensilInterface;
