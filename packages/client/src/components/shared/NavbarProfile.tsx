// Next
import Image from "next/image";
// SCSS
import navbarProfileStyles from "../../scss/components/shared/Navbar.module.scss";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
// Data
import { defaultProfileImageUrl } from "@/data";
// Translations
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const NavbarProfile = () => {
  const profile = useAppSelector(selectProfile);
  const translate = useTranslations("navbar");

  if (!profile.email) {
    return null;
  }

  return (
    <div className={navbarProfileStyles.navbarProfileContainer}>
      <Link
        href="/profile"
        title={translate("navbarTitleTextContent")}
        aria-label={translate("navbarTitleTextContent")}
        className={navbarProfileStyles.profileImageContainer}
      >
        <Image
          src={profile.imageUrl || defaultProfileImageUrl}
          alt={translate("navbarImageAltTextContent")}
          width={64}
          height={64}
        />
      </Link>
      <h6>{profile.username || translate("navbarUsernameDefaultValue")}</h6>
    </div>
  );
};

export default NavbarProfile;
