export default interface SelectFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  areOptionsLoading: boolean;

  entityTypeUsed:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan";
  required: boolean;

  entityPropertyOptions: string[];
  entityPropertyChosenOptions: string[];
  onEntityPropertyValueChange: (specifier: any) => void;
  showEntityExtraCondition?: (specifier: any) => boolean;
}
