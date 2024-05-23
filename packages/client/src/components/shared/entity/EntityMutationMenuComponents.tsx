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
import { updateWarningOverlay } from "@/redux/slices/generalSlice";
// Translations
import { useTranslations } from "next-intl";
// Types
import EntityType from "@/core/types/entity/users/EntityType";

const EntityMutationMenuComponents: FC<{
  parentRef: MutableRefObject<HTMLDivElement | null>;
  handleEntityDeletion: any;
  handleEntityModification: any;
  entityType?: EntityType;
  entityName?: string;
}> = ({
  parentRef,
  handleEntityDeletion,
  handleEntityModification,
  entityName,
  entityType,
}) => {
  const dispatch = useAppDispatch();
  const entityMutationMenuRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  useModalTransition(showMenu, entityMutationMenuRef);

  const translateMenu = useTranslations("entityMutation.entityMenu");
  const translateOverlayMessage = useTranslations("warningOverlay.messages");
  const translateEntityLabels = useTranslations(
    "entityPreview.entityDetails.entityLabels"
  );

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
          title={translateMenu("deleteEntityTitle")}
          aria-label={translateMenu("deleteEntityTitle")}
          onClick={() =>
            dispatch(
              updateWarningOverlay({
                overlayMessage: translateOverlayMessage("deleteEntityMessage", {
                  entityName,
                  entityType: translateEntityLabels(entityType),
                }),
                onConfirmFunction: handleEntityDeletion,
                showOverlay: true,
                countdownSeconds: 1,
              })
            )
          }
        />
        <MdEdit
          title={translateMenu("updateEntityTitle")}
          aria-label={translateMenu("updateEntityTitle")}
          onClick={handleEntityModification}
        />
      </div>
      <VscTriangleDown />
    </div>
  );
};

export default EntityMutationMenuComponents;
