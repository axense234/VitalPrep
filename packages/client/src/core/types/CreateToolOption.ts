import EntityType from "./entity/users/EntityType";

type CreateToolOption = {
  id?: number;
  label: string;
  optionValue: EntityType;
  associatedColor: string;
  associatedTextColor: string;
};

export default CreateToolOption;
