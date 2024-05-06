export default interface VideoFormControlProps {
  labelContent: string;
  entityProperty: string | undefined;
  onEntityPropertyValueChange: (specifier: any) => void;
  onEntityPropertyValueUpdate: (specifier: any) => void;
}
