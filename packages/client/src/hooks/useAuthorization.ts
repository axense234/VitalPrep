// React
import { useEffect, useState } from "react";
// Redux
import {
  selectLoadingGetProfile,
  selectLoadingGetOAuthProfile,
  selectLoadingSigninProfile,
  selectProfile,
} from "@/redux/slices/general/selectors";
import { getProfileJWT, getProfileOAuth } from "@/redux/slices/general/thunks";
import { useAppDispatch, useAppSelector } from "./redux";
// Translations
import { usePathname, useRouter } from "@/navigation";

const useAuthorization = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);
  const loadingSigninProfile = useAppSelector(selectLoadingSigninProfile);

  const [canGetProfile, setCanGetProfile] = useState<boolean>(false);

  const canRedirect =
    loadingGetProfile === "SUCCEDED" ||
    loadingGetProfile === "FAILED" ||
    loadingGetOAuthProfile === "SUCCEDED";

  useEffect(() => {
    const createVitalPrepAccount = localStorage.getItem(
      "createVitalPrepAccount"
    );
    setCanGetProfile(createVitalPrepAccount !== "create");
  }, [loadingGetProfile, loadingGetOAuthProfile]);

  useEffect(() => {
    if (
      loadingGetOAuthProfile === "FAILED" &&
      loadingGetProfile === "IDLE" &&
      (canGetProfile || loadingSigninProfile === "SUCCEDED")
    ) {
      dispatch(getProfileJWT());
    }
  }, [
    loadingGetOAuthProfile,
    loadingGetProfile,
    canGetProfile,
    loadingSigninProfile,
  ]);

  useEffect(() => {
    if (
      loadingGetOAuthProfile === "IDLE" &&
      loadingGetProfile === "IDLE" &&
      (canGetProfile || loadingSigninProfile === "SUCCEDED")
    ) {
      dispatch(getProfileOAuth());
    }
  }, [
    loadingGetOAuthProfile,
    loadingGetProfile,
    canGetProfile,
    loadingSigninProfile,
  ]);

  useRedirect(pathname, router, canRedirect);
};

export const useRedirect = (
  pathname: string | undefined,
  router: any,
  loading: boolean
) => {
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    if (pathname && router && loading) {
      if (
        profile.email &&
        pathname !== `/home` &&
        (pathname === `/` || pathname === `/login`)
      ) {
        router.push(`/home`);
      } else if (!profile.email && pathname !== `/` && pathname !== `/login`) {
        router.push(`/`);
      }
    }
  }, [pathname, router, loading, profile]);
};

export default useAuthorization;
