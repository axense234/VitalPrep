// Components
import OAuthOptions from "@/components/shared/OAuthOptions";
import AuthFormControls from "./AuthFormControls";
// SCSS
import authFormPageTemplateStyles from "../../scss/components/shared/AuthFormPageTemplate.module.scss";
// Types
import AuthFormPageTemplateProps from "@/core/interfaces/AuthFormPageTemplateProps";
// React
import { FC } from "react";
// Next
import Image from "next/image";
// Data
import { authFormPageTemplateImageUrls } from "@/data";

const AuthFormPageTemplate: FC<AuthFormPageTemplateProps> = ({ type }) => {
  let pageTitleUsed = "Title";
  let pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;

  switch (type) {
    case "login":
      pageTitleUsed = "Login";
      pageImageUrlUsed = authFormPageTemplateImageUrls[1].imageUrl;
      break;
    case "signup":
      pageTitleUsed = "Signup";
      pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;
      break;
    default:
      throw new Error("Invalid auth form page template title.");
  }

  return (
    <div className={authFormPageTemplateStyles.authContainer}>
      <section className={authFormPageTemplateStyles.formContainer}>
        <div className={authFormPageTemplateStyles.formContainerContentWrapper}>
          <div className={authFormPageTemplateStyles.formContainerContent}>
            <h4>{pageTitleUsed}</h4>
            <OAuthOptions type={type} />
            <AuthFormControls type={type} />
          </div>
        </div>
      </section>
      <Image
        alt={`${pageTitleUsed} Image`}
        src={pageImageUrlUsed}
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default AuthFormPageTemplate;
