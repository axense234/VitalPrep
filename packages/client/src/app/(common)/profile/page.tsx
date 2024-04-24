"use client";
// SCSS
import profileStyles from "../../../scss/pages/Profile.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import ProfileDetails from "@/components/page/profile/ProfileDetails";
import ProfileInfo from "@/components/page/profile/ProfileInfo";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const Profile = () => {
  useAuthorization();

  return (
    <div className={profileStyles.profileContainer}>
      <PageTitle
        titleContent="Profile"
        subtitleContent="view your profile details"
      />
      <div className={profileStyles.profileContent}>
        <ProfileInfo />
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Profile;
