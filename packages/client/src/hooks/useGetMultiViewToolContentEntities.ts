// Redux
import { selectLoadingGetUserDayTemplates } from "@/redux/slices/dayTemplates/selectors";
import { updateLoadingGetUserDayTemplates } from "@/redux/slices/dayTemplates/slice";
import { getAllUserDayTemplates } from "@/redux/slices/dayTemplates/thunks";
import {
  selectSelectedEntityOption,
  selectEntityQueryValues,
} from "@/redux/slices/general/selectors";
import { selectLoadingGetUserIngredients } from "@/redux/slices/ingredients/selectors";
import { updateLoadingGetUserIngredients } from "@/redux/slices/ingredients/slice";
import { getAllUserIngredients } from "@/redux/slices/ingredients/thunks";
import { selectLoadingGetUserInstanceTemplates } from "@/redux/slices/instanceTemplates/selectors";
import { updateLoadingGetUserInstanceTemplates } from "@/redux/slices/instanceTemplates/slice";
import { getAllUserInstanceTemplates } from "@/redux/slices/instanceTemplates/thunks";
import { selectLoadingGetUserMealPrepPlans } from "@/redux/slices/mealPrepPlans/selectors";
import { updateLoadingGetUserMealPrepPlans } from "@/redux/slices/mealPrepPlans/slice";
import { getAllUserMealPrepPlans } from "@/redux/slices/mealPrepPlans/thunks";
import { selectLoadingGetUserRecipes } from "@/redux/slices/recipes/selectors";
import { updateLoadingGetUserRecipes } from "@/redux/slices/recipes/slice";
import { getAllUserRecipes } from "@/redux/slices/recipes/thunks";
import { selectLoadingGetUserUtensils } from "@/redux/slices/utensils/selectors";
import { updateLoadingGetUserUtensils } from "@/redux/slices/utensils/slice";
import { getAllUserUtensils } from "@/redux/slices/utensils/thunks";
import { useAppSelector } from "./redux";
// Hooks
import useGetEntityComponents from "./useGetEntityComponents";

const useGetMultiViewToolContentEntities = () => {
  const selectedEntityOption = useAppSelector(selectSelectedEntityOption);
  const entityQueryValues = useAppSelector(selectEntityQueryValues);

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

  useGetEntityComponents(
    loadingGetUserMealPrepPlans,
    getAllUserMealPrepPlans,
    selectedEntityOption === "mealPrepPlan",
    entityQueryValues,
    true,
    updateLoadingGetUserMealPrepPlans
  );
  useGetEntityComponents(
    loadingGetUserInstanceTemplates,
    getAllUserInstanceTemplates,
    selectedEntityOption === "instanceTemplate",
    entityQueryValues,
    true,
    updateLoadingGetUserInstanceTemplates
  );
  useGetEntityComponents(
    loadingGetUserDayTemplates,
    getAllUserDayTemplates,
    selectedEntityOption === "dayTemplate",
    entityQueryValues,
    true,
    updateLoadingGetUserDayTemplates
  );
  useGetEntityComponents(
    loadingGetUserRecipes,
    getAllUserRecipes,
    selectedEntityOption === "recipe",
    entityQueryValues,
    true,
    updateLoadingGetUserRecipes
  );
  useGetEntityComponents(
    loadingGetUserUtensils,
    getAllUserUtensils,
    selectedEntityOption === "utensil",
    entityQueryValues,
    true,
    updateLoadingGetUserUtensils
  );
  useGetEntityComponents(
    loadingGetUserIngredients,
    getAllUserIngredients,
    selectedEntityOption === "ingredient",
    entityQueryValues,
    true,
    updateLoadingGetUserIngredients
  );
};

export default useGetMultiViewToolContentEntities;
