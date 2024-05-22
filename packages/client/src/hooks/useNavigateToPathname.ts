// Next
import { useRouter } from "@/navigation";
// Redux
import { useAppSelector } from "./redux";
import {
  selectLocale,
  selectParams,
  selectPathname,
} from "@/redux/slices/generalSlice";

const useNavigateToPathname = () => {
  const router = useRouter();
  const pathname = useAppSelector(selectPathname);
  const params = useAppSelector(selectParams);
  const locale = useAppSelector(selectLocale);

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
