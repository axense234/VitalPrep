// React
import React, { useEffect } from "react";
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
} from "@/redux/slices/general/selectors";
import {
  updateTemplateProfile,
  changeVerifiedPassword,
  updateWarningOverlay,
  setTemplateProfile,
} from "@/redux/slices/general/slice";
import {
  createCloudinaryImage,
  deleteUser,
  logoutUser,
} from "@/redux/slices/general/thunks";
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

  const translateAccountSettings = useTranslations("settings.accountSettings");
  const translateWarningOverlayMessages = useTranslations(
    "warningOverlay.messages"
  );

  useSetTemplateProfile(profile);
  useUpdateEntityTemplateImageUrl(updateTemplateProfile);

  return (
    <section className={accountSettingsStyles.accountSettingsContainer}>
      <PopupModal hasBorder={false} modalType="form" />
      <h4>{translateAccountSettings("title")}</h4>
      <form className={accountSettingsStyles.accountSettingsForm}>
        <TextFormControl
          type="text"
          labelContent={translateAccountSettings("formLabels.name")}
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
          labelContent={translateAccountSettings("formLabels.email")}
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
          labelContent={translateAccountSettings("formLabels.password")}
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
          labelContent={translateAccountSettings("formLabels.verifyPassword")}
          entityProperty={verifiedPassword as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(changeVerifiedPassword(e.target.value))
          }
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelContent={translateAccountSettings("formLabels.image")}
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
          content={translateAccountSettings(
            "formLabels.deleteAccountButtonContent"
          )}
          type="functional"
          disabled={
            loadingCloudinaryImage === "PENDING" ||
            loadingUpdateProfile === "PENDING"
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(
              updateWarningOverlay({
                countdownSeconds: 5,
                onConfirmFunction: () => {
                  dispatch(deleteUser(profile.id))
                    .unwrap()
                    .then(() => logoutUser());
                },
                overlayMessage: translateWarningOverlayMessages(
                  "deleteAccountSettingsMessage"
                ),
                showOverlay: true,
              })
            );
          }}
        />
        <PrimaryButton
          content={translateAccountSettings("formLabels.submitButtonContent")}
          type="functional"
          disabled={
            loadingCloudinaryImage === "PENDING" ||
            loadingUpdateProfile === "PENDING"
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(
              updateWarningOverlay({
                countdownSeconds: 5,
                onConfirmFunction: () => {
                  handleOnUpdateAccountSettingsSubmit(
                    dispatch,
                    templateProfile,
                    verifiedPassword
                  );
                },
                overlayMessage: translateWarningOverlayMessages(
                  "saveAccountSettingsMessage"
                ),
                showOverlay: true,
              })
            );
          }}
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
