// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
// Data
import { defaultIngredientImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createIngredient,
  selectIngredientFormModalErrorMessage,
  selectLoadingCreateIngredient,
  selectTemplateIngredient,
  updateLoadingCreateIngredient,
  updateTemplateIngredient,
} from "@/redux/slices/ingredientsSlice";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
  selectTemplateImageUrl,
  setTemplateModalMessage,
} from "@/redux/slices/generalSlice";
// React
import { useEffect } from "react";

const CreateIngredientInterface = () => {
  const dispatch = useAppDispatch();
  const templateIngredient = useAppSelector(selectTemplateIngredient);
  const profile = useAppSelector(selectProfile);

  const loadingCreateIngredient = useAppSelector(selectLoadingCreateIngredient);
  const ingredientFormModalErrorMessage = useAppSelector(
    selectIngredientFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);
  const templateImageUrl = useAppSelector(selectTemplateImageUrl);

  useEffect(() => {
    if (loadingCreateIngredient === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(
        setTemplateModalMessage(
          `Successfully created ingredient: ${templateIngredient.name}.`
        )
      );
    } else if (loadingCreateIngredient === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(ingredientFormModalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateIngredient("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateIngredient]);

  useEffect(() => {
    if (loadingCloudinaryImage === "SUCCEDED") {
      dispatch(
        updateTemplateIngredient({ key: "imageUrl", value: templateImageUrl })
      );
    }
  }, [loadingCloudinaryImage]);

  return (
    <section className={createToolStyles.createInterface}>
      <PopupModal hasBorder={false} modalType="form" />
      <h2>Create Ingredient</h2>
      <form className={createToolStyles.createInterfaceForm}>
        <TextFormControl
          direction="row"
          entityProperty={templateIngredient.name}
          labelColor="#120A06"
          labelContent="Ingredient Name:"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateIngredient({ key: "name", value: e.target.value })
            )
          }
          required={true}
          type="text"
          inputHeight={36}
          labelFontSize={28}
        />
        <ImageFormControl
          labelColor="#120A06"
          labelContent="Ingredient Image:"
          direction="row"
          defaultImageUsedUrl={defaultIngredientImageUrl}
          entityPropertyLoadingStatus={loadingCloudinaryImage}
          entityProperty={templateIngredient.imageUrl as string}
          onEntityPropertyValueChange={(e) => {
            if (e.target.files) {
              dispatch(
                createCloudinaryImage({
                  entity: "ingredients",
                  imageFile: e.target.files[0],
                })
              );
            }
          }}
          labelFontSize={28}
        />
        <TextFormControl
          direction="row"
          entityProperty={templateIngredient.calories}
          labelColor="#120A06"
          labelContent="Calories(per 100g):"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateIngredient({
                key: "calories",
                value: e.target.valueAsNumber,
              })
            )
          }
          required={true}
          type="number"
          inputHeight={36}
          labelFontSize={28}
        />
        <TextFormControl
          direction="row"
          entityProperty={templateIngredient.proteins}
          labelColor="#120A06"
          labelContent="Protein(per 100g, in grams):"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateIngredient({
                key: "proteins",
                value: e.target.valueAsNumber,
              })
            )
          }
          required={true}
          type="number"
          inputHeight={36}
          labelFontSize={28}
        />
        <TextFormControl
          direction="row"
          entityProperty={templateIngredient.carbs}
          labelColor="#120A06"
          labelContent="Carbs(per 100g, in grams):"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateIngredient({
                key: "carbs",
                value: e.target.valueAsNumber,
              })
            )
          }
          required={true}
          type="number"
          inputHeight={36}
          labelFontSize={28}
        />
        <TextFormControl
          direction="row"
          entityProperty={templateIngredient.fats}
          labelColor="#120A06"
          labelContent="Fats(per 100g, in grams):"
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateIngredient({
                key: "fats",
                value: e.target.valueAsNumber,
              })
            )
          }
          required={true}
          type="number"
          inputHeight={36}
          labelFontSize={28}
        />
        <CheckboxFormControl
          direction="row"
          labelColor="#120A06"
          labelContent="Enabled?:"
          entityProperty={String(templateIngredient.enabled)}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateIngredient({
                key: "enabled",
                value: Boolean(e.target.value),
              })
            )
          }
          labelFontSize={28}
        />
        <PrimaryButton
          backgroundColor="#FFAE00"
          textColor="#120A06"
          content="Create Ingredient"
          type="functional"
          fontFamily="Cabin"
          fontSize={24}
          height={64}
          width={560}
          disabled={
            loadingCreateIngredient === "PENDING" ||
            loadingCloudinaryImage === "PENDING"
          }
          onClickFunction={(e) => {
            e.preventDefault();
            dispatch(
              createIngredient({
                templateIngredient: templateIngredient,
                userId: profile.id,
              })
            );
          }}
        />
      </form>
    </section>
  );
};

export default CreateIngredientInterface;
