"use client";
// SCSS
import profileStyles from "../../../scss/pages/Profile.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";
import ProfileDetails from "@/components/page/profile/ProfileDetails";
import EntityInfoAppearances from "@/components/page/entity/EntityInfoAppearances";
// Redux
import { useAppSelector } from "@/hooks/redux";
import {
  selectLoadingGetOAuthProfile,
  selectLoadingGetProfile,
  selectProfile,
} from "@/redux/slices/generalSlice";

const Profile = () => {
  useAuthorization();

  const profile = useAppSelector(selectProfile);
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);
  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/profile");

  return (
    <div className={profileStyles.profileContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
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
