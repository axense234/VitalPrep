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
import {
  selectLoadingLoginProfile,
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
  textContent,
  reactIcon,
  pageType,
}) => {
  const dispatch = useAppDispatch();
  const loadingLoginProfile = useAppSelector(selectLoadingLoginProfile);

  useEffect(() => {
    if (loadingLoginProfile === "SUCCEDED" && pageType !== "login") {
      dispatch(signupUserOAuth());
    }
  }, [loadingLoginProfile]);

  return (
    <button
      className={OAuthOptionsStyles.authButton}
      title={textContent}
      aria-label={textContent}
      onClick={() => {
        dispatch(signinUserThroughOAuth(optionType));
      }}
    >
      {reactIcon}
      <span>{textContent}</span>
    </button>
  );
};

export default OAuthOptions;
