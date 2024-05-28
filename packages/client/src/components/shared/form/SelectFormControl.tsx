// Types
import SelectFormControlProps from "@/core/interfaces/form/SelectFormControlProps";
// React
import { FC } from "react";
// SCSS
import formControlsStyles from "@/scss/components/others/FormControls.module.scss";
// Components
import EntityComponent from "../entity/EntityComponent";
// React Spinners
import { ClockLoader } from "react-spinners";

const SelectFormControl: FC<SelectFormControlProps> = ({
  labelContent,
  entityPropertyOptions,
  entityPropertyChosenOptions,
  onEntityPropertyValueChange,
  entityTypeUsed,
  areOptionsLoading,
  showEntityExtraCondition,
  canSelectMultipleEntities = true,
}) => {
  const searchInChosenOptionsForPropertyId = (id: string) => {
    return Boolean(
      (entityPropertyChosenOptions as string[]).find(
        (idToSearch) => idToSearch === id
      )
    );
  };

  console.log(entityPropertyChosenOptions);

  const searchInOptionsForPropertyId = (id: string) => {
    return Boolean(entityPropertyChosenOptions === id);
  };

  const seeIfComponentHasBeenClicked = (id: string) => {
    const finderFunctionUsed = canSelectMultipleEntities
      ? searchInChosenOptionsForPropertyId
      : searchInOptionsForPropertyId;

    if (showEntityExtraCondition) {
      return finderFunctionUsed(id) && showEntityExtraCondition(id);
    }
    return finderFunctionUsed(id);
  };

  return (
    <div className={formControlsStyles.selectFormControlContainer}>
      <label htmlFor={labelContent}>{labelContent}</label>
      {areOptionsLoading || entityPropertyOptions.length < 1 ? (
        <ClockLoader />
      ) : (
        <ul className={formControlsStyles.selectFormControlList}>
          {entityPropertyOptions.map((id) => {
            return (
              <li key={id} onClick={() => onEntityPropertyValueChange(id)}>
                <EntityComponent
                  clicked={seeIfComponentHasBeenClicked(id)}
                  entityId={id}
                  entityType={entityTypeUsed}
                  isALink={false}
                  selectedViewOption="list"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectFormControl;
