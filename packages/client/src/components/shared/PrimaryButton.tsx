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
  height,
  content,
  fontFamily,
  linkDest,
  type,
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
          style={{ backgroundColor, fontFamily, height }}
        >
          {content}
        </button>
      </Link>
    );

  if (type === "functional") {
    <button
      className={primaryButtonStyles.primaryButton}
      style={{ backgroundColor, fontFamily, height }}
    >
      {content}
    </button>;
  }

  return null;
};

export default PrimaryButton;
