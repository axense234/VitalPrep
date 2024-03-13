"use client";

// Data
import { OAuthOptionsContent } from "@/data";
// Types
import OAuthOptionContent from "@/core/types/OAuthOptionContent";
import OAuthOptionsProps from "@/core/interfaces/OAuthOptionsProps";
// React
import { FC, useEffect } from "react";
// SCSS
import OAuthOptionsStyles from "../../scss/components/shared/OAuthOptions.module.scss";
// Next Auth
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// Redux
import {
  selectLoadingLoginOAuthProfile,
  signinUserThroughOAuth,
  signupUserOAuth,
} from "@/redux/slices/generalSlice";

const OAuthOptions: FC<OAuthOptionsProps> = ({ type }) => {
  return (
    <div className={OAuthOptionsStyles.authContainer}>
      <p>-quick {type} with OAuth-</p>
      <ul className={OAuthOptionsStyles.authButtons}>
        {OAuthOptionsContent.map((option) => {
          return (
            <li key={option.id}>
              <OAuthOptionsButton {...option} pageType={type} />
            </li>
          );
        })}
      </ul>
      <p>-or with email and password-</p>
    </div>
  );
};

const OAuthOptionsButton: FC<OAuthOptionContent> = ({
  optionType,
  loginTextContent,
  signupTextContent,
  reactIcon,
  pageType,
}) => {
  const dispatch = useAppDispatch();
  const loadingLoginOAuthProfile = useAppSelector(
    selectLoadingLoginOAuthProfile
  );

  useEffect(() => {
    if (loadingLoginOAuthProfile === "SUCCEDED" && pageType === "signup") {
      dispatch(signupUserOAuth());
    }
  }, [loadingLoginOAuthProfile]);

  return (
    <button
      className={OAuthOptionsStyles.authButton}
      title={pageType === "login" ? loginTextContent : signupTextContent}
      aria-label={pageType === "login" ? loginTextContent : signupTextContent}
      onClick={() => {
        dispatch(
          signinUserThroughOAuth({
            providerName: optionType,
            usedOnlyForSignin: pageType === "login",
          })
        );
      }}
      type="button"
    >
      {reactIcon}
      <span>{pageType === "login" ? loginTextContent : signupTextContent}</span>
    </button>
  );
};

export default OAuthOptions;
