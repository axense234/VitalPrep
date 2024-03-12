"use client";

// Data
import { OAuthOptionsContent } from "@/data";
// Types
import OAuthOptionContent from "@/core/types/OAuthOptionContent";
import OAuthOptionsProps from "@/core/interfaces/OAuthOptionsProps";
// React
import { FC } from "react";
// SCSS
import OAuthOptionsStyles from "../../scss/components/shared/OAuthOptions.module.scss";
// Next Auth
import { signIn } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getProfileJWT,
  getProfileOAuth,
  selectTemplateProfile,
  signupUser,
  signupUserOAuth,
  signupUserOAuthFull,
} from "@/redux/slices/generalSlice";

const OAuthOptions: FC<OAuthOptionsProps> = ({ type }) => {
  return (
    <div className={OAuthOptionsStyles.authContainer}>
      <p>-quick {type} with OAuth-</p>
      <ul className={OAuthOptionsStyles.authButtons}>
        {OAuthOptionsContent.map((option) => {
          return (
            <li key={option.id}>
              <OAuthOptionsButton {...option} />
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
}) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className={OAuthOptionsStyles.authButton}
      title={textContent}
      aria-label={textContent}
      onClick={() => {
        dispatch(signupUserOAuthFull(optionType));
      }}
    >
      {reactIcon}
      <span>{textContent}</span>
    </button>
  );
};

export default OAuthOptions;
