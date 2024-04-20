export default interface RadioFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  backgroundColor?: string;
  border?: string;

  entityPropertyOptions: string[];
  onEntityPropertyValueChange: (specifier: any) => void;
}
