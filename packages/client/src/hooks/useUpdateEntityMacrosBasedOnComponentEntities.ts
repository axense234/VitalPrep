// React
import { useEffect } from "react";
// Redux
import { useAppDispatch } from "./redux";
import { Selector } from "react-redux";
import { State } from "@/redux/api/store";
import { UnknownAction } from "@reduxjs/toolkit";
// Types
import EntityTemplateWithMacrosType from "@/core/types/entity/EntityTemplateWithMacrosType";
import { Macros } from "@prisma/client";
// Helpers and Hooks
import calculateEntityMacrosBasedOnComponents from "@/helpers/calculateEntityMacrosBasedOnComponents";
import useGetEntitiesBasedOnEntitiesIds from "./useGetEntitiesBasedOnEntitiesIds";

const useUpdateEntityMacrosBasedOnComponentEntities = (
  allEntitiesSelector: Selector<State, EntityTemplateWithMacrosType[]>,
  entitiesIds: string[],
  updateTemplateEntityReducer: (payload: any) => UnknownAction
) => {
  const dispatch = useAppDispatch();
  const entitiesBasedOnEntitiesIds = useGetEntitiesBasedOnEntitiesIds(
    allEntitiesSelector,
    entitiesIds
  );

  useEffect(() => {
    dispatch(
      updateTemplateEntityReducer({
        key: "macros",
        value: calculateEntityMacrosBasedOnComponents(
          entitiesBasedOnEntitiesIds.map((entity) => entity?.macros as Macros)
        ),
      })
    );
  }, [entitiesIds]);
};

export default useUpdateEntityMacrosBasedOnComponentEntities;
