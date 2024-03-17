// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// Data
import { createToolOptions } from "@/data";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectSelectedCreateToolOption,
  setSelectedCreateToolOption,
} from "@/redux/slices/generalSlice";

const CreateToolOptions = () => {
  const dispatch = useAppDispatch();
  const selectedCreateToolOption = useAppSelector(
    selectSelectedCreateToolOption
  );

  return (
    <ul className={createToolStyles.createToolOptions}>
      {createToolOptions.map((createToolOption) => {
        return (
          <li
            key={createToolOption.id as number}
            title={`Select ${createToolOption.label}`}
            aria-label={`Select ${createToolOption.label}`}
          >
            <button
              className={createToolStyles.createToolOption}
              onClick={() =>
                dispatch(
                  setSelectedCreateToolOption(createToolOption.optionValue)
                )
              }
              style={{
                backgroundColor:
                  selectedCreateToolOption === createToolOption.optionValue
                    ? createToolOption.associatedColor
                    : "#DDD9D5",
                color:
                  selectedCreateToolOption === createToolOption.optionValue
                    ? createToolOption.associatedTextColor
                    : "#120A06",
              }}
            >
              {createToolOption.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default CreateToolOptions;
