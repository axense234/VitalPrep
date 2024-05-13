// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// Data
import { defaultUtensilImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectLoadingCreateUtensil } from "@/redux/slices/utensilsSlice";
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
// Hooks
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";

const CreateUtensilInterface = () => {
  const dispatch = useAppDispatch();
  const templateUtensil = useAppSelector(selectTemplateUtensil);
  const profile = useAppSelector(selectProfile);

  const loadingCreateUtensil = useAppSelector(selectLoadingCreateUtensil);
  const utensilFormModalErrorMessage = useAppSelector(
    selectUtensilFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  useShowCreatedEntity(
    loadingCreateUtensil,
    `Successfully created utensil: ${templateUtensil.name}.`,
    utensilFormModalErrorMessage,
    updateLoadingCreateUtensil
  );
  useUpdateEntityTemplateImageUrl(updateTemplateUtensil);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={false} modalType="form" />
          <h4>Create Utensil</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateUtensil.name}
              labelContent="Utensil Name:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateUtensil({ key: "name", value: e.target.value })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent="Utensil Image:"
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
            <CheckboxFormControl
              labelContent="Enabled?:"
              entityProperty={String(templateUtensil.enabled)}
              onEntityPropertyValueChange={(e) => {
                console.log(e.target.value);
                dispatch(
                  updateTemplateUtensil({
                    key: "enabled",
                    value: e.target.value === "true" ? false : true,
                  })
                );
              }}
            />
            <PrimaryButton
              content="Create Utensil"
              type="functional"
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

export default CreateUtensilInterface;
