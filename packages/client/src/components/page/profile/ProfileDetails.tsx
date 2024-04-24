// SCSS
import profileStyles from "../../../scss/pages/Profile.module.scss";
// Types
import UserType from "@/core/types/entity/UserType";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectProfile } from "@/redux/slices/generalSlice";

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

export default ProfileDetails;
