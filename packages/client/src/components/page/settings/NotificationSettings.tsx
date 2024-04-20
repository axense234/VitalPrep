// React
import { useEffect } from "react";
// SCSS
import notificationSettingsStyles from "../../../scss/pages/Settings.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
// Data
import { defaultProfileImageUrl } from "@/data";
// Redux
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectLoadingUpdateProfile,
  selectTemplateImageUrl,
  selectTemplateProfile,
  updateTemplateProfileNotificationSettings,
  updateUser,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Types
import UserType from "@/core/types/entity/UserType";

const NotificationSettings = () => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile) as UserType;
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);
  const loadingUpdateProfile = useAppSelector(selectLoadingUpdateProfile);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateProfileNotificationSettings({
          key: "notificationImageUrl",
          value: templateImageUrl,
        })
      );
    }
  }, [loadingCloudinaryImage]);

  return (
    <section className={notificationSettingsStyles.accountSettingsContainer}>
      <h2>Notification Settings</h2>
      <form className={notificationSettingsStyles.accountSettingsForm}>
        <CheckboxFormControl
          direction="row"
          labelColor="#DDD9D5"
          labelContent="Allow Notifications?:"
          entityProperty={String(
            templateProfile?.notificationSettings?.allowedNotifications
          )}
          onEntityPropertyValueChange={(e) => {
            console.log(e.target.value);
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "allowedNotifications",
                value: Boolean(e.target.value),
              })
            );
          }}
          labelFontSize={28}
        />
        <ImageFormControl
          labelColor="#DDD9D5"
          labelContent="Notification Image:"
          direction="column"
          defaultImageUsedUrl={defaultProfileImageUrl}
          entityPropertyLoadingStatus={loadingCloudinaryImage}
          entityProperty={
            templateProfile?.notificationSettings
              ?.notificationImageUrl as string
          }
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
          backgroundColor="#432517"
          textColor="#ddd9d5"
          content="Update Notification Settings"
          type="functional"
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
          disabled={
            loadingCloudinaryImage === "PENDING" ||
            loadingUpdateProfile === "PENDING"
          }
          onClickFunction={() =>
            dispatch(
              updateUser({
                userTemplate: templateProfile,
                typeOfUpdate: "notification",
              })
            )
          }
        />
      </form>
    </section>
  );
};

export default NotificationSettings;
