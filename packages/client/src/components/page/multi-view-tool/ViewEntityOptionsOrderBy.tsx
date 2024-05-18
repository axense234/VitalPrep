// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateEntityQueryValues } from "@/redux/slices/generalSlice";
// React
import { FC } from "react";
// React Icons
import { FaArrowUp } from "react-icons/fa";
// Translations
import { useTranslations } from "next-intl";

const ViewEntityOptionsOrderBy: FC<{
  entityQueryValues: EntityQueryValues;
}> = ({ entityQueryValues }) => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("viewEntityOptions.sortBy.orderBy");

  return (
    <button
      type="button"
      title={translate("titleLabel", {
        order: translate(`titleOption.${entityQueryValues.sortByOrder}`),
      })}
      aria-label={translate("titleLabel", {
        order: translate(`titleOption.${entityQueryValues.sortByOrder}`),
      })}
      style={{
        transform:
          entityQueryValues.sortByOrder === "asc"
            ? "rotate(0deg)"
            : "rotate(180deg)",
      }}
      onClick={() =>
        dispatch(
          updateEntityQueryValues({
            key: "sortByOrder",
            value: entityQueryValues.sortByOrder === "asc" ? "desc" : "asc",
          })
        )
      }
    >
      <FaArrowUp />
    </button>
  );
};

export default ViewEntityOptionsOrderBy;
