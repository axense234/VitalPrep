import EntityType from "@/core/types/entity/users/EntityType";
import { MutableRefObject } from "react";

interface EntityMutationMenuProps {
  type: "entityInfo" | "entityComponent";
  parentRef?: MutableRefObject<HTMLDivElement | null>;
  handleEntityDeletion: any;
  handleEntityModification: any;
  handleEntityViewing?: any;
  entityType?: EntityType;
  entityName?: string;
}

export default EntityMutationMenuProps;
