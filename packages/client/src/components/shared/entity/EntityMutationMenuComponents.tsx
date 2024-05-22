// SCSS
import entityMutationMenuStyles from "@/scss/components/shared/EntityMutationMenu.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// React
import { useRef, useState, useEffect, MutableRefObject, FC } from "react";
// React Icons
import { MdDelete, MdEdit } from "react-icons/md";
import { VscTriangleDown } from "react-icons/vsc";
// Redux
import { useAppDispatch } from "@/hooks/redux";
// Translations
import { useTranslations } from "next-intl";
import { updateWarningOverlay } from "@/redux/slices/generalSlice";

const EntityMutationMenuComponents: FC<{
  parentRef: MutableRefObject<HTMLDivElement | null>;
  handleEntityDeletion: any;
  handleEntityModification: any;
}> = ({ parentRef, handleEntityDeletion, handleEntityModification }) => {
  const dispatch = useAppDispatch();
  const entityMutationMenuRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  useModalTransition(showMenu, entityMutationMenuRef);

  const translate = useTranslations("entityMutation.entityMenu");

  useEffect(() => {
    if (parentRef && parentRef.current) {
      parentRef.current.onmouseenter = () => setShowMenu(true);
      parentRef.current.onmouseleave = () => setShowMenu(false);
    }
  }, [parentRef]);
  return (
    <div
      className={entityMutationMenuStyles.entityMutationMenuContainer}
      ref={entityMutationMenuRef}
    >
      <div className={entityMutationMenuStyles.entityMutationMenuOptions}>
        <MdDelete
          title={translate("deleteEntityTitle")}
          aria-label={translate("deleteEntityTitle")}
          onClick={() =>
            dispatch(
              updateWarningOverlay({
                overlayMessage:
                  "Are you really sure you want to permanently delete this entity?",
                onConfirmFunction: handleEntityDeletion,
                showOverlay: true,
              })
            )
          }
        />
        <MdEdit
          title={translate("updateEntityTitle")}
          aria-label={translate("updateEntityTitle")}
          onClick={handleEntityModification}
        />
      </div>
      <VscTriangleDown />
    </div>
  );
};

export default EntityMutationMenuComponents;
