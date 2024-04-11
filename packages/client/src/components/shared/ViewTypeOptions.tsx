// SCSS
import viewTypeOptionsStyles from "../../scss/components/shared/ViewTypeOptions.module.scss";
// React Icons
import { TfiViewListAlt } from "react-icons/tfi";
import { MdGridView } from "react-icons/md";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeSelectedViewOption,
  selectSelectedViewOption,
} from "@/redux/slices/generalSlice";

const ViewTypeOptions = () => {
  const dispatch = useAppDispatch();
  const selectedViewOption = useAppSelector(selectSelectedViewOption);

  return (
    <div className={viewTypeOptionsStyles.viewTypeOptionsContainer}>
      <section
        title="Switch to: Grid View"
        aria-label="Switch to: Grid View"
        style={{
          backgroundColor:
            selectedViewOption === "grid" ? "#422C17" : "#432517",
        }}
      >
        <MdGridView
          onClick={() => dispatch(changeSelectedViewOption("grid"))}
        />
      </section>
      <section
        title="Switch to: List View"
        aria-label="Switch to: List View"
        style={{
          backgroundColor:
            selectedViewOption === "list" ? "#422C17" : "#432517",
        }}
      >
        <TfiViewListAlt
          onClick={() => dispatch(changeSelectedViewOption("list"))}
        />
      </section>
    </div>
  );
};

export default ViewTypeOptions;
