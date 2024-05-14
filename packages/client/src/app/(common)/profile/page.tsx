"use client";
// SCSS
import profileStyles from "../../../scss/pages/Profile.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import ProfileDetails from "@/components/page/profile/ProfileDetails";
import EntityInfoAppearances from "@/components/page/entity/EntityInfoAppearances";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";
// Helpers
import getLoadingProfile from "@/helpers/getLoadingProfile";

const Profile = () => {
  useAuthorization();

  const profile = useAppSelector(selectProfile);
  const loadingProfile = getLoadingProfile();

  return (
    <div className={profileStyles.profileContainer}>
      <PageTitle />
      {loadingProfile === "SUCCEDED" ? (
        <div className={profileStyles.profileContent}>
          <ProfileDetails />
          <EntityInfoAppearances
            profileEntity={profile}
            entityId={profile.id}
            entityType="profile"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
