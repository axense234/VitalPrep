// SCSS
import langSwitcherStyles from "../../scss/components/shared/LangSwitcher.module.scss";
// Next
import Image from "next/image";
// Data
import { langFlagsImages } from "@/data";
// React
import { FC, ReactNode } from "react";
// Hooks
import useNavigateToPathname from "@/hooks/useNavigateToPathname";

const LangSwitcherSelect: FC<{
  defaultValue: string;
  children: ReactNode;
  locale: string;
}> = ({ defaultValue, children, locale }) => {
  const navigateToPathanme = useNavigateToPathname();

  return (
    <div className={langSwitcherStyles.langSwitcherContainer}>
      <Image
        alt="Lang Switcher Image"
        src={
          langFlagsImages.find((flagImage) => flagImage.value === locale)
            ?.imageSrc || langFlagsImages[0].imageSrc
        }
        width={64}
        height={48}
      />
      <div className={langSwitcherStyles.langSwitcherSelect}>
        <select
          name="langSwitcher"
          id="langSwitcher"
          defaultValue={defaultValue}
          onChange={(e) => navigateToPathanme({ forcedLocale: e.target.value })}
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default LangSwitcherSelect;
