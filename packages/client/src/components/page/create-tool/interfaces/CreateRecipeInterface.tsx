// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Data
import { defaultUtensilImageUrl } from "@/data";
// React
import { useEffect, useRef } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createUtensil,
  getAllUserUtensils,
  selectAllUtensils,
  selectAllUtensilsIds,
  selectLoadingGetUserUtensils,
  selectTemplateUtensil,
  selectUtensilFormModalErrorMessage,
  updateLoadingCreateUtensil,
  updateTemplateUtensil,
} from "@/redux/slices/utensilsSlice";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectLoadingGetOAuthProfile,
  selectLoadingGetProfile,
  selectProfile,
  selectTemplateImageUrl,
  setTemplateModalMessage,
} from "@/redux/slices/generalSlice";
import {
  selectLoadingCreateRecipe,
  selectRecipeFormModalErrorMessage,
  selectTemplateRecipe,
  updateLoadingCreateRecipe,
  updateTemplateRecipe,
} from "@/redux/slices/recipesSlice";
import {
  getAllUserIngredients,
  selectAllIngredients,
  selectAllIngredientsIds,
  selectLoadingGetUserIngredients,
} from "@/redux/slices/ingredientsSlice";
import SelectFormControl from "@/components/shared/form/SelectFormControl";

const CreateRecipeInterface = () => {
  const dispatch = useAppDispatch();
  const hasEffectRun = useRef(false);

  const ingredientsIds = useAppSelector(selectAllIngredientsIds);
  const utensilsIds = useAppSelector(selectAllUtensilsIds);

  const templateRecipe = useAppSelector(selectTemplateRecipe);
  const profile = useAppSelector(selectProfile);
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);

  const loadingCreateRecipe = useAppSelector(selectLoadingCreateRecipe);
  const recipeFormModalErrorMessage = useAppSelector(
    selectRecipeFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  const loadingGetUserIngredients = useAppSelector(
    selectLoadingGetUserIngredients
  );
  const loadingGetUserUtensils = useAppSelector(selectLoadingGetUserUtensils);

  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;

  useEffect(() => {
    if (
      loadingGetUserIngredients === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(getAllUserIngredients(profile.id));
    }
    if (
      loadingGetUserUtensils === "IDLE" &&
      loadingProfile &&
      !hasEffectRun.current
    ) {
      dispatch(getAllUserUtensils(profile.id));
    }
    hasEffectRun.current = true;
  }, [loadingGetUserIngredients, loadingGetUserUtensils, loadingProfile]);

  useEffect(() => {
    if (loadingCreateRecipe === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully created recipe: ${templateRecipe.name}.`
        )
      );
    } else if (loadingCreateRecipe === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(recipeFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateRecipe("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateRecipe]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateRecipe({ key: "imageUrl", value: templateImageUrl })
      );
    }
  }, [loadingCloudinaryImage]);

  return (
    <section className={createToolStyles.createInterface}>
      <PopupModal hasBorder={false} modalType="form" />
      <h2>Create Recipe</h2>
      <form className={createToolStyles.createInterfaceForm}>
        <TextFormControl
          direction="row"
          entityProperty={templateRecipe.name}
          labelColor="#120A06"
          labelContent="Recipe Name:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateUtensil({ key: "name", value: e.target.value })
            )
          }
          required={true}
          type="text"
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Recipe Image:"
          direction="row"
          defaultImageUsedUrl={defaultUtensilImageUrl}
          entityPropertyLoadingStatus={loadingCloudinaryImage}
          entityProperty={templateRecipe.imageUrl as string}
          onEntityPropertyValueChange={(e) => {
            if (e.target.files) {
              dispatch(
                createCloudinaryImage({
                  entity: "utensils",
                  imageFile: e.target.files[0],
                })
              );
            }
          }}
          labelFontSize={28}
        />
        <SelectFormControl
          labelColor="#120A06"
          labelContent="Ingredients:"
          required={true}
          entityProperty={ingredientsIds}
          entityTypeUsed="ingredient"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateRecipe({
                key: "ingredients",
                value: e.target.value,
              })
            )
          }
          labelFontSize={28}
          areOptionsLoading={loadingGetUserIngredients === "PENDING"}
        />
        <SelectFormControl
          labelColor="#120A06"
          labelContent="Utensils:"
          required={true}
          entityProperty={utensilsIds}
          entityTypeUsed="utensil"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateRecipe({
                key: "utensils",
                value: e.target.value,
              })
            )
          }
          labelFontSize={28}
          areOptionsLoading={loadingGetUserUtensils === "PENDING"}
        />
        <PrimaryButton
          backgroundColor="#FFAE00"
          textColor="#120A06"
          content="Create Recipe"
          type="functional"
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
          disabled={
            loadingCreateRecipe === "PENDING" ||
            loadingCloudinaryImage === "PENDING"
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(
              createUtensil({
                templateUtensil: templateRecipe,
                userId: profile.id,
              })
            );
          }}
        />
      </form>
    </section>
  );
};

export default CreateRecipeInterface;
