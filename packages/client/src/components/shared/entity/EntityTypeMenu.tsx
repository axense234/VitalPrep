// SCSS
import entityTypeMenuStyles from "../../../scss/components/shared/EntityTypeMenu.module.scss";
// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
import { IoOptions } from "react-icons/io5";
// Data
import { createToolOptions } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectSelectedEntityOption,
  setSelectedEntityOption,
} from "@/redux/slices/generalSlice";
// React
import { useEffect, useRef, useState } from "react";

const EntityTypeMenu = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const entityMenuRef = useRef<HTMLDivElement | null>(null);

  const entityTypeOptions = createToolOptions;
  const selectedEntityType = useAppSelector(selectSelectedEntityOption);

  useEffect(() => {
    const menu = entityMenuRef.current as HTMLElement;
    if (isMenuOpen) {
      menu.style.transform = "translateX(0%)";
    } else {
      menu.style.transform = "translateX(-150%)";
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className={entityTypeMenuStyles.hiddenEntityTypeMenuContainer}>
        <IoOptions
          onClick={() => setIsMenuOpen(true)}
          title="Open Entity Type Menu"
          aria-label="Open Entity Type Menu"
        />
      </div>
      <div
        className={entityTypeMenuStyles.entityTypeMenuContainer}
        ref={entityMenuRef}
      >
        <AiFillCloseSquare
          onClick={() => setIsMenuOpen(false)}
          title="Close Entity Type Menu"
          aria-label="Close Entity Type Menu"
        />
        <ul className={entityTypeMenuStyles.entityTypeMenuOptions}>
          {entityTypeOptions.map((entityType) => {
            return (
              <li
                key={entityType.id}
                title={`Select ${entityType.label}`}
                aria-label={`Select ${entityType.label}`}
                onClick={() =>
                  dispatch(setSelectedEntityOption(entityType.optionValue))
                }
                style={{
                  backgroundColor:
                    selectedEntityType === entityType.optionValue
                      ? "#ffae00"
                      : "#ddd9d5",
                }}
              >
                {entityType.label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default EntityTypeMenu;
