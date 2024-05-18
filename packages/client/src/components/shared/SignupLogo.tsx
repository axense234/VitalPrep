// SCSS
import signupBarStyles from "@/scss/components/shared/AuthFormPageTemplate.module.scss";
// Components
import Logo from "./Logo";
import LangSwitcher from "./LangSwitcher";

const SignupBar = () => {
  return (
    <div className={signupBarStyles.signupBarContainer}>
      <div className={signupBarStyles.signupBarLogo}>
        <Logo dimensions={64} logoImageUrlIndex={0} clickable={false} />
        <h6>Vital Prep</h6>
      </div>
      <LangSwitcher />
    </div>
  );
};

export default SignupBar;
