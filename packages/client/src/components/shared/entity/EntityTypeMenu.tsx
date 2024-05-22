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
// Translations
import { useTranslations } from "next-intl";

const EntityTypeMenu = () => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const entityMenuRef = useRef<HTMLDivElement | null>(null);

  const entityTypeOptions = createToolOptions;
  const selectedEntityType = useAppSelector(selectSelectedEntityOption);

  const translateEntityLabels = useTranslations(
    "createTool.entityOptions.labels"
  );
  const translateEntityMenu = useTranslations("entityMenu");

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
          title={translateEntityMenu("openActionTitle")}
          aria-label={translateEntityMenu("openActionTitle")}
        />
      </div>
      <div
        className={entityTypeMenuStyles.entityTypeMenuContainer}
        ref={entityMenuRef}
      >
        <AiFillCloseSquare
          onClick={() => setIsMenuOpen(false)}
          title={translateEntityMenu("closeActionTitle")}
          aria-label={translateEntityMenu("closeActionTitle")}
        />
        <ul className={entityTypeMenuStyles.entityTypeMenuOptions}>
          {entityTypeOptions.map((entityType) => {
            return (
              <li
                key={entityType.id}
                title={`${translateEntityMenu("selectLabel")} ${translateEntityLabels(entityType.optionValue)}`}
                aria-label={`${translateEntityMenu("selectLabel")} ${translateEntityLabels(entityType.optionValue)}`}
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
                {translateEntityLabels(entityType.optionValue)}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default EntityTypeMenu;
