// Next
import Image from "next/image";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";

const ReCAPTCHAControl = () => {
  return (
    <div className={formControlsStyles.recaptchaFormControlContainer}>
      <input type="checkbox" name="reCAPTCHA" id="reCAPTCHA" />
      <label htmlFor="reCAPTCHA">I'm not a robot</label>
      <Image
        src={
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1710010174/VitalPrep/RecaptchaLogo.svg_yprqt7.png"
        }
        alt="reCAPTCHA"
        width={40}
        height={40}
      />
    </div>
  );
};

export default ReCAPTCHAControl;
