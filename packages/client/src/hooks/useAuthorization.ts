// React
import { FC, useEffect } from "react";
// Redux
import {
  getProfileOAuth,
  getProfileJWT,
  selectLoadingGetProfile,
  selectProfile,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "./redux";
// Next
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const useAuthorization = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);

  useRedirect(
    pathname,
    router,
    loadingGetProfile === "SUCCEDED" || loadingGetProfile === "FAILED"
  );

  useEffect(() => {
    dispatch(getProfileOAuth());
    dispatch(getProfileJWT());
  }, []);
};

export const useRedirect = (
  pathname: string | undefined,
  router: AppRouterInstance | undefined,
  loading: boolean
) => {
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (pathname && router && loading) {
      if (
        profile.email &&
        pathname !== "/home" &&
        (pathname === "/" || pathname === "/login")
      ) {
        router.push("/home");
      } else if (!profile.email && pathname !== "/" && pathname !== "/login") {
        router.push("/");
      }
    }
  }, [pathname, router, loading]);
};

export default useAuthorization;
