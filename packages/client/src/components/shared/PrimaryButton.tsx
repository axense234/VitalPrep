// Types
import PrimaryButtonProps from "@/core/interfaces/PrimaryButtonProps";
// SCSS
import primaryButtonStyles from "../../scss/components/shared/PrimaryButton.module.scss";
// React
import { FC } from "react";
// NEXT
import Link from "next/link";

const PrimaryButton: FC<PrimaryButtonProps> = ({
  backgroundColor,
  fontSize,
  width,
  height,
  content,
  fontFamily,
  linkDest,
  type,
  disabled,
  onHoverContent,
  onClickFunction,
  textColor,
}) => {
  if (type === "link")
    return (
      <Link
        href={linkDest as string}
        title={content}
        aria-label={content}
        className={primaryButtonStyles.primaryButtonLink}
      >
        <button
          className={primaryButtonStyles.primaryButton}
          style={{
            backgroundColor,
            fontFamily,
            height,
            fontSize,
            width,
            color: textColor,
            fontWeight: 800,
          }}
          disabled={disabled}
        >
          {content}
        </button>
      </Link>
    );

  if (type === "functional") {
    return (
      <button
        className={primaryButtonStyles.primaryButton}
        title={onHoverContent || content}
        aria-label={onHoverContent || content}
        type="submit"
        style={{
          backgroundColor,
          fontFamily,
          height,
          fontSize,
          width,
          filter: disabled ? "brightness(0.5)" : "brightness(1)",
          cursor: disabled ? "initial" : "pointer",
          color: textColor,
          fontWeight: 800,
        }}
        disabled={disabled}
        onClick={onClickFunction}
      >
        {content}
      </button>
    );
  }

  return null;
};

export default PrimaryButton;
