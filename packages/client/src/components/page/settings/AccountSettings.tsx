// React
import { useEffect } from "react";
// SCSS
import accountSettingsStyles from "@/scss/pages/Settings.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import TextFormControl from "@/components/shared/form/TextFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Types
import UserType from "@/core/types/entity/users/UserType";
// Data
import { defaultProfileImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectTemplateProfile,
  selectProfile,
  selectVerifiedPassword,
  selectLoadingCloudinaryImage,
  selectLoadingUpdateProfile,
  setTemplateProfile,
  updateTemplateProfile,
  changeVerifiedPassword,
  createCloudinaryImage,
} from "@/redux/slices/generalSlice";
// Hooks and Helpers
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import handleOnUpdateAccountSettingsSubmit from "@/helpers/handleOnUpdateAccountSettingsSubmit";
// Translations
import { useTranslations } from "next-intl";

const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile);
  const profile = useAppSelector(selectProfile);
  const verifiedPassword = useAppSelector(selectVerifiedPassword);

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingUpdateProfile = useAppSelector(selectLoadingUpdateProfile);

  const translate = useTranslations("settings.accountSettings");

  useSetTemplateProfile(profile);
  useUpdateEntityTemplateImageUrl(updateTemplateProfile);

  return (
    <section className={accountSettingsStyles.accountSettingsContainer}>
      <PopupModal hasBorder={false} modalType="form" />
      <h4>{translate("title")}</h4>
      <form className={accountSettingsStyles.accountSettingsForm}>
        <TextFormControl
          type="text"
          labelContent={translate("formLabels.name")}
          entityProperty={templateProfile.username as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "username", value: e.target.value })
            )
          }
          inputHeight={36}
          labelFontSize={28}
        />
        <TextFormControl
          type="email"
          labelContent={translate("formLabels.email")}
          entityProperty={templateProfile.email as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "email", value: e.target.value })
            )
          }
          inputHeight={36}
          labelFontSize={28}
        />
        <TextFormControl
          type="password"
          labelContent={translate("formLabels.password")}
          entityProperty={templateProfile.password as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "password", value: e.target.value })
            )
          }
          inputHeight={36}
          labelFontSize={28}
        />
        <TextFormControl
          type="password"
          labelContent={translate("formLabels.verifyPassword")}
          entityProperty={verifiedPassword as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(changeVerifiedPassword(e.target.value))
          }
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelContent={translate("formLabels.image")}
          defaultImageUsedUrl={defaultProfileImageUrl}
          entityPropertyLoadingStatus={loadingCloudinaryImage}
          entityProperty={templateProfile.imageUrl as string}
          onEntityPropertyValueChange={(e) => {
            if (e.target.files) {
              dispatch(
                createCloudinaryImage({
                  entity: "users",
                  imageFile: e.target.files[0],
                })
              );
            }
          }}
          labelFontSize={28}
        />
        <PrimaryButton
          content={translate("formLabels.submitButtonContent")}
          type="functional"
          disabled={
            loadingCloudinaryImage === "PENDING" ||
            loadingUpdateProfile === "PENDING"
          }
          onClickFunction={(e) =>
            handleOnUpdateAccountSettingsSubmit(
              e,
              dispatch,
              templateProfile,
              verifiedPassword
            )
          }
        />
      </form>
    </section>
  );
};

const useSetTemplateProfile = (profile: UserType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (profile) {
      dispatch(setTemplateProfile(profile));
      dispatch(updateTemplateProfile({ key: "password", value: "" }));
    }
  }, [profile]);
};

export default AccountSettings;
