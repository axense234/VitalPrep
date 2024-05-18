// Data
import { homePageUrl, logoImageUrls } from "@/data";
// React
import { FC } from "react";
// Next
import Image from "next/image";
// SCSS
import logoStyles from "../../scss/components/shared/Logo.module.scss";
// Types
import LogoProps from "@/core/interfaces/LogoProps";
// Translations
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const Logo: FC<LogoProps> = ({ logoImageUrlIndex, dimensions, clickable }) => {
  const translate = useTranslations("pageLinks.labels");
  return (
    <Link
      href={clickable ? homePageUrl : "/"}
      title={clickable ? translate("/home") : "Vital Prep"}
      aria-label={clickable ? translate("/home") : "Vital Prep"}
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
