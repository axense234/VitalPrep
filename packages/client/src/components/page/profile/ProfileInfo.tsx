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
  changeShowProfileEmail,
} from "@/redux/slices/generalSlice";

const ProfileInfo = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const showProfileEmail = useAppSelector(selectShowProfileEmail);

  const hiddenProfileEmail = profile.email.replace(/[a-zA-Z0-9@.]/g, "*");

  return (
    <section className={profileStyles.profileInfoContainer}>
      <Image
        alt="Profile Image"
        src={profile.imageUrl || defaultProfileImageUrl}
        width={640}
        height={640}
      />
      <h2>{profile.username || "Username"}</h2>
      <div className={profileStyles.profileInfoEmail}>
        {profile.email ? (
          <h3>{showProfileEmail ? profile.email : hiddenProfileEmail}</h3>
        ) : (
          <h3>"profileemail@gmail.com"</h3>
        )}

        {showProfileEmail ? (
          <FaEye onClick={() => dispatch(changeShowProfileEmail(false))} />
        ) : (
          <FaEyeSlash onClick={() => dispatch(changeShowProfileEmail(true))} />
        )}
      </div>
      <h3>{profile.age ? `${profile.age} years old` : "Unknown Age"}</h3>
    </section>
  );
};

export default ProfileInfo;
