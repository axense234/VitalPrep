// SCSS
import TextFormControl from "@/components/shared/form/TextFormControl";
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
// Data
import { defaultIngredientImageUrl } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectTemplateIngredient,
  updateTemplateIngredient,
} from "@/redux/slices/ingredientsSlice";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
} from "@/redux/slices/generalSlice";

const CreateIngredientInterface = () => {
  const dispatch = useAppDispatch();
  const templateIngredient = useAppSelector(selectTemplateIngredient);
  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  return (
    <section className={createToolStyles.createInterface}>
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
        />
        <CheckboxFormControl
          direction="row"
          labelColor="#120A06"
          labelContent="Enabled?:"
          entityProperty={templateIngredient.enabled}
          onEntityPropertyValueChange={(e) =>
            dispatch(
              updateTemplateIngredient({
                key: "enabled",
                value: Boolean(e.target.value),
              })
            )
          }
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
          disabled={false}
          onClickFunction={() => {}}
        />
      </form>
    </section>
  );
};

export default CreateIngredientInterface;
