// SCSS
import entityMutationMenuStyles from "../../../scss/components/shared/EntityMutationMenu.module.scss";
// React
import { FC, useEffect, useRef, useState } from "react";
// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
// Translations
import { useTranslations } from "next-intl";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateWarningOverlay } from "@/redux/slices/generalSlice";
// Types
import EntityType from "@/core/types/entity/users/EntityType";

const EntityMutationMenuEntityInfo: FC<{
  handleEntityDeletion: any;
  handleEntityModification: any;
  handleEntityViewing: any;
  entityType?: EntityType;
  entityName?: string;
}> = ({
  handleEntityDeletion,
  handleEntityModification,
  handleEntityViewing,
  entityName,
  entityType,
}) => {
  const dispatch = useAppDispatch();
  const entityMutationMenuRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const translateMenu = useTranslations("entityMutation.entityMenu");
  const translateOverlayMessage = useTranslations("warningOverlay.messages");
  const translateEntityLabels = useTranslations(
    "entityPreview.entityDetails.entityLabels"
  );

  useEffect(() => {
    const menu = entityMutationMenuRef.current as HTMLDivElement;
    if (showMenu) {
      menu.style.transform = "translateX(0%)";
    } else {
      menu.style.transform = "translateX(-150%)";
    }
  }, [showMenu, entityMutationMenuRef]);
  return (
    <>
      <div
        className={
          entityMutationMenuStyles.hiddenEntityMutationMenuInfoContainer
        }
        onClick={() => setShowMenu(true)}
      >
        <BsThreeDotsVertical
          title={translateMenu("openMenuTitle")}
          aria-label={translateMenu("openMenuTitle")}
        />
      </div>
      <div
        className={entityMutationMenuStyles.entityMutationMenuInfoContainer}
        ref={entityMutationMenuRef}
      >
        <AiFillCloseSquare
          onClick={() => setShowMenu(false)}
          title={translateMenu("closeMenuTitle")}
          aria-label={translateMenu("closeMenuTitle")}
        />
        <div className={entityMutationMenuStyles.entityMutationMenuInfoOptions}>
          <MdDelete
            title={translateMenu("deleteEntityTitle")}
            aria-label={translateMenu("deleteEntityTitle")}
            onClick={() =>
              dispatch(
                updateWarningOverlay({
                  overlayMessage: translateOverlayMessage(
                    "deleteEntityMessage",
                    {
                      entityName,
                      entityType: translateEntityLabels(entityType),
                    }
                  ),
                  onConfirmFunction: handleEntityDeletion,
                  showOverlay: true,
                  countdownSeconds: 10,
                })
              )
            }
          />
          <MdEdit
            title={translateMenu("updateEntityTitle")}
            aria-label={translateMenu("updateEntityTitle")}
            onClick={handleEntityModification}
          />
          <FaEye
            title={translateMenu("viewEntityTitle")}
            aria-label={translateMenu("viewEntityTitle")}
            onClick={handleEntityViewing}
          />
        </div>
      </div>
    </>
  );
};

export default EntityMutationMenuEntityInfo;
