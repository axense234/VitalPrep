// SCSS
import profileDetailsStyles from "../../../scss/pages/Profile.module.scss";
// Components
import EntityStatistics from "../entity/EntityStatistics";
import ProfileInfo from "./ProfileInfo";
// Redux
import { selectProfile } from "@/redux/slices/generalSlice";
import { useAppSelector } from "@/hooks/redux";

const ProfileDetails = () => {
  const profile = useAppSelector(selectProfile);
  return (
    <div className={profileDetailsStyles.profileDetails}>
      <ProfileInfo />
      <EntityStatistics
        statistics={[
          {
            id: 1,
            count: profile?.mealPrepLogs?.length || 0,
            entityType: "Meal Prep Logs",
            essence: "count",
          },
          {
            id: 2,
            count: profile?.mealPrepPlans?.length || 0,
            entityType: "Meal Prep Plans",
            essence: "count",
          },
          {
            id: 3,
            count: profile?.instanceTemplates?.length || 0,
            entityType: "Instance Templates",
            essence: "count",
          },
          {
            id: 4,
            count: profile?.dayTemplates?.length || 0,
            entityType: "Day Templates",
            essence: "count",
          },
          {
            id: 5,
            count: profile?.recipes?.length || 0,
            entityType: "Recipes",
            essence: "count",
          },
          {
            id: 6,
            count: profile?.ingredients?.length || 0,
            entityType: "Ingredients",
            essence: "count",
          },
          {
            id: 7,
            count: profile?.utensils?.length || 0,
            entityType: "Utensils",
            essence: "count",
          },
        ]}
      />
    </div>
  );
};

export default ProfileDetails;
