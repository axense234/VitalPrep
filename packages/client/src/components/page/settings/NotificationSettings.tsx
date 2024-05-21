// SCSS
import notificationSettingsStyles from "@/scss/pages/Settings.module.scss";
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
// Translations
import { useTranslations } from "next-intl";
import TextFormControl from "@/components/shared/form/TextFormControl";

const NotificationSettings = () => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile) as UserType;
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateNotificationsImageUrl = useAppSelector(
    selectTemplateNotificationsImageUrl
  );
  const loadingUpdateProfile = useAppSelector(selectLoadingUpdateProfile);

  const translate = useTranslations("settings.notificationSettings");
  const translatedNotificationStyles = notificationMessageStyles.map(
    (style) => {
      return {
        ...style,
        label: translate(`formLabels.notificationStyles.${style.value}`),
      };
    }
  );

  useUpdateEntityTemplateImageUrl(
    updateTemplateProfileNotificationSettings,
    "notificationImageUrl",
    templateNotificationsImageUrl
  );

  return (
    <section className={notificationSettingsStyles.accountSettingsContainer}>
      <h4>{translate("title")}</h4>
      <form className={notificationSettingsStyles.accountSettingsForm}>
        <CheckboxFormControl
          labelContent={translate("formLabels.allowNotifications")}
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
        <TextFormControl
          entityProperty={
            templateProfile?.notificationSettings?.reminderIntervalInHours
          }
          labelContent={translate("formLabels.reminderIntervalInHours")}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "reminderIntervalInHours",
                value: e.target.valueAsNumber,
              })
            )
          }
          type="number"
        />
        <CheckboxFormControl
          labelContent={translate("formLabels.allowAutomaticCreationOfLogs")}
          entityProperty={String(
            templateProfile?.notificationSettings?.allowAutomaticCreationOfLogs
          )}
          onEntityPropertyValueChange={(e) => {
            console.log(e.target.value);
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "allowAutomaticCreationOfLogs",
                value: e.target.value === "true" ? false : true,
              })
            );
          }}
        />
        <CheckboxFormControl
          labelContent={translate("formLabels.allowDayReminderNotifications")}
          entityProperty={String(
            templateProfile?.notificationSettings?.allowDayReminderNotifications
          )}
          onEntityPropertyValueChange={(e) => {
            console.log(e.target.value);
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "allowDayReminderNotifications",
                value: e.target.value === "true" ? false : true,
              })
            );
          }}
        />
        <CheckboxFormControl
          labelContent={translate(
            "formLabels.allowPreSessionReminderNotifications"
          )}
          entityProperty={String(
            templateProfile?.notificationSettings
              ?.allowPreSessionReminderNotifications
          )}
          onEntityPropertyValueChange={(e) => {
            console.log(e.target.value);
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "allowPreSessionReminderNotifications",
                value: e.target.value === "true" ? false : true,
              })
            );
          }}
        />
        <CheckboxFormControl
          labelContent={translate(
            "formLabels.allowPostSessionReminderNotifications"
          )}
          entityProperty={String(
            templateProfile?.notificationSettings
              ?.allowPostSessionReminderNotifications
          )}
          onEntityPropertyValueChange={(e) => {
            console.log(e.target.value);
            dispatch(
              updateTemplateProfileNotificationSettings({
                key: "allowPostSessionReminderNotifications",
                value: e.target.value === "true" ? false : true,
              })
            );
          }}
        />
        <ImageFormControl
          labelContent={translate("formLabels.notificationsImage")}
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
          chosenEntityProperty={`${templateProfile?.notificationSettings?.notificationStyle.toLowerCase()}`}
          entityPropertyOptions={translatedNotificationStyles}
          labelContent={translate("formLabels.notificationStyles.formLabel")}
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
          content={translate("formLabels.submitButtonContent")}
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
