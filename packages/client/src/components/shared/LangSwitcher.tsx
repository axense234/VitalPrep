// Components
import LangSwitcherSelect from "./LangSwitcherSelect";
// Translations
import { locales } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

const LangSwitcher = () => {
  const translate = useTranslations("langSwitcher");
  const locale = useLocale();

  return (
    <LangSwitcherSelect defaultValue={locale} locale={locale}>
      {locales.map((cur) => (
        <option
          key={cur}
          value={cur}
          title={translate("locale", { locale: translate(`values.${cur}`) })}
          aria-label={translate("locale", {
            locale: translate(`values.${cur}`),
          })}
        >
          {cur.toUpperCase()}
        </option>
      ))}
    </LangSwitcherSelect>
  );
};

export default LangSwitcher;
