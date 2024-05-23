// Next
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
// Translations
import { useLocale } from "next-intl";

const useNavigateToPathname = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  return ({
    forcedPathname,
    forcedLocale,
    forcedParams,
  }: {
    forcedPathname?: string;
    forcedLocale?: string;
    forcedParams?: string;
  }) =>
    router.replace(
      {
        pathname: forcedPathname || (pathname as any),
        params: forcedParams || params,
      },
      { locale: forcedLocale || locale }
    );
};

export default useNavigateToPathname;
