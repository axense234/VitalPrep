// React
import { useEffect } from "react";
// SCSS
import accountSettingsStyles from "../../../scss/pages/Settings.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import TextFormControl from "@/components/shared/form/TextFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Data
import { defaultProfileImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectTemplateProfile,
  selectProfile,
  selectVerifiedPassword,
  selectTemplateImageUrl,
  selectLoadingCloudinaryImage,
  selectLoadingUpdateProfile,
  setTemplateProfile,
  updateTemplateProfile,
  changeShowGeneralModal,
  changeShowFormModal,
  setTemplateModalMessage,
  updateUser,
  changeVerifiedPassword,
  createCloudinaryImage,
  setTypeOfUpdateAccountQuery,
} from "@/redux/slices/generalSlice";

const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile);
  const profile = useAppSelector(selectProfile);
  const verifiedPassword = useAppSelector(selectVerifiedPassword);

  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const loadingUpdateProfile = useAppSelector(selectLoadingUpdateProfile);

  useEffect(() => {
    if (profile) {
      dispatch(setTemplateProfile(profile));
      dispatch(updateTemplateProfile({ key: "password", value: "" }));
    }
  }, [profile]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateProfile({ key: "imageUrl", value: templateImageUrl })
      );
    }
  }, [loadingCloudinaryImage]);

  const handleOnAccountSettingsSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (templateProfile.password !== verifiedPassword) {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage("Passwords must match!"));
    } else if (templateProfile.password === verifiedPassword) {
      dispatch(setTypeOfUpdateAccountQuery("account"));
      dispatch(
        updateUser({ userTemplate: templateProfile, typeOfUpdate: "account" })
      );
    }
  };

  return (
    <section className={accountSettingsStyles.accountSettingsContainer}>
      <PopupModal hasBorder={false} modalType="form" />
      <h4>Account Settings</h4>
      <form className={accountSettingsStyles.accountSettingsForm}>
        <TextFormControl
          type="text"
          labelContent="New Username:"
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
          labelContent="New Email:"
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
          labelContent="New Password:"
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
          labelContent="Verify Password:"
          entityProperty={verifiedPassword as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(changeVerifiedPassword(e.target.value))
          }
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelContent="New Account Image:"
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
          content="Update Account Settings"
          type="functional"
          disabled={
            loadingCloudinaryImage === "PENDING" ||
            loadingUpdateProfile === "PENDING"
          }
          onClickFunction={(e) => handleOnAccountSettingsSubmit(e)}
        />
      </form>
    </section>
  );
};

export default AccountSettings;
