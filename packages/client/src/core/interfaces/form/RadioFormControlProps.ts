export default interface RadioFormControlProps {
  labelContent: string;

  chosenEntityProperty: any;
  entityPropertyOptions: string[];
  onEntityPropertyValueChange: (specifier: any) => void;
}
