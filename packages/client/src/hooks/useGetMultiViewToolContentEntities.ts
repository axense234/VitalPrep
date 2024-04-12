// React
import { useEffect } from "react";
// Redix
import {
  selectLoadingGetUserDayTemplates,
  getAllUserDayTemplates,
  updateLoadingGetUserDayTemplates,
} from "@/redux/slices/dayTemplatesSlice";
import {
  selectLoadingGetProfile,
  selectLoadingGetOAuthProfile,
  selectEntityQueryValues,
} from "@/redux/slices/generalSlice";
import {
  selectLoadingGetUserIngredients,
  getAllUserIngredients,
  updateLoadingGetUserIngredients,
} from "@/redux/slices/ingredientsSlice";
import {
  selectLoadingGetUserInstanceTemplates,
  getAllUserInstanceTemplates,
  updateLoadingGetUserInstanceTemplates,
} from "@/redux/slices/instanceTemplatesSlice";
import {
  selectLoadingGetUserMealPrepPlans,
  getAllUserMealPrepPlans,
  updateLoadingGetUserMealPrepPlans,
} from "@/redux/slices/mealPrepPlansSlice";
import {
  selectLoadingGetUserRecipes,
  getAllUserRecipes,
  updateLoadingGetUserRecipes,
} from "@/redux/slices/recipesSlice";
import {
  selectLoadingGetUserUtensils,
  getAllUserUtensils,
  updateLoadingGetUserUtensils,
} from "@/redux/slices/utensilsSlice";
import { useAppDispatch, useAppSelector } from "./redux";

const useGetMultiViewToolContentEntities = (
  selectedEntityOption: string,
  profileId: string
) => {
  const dispatch = useAppDispatch();
  const entityQueryValues = useAppSelector(selectEntityQueryValues);

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
    switch (selectedEntityOption) {
      case "ingredient":
        if (
          loadingGetUserIngredients === "FAILED" ||
          loadingGetUserIngredients === "SUCCEDED"
        ) {
          dispatch(updateLoadingGetUserIngredients("IDLE"));
        }
        break;
      case "utensil":
        if (
          loadingGetUserUtensils === "FAILED" ||
          loadingGetUserUtensils === "SUCCEDED"
        ) {
          dispatch(updateLoadingGetUserUtensils("IDLE"));
        }
        break;
      case "recipe":
        if (
          loadingGetUserRecipes === "FAILED" ||
          loadingGetUserRecipes === "SUCCEDED"
        ) {
          dispatch(updateLoadingGetUserRecipes("IDLE"));
        }
        break;
      case "dayTemplate":
        if (
          loadingGetUserDayTemplates === "FAILED" ||
          loadingGetUserDayTemplates === "SUCCEDED"
        ) {
          dispatch(updateLoadingGetUserDayTemplates("IDLE"));
        }
        break;
      case "instanceTemplate":
        if (
          loadingGetUserInstanceTemplates === "FAILED" ||
          loadingGetUserInstanceTemplates === "SUCCEDED"
        ) {
          dispatch(updateLoadingGetUserInstanceTemplates("IDLE"));
        }
        break;
      case "mealPrepPlan":
        if (
          loadingGetUserMealPrepPlans === "FAILED" ||
          loadingGetUserMealPrepPlans === "SUCCEDED"
        ) {
          dispatch(updateLoadingGetUserMealPrepPlans("IDLE"));
        }
        break;
      default:
        break;
    }
  }, [entityQueryValues]);

  useEffect(() => {
    if (
      loadingGetUserIngredients === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "ingredient" &&
      profileId
    ) {
      dispatch(getAllUserIngredients({ userId: profileId, entityQueryValues }));
    }
    if (
      loadingGetUserUtensils === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "utensil" &&
      profileId
    ) {
      dispatch(getAllUserUtensils({ userId: profileId, entityQueryValues }));
    }
    if (
      loadingGetUserRecipes === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "recipe" &&
      profileId
    ) {
      dispatch(getAllUserRecipes({ userId: profileId, entityQueryValues }));
    }
    if (
      loadingGetUserDayTemplates === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "dayTemplate" &&
      profileId
    ) {
      dispatch(
        getAllUserDayTemplates({ userId: profileId, entityQueryValues })
      );
    }
    if (
      loadingGetUserInstanceTemplates === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "instanceTemplate" &&
      profileId
    ) {
      dispatch(
        getAllUserInstanceTemplates({ userId: profileId, entityQueryValues })
      );
    }
    if (
      loadingGetUserMealPrepPlans === "IDLE" &&
      loadingProfile &&
      selectedEntityOption === "mealPrepPlan" &&
      profileId
    ) {
      dispatch(
        getAllUserMealPrepPlans({ userId: profileId, entityQueryValues })
      );
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
    profileId,
  ]);
};

export default useGetMultiViewToolContentEntities;
