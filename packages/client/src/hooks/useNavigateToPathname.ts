// Next
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
// Translations
import { useLocale } from "next-intl";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const useNavigateToPathname = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  return ({
    forcedPathname,
    forcedLocale,
    forcedQueryParams,
    forcedParams,
  }: {
    forcedPathname?: string;
    forcedLocale?: string;
    forcedQueryParams?: Params;
    forcedParams?: Params;
  }) =>
    router.replace(
      {
        pathname: forcedPathname || (pathname as any),
        params: { ...(forcedParams || params) },
        query: { ...forcedQueryParams },
      },
      { locale: forcedLocale || locale }
    );
};

export default useNavigateToPathname;
