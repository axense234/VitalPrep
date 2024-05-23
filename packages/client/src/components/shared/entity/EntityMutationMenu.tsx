// React
import { FC, MutableRefObject } from "react";
// Types
import EntityMutationMenuProps from "@/core/interfaces/entity/EntityMutationMenuProps";
// Components
import EntityMutationMenuComponents from "./EntityMutationMenuComponents";
import EntityMutationMenuEntityInfo from "./EntityMutationMenuEntityInfo";

const EntityMutationMenu: FC<EntityMutationMenuProps> = ({
  type,
  parentRef,
  handleEntityDeletion,
  handleEntityModification,
  entityName,
  entityType,
}) => {
  if (type === "entityComponent") {
    return (
      <EntityMutationMenuComponents
        parentRef={parentRef as MutableRefObject<HTMLDivElement | null>}
        handleEntityDeletion={handleEntityDeletion}
        handleEntityModification={handleEntityModification}
        entityName={entityName}
        entityType={entityType}
      />
    );
  }

  if (type === "entityInfo") {
    return (
      <EntityMutationMenuEntityInfo
        handleEntityDeletion={handleEntityDeletion}
        handleEntityModification={handleEntityModification}
        entityName={entityName}
        entityType={entityType}
      />
    );
  }

  return null;
};

export default EntityMutationMenu;
