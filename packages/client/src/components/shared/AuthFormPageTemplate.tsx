"use client";
// Components
import OAuthOptions from "@/components/shared/OAuthOptions";
import AuthFormControls from "./AuthFormControls";
import PopupModal from "./modals/PopupModal";
import SignupBar from "./SignupLogo";
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
// Translations
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const AuthFormPageTemplate: FC<AuthFormPageTemplateProps> = ({ type }) => {
  const { pageImageUrlUsed, pageSubtitleLinkDestUsed } =
    useGetAuthFormPageTemplateDetails(type);

  const translate = useTranslations(type);
  const pageTitleUsed = translate("title");
  const pageSubtitleUsed = translate("subtitle");
  const pageSubtitleLinkTextContentUsed = translate("subtitleLink");

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
          <SignupBar />
          <div className={authFormPageTemplateStyles.formContainerContent}>
            <header>
              <h3>{pageTitleUsed}</h3>
              <h6>{pageSubtitleUsed}</h6>
              <Link href={pageSubtitleLinkDestUsed as any}>
                {pageSubtitleLinkTextContentUsed}
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

const useGetAuthFormPageTemplateDetails = (type: "login" | "signup") => {
  let pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;
  let pageSubtitleLinkDestUsed = "/";

  switch (type) {
    case "login":
      pageImageUrlUsed = authFormPageTemplateImageUrls[1].imageUrl;
      pageSubtitleLinkDestUsed = "/";
      break;
    case "signup":
      pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;
      pageSubtitleLinkDestUsed = "/login";
      break;
    default:
      throw new Error("Invalid auth form page template title.");
  }
  return {
    pageImageUrlUsed,
    pageSubtitleLinkDestUsed,
  };
};

export default AuthFormPageTemplate;
