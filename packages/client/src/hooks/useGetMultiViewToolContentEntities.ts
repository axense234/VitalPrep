// React
import { useEffect } from "react";
// Redix
import {
  selectLoadingGetUserDayTemplates,
  getAllUserDayTemplates,
} from "@/redux/slices/dayTemplatesSlice";
import {
  selectProfile,
  selectLoadingGetProfile,
  selectLoadingGetOAuthProfile,
} from "@/redux/slices/generalSlice";
import {
  selectLoadingGetUserIngredients,
  getAllUserIngredients,
} from "@/redux/slices/ingredientsSlice";
import {
  selectLoadingGetUserInstanceTemplates,
  getAllUserInstanceTemplates,
} from "@/redux/slices/instanceTemplatesSlice";
import {
  selectLoadingGetUserMealPrepPlans,
  getAllUserMealPrepPlans,
} from "@/redux/slices/mealPrepPlansSlice";
import {
  selectLoadingGetUserRecipes,
  getAllUserRecipes,
} from "@/redux/slices/recipesSlice";
import {
  selectLoadingGetUserUtensils,
  getAllUserUtensils,
} from "@/redux/slices/utensilsSlice";
import { useAppDispatch, useAppSelector } from "./redux";

const useGetMultiViewToolContentEntities = (selectedEntityOption: string) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  console.log(profile);

  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);
  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;

  const loadingGetUserIngredients = useAppSelector(
    selectLoadingGetUserIngredients
  );
  const loadingGetUserUtensils = useAppSelector(selectLoadingGetUserUtensils);
  const loadingGetUserRecipes = useAppSelector(selectLoadingGetUserRecipes);
  const loadingGetUserDayTemplates = useAppSelector(
    selectLoadingGetUserDayTemplates
  );
  const loadingGetUserInstanceTemplates = useAppSelector(
    selectLoadingGetUserInstanceTemplates
  );
  const loadingGetUserMealPrepPlans = useAppSelector(
    selectLoadingGetUserMealPrepPlans
  );
  useEffect(() => {
    if (
      loadingGetUserIngredients === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "ingredient"
    ) {
      dispatch(getAllUserIngredients(profile.id));
    }
    if (
      loadingGetUserUtensils === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "utensil"
    ) {
      dispatch(getAllUserUtensils(profile.id));
    }
    if (
      loadingGetUserRecipes === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "recipe"
    ) {
      dispatch(getAllUserRecipes(profile.id));
    }
    if (
      loadingGetUserDayTemplates === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "dayTemplate"
    ) {
      dispatch(getAllUserDayTemplates(profile.id));
    }
    if (
      loadingGetUserInstanceTemplates === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "instanceTemplate"
    ) {
      dispatch(getAllUserInstanceTemplates(profile.id));
    }
    if (
      loadingGetUserMealPrepPlans === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "mealPrepPlan"
    ) {
      dispatch(getAllUserMealPrepPlans(profile.id));
    }
  }, [
    loadingProfile,
    selectedEntityOption,
    loadingGetUserIngredients,
    loadingGetUserUtensils,
    loadingGetUserRecipes,
    loadingGetUserDayTemplates,
    loadingGetUserInstanceTemplates,
    loadingGetUserMealPrepPlans,
    profile.id,
  ]);
};

export default useGetMultiViewToolContentEntities;
