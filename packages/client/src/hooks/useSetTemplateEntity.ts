// React
import { useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "./redux";
import { State } from "@/redux/api/store";
import { updateNumberOfInstanceTemplates } from "@/redux/slices/mealPrepPlansSlice";
// Types
import EntityType from "@/core/types/entity/users/EntityType";
import LoadingStateType from "@/core/types/LoadingStateType";
import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
import transformEntitiesIntoIds from "@/helpers/transformEntitiesIntoIds";
// Types
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";

const useSetTemplateEntity = ({
  setTemplateEntity,
  interfaceType,
  entityId,
  entityType,
  loadingGetEntity,
  defaultTemplateEntity,
}: {
  setTemplateEntity: any;
  interfaceType: "create" | "update";
  entityType: EntityType;
  entityId: string;
  loadingGetEntity: LoadingStateType;
  defaultTemplateEntity: EntityTemplateType;
}) => {
  const dispatch = useAppDispatch();
  const entityFoundById = useAppSelector((state: State) =>
    selectEntityById(state, entityId, entityType)
  );

  console.log(
    entityFoundById,
    interfaceType,
    entityFoundById,
    loadingGetEntity
  );

  useEffect(() => {
    if (
      interfaceType === "update" &&
      entityFoundById &&
      loadingGetEntity === "SUCCEDED"
    ) {
      console.log("yes");
      if (entityType !== "ingredient" && entityType !== "utensil") {
        const updatedEntity = transformEntitiesIntoIds(
          entityFoundById,
          entityType
        );
        console.log("nhgawd");
        dispatch(setTemplateEntity(updatedEntity));
        if (entityType === "mealPrepPlan") {
          console.log(
            (updatedEntity as MealPrepPlanTemplate).instanceTemplatesTimings
          );
          dispatch(
            updateNumberOfInstanceTemplates(
              (updatedEntity as MealPrepPlanTemplate)?.instanceTemplatesTimings
                ?.length || 0
            )
          );
        }
      } else {
        console.log("lawod");
        dispatch(setTemplateEntity(entityFoundById));
      }
    }
  }, [loadingGetEntity, interfaceType]);

  useEffect(() => {
    if (interfaceType === "create") {
      dispatch(setTemplateEntity(defaultTemplateEntity));
      dispatch(updateNumberOfInstanceTemplates(0));
    }
  }, [interfaceType]);
};

export default useSetTemplateEntity;
