import { MutableRefObject } from "react";

interface EntityMutationMenuProps {
  type: "entityInfo" | "entityComponent";
  parentRef?: MutableRefObject<HTMLDivElement | null>;
  handleEntityDeletion: any;
  handleEntityModification: any;
}

export default EntityMutationMenuProps;
