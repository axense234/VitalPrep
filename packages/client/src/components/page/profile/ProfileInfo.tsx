// SCSS
import profileStyles from "../../../scss/pages/Profile.module.scss";
// Data
import { defaultProfileImageUrl } from "@/data";
// React Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Next
import Image from "next/image";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectProfile,
  selectShowProfileEmail,
} from "@/redux/slices/general/selectors";
import { changeShowProfileEmail } from "@/redux/slices/general/slice";
// Translations
import { useTranslations } from "next-intl";

const ProfileInfo = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const showProfileEmail = useAppSelector(selectShowProfileEmail);

  const hiddenProfileEmail = profile.email.replace(/[a-zA-Z0-9@.]/g, "*");

  const translate = useTranslations("profile.profileInfo");

  return (
    <section className={profileStyles.profileInfoContainer}>
      <Image
        alt={translate("profilelImageAlt")}
        src={profile.imageUrl || defaultProfileImageUrl}
        width={240}
        height={240}
      />
      <h4>{profile.username || translate("defaultProfileUsername")}</h4>
      <div className={profileStyles.profileInfoEmail}>
        {profile.email ? (
          <h6>{showProfileEmail ? profile.email : hiddenProfileEmail}</h6>
        ) : (
          <h6>{translate("defaultProfileEmail")}</h6>
        )}

        {showProfileEmail ? (
          <FaEye onClick={() => dispatch(changeShowProfileEmail(false))} />
        ) : (
          <FaEyeSlash onClick={() => dispatch(changeShowProfileEmail(true))} />
        )}
      </div>
      <h3>
        {profile.age
          ? translate("profileAge", { age: profile.age })
          : translate("defaultProfileAge")}
      </h3>
    </section>
  );
};

export default ProfileInfo;
