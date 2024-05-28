// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Types
import EntityType from "@/core/types/entity/users/EntityType";
import CreateToolOption from "@/core/types/CreateToolOption";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { setSelectedEntityOption } from "@/redux/slices/general/slice";
// React
import { FC } from "react";
// Translations
import { useTranslations } from "next-intl";

const ViewEntityOptionsChooseEntity: FC<{
  selectedEntityOption: EntityType;
  viewEntityOptions: CreateToolOption[];
}> = ({ selectedEntityOption, viewEntityOptions }) => {
  const dispatch = useAppDispatch();
  const translateEntityOptions = useTranslations(
    "createTool.entityOptions.labels"
  );
  const translateViewEntityOptions = useTranslations(
    "viewEntityOptions.chooseEntity"
  );

  return (
    <div className={viewEntityOptionsStyles.chooseEntityOptionContainer}>
      <label htmlFor={translateViewEntityOptions("labelName")}>
        {translateViewEntityOptions("labelContent")}
      </label>
      <select
        name={translateViewEntityOptions("labelName")}
        id={translateViewEntityOptions("labelName")}
        value={selectedEntityOption}
        onChange={(e) =>
          dispatch(setSelectedEntityOption(e.target.value as EntityType))
        }
      >
        {viewEntityOptions.map((entityOption) => {
          return (
            <option
              value={entityOption.optionValue}
              key={entityOption.optionValue}
              title={`${translateViewEntityOptions("selectLabel")} ${translateEntityOptions(entityOption.optionValue)}`}
              aria-label={`${translateViewEntityOptions("selectLabel")} ${translateEntityOptions(entityOption.optionValue)}`}
            >
              {translateEntityOptions(entityOption.optionValue)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ViewEntityOptionsChooseEntity;
