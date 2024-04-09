// Types
import SelectFormControlProps from "@/core/interfaces/form/SelectFormControlProps";
// React
import { FC, FunctionComponent } from "react";
// SCSS
import formControlsStyles from "../../../scss/components/others/FormControls.module.scss";
// Components
import EntityComponent, {
  EntityComponentProps,
  EntityType,
} from "../entity/EntityComponent";
// React Spinners
import { ClockLoader } from "react-spinners";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
import { selectIngredientById } from "@/redux/slices/ingredientsSlice";
import { selectUtensilById } from "@/redux/slices/utensilsSlice";
import { selectRecipeById } from "@/redux/slices/recipesSlice";
import { selectDayTemplateById } from "@/redux/slices/dayTemplatesSlice";
import { selectInstanceTemplateById } from "@/redux/slices/instanceTemplatesSlice";

const SelectFormControl: FC<SelectFormControlProps> = ({
  labelColor,
  labelContent,
  entityPropertyOptions,
  entityPropertyChosenOptions,
  onEntityPropertyValueChange,
  labelFontSize,
  entityTypeUsed,
  areOptionsLoading,
  showEntityExtraCondition,
  backgroundColor,
  border,
}) => {
  let componentUsedAsOption: FunctionComponent<EntityComponentProps> =
    EntityComponent;
  let selectFormControlBackgroundColor: string = "#FFAE00";

  const selectEntityById = (id: string) => {
    switch (entityTypeUsed) {
      case "ingredient":
        return useAppSelector((state: State) =>
          selectIngredientById(state, id)
        );
      case "utensil":
        return useAppSelector((state: State) => selectUtensilById(state, id));
      case "recipe":
        return useAppSelector((state: State) => selectRecipeById(state, id));
      case "dayTemplate":
        return useAppSelector((state: State) =>
          selectDayTemplateById(state, id)
        );
      case "instanceTemplate":
        return useAppSelector((state: State) =>
          selectInstanceTemplateById(state, id)
        );
      default:
        break;
    }
  };

  const seeIfComponentHasBeenClicked = (id: string) => {
    if (showEntityExtraCondition) {
      return (
        Boolean(
          entityPropertyChosenOptions.find((idToSearch) => idToSearch === id)
        ) && showEntityExtraCondition(id)
      );
    }
    return Boolean(
      entityPropertyChosenOptions.find((idToSearch) => idToSearch === id)
    );
  };

  switch (entityTypeUsed) {
    case "ingredient":
      selectFormControlBackgroundColor = "#FFAE00";
      break;
    case "utensil":
      selectFormControlBackgroundColor = "#FF6000";
      break;
    case "recipe":
      selectFormControlBackgroundColor = "#8B0000";
      break;
    case "dayTemplate":
      selectFormControlBackgroundColor = "#013310";
      break;
    case "instanceTemplate":
      selectFormControlBackgroundColor = "#012433";
      break;
    default:
      throw new Error("Invalid entity typed used on the select form control!");
  }

  return (
    <div
      className={formControlsStyles.selectFormControlContainer}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "none",
        border: border ? border : "none",
      }}
    >
      <label
        htmlFor={labelContent}
        style={{
          color: labelColor,
          fontSize: labelFontSize || 22,
        }}
      >
        {labelContent}
      </label>
      {areOptionsLoading || entityPropertyOptions.length < 1 ? (
        <ClockLoader />
      ) : (
        <ul
          className={formControlsStyles.selectFormControlList}
          style={{ backgroundColor: selectFormControlBackgroundColor }}
        >
          {entityPropertyOptions.map((id) => {
            return (
              <li key={id} onClick={() => onEntityPropertyValueChange(id)}>
                {componentUsedAsOption({
                  id: id,
                  clicked: seeIfComponentHasBeenClicked(id),
                  entity: selectEntityById(id) as EntityType,
                  entityType: entityTypeUsed,
                })}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectFormControl;
