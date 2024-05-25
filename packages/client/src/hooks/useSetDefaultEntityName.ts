import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import { useEffect } from "react";

const useSetDefaultEntityName = (
  updateFunction: any,
  entity: EntityTemplateType
) => {
  useEffect(() => {
    if (!entity.name) {
      updateFunction();
    }
  }, []);
};

export default useSetDefaultEntityName;
