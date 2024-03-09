// React
import { FC } from "react";
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

const AuthFormControls: FC<AuthFormControlsProps> = ({ type }) => {
  if (type === "signup") {
    return (
      <form className={authFormControlsStyles.formContainer}>
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="text"
          labelContent="Username:"
        />
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="email"
          labelContent="Email:"
        />
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="password"
          labelContent="Password:"
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Profile Image:"
          direction="column"
          defaultImageUsedUrl="https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg"
        />
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="number"
          labelContent="Age:"
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
        />
        <TextFormControl
          direction="column"
          labelColor="#120A06"
          type="password"
          labelContent="Password:"
        />
        <PrimaryButton
          type="functional"
          backgroundColor="#120A06"
          content="Log In"
          fontFamily="Cabin"
          fontSize={21}
          height={40}
          width={128}
        />
      </form>
    );
  }

  return <h1>Hello</h1>;
};

export default AuthFormControls;
