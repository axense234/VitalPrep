// React
import { FC } from "react";
// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateEntityQueryValues } from "@/redux/slices/generalSlice";
// React Icons and Components
import { FaMagnifyingGlass } from "react-icons/fa6";
import ViewEntityOptionsViewType from "./ViewEntityOptionsViewType";
// Translations
import { useTranslations } from "next-intl";

const ViewEntityOptionsSearchEntity: FC<{
  entityQueryValues: EntityQueryValues;
}> = ({ entityQueryValues }) => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("viewEntityOptions.searchEntity");
  return (
    <div className={viewEntityOptionsStyles.searchEntityContainer}>
      <label htmlFor={translate("labelName")}>
        {translate("labelContent")}
      </label>
      <div className={viewEntityOptionsStyles.searchEntityInputContainer}>
        <input
          type="text"
          value={entityQueryValues.searchByValue}
          onChange={(e) =>
            dispatch(
              updateEntityQueryValues({
                key: "searchByValue",
                value: e.target.value,
              })
            )
          }
        />
        <FaMagnifyingGlass
          title={translate("magGlassTitle")}
          aria-label={translate("magGlassTitle")}
        />
      </div>
      <ViewEntityOptionsViewType />
    </div>
  );
};

export default ViewEntityOptionsSearchEntity;
