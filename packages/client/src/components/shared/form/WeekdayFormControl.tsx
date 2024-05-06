// Data
import { weekdayFormControlContent } from "@/data";
// SCSS
import weekdayFormControlStyles from "../../../scss/components/others/FormControls.module.scss";
// React
import { FC } from "react";
// Next
import Image from "next/image";

type ObjectKeyValueType = {
  key: string;
  value: any;
};

const WeekdayFormControl: FC<{
  labelContent: string;
  onEntityPropertyValueChange: (weekday: string) => {
    payload: { load: ObjectKeyValueType; index: number };
  };
  currentEntityValue: string | undefined;
}> = ({ labelContent, onEntityPropertyValueChange, currentEntityValue }) => {
  return (
    <div className={weekdayFormControlStyles.weekdayFormControlContainer}>
      <label htmlFor="weekdays">{labelContent}</label>
      <ul className={weekdayFormControlStyles.weekdayFormControlList}>
        {weekdayFormControlContent.map((weekdayContent) => {
          return (
            <li
              key={weekdayContent.id}
              onClick={() => {
                onEntityPropertyValueChange(
                  weekdayContent.titleContent as string
                );
              }}
            >
              <Image
                src={weekdayContent.imageUrl}
                alt={weekdayContent.titleContent}
                title={weekdayContent.titleContent}
                aria-label={weekdayContent.titleContent}
                width={80}
                height={80}
                style={{
                  border:
                    weekdayContent.titleContent === currentEntityValue
                      ? "0.25rem solid green"
                      : "none",
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeekdayFormControl;
