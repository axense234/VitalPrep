export default interface VideoFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  inputHeight?: number;

  direction: "row" | "column";

  entityProperty: string | undefined;
  onEntityPropertyValueChange: (specifier: any) => void;
  onEntityPropertyValueUpdate: (specifier: any) => void;
}
