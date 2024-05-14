// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateEntityQueryValues } from "@/redux/slices/generalSlice";
// React
import { FC } from "react";
// React Icons
import { FaArrowUp } from "react-icons/fa";

const ViewEntityOptionsOrderBy: FC<{
  entityQueryValues: EntityQueryValues;
}> = ({ entityQueryValues }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      type="button"
      title={`Current Order: ${entityQueryValues.sortByOrder === "asc" ? "Ascending" : "Descending"}`}
      aria-label={`Current Order: ${entityQueryValues.sortByOrder === "asc" ? "Ascending" : "Descending"}`}
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
