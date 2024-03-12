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
import { FC, useEffect } from "react";
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
  manipulateLoadingCreateProfile,
  manipulateLoadingLoginProfile,
  selectLoadingCreateProfile,
  selectLoadingGetProfile,
  selectLoadingLoginProfile,
  selectShowFormModal,
  selectShowGeneralModal,
  selectTemplateModalMessage,
} from "@/redux/slices/generalSlice";

const AuthFormPageTemplate: FC<AuthFormPageTemplateProps> = ({ type }) => {
  const dispatch = useAppDispatch();

  const showFormModal = useAppSelector(selectShowFormModal);
  const showGeneralModal = useAppSelector(selectShowGeneralModal);
  const modalMessage = useAppSelector(selectTemplateModalMessage);

  const loadingCreateProfile = useAppSelector(selectLoadingCreateProfile);
  const loadingLoginProfile = useAppSelector(selectLoadingLoginProfile);
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);

  let pageTitleUsed = "Title";
  let pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;
  let pageSubtitleUsed = "Subtitle";
  let pageSubtitleLinkUsed = {
    textContent: "Text Content",
    linkDest: "/",
  };

  const isRequestPending =
    (type === "signup"
      ? loadingCreateProfile === "PENDING"
      : loadingLoginProfile === "PENDING") ||
    loadingGetProfile === "PENDING" ||
    loadingGetProfile === "SUCCEDED";

  useEffect(() => {
    dispatch(manipulateLoadingCreateProfile("IDLE"));
    dispatch(manipulateLoadingLoginProfile("IDLE"));
  }, []);

  useEffect(() => {
    if (loadingGetProfile === "PENDING") {
      dispatch(changeShowGeneralModal(true));
    }
  }, [loadingGetProfile]);

  useEffect(() => {
    if (loadingCreateProfile === "FAILED") {
      dispatch(changeShowFormModal(true));
    } else if (
      loadingCreateProfile === "SUCCEDED" ||
      loadingCreateProfile === "PENDING"
    ) {
      dispatch(changeShowGeneralModal(true));
    }
  }, [loadingCreateProfile]);

  useEffect(() => {
    if (loadingLoginProfile === "FAILED") {
      dispatch(changeShowFormModal(true));
    } else if (
      loadingLoginProfile === "SUCCEDED" ||
      loadingLoginProfile === "PENDING"
    ) {
      dispatch(changeShowGeneralModal(true));
    }
  }, [loadingLoginProfile]);

  useEffect(() => {
    let firstTimeout: NodeJS.Timeout;
    let secondTimeout: NodeJS.Timeout;
    if (showFormModal) {
      firstTimeout = setTimeout(() => {
        dispatch(changeShowFormModal(false));
      }, 5000);
    }
    if (showGeneralModal) {
      secondTimeout = setTimeout(() => {
        dispatch(changeShowGeneralModal(false));
      }, 5000);
    }
    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, [showFormModal, showGeneralModal]);

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
        modalMessage={modalMessage}
        showModal={showGeneralModal}
        modalColor="#cfbea7"
        textColor="#120a06"
        usedForLoading={isRequestPending}
        hasBorder={true}
        closeModal={() => dispatch(changeShowGeneralModal(false))}
      />
      <section className={authFormPageTemplateStyles.formContainer}>
        <PopupModal
          modalMessage={modalMessage}
          showModal={showFormModal}
          hasBorder={false}
          closeModal={() => dispatch(changeShowFormModal(false))}
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
