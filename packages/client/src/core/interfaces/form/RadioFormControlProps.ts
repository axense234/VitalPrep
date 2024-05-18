export default interface RadioFormControlProps {
  labelContent: string;

  chosenEntityProperty: any;
  entityPropertyOptions: { id?: number; label: string; value: string }[];
  onEntityPropertyValueChange: (specifier: any) => void;
}
