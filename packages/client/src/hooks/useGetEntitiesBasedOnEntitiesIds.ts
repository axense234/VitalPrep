// Types
import EntityTemplateWithMacrosType from "@/core/types/entity/EntityTemplateWithMacrosType";
// Redux
import { State } from "@/redux/api/store";
import { Selector } from "react-redux";
import { useAppSelector } from "./redux";

const useGetEntitiesBasedOnEntitiesIds = (
  allEntitiesSelector: Selector<State, EntityTemplateWithMacrosType[]>,
  entitiesIds: string[]
) => {
  const entitiesBasedOnEntitiesIds = useAppSelector(allEntitiesSelector).filter(
    (entity) => {
      return entitiesIds.find((entityId) => entityId === entity.id);
    }
  ) as EntityTemplateWithMacrosType[];
  return entitiesBasedOnEntitiesIds;
};

export default useGetEntitiesBasedOnEntitiesIds;
