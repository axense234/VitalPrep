// Next
import Image from "next/image";
import Link from "next/link";
// SCSS
import navbarProfileStyles from "../../scss/components/shared/Navbar.module.scss";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
// Data
import { defaultProfileImageUrl } from "@/data";

const NavbarProfile = () => {
  const profile = useAppSelector(selectProfile);
  console.log(profile);

  if (!profile.email) {
    return null;
  }

  return (
    <div className={navbarProfileStyles.navbarProfileContainer}>
      <Link
        href="/profile"
        title="Go to Profile"
        className={navbarProfileStyles.profileImageContainer}
      >
        <Image
          src={profile.imageUrl || defaultProfileImageUrl}
          alt="Profile Image"
          width={64}
          height={64}
        />
      </Link>
      <h6>{profile.username || "Username"}</h6>
    </div>
  );
};

export default NavbarProfile;
