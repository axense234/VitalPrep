// Data
import { weekdayFormControlContent } from "@/data";
// SCSS
import weekdayFormControlStyles from "@/scss/components/others/FormControls.module.scss";
// React
import { FC } from "react";
// Next
import Image from "next/image";
// Translations
import { useTranslations } from "use-intl";
// Types
import WeekdayFormControlProps from "@/core/interfaces/form/WeekdayFormControlProps";

const WeekdayFormControl: FC<WeekdayFormControlProps> = ({
  labelContent,
  onEntityPropertyValueChange,
  currentEntityValue,
}) => {
  const translate = useTranslations("weekdayFormControl.imageTitles");
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
                title={translate(weekdayContent.titleContent)}
                aria-label={translate(weekdayContent.titleContent)}
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
