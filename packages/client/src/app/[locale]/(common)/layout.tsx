"use client";

// Components
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";
import PopupModal from "@/components/shared/modals/PopupModal";
import ActiveMealPrepPlan from "@/components/shared/ActiveMealPrepPlan";
import WarningOverlay from "@/components/shared/overlays/WarningOverlay";
// Redux
import {
  logoutUser,
  resetTemplateImageUrl,
  selectInvalidJWT,
  selectLoadingGetOAuthProfile,
  selectLoadingGetProfile,
  selectProfile,
  selectSelectedEntityOption,
  setLocale,
  setParams,
  setPathname,
  signupUserOAuth,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// React
import { useEffect, useRef } from "react";
// ChartTS
import { LineElement, PointElement, BarElement, ArcElement } from "chart.js";
import { Chart } from "chart.js/auto";
// Helpers
import {
  initializeOneSignal,
  loginOneSignal,
} from "@/helpers/initializeOneSignal";
// Next
import Script from "next/script";
import { useParams } from "next/navigation";
// Translations
import { usePathname } from "@/navigation";
import { useLocale } from "next-intl";

const SpecialLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isJWTInvalid = useAppSelector(selectInvalidJWT);
  const hasEffectRun = useRef(false);

  const profile = useAppSelector(selectProfile);
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);

  const createEntityOption = useAppSelector(selectSelectedEntityOption);
  Chart.register([LineElement, PointElement, BarElement, ArcElement]);

  const locale = useLocale();
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(setLocale(locale));
    dispatch(setParams(params));
    dispatch(setPathname(pathname));
  }, [pathname, params, locale]);

  useEffect(() => {
    dispatch(resetTemplateImageUrl());
  }, [pathname, createEntityOption]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeOneSignal();
      } catch (error) {
        console.error("Error initializing OneSignal:", error);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (profile.id) {
      loginOneSignal(profile.id);
    }
  }, [profile.id, loadingGetProfile, loadingGetOAuthProfile]);

  useEffect(() => {
    if (isJWTInvalid) {
      dispatch(logoutUser());
    }
  }, [isJWTInvalid]);

  useEffect(() => {
    const createVitalPrepAccount = localStorage.getItem(
      "createVitalPrepAccount"
    );
    if (createVitalPrepAccount === "create" && !hasEffectRun.current) {
      hasEffectRun.current = true;
      dispatch(signupUserOAuth());
    }
  }, []);

  return (
    <>
      <Navbar />
      <ActiveMealPrepPlan />
      <Sidebar />
      <WarningOverlay />
      <PopupModal
        modalColor="#cfbea7"
        textColor="#120a06"
        hasBorder={true}
        modalType="general"
      />
      {children}
      <Footer />
      <Script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" defer />
    </>
  );
};

export default SpecialLayout;
