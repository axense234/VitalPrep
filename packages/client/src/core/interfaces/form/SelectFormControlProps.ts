import EntityType from "@/core/types/entity/EntityType";

export default interface SelectFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  areOptionsLoading: boolean;

  backgroundColor?: string;
  border?: string;

  entityTypeUsed: EntityType;
  required: boolean;

  entityPropertyOptions: string[];
  entityPropertyChosenOptions: string[];
  onEntityPropertyValueChange: (specifier: any) => void;
  showEntityExtraCondition?: (specifier: any) => boolean;
}
