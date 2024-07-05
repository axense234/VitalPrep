import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import { useEffect } from "react";

const useSetDefaultEntityName = (
  updateFunction: any,
  entity: EntityTemplateType,
  run: boolean
) => {
  console.log(entity);
  useEffect(() => {
    if (!entity?.name && run) {
      updateFunction();
    }
  }, [run]);
};

export default useSetDefaultEntityName;
