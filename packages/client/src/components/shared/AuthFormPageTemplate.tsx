"use client";

// Components
import OAuthOptions from "@/components/shared/OAuthOptions";
import AuthFormControls from "./AuthFormControls";
import FormModal from "./modals/FormModal";
// SCSS
import authFormPageTemplateStyles from "../../scss/components/shared/AuthFormPageTemplate.module.scss";
// Types
import AuthFormPageTemplateProps from "@/core/interfaces/AuthFormPageTemplateProps";
// React
import { FC, useEffect, useRef } from "react";
// Next
import Image from "next/image";
// Data
import { authFormPageTemplateImageUrls } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeShowFormModal,
  selectLoadingCreateProfile,
  selectLoadingLoginProfile,
  selectShowFormModal,
  selectTemplateModalMessage,
} from "@/redux/slices/generalSlice";

const AuthFormPageTemplate: FC<AuthFormPageTemplateProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const showFormModal = useAppSelector(selectShowFormModal);

  const modalMessage = useAppSelector(selectTemplateModalMessage);
  const loadingCreateProfile = useAppSelector(selectLoadingCreateProfile);
  const loadingLoginProfile = useAppSelector(selectLoadingLoginProfile);

  let pageTitleUsed = "Title";
  let pageImageUrlUsed = authFormPageTemplateImageUrls[0].imageUrl;

  useEffect(() => {
    if (loadingCreateProfile === "FAILED") {
      dispatch(changeShowFormModal(true));
    }
  }, [loadingCreateProfile]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showFormModal) {
      timeout = setTimeout(() => {
        dispatch(changeShowFormModal(false));
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showFormModal]);

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
        <FormModal
          modalMessage={modalMessage}
          showModal={showFormModal}
          closeModal={() => dispatch(changeShowFormModal(false))}
        />
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
        width={1500}
        height={1080}
      />
    </div>
  );
};

export default AuthFormPageTemplate;
