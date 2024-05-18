// SCSS
import langSwitcherStyles from "../../scss/components/shared/LangSwitcher.module.scss";
// Next
import Image from "next/image";
import { useParams } from "next/navigation";
// Data
import { langFlagsImages } from "@/data";
// Navigation
import { useRouter, usePathname } from "@/navigation";
// React
import { ChangeEvent, FC, ReactNode, useTransition } from "react";

const LangSwitcherSelect: FC<{
  defaultValue: string;
  children: ReactNode;
  locale: string;
}> = ({ defaultValue, children, locale }) => {
  const router = useRouter();
  const pathname = usePathname() as any;
  const params = useParams();

  const [isPending, startTransition] = useTransition();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  };

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
          onChange={onSelectChange}
          disabled={isPending}
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default LangSwitcherSelect;
