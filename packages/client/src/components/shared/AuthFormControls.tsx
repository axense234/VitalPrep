"use client";

// React
import { FC, useEffect } from "react";
// Types
import AuthFormControlsProps from "@/core/interfaces/AuthFormControlsProps";
// SCSS
import authFormControlsStyles from "../../scss/components/shared/AuthFormControls.module.scss";
// Components
import PrimaryButton from "./PrimaryButton";
import TextFormControl from "./form/TextFormControl";
import ImageFormControl from "./form/ImageFormControl";
import CheckboxFormControl from "./form/CheckboxFormControl";
import ReCAPTCHAControl from "./form/ReCAPTCHAControl";
// Redux Toolkit
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectTemplateImageUrl,
  selectTemplateProfile,
  signupUser,
  updateTemplateProfile,
} from "@/redux/slices/generalSlice";

const AuthFormControls: FC<AuthFormControlsProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const templateProfile = useAppSelector(selectTemplateProfile);

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  console.log(templateProfile);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateProfile({ key: "imageUrl", value: templateImageUrl })
      );
    }
  }, [loadingCloudinaryImage]);

  if (type === "signup") {
    return (
      <form className={authFormControlsStyles.formContainer}>
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="text"
          labelContent="Username:"
          required
          entityProperty={templateProfile.username as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "username", value: e.target.value })
            )
          }
        />
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="email"
          labelContent="Email:"
          required
          entityProperty={templateProfile.email as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "email", value: e.target.value })
            )
          }
        />
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="password"
          labelContent="Password:"
          required
          entityProperty={templateProfile.password as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "password", value: e.target.value })
            )
          }
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Profile Image:"
          direction="column"
          defaultImageUsedUrl="https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg"
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
          direction="column"
          labelColor="#120A06"
          type="number"
          labelContent="Age:"
          required={false}
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
        <CheckboxFormControl
          direction="row"
          labelColor="#120A06"
          labelContent="Default Plan?:"
        />
        <ReCAPTCHAControl />
        <PrimaryButton
          type="functional"
          backgroundColor="#043301"
          content="Sign Up"
          fontFamily="Cabin"
          fontSize={21}
          height={40}
          width={128}
          disabled={loadingCloudinaryImage === "PENDING"}
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(signupUser(templateProfile));
          }}
        />
      </form>
    );
  } else if (type === "login") {
    return (
      <form className={authFormControlsStyles.formContainer}>
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="email"
          labelContent="Email:"
          required
          entityProperty={templateProfile.email as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "email", value: e.target.value })
            )
          }
        />
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="password"
          labelContent="Password:"
          required
          entityProperty={templateProfile.password as string}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateProfile({ key: "password", value: e.target.value })
            )
          }
        />
        <PrimaryButton
          type="functional"
          backgroundColor="#120A06"
          content="Log In"
          fontFamily="Cabin"
          fontSize={21}
          height={40}
          width={128}
          disabled={false}
        />
      </form>
    );
  }

  return <h1>Hello</h1>;
};

export default AuthFormControls;
