import { MutableRefObject } from "react";

interface EntityMutationMenuProps {
  type: "entityInfo" | "entityCard" | "entityComponent";
  parentRef: MutableRefObject<HTMLDivElement | null>;
}

export default EntityMutationMenuProps;
