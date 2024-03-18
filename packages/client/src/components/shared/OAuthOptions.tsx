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
import { useAppDispatch } from "@/hooks/redux";
// Redux
import { signinUserThroughOAuth } from "@/redux/slices/generalSlice";

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
  signUpTextContent,
  logInTextContent,
  reactIcon,
  pageType,
}) => {
  const dispatch = useAppDispatch();
  const buttonTextContent =
    pageType === "signup" ? signUpTextContent : logInTextContent;

  return (
    <button
      className={OAuthOptionsStyles.authButton}
      title={buttonTextContent}
      aria-label={buttonTextContent}
      onClick={() => {
        dispatch(
          signinUserThroughOAuth({
            providerName: optionType,
            pageType: pageType as "signup" | "login",
          })
        );
      }}
      type="button"
    >
      {reactIcon}
      <span>{buttonTextContent}</span>
    </button>
  );
};

export default OAuthOptions;
