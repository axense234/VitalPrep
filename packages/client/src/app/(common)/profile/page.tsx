"use client";

import { defaultProfileImageUrl } from "@/data";
// React
import profileStyles from "../../../scss/pages/Profile.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
import {
  changeShowProfileEmail,
  selectProfile,
  selectShowProfileEmail,
} from "@/redux/slices/generalSlice";
// Next
import Image from "next/image";
// React Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Types
import UserType from "@/core/types/entity/UserType";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

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

const ProfileDetails = () => {
  const profile = useAppSelector(selectProfile);
  const profileAsProfileTemplate = profile as UserType;

  return (
    <section className={profileStyles.profileDetailsContainer}>
      <h2>Profile Details</h2>
      <div className={profileStyles.profileDetailsContent}>
        <h3>
          Number of <span>Ingredients: </span>
          {profileAsProfileTemplate?.ingredients?.length || 0}
        </h3>
        <h3>
          Number of <span>Utensils: </span>:{" "}
          {profileAsProfileTemplate?.utensils?.length || 0}
        </h3>
        <h3>
          Number of <span>Recipes: </span>{" "}
          {profileAsProfileTemplate?.recipes?.length || 0}
        </h3>
        <h3>
          Number of <span>Day Templates: </span>
          {profileAsProfileTemplate?.dayTemplates?.length || 0}
        </h3>
        <h3>
          Number of <span>Instance Templates: </span>{" "}
          {profileAsProfileTemplate?.instanceTemplates?.length || 0}
        </h3>
        <h3>
          Number of <span>Meal Prep Plans: </span>{" "}
          {profileAsProfileTemplate?.mealPrepPlans?.length || 0}
        </h3>
        <h3>
          Number of <span>Meal Prep Logs: </span>{" "}
          {profileAsProfileTemplate?.mealPrepLogs?.length || 0}
        </h3>
      </div>
    </section>
  );
};

export default Profile;
