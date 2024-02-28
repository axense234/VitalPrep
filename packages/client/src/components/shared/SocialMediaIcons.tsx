// Next
import Image from "next/image";
import Link from "next/link";
// SCSS
import socialMediaIconsStyles from "../../scss/components/shared/SocialMediaIcons.module.scss";
// Types
import SocialMediaIconProps from "@/core/interfaces/SocialMediaIconProps";
// React
import { FC } from "react";
// Data
import { socialMediaIconReservedDimensions, socialMediaIcons } from "@/data";

const SocialMediaIcons = () => {
  return (
    <ul className={socialMediaIconsStyles.socialMediaIconsList}>
      {socialMediaIcons.map((socialMediaIcon) => {
        return (
          <li key={socialMediaIcon.id}>
            <SocialMediaIcon {...socialMediaIcon} />
          </li>
        );
      })}
    </ul>
  );
};

const SocialMediaIcon: FC<SocialMediaIconProps> = ({
  linkDest,
  linkIconUrl,
  linkTitle,
}) => {
  return (
    <Link
      href={linkDest}
      title={linkTitle}
      aria-label={linkTitle}
      className={socialMediaIconsStyles.socialMediaIcon}
    >
      <Image
        src={linkIconUrl}
        alt={linkTitle}
        width={socialMediaIconReservedDimensions}
        height={socialMediaIconReservedDimensions}
      />
    </Link>
  );
};

export default SocialMediaIcons;
