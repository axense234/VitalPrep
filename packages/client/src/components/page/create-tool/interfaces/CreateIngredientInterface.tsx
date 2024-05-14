// SCSS
import createToolStyles from "../../../../scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import CheckboxFormControl from "@/components/shared/form/CheckboxFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import EntityPreview from "@/components/shared/entity/EntityPreview";
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
  updateTemplateIngredientMacros,
} from "@/redux/slices/ingredientsSlice";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
} from "@/redux/slices/generalSlice";
// Hooks
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";

const CreateIngredientInterface = () => {
  const dispatch = useAppDispatch();

  const templateIngredient = useAppSelector(selectTemplateIngredient);
  const profile = useAppSelector(selectProfile);

  const loadingCreateIngredient = useAppSelector(selectLoadingCreateIngredient);
  const ingredientFormModalErrorMessage = useAppSelector(
    selectIngredientFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  useShowCreatedEntity(
    loadingCreateIngredient,
    `Successfully created ingredient: ${templateIngredient.name}.`,
    ingredientFormModalErrorMessage,
    updateLoadingCreateIngredient
  );
  useUpdateEntityTemplateImageUrl(updateTemplateIngredient);

  return (
    <section className={createToolStyles.createInterface}>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={true} modalType="form" />
          <h4>Create Ingredient</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={templateIngredient.name}
              labelContent="Name:"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateIngredient({
                    key: "name",
                    value: e.target.value,
                  })
                )
              }
              type="text"
            />
            <ImageFormControl
              labelContent="Image:"
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
              entityProperty={templateIngredient.macros.calories}
              labelContent="Calories(per 100g):"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateIngredientMacros({
                    key: "calories",
                    value: e.target.valueAsNumber,
                  })
                )
              }
              type="number"
            />
            <TextFormControl
              entityProperty={templateIngredient.macros.proteinAmount}
              labelContent="Protein(in grams):"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateIngredientMacros({
                    key: "proteinAmount",
                    value: e.target.valueAsNumber,
                  })
                )
              }
              type="number"
            />
            <TextFormControl
              entityProperty={templateIngredient.macros.carbsAmount}
              labelColor="#120A06"
              labelContent="Carbs(in grams):"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateIngredientMacros({
                    key: "carbsAmount",
                    value: e.target.valueAsNumber,
                  })
                )
              }
              type="number"
            />
            <TextFormControl
              entityProperty={templateIngredient.macros.fatsAmount}
              labelContent="Fats(in grams):"
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateIngredientMacros({
                    key: "fatsAmount",
                    value: e.target.valueAsNumber,
                  })
                )
              }
              type="number"
            />
            <CheckboxFormControl
              labelContent="Enabled?:"
              entityProperty={String(templateIngredient.enabled)}
              onEntityPropertyValueChange={(e) =>
                dispatch(
                  updateTemplateIngredient({
                    key: "enabled",
                    value: e.target.value === "true" ? false : true,
                  })
                )
              }
            />
            <PrimaryButton
              content="Create Ingredient"
              type="functional"
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
        </div>
        <EntityPreview
          entity={templateIngredient}
          entityType="ingredient"
          type="preview"
        />
      </div>
    </section>
  );
};

export default CreateIngredientInterface;
