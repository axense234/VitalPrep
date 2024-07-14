// SCSS
import activeMealPrepPlanStyles from "@/scss/components/layout/ActiveMealPrepPlan.module.scss";
// Next
import Image from "next/image";
// React
import { useEffect, useRef, useState } from "react";
// Data
import { defaultMealPrepPlanImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectProfile,
  selectSelectedEntityOption,
} from "@/redux/slices/general/selectors";
import { setTypeOfUpdateAccountQuery } from "@/redux/slices/general/slice";
import { updateUser } from "@/redux/slices/general/thunks";
import {
  selectLoadingGetUserMealPrepPlans,
  selectAllMealPrepPlans,
} from "@/redux/slices/mealPrepPlans/selectors";
import { getAllUserMealPrepPlans } from "@/redux/slices/mealPrepPlans/thunks";
// Helpers and Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import getLoadingProfile from "@/helpers/getLoadingProfile";
import useGetEntityComponents from "@/hooks/useGetEntityComponents";
import useSetInitialActiveMealPrepPlan from "@/hooks/useSetInitialActiveMealPrepPlan";
import useActiveMealPrepPlanTransition from "@/hooks/useActiveMealPrepPlanTransition";
// Translations
import { useTranslations } from "next-intl";

const ActiveMealPrepPlan = () => {
  const dispatch = useAppDispatch();
  const [showActiveMealPrepPlan, setShowActiveMealPrepPlan] =
    useState<boolean>(false);
  const activeMealPrepPlanRef = useRef<HTMLDivElement | null>(null);

  const translate = useTranslations("activeMealPrepPlan");

  const profile = useAppSelector(selectProfile);

  const loadingProfile = getLoadingProfile();
  const loadingGetUserMealPrepPlans = useAppSelector(
    selectLoadingGetUserMealPrepPlans
  );

  const selectedEntityOption = useAppSelector(selectSelectedEntityOption);

  const mealPrepPlans = useAppSelector(selectAllMealPrepPlans);

  let windowWidth = useGetWindowWidth();
  let tabletOrPhoneRedesign = windowWidth && windowWidth <= 500;

  const activeMealPrepPlan = mealPrepPlans.find(
    (mpp) => mpp.id === profile.mealPrepPlanInUseId
  );

  useSetInitialActiveMealPrepPlan(
    loadingProfile,
    profile,
    mealPrepPlans,
    dispatch
  );

  useGetEntityComponents(
    loadingGetUserMealPrepPlans,
    getAllUserMealPrepPlans,
    selectedEntityOption !== "mealPrepPlan"
  );

  useActiveMealPrepPlanTransition(
    mealPrepPlans,
    activeMealPrepPlanRef,
    showActiveMealPrepPlan,
    tabletOrPhoneRedesign as boolean
  );

  if (mealPrepPlans.length < 1) {
    return null;
  }

  return (
    <div
      className={activeMealPrepPlanStyles.activeMealPrepPlanContainer}
      ref={activeMealPrepPlanRef}
    >
      <div className={activeMealPrepPlanStyles.activeMealPrepPlanSettings}>
        <label htmlFor="activeMealPrepPlan">
          {translate("selectMealPrepPlanTitle")}
        </label>
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
        {tabletOrPhoneRedesign ? null : <h3>{activeMealPrepPlan?.name}</h3>}
        <Image
          width={80}
          height={80}
          alt={activeMealPrepPlan?.name || "Meal Prep Plan Image"}
          src={activeMealPrepPlan?.imageUrl || defaultMealPrepPlanImageUrl}
          onClick={() => setShowActiveMealPrepPlan(!showActiveMealPrepPlan)}
          title={translate(
            showActiveMealPrepPlan
              ? "hideMealPrepPlanTitle"
              : "showMealPrepPlanTitle"
          )}
          aria-label={translate(
            showActiveMealPrepPlan
              ? "hideMealPrepPlanTitle"
              : "showMealPrepPlanTitle"
          )}
        />
      </div>
    </div>
  );
};

export default ActiveMealPrepPlan;
