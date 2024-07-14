import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";

interface WeekdayFormControlProps {
  labelContent: string;
  onEntityPropertyValueChange: (weekday: string) => {
    payload: { load: ObjectKeyValueType; index: number };
  };
  currentEntityValue: string | undefined;
}
export default WeekdayFormControlProps;
