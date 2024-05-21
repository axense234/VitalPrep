// React
import { FC, useEffect, useRef, useState } from "react";
// SCSS
import entityMutationMenuStyles from "@/scss/components/shared/EntityMutationMenu.module.scss";
// React Icons
import { MdDelete, MdEdit } from "react-icons/md";
import { VscTriangleDown } from "react-icons/vsc";

// Types
import EntityMutationMenuProps from "@/core/interfaces/entity/EntityMutationMenuProps";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";

const EntityMutationMenu: FC<EntityMutationMenuProps> = ({
  type,
  parentRef,
}) => {
  const entityMutationMenuRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  useModalTransition(showMenu, entityMutationMenuRef);

  useEffect(() => {
    if (parentRef && parentRef.current) {
      parentRef.current.onmouseenter = () => setShowMenu(true);
      parentRef.current.onmouseleave = () => setShowMenu(false);
    }
  }, [parentRef]);

  if (type === "entityComponent") {
    return (
      <div
        className={entityMutationMenuStyles.entityMutationMenuContainer}
        ref={entityMutationMenuRef}
      >
        <div className={entityMutationMenuStyles.entityMutationMenuOptions}>
          <MdDelete />
          <MdEdit />
        </div>
        <VscTriangleDown />
      </div>
    );
  }

  return (
    <div
      className={entityMutationMenuStyles.entityMutationMenuContainer}
      ref={entityMutationMenuRef}
    >
      <div className={entityMutationMenuStyles.entityMutationMenuOptions}>
        <MdDelete />
        <MdEdit />
      </div>
      <VscTriangleDown />
    </div>
  );
};

export default EntityMutationMenu;
