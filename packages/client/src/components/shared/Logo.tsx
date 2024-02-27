// Data
import { homePageUrl, logoUrl } from "@/data";
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
      <Image src={logoUrl} alt="Logo" width={100} height={100} />
    </Link>
  );
};

export default Logo;
