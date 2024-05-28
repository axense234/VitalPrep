// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import EntitySortingOption from "@/core/types/entity/EntitySortingOption";
import EntityType from "@/core/types/entity/users/EntityType";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateEntityQueryValues } from "@/redux/slices/general/slice";
// React
import { FC } from "react";
// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Components
import ViewEntityOptionsOrderBy from "./ViewEntityOptionsOrderBy";
// Translations
import { useTranslations } from "next-intl";

const ViewEntityOptionsSortBy: FC<{
  entityQueryValues: EntityQueryValues;
  entitySortingOptionUsed: EntitySortingOption[];
  selectedEntityOption: EntityType;
}> = ({ entityQueryValues, entitySortingOptionUsed, selectedEntityOption }) => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("viewEntityOptions.sortBy");

  return (
    <div className={viewEntityOptionsStyles.sortByEntityPropertyContainer}>
      <label htmlFor={translate("labelContent")}>
        {translate("selectLabel")}
      </label>
      <div
        className={viewEntityOptionsStyles.sortByEntityPropertyContainerOrder}
      >
        <select
          name={translate("labelName")}
          id={translate("labelName")}
          value={entityQueryValues.sortByKey}
          onChange={(e) =>
            dispatch(
              updateEntityQueryValues({
                key: "sortByKey",
                value: e.target.value,
              })
            )
          }
        >
          {entitySortingOptionUsed.map((entitySortingOption) => {
            return (
              <option
                key={entitySortingOption.label}
                value={entitySortingOption.value}
                title={translate("labelTitle", {
                  label: entitySortingOption.label,
                })}
                aria-label={translate("labelTitle", {
                  label: entitySortingOption.label,
                })}
              >
                {translate(
                  `sortingOptions.labels.${selectedEntityOption}.${entitySortingOption.value}`
                )}
              </option>
            );
          })}
        </select>
        <ViewEntityOptionsOrderBy entityQueryValues={entityQueryValues} />
      </div>
    </div>
  );
};

export default ViewEntityOptionsSortBy;
