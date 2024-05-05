// Data
import { homePageUrl, logoImageUrls } from "@/data";
// React
import { FC } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// SCSS
import logoStyles from "../../scss/components/shared/Logo.module.scss";
// Types
import LogoProps from "@/core/interfaces/LogoProps";

const Logo: FC<LogoProps> = ({ logoImageUrlIndex, dimensions, clickable }) => {
  return (
    <Link
      href={clickable ? homePageUrl : "/"}
      title={clickable ? "Home" : "Vital Prep"}
      className={logoStyles.logoContainer}
      style={{ width: dimensions, height: dimensions }}
    >
      <Image
        src={
          logoImageUrls.find((imageUrl) => imageUrl.id === logoImageUrlIndex)
            ?.imageUrl || logoImageUrls[0].imageUrl
        }
        alt="Logo"
        width={dimensions | 80}
        height={dimensions | 80}
      />
    </Link>
  );
};

export default Logo;
