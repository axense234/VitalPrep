// Data
import { homePageUrl, logoReservedDimensions, logoUrl } from "@/data";
// React
import { FC } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
// SCSS
import logoStyles from "../../scss/components/shared/Logo.module.scss";

const Logo: FC = () => {
  return (
    <Link href={homePageUrl} title="Home" className={logoStyles.logoContainer}>
      <Image
        src={logoUrl}
        alt="Logo"
        width={logoReservedDimensions}
        height={logoReservedDimensions}
      />
    </Link>
  );
};

export default Logo;
