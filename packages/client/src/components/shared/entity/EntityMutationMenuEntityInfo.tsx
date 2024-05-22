// SCSS
import entityMutationMenuStyles from "../../../scss/components/shared/EntityMutationMenu.module.scss";
// React
import { FC, useEffect, useRef, useState } from "react";
// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
// Translations
import { useTranslations } from "next-intl";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateWarningOverlay } from "@/redux/slices/generalSlice";

const EntityMutationMenuEntityInfo: FC<{
  handleEntityDeletion: any;
  handleEntityModification: any;
}> = ({ handleEntityDeletion, handleEntityModification }) => {
  const dispatch = useAppDispatch();
  const entityMutationMenuRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const translate = useTranslations("entityMutation.entityMenu");

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
          title={translate("openMenuTitle")}
          aria-label={translate("openMenuTitle")}
        />
      </div>
      <div
        className={entityMutationMenuStyles.entityMutationMenuInfoContainer}
        ref={entityMutationMenuRef}
      >
        <AiFillCloseSquare
          onClick={() => setShowMenu(false)}
          title={translate("closeMenuTitle")}
          aria-label={translate("closeMenuTitle")}
        />
        <div className={entityMutationMenuStyles.entityMutationMenuInfoOptions}>
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
      </div>
    </>
  );
};

export default EntityMutationMenuEntityInfo;
