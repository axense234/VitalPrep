"use client";

// Components
import OAuthOptions from "@/components/shared/OAuthOptions";
import AuthFormControls from "./AuthFormControls";
import PopupModal from "./modals/PopupModal";
// SCSS
import authFormPageTemplateStyles from "../../scss/components/shared/AuthFormPageTemplate.module.scss";
// Types
import AuthFormPageTemplateProps from "@/core/interfaces/AuthFormPageTemplateProps";
// React
import { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Data
import { authFormPageTemplateImageUrls } from "@/data";

const AuthFormPageTemplate: FC<AuthFormPageTemplateProps> = ({ type }) => {
  let pageTitleUsed = "Title";
  let pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;
  let pageSubtitleUsed = "Subtitle";
  let pageSubtitleLinkUsed = {
    textContent: "Text Content",
    linkDest: "/",
  };

  switch (type) {
    case "login":
      pageTitleUsed = "Login";
      pageSubtitleUsed = "Have an account?";
      pageImageUrlUsed = authFormPageTemplateImageUrls[1].imageUrl;
      pageSubtitleLinkUsed.textContent = "Sign Up";
      pageSubtitleLinkUsed.linkDest = "/";
      break;
    case "signup":
      pageTitleUsed = "Signup";
      pageSubtitleUsed = "Don't have an account?";
      pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;
      pageSubtitleLinkUsed.textContent = "Log In";
      pageSubtitleLinkUsed.linkDest = "/login";
      break;
    default:
      throw new Error("Invalid auth form page template title.");
  }

  return (
    <div className={authFormPageTemplateStyles.authContainer}>
      <PopupModal
        modalColor="#cfbea7"
        textColor="#120a06"
        hasBorder={true}
        modalType="general"
      />
      <section className={authFormPageTemplateStyles.formContainer}>
        <PopupModal hasBorder={false} modalType="form" />
        <div className={authFormPageTemplateStyles.formContainerContentWrapper}>
          <div className={authFormPageTemplateStyles.formContainerContent}>
            <header>
              <h4>{pageTitleUsed}</h4>
              <h5>{pageSubtitleUsed}</h5>
              <Link href={pageSubtitleLinkUsed.linkDest}>
                {pageSubtitleLinkUsed.textContent}
              </Link>
            </header>
            <OAuthOptions type={type} />
            <AuthFormControls type={type} />
          </div>
        </div>
      </section>
      <Image
        alt={`${pageTitleUsed} Image`}
        src={pageImageUrlUsed}
        width={1500}
        height={1080}
      />
    </div>
  );
};

export default AuthFormPageTemplate;
