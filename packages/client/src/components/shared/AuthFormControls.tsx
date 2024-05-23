"use client";
// React
import { FC } from "react";
// SCSS
import authFormControlsStyles from "../../scss/components/shared/AuthFormControls.module.scss";
// Components
import AuthFormControlsProps from "@/core/interfaces/AuthFormControlsProps";
import PrimaryButton from "./PrimaryButton";
import TextFormControl from "./form/TextFormControl";
import ImageFormControl from "./form/ImageFormControl";
import ReCAPTCHAControl from "./form/ReCAPTCHAControl";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImage,
  loginUser,
  selectIsUserABot,
  selectLoadingCloudinaryImage,
  selectLoadingCreateProfile,
  selectLoadingLoginProfile,
  selectTemplateProfile,
  signupUser,
  updateTemplateProfile,
} from "@/redux/slices/generalSlice";
// Data
import { defaultProfileImageUrl } from "@/data";
// Hooks
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
// Translations
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const AuthFormControls: FC<AuthFormControlsProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile);

  const translate = useTranslations(`${type}.formLabels`);

  const isUserABot = useAppSelector(selectIsUserABot);

  const locale = useLocale();

  const loadingCreateProfile = useAppSelector(selectLoadingCreateProfile);
  const loadingLoginProfile = useAppSelector(selectLoadingLoginProfile);

  const isRequestPending =
    type === "signup"
      ? loadingCreateProfile === "PENDING"
      : loadingLoginProfile === "PENDING";

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  useUpdateEntityTemplateImageUrl(updateTemplateProfile);

  if (type === "signup") {
    return (
      <form className={authFormControlsStyles.formContainer}>
        <TextFormControl
          type="text"
          labelContent={translate("username")}
          entityProperty={templateProfile.username as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "username", value: e.target.value })
            )
          }
        />
        <TextFormControl
          type="email"
          labelContent={translate("email")}
          entityProperty={templateProfile.email as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "email", value: e.target.value })
            )
          }
        />
        <TextFormControl
          type="password"
          labelContent={translate("password")}
          entityProperty={templateProfile.password as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "password", value: e.target.value })
            )
          }
        />
        <ImageFormControl
          labelContent={translate("profileImage")}
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
        />
        <TextFormControl
          type="number"
          labelContent={translate("age")}
          entityProperty={templateProfile.age as number}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({
                key: "age",
                value: e.target.valueAsNumber,
              })
            )
          }
        />
        <ReCAPTCHAControl />
        <PrimaryButton
          type="functional"
          onHoverContent={isUserABot ? translate("reCAPTCHA") : ""}
          content={translate("button")}
          disabled={
            loadingCloudinaryImage === "PENDING" ||
            isRequestPending ||
            isUserABot
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(signupUser({ userTemplate: templateProfile, locale }));
          }}
        />
      </form>
    );
  } else if (type === "login") {
    return (
      <form className={authFormControlsStyles.formContainer}>
        <TextFormControl
          type="email"
          labelContent={translate("email")}
          entityProperty={templateProfile.email as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "email", value: e.target.value })
            )
          }
        />
        <TextFormControl
          type="password"
          labelContent={translate("password")}
          entityProperty={templateProfile.password as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "password", value: e.target.value })
            )
          }
        />
        <PrimaryButton
          type="functional"
          content={translate("button")}
          disabled={isRequestPending}
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(loginUser(templateProfile));
          }}
        />
      </form>
    );
  }

  return null;
};

export default AuthFormControls;
