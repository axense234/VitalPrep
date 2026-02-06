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
import { signinUserThroughOAuth } from "@/redux/slices/general/thunks";
// Translations
import { useLocale, useTranslations } from "next-intl";

const OAuthOptions: FC<OAuthOptionsProps> = ({ type }) => {
  const OAuthTranslations = useTranslations(`${type}.oauth`);

  return (
    <div className={OAuthOptionsStyles.authContainer}>
      <p>{OAuthTranslations("firstMessage")}</p>
      <ul className={OAuthOptionsStyles.authButtons}>
        {OAuthOptionsContent.map((option) => {
          return (
            <li key={option.id}>
              <OAuthOptionsButton {...option} pageType={type} />
            </li>
          );
        })}
      </ul>
      <p>{OAuthTranslations("secondMessage")}</p>
    </div>
  );
};

const OAuthOptionsButton: FC<OAuthOptionContent> = ({
  optionType,
  reactIcon,
  pageType,
}) => {
  const dispatch = useAppDispatch();
  const OAuthButtonsTranslations = useTranslations(`${pageType}.oauth.buttons`);
  const locale = useLocale();

  return (
    <button
      className={OAuthOptionsStyles.authButton}
      title={OAuthButtonsTranslations(optionType)}
      aria-label={OAuthButtonsTranslations(optionType)}
      onClick={() => {
        dispatch(
          signinUserThroughOAuth({
            providerName: optionType,
            pageType: pageType as "signup" | "login",
            locale,
          })
        );
      }}
      type="button"
    >
      {reactIcon}
      <span>{OAuthButtonsTranslations(optionType)}</span>
    </button>
  );
};

export default OAuthOptions;
