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
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  selectIsModalUsedWhenLoading,
  selectShowFormModal,
  selectShowGeneralModal,
  selectTemplateModalMessage,
} from "@/redux/slices/generalSlice";

const AuthFormPageTemplate: FC<AuthFormPageTemplateProps> = ({ type }) => {
  const dispatch = useAppDispatch();

  const showFormModal = useAppSelector(selectShowFormModal);
  const showGeneralModal = useAppSelector(selectShowGeneralModal);

  const modalMessage = useAppSelector(selectTemplateModalMessage);

  const isModalUsedWhenLoading = useAppSelector(selectIsModalUsedWhenLoading);

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
        closeModal={() => dispatch(changeShowGeneralModal(false))}
        modalType="general"
        showModal={showGeneralModal}
        modalMessage={modalMessage}
        isModalUsedWhenLoading={isModalUsedWhenLoading}
      />
      <section className={authFormPageTemplateStyles.formContainer}>
        <PopupModal
          hasBorder={false}
          closeModal={() => dispatch(changeShowFormModal(false))}
          modalType="form"
          showModal={showFormModal}
          modalMessage={modalMessage}
          isModalUsedWhenLoading={false}
        />
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
