// Data
import { OAuthOptionsContent } from "@/data";
// Types
import OAuthOptionContent from "@/core/types/OAuthOptionContent";
import OAuthOptionsProps from "@/core/interfaces/OAuthOptionsProps";
// React
import { FC } from "react";
// SCSS
import OAuthOptionsStyles from "../../scss/components/shared/OAuthOptions.module.scss";

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
  return (
    <button
      className={OAuthOptionsStyles.authButton}
      title={textContent}
      aria-label={textContent}
    >
      {reactIcon}
      <span>{textContent}</span>
    </button>
  );
};

export default OAuthOptions;
