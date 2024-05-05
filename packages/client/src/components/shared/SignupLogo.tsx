// SCSS
import signupLogoStyles from "../../scss/components/shared/AuthFormPageTemplate.module.scss";
// Components
import Logo from "./Logo";

const SignupLogo = () => {
  return (
    <div className={signupLogoStyles.signupLogoContainer}>
      <Logo dimensions={64} logoImageUrlIndex={0} clickable={false} />
      <h6>Vital Prep</h6>
    </div>
  );
};

export default SignupLogo;
