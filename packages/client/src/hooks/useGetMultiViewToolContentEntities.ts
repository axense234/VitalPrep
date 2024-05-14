// Redux
import {
  selectLoadingGetUserDayTemplates,
  getAllUserDayTemplates,
  updateLoadingGetUserDayTemplates,
} from "@/redux/slices/dayTemplatesSlice";
import {
  selectEntityQueryValues,
  selectSelectedEntityOption,
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
