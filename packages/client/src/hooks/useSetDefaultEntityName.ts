// Types
import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
// React
import { useEffect } from "react";
// Redux
import { useAppSelector } from "./redux";
import { selectSelectedEntityOption } from "@/redux/slices/general/selectors";

const useSetDefaultEntityName = (
  updateFunction: any,
  entity: EntityTemplateType,
  run: boolean
) => {
  const entityType = useAppSelector(selectSelectedEntityOption);
  useEffect(() => {
    if (!entity?.name && run) {
      updateFunction();
    }
  }, [run, entityType]);
};

export default useSetDefaultEntityName;
