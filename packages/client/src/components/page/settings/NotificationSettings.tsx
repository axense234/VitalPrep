// SCSS
import notificationSettingsStyles from "../../../scss/pages/Settings.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import RadioFormControl from "@/components/shared/form/RadioFormControl";
// Data
import { defaultProfileImageUrl, notificationMessageStyles } from "@/data";
// Redux
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectLoadingUpdateProfile,
  selectTemplateNotificationsImageUrl,
  selectTemplateProfile,
  setTypeOfUpdateAccountQuery,
  updateTemplateProfileNotificationSettings,
  updateUser,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Types
import UserType from "@/core/types/entity/users/UserType";
// Hooks
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";

const NotificationSettings = () => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile) as UserType;
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateNotificationsImageUrl = useAppSelector(
    selectTemplateNotificationsImageUrl
  );
  const loadingUpdateProfile = useAppSelector(selectLoadingUpdateProfile);

  useUpdateEntityTemplateImageUrl(
    updateTemplateProfileNotificationSettings,
    "notificationImageUrl",
    templateNotificationsImageUrl
  );

  console.log(templateProfile?.notificationSettings);

  return (
    <section className={notificationSettingsStyles.accountSettingsContainer}>
      <h4>Notification Settings</h4>
      <form className={notificationSettingsStyles.accountSettingsForm}>
        <CheckboxFormControl
          labelContent="Allow Notifications?:"
          entityProperty={String(
            templateProfile?.notificationSettings?.allowedNotifications
          )}
          onEntityPropertyValueChange={(e) => {
            console.log(e.target.value);
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "allowedNotifications",
                value: e.target.value === "true" ? false : true,
              })
            );
          }}
        />
        <ImageFormControl
          labelContent="Notification Image:"
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
                  type: "notifications",
                })
              );
            }
          }}
          labelFontSize={28}
        />
        <RadioFormControl
          chosenEntityProperty={
            templateProfile?.notificationSettings?.notificationStyle
          }
          entityPropertyOptions={notificationMessageStyles}
          labelContent="Notification Style:"
          onEntityPropertyValueChange={(value: string) =>
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "notificationStyle",
                value: value.toLowerCase(),
              })
            )
          }
        />
        <PrimaryButton
          content="Update Notification Settings"
          type="functional"
          disabled={
            loadingCloudinaryImage === "PENDING" ||
            loadingUpdateProfile === "PENDING"
          }
          onClickFunction={() => {
            {
              dispatch(setTypeOfUpdateAccountQuery("notification"));
              dispatch(
                updateUser({
                  typeOfUpdate: "notification",
                  userTemplate: templateProfile,
                })
              );
            }
          }}
        />
      </form>
    </section>
  );
};

export default NotificationSettings;
