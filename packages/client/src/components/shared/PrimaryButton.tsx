// Types
import PrimaryButtonProps from "@/core/interfaces/PrimaryButtonProps";
// SCSS
import primaryButtonStyles from "../../scss/components/shared/PrimaryButton.module.scss";
// React
import { FC } from "react";
// NEXT
import Link from "next/link";

const PrimaryButton: FC<PrimaryButtonProps> = ({
  content,
  linkDest,
  type,
  disabled,
  onHoverContent,
  onClickFunction,
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
