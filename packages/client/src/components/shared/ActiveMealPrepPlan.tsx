// SCSS
import activeMealPrepPlanStyles from "../../scss/components/shared/ActiveMealPrepPlan.module.scss";
// Next
import Image from "next/image";
// Data
import { defaultEntityQueryValues, defaultMealPrepPlanImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectLoadingGetOAuthProfile,
  selectLoadingGetProfile,
  selectProfile,
  setTypeOfUpdateAccountQuery,
  updateUser,
} from "@/redux/slices/generalSlice";
import { useEffect, useRef, useState } from "react";
import {
  getAllUserMealPrepPlans,
  selectAllMealPrepPlans,
  selectLoadingGetUserMealPrepPlans,
} from "@/redux/slices/mealPrepPlansSlice";

const ActiveMealPrepPlan = () => {
  const dispatch = useAppDispatch();
  const [showActiveMealPrepPlan, setShowActiveMealPrepPlan] =
    useState<boolean>(false);
  const activeMealPrepPlanRef = useRef<HTMLDivElement | null>(null);

  const profile = useAppSelector(selectProfile);
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);

  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;

  const loadingGetUserMealPrepPlans = useAppSelector(
    selectLoadingGetUserMealPrepPlans
  );

  const mealPrepPlans = useAppSelector(selectAllMealPrepPlans);

  const activeMealPrepPlan = mealPrepPlans.find(
    (mpp) => mpp.id === profile.mealPrepPlanInUseId
  );

  useEffect(() => {
    if (
      loadingGetUserMealPrepPlans === "IDLE" &&
      loadingProfile === "SUCCEDED" &&
      profile.id
    ) {
      dispatch(
        getAllUserMealPrepPlans({
          entityQueryValues: defaultEntityQueryValues,
          userId: profile.id,
        })
      );
    }
  }, [loadingGetUserMealPrepPlans, loadingProfile, profile.id]);

  useEffect(() => {
    const activeMealPrepPlanContainer =
      activeMealPrepPlanRef.current as HTMLDivElement;
    if (showActiveMealPrepPlan) {
      activeMealPrepPlanContainer.style.transform = "translateX(0%)";
    } else if (!showActiveMealPrepPlan) {
      activeMealPrepPlanContainer.style.transform = "translateX(-80%)";
    }
  }, [showActiveMealPrepPlan, setShowActiveMealPrepPlan]);

  if (loadingProfile !== "SUCCEDED" && mealPrepPlans.length > 0) {
    return null;
  }

  return (
    <div
      className={activeMealPrepPlanStyles.activeMealPrepPlanContainer}
      ref={activeMealPrepPlanRef}
    >
      <div className={activeMealPrepPlanStyles.activeMealPrepPlanSettings}>
        <label htmlFor="activeMealPrepPlan">Select MPP</label>
        <select
          name="activeMealPrepPlan"
          id="activeMealPrepPlan"
          value={profile.mealPrepPlanInUseId}
          onChange={(e) => {
            dispatch(setTypeOfUpdateAccountQuery("mealPrepPlanUsed"));
            dispatch(
              updateUser({
                typeOfUpdate: "mealPrepPlanUsed",
                userTemplate: {
                  ...profile,
                  mealPrepPlanInUseId: e.target.value,
                },
              })
            );
          }}
        >
          {mealPrepPlans?.map((mpp) => {
            return (
              <option key={mpp.id} value={mpp.id}>
                {mpp.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={activeMealPrepPlanStyles.activeMealPrepPlanContent}>
        <h3>{activeMealPrepPlan?.name}</h3>
        <Image
          width={80}
          height={80}
          alt={activeMealPrepPlan?.name || "Meal Prep Plan Image"}
          src={activeMealPrepPlan?.imageUrl || defaultMealPrepPlanImageUrl}
          onClick={() => setShowActiveMealPrepPlan(!showActiveMealPrepPlan)}
        />
      </div>
    </div>
  );
};

export default ActiveMealPrepPlan;
