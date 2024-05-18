// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { changeSelectedViewOption } from "@/redux/slices/generalSlice";
// React Icons
import { MdGridView } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";
// Translations
import { useTranslations } from "next-intl";

const ViewEntityOptionsViewType = () => {
  const dispatch = useAppDispatch();
  const translate = useTranslations("viewEntityOptions.searchEntity.viewType");

  return (
    <div className={viewEntityOptionsStyles.entityViewTypeContainer}>
      <MdGridView
        onClick={() => dispatch(changeSelectedViewOption("grid"))}
        title={translate("title", {
          type: translate(`typeOptions.grid`),
        })}
        aria-label={translate("title", {
          type: translate(`typeOptions.grid`),
        })}
      />
      <TfiViewListAlt
        onClick={() => dispatch(changeSelectedViewOption("list"))}
        title={translate("title", {
          type: translate(`typeOptions.list`),
        })}
        aria-label={translate("title", {
          type: translate(`typeOptions.list`),
        })}
      />
    </div>
  );
};

export default ViewEntityOptionsViewType;
