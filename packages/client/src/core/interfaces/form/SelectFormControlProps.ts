import EntityType from "@/core/types/entity/users/EntityType";

export default interface SelectFormControlProps {
  labelContent: string;

  areOptionsLoading: boolean;

  entityTypeUsed: EntityType;
  entityPropertyOptions: string[];
  entityPropertyChosenOptions: string[] | string;
  canSelectMultipleEntities?: boolean;

  onEntityPropertyValueChange: (specifier: any) => void;
  showEntityExtraCondition?: (specifier: any) => boolean;
}
