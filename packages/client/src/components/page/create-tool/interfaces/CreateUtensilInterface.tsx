// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Data
import { defaultUtensilImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createUtensil,
  selectTemplateUtensil,
  selectUtensilFormModalErrorMessage,
  updateLoadingCreateUtensil,
  updateTemplateUtensil,
} from "@/redux/slices/utensilsSlice";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
  selectTemplateImageUrl,
  setTemplateModalMessage,
} from "@/redux/slices/generalSlice";
// React
import { useEffect } from "react";
import { selectLoadingCreateUtensil } from "@/redux/slices/utensilsSlice";

const CreateUtensilInterface = () => {
  const dispatch = useAppDispatch();
  const templateUtensil = useAppSelector(selectTemplateUtensil);
  const profile = useAppSelector(selectProfile);

  const loadingCreateUtensil = useAppSelector(selectLoadingCreateUtensil);
  const utensilFormModalErrorMessage = useAppSelector(
    selectUtensilFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  useEffect(() => {
    if (loadingCreateUtensil === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully created utensil: ${templateUtensil.name}.`
        )
      );
    } else if (loadingCreateUtensil === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(utensilFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateUtensil("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateUtensil]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateUtensil({ key: "imageUrl", value: templateImageUrl })
      );
    }
  }, [loadingCloudinaryImage]);

  return (
    <section className={createToolStyles.createInterface}>
      <PopupModal hasBorder={false} modalType="form" />
      <h2>Create Utensil</h2>
      <form className={createToolStyles.createInterfaceForm}>
        <TextFormControl
          direction="row"
          entityProperty={templateUtensil.name}
          labelColor="#120A06"
          labelContent="Utensil Name:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateUtensil({ key: "name", value: e.target.value })
            )
          }
          required={true}
          type="text"
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Utensil Image:"
          direction="row"
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
          labelFontSize={28}
        />
        <CheckboxFormControl
          direction="row"
          labelColor="#120A06"
          labelContent="Enabled?:"
          entityProperty={String(templateUtensil.enabled)}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateUtensil({
                key: "enabled",
                value: Boolean(e.target.value),
              })
            )
          }
          labelFontSize={28}
        />
        <PrimaryButton
          backgroundColor="#FF6000"
          textColor="#120A06"
          content="Create Utensil"
          type="functional"
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
          disabled={
            loadingCreateUtensil === "PENDING" ||
            loadingCloudinaryImage === "PENDING"
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(
              createUtensil({
                templateUtensil: templateUtensil,
                userId: profile.id,
              })
            );
          }}
        />
      </form>
    </section>
  );
};

export default CreateUtensilInterface;
