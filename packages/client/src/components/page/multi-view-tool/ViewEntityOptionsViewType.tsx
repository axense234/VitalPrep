// SCSS
import viewEntityOptionsStyles from "../../../scss/components/shared/ViewEntityOptions.module.scss";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { changeSelectedViewOption } from "@/redux/slices/generalSlice";
// React Icons
import { MdGridView } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";

const ViewEntityOptionsViewType = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={viewEntityOptionsStyles.entityViewTypeContainer}>
      <MdGridView
        onClick={() => dispatch(changeSelectedViewOption("grid"))}
        title="Change View Option to Grid"
        aria-label="Change View Option to Grid"
      />
      <TfiViewListAlt
        onClick={() => dispatch(changeSelectedViewOption("list"))}
        title="Change View Option to List"
        aria-label="Change View Option to List"
      />
    </div>
  );
};

export default ViewEntityOptionsViewType;
