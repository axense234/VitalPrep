"use client";
// React Google Recaptcha
import ReCAPTCHA from "react-google-recaptcha";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { changeIsUserABot } from "@/redux/slices/generalSlice";
// SCSS
import formControlStyles from "../../../scss/components/others/FormControls.module.scss";

const ReCAPTCHAControl = () => {
  const dispatch = useAppDispatch();

  const onSuccess = (token: string | null) => {
    console.log(token);
    if (token === null) {
      dispatch(changeIsUserABot(true));
    } else {
      dispatch(changeIsUserABot(false));
    }
  };

  return (
    <div className={formControlStyles.reCAPTCHA}>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={(token) => onSuccess(token)}
      />
    </div>
  );
};

export default ReCAPTCHAControl;
