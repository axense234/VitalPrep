// SCSS
import createToolStyles from "@/scss/pages/CreateTool.module.scss";
// Components
import TextFormControl from "@/components/shared/form/TextFormControl";
import PrimaryButton from "@/components/shared/PrimaryButton";
import ImageFormControl from "@/components/shared/form/ImageFormControl";
import PopupModal from "@/components/shared/modals/PopupModal";
import EntityPreview from "@/components/shared/entity/EntityPreview";
// Translations
import { useTranslations } from "next-intl";
// React
import React, { FC } from "react";
// Next
import { useParams } from "next/navigation";
// Data
import { defaultIngredientImageUrl, defaultTemplateIngredient } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createIngredient,
  selectIngredientFormModalErrorMessage,
  selectLoadingCreateIngredient,
  selectLoadingGetUserIngredient,
  selectLoadingUpdateIngredient,
  selectTemplateIngredient,
  setTemplateIngredient,
  updateIngredient,
  updateLoadingCreateIngredient,
  updateLoadingUpdateIngredient,
  updateTemplateIngredient,
  updateTemplateIngredientMacros,
} from "@/redux/slices/ingredientsSlice";
import {
  createCloudinaryImage,
  selectLoadingCloudinaryImage,
  selectProfile,
} from "@/redux/slices/generalSlice";
// Hooks and Helpers
import useShowCreatedEntity from "@/hooks/useShowCreatedEntity";
import useUpdateEntityTemplateImageUrl from "@/hooks/useUpdateEntityTemplateImageUrl";
import useSetDefaultEntityName from "@/hooks/useSetDefaultEntityName";
import useSetTemplateEntity from "@/hooks/useSetTemplateEntity";
import useGetUpsertEntityInterfaceDetails from "@/hooks/useGetUpsertEntityInterfaceDetails";
import handleOnUpsertEntitySubmit from "@/helpers/handleOnUpsertEntitySubmit";

const UpsertIngredientInterface: FC<{
  interfaceType: "create" | "update";
}> = ({ interfaceType }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const templateIngredient = useAppSelector(selectTemplateIngredient);
  const profile = useAppSelector(selectProfile);

  const loadingCreateIngredient = useAppSelector(selectLoadingCreateIngredient);
  const loadingUpdateIngredient = useAppSelector(selectLoadingUpdateIngredient);
  const loadingGetIngredient = useAppSelector(selectLoadingGetUserIngredient);

  const ingredientFormModalErrorMessage = useAppSelector(
    selectIngredientFormModalErrorMessage
  );

  const loadingCloudinaryImage = useAppSelector(selectLoadingCloudinaryImage);

  const translate = useTranslations("createTool.formLabels.ingredient");

  const handleOnUpsertEntity = (e: React.SyntheticEvent) => {
    handleOnUpsertEntitySubmit(
      e,
      interfaceType,
      () =>
        dispatch(
          createIngredient({
            templateIngredient,
            userId: profile.id,
          })
        ),
      () =>
        dispatch(
          updateIngredient({
            templateIngredient,
            userId: profile.id,
          })
        )
    );
  };

  const {
    loadingUpsertEntity,
    updateLoadingUpsertEntity,
    usedButtonLabel,
    usedSectionTitle,
  } = useGetUpsertEntityInterfaceDetails({
    interfaceType: interfaceType,
    loadingCreateEntity: loadingCreateIngredient,
    loadingUpdateEntity: loadingUpdateIngredient,
    translate: translate,
    updateLoadingCreateEntity: updateLoadingCreateIngredient,
    updateLoadingUpdateEntity: updateLoadingUpdateIngredient,
  });

  useSetTemplateEntity({
    defaultTemplateEntity: defaultTemplateIngredient,
    entityId: id as string,
    entityType: "ingredient",
    interfaceType: interfaceType,
    loadingGetEntity: loadingGetIngredient,
    setTemplateEntity: setTemplateIngredient,
  });

  useSetDefaultEntityName(
    () =>
      dispatch(
        updateTemplateIngredient({
          key: "name",
          value: translate("defaultNameValue"),
        })
      ),
    templateIngredient,
    interfaceType === "create"
  );

  useShowCreatedEntity(
    loadingUpsertEntity,
    `Successfully ${interfaceType === "create" ? "created" : "updated"} ingredient: ${templateIngredient.name}.`,
    ingredientFormModalErrorMessage,
    updateLoadingUpsertEntity
  );
  useUpdateEntityTemplateImageUrl(updateTemplateIngredient);

  return (
    <section className={createToolStyles.createInterface}>
      <h2>{usedSectionTitle}</h2>
      <div className={createToolStyles.createInterfaceWrapper}>
        <div className={createToolStyles.createInterfaceFormContainer}>
          <PopupModal hasBorder={true} modalType="form" />
          <h4>{translate("formTitle")}</h4>
          <form className={createToolStyles.createInterfaceForm}>
            <TextFormControl
              entityProperty={
                templateIngredient.name || translate("defaultNameValue")
              }
              labelContent={translate("name")}
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
              labelContent={translate("image")}
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
              labelContent={translate("calories")}
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
              labelContent={translate("proteinAmount")}
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
              labelContent={translate("carbsAmount")}
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
              labelContent={translate("fatsAmount")}
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
            <PrimaryButton
              content={usedButtonLabel}
              type="functional"
              disabled={
                loadingCreateIngredient === "PENDING" ||
                loadingUpdateIngredient === "PENDING" ||
                loadingCloudinaryImage === "PENDING"
              }
              onClickFunction={(e) => {
                handleOnUpsertEntity(e);
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

export default UpsertIngredientInterface;
