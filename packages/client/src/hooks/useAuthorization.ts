// React
import { useEffect, useRef } from "react";
// Redux
import {
  getProfileJWT,
  getProfileOAuth,
  selectLoadingGetOAuthProfile,
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

  const hasEffectRun = useRef(false);

  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);

  const canRedirect =
    loadingGetProfile === "SUCCEDED" ||
    loadingGetProfile === "FAILED" ||
    loadingGetOAuthProfile === "SUCCEDED";

  useRedirect(pathname, router, canRedirect);

  useEffect(() => {
    const createVitalPrepAccount = localStorage.getItem(
      "createVitalPrepAccount"
    );
    if (
      loadingGetOAuthProfile === "FAILED" &&
      loadingGetProfile === "IDLE" &&
      !createVitalPrepAccount
    ) {
      dispatch(getProfileJWT());
    }
  }, [loadingGetOAuthProfile, loadingGetProfile]);

  useEffect(() => {
    const createVitalPrepAccount = localStorage.getItem(
      "createVitalPrepAccount"
    );
    if (
      loadingGetOAuthProfile === "IDLE" &&
      loadingGetProfile === "IDLE" &&
      !hasEffectRun.current &&
      !createVitalPrepAccount
    ) {
      hasEffectRun.current = true;
      dispatch(getProfileOAuth());
    }
  }, [loadingGetOAuthProfile, loadingGetProfile]);
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
        router.push("/auth-error");
      }
    }
  }, [pathname, router, loading, profile]);
};

export default useAuthorization;
