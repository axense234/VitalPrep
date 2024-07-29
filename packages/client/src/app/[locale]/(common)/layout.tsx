"use client";
// Components
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";
import ActiveMealPrepPlan from "@/components/layout/ActiveMealPrepPlan";
import PopupModal from "@/components/shared/modals/PopupModal";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import WarningOverlay from "@/components/shared/overlays/WarningOverlay";
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
// Translations
import { usePathname } from "@/navigation";
import { useLocale } from "next-intl";
// Redux
import {
  selectInvalidJWT,
  selectProfile,
  selectLoadingGetProfile,
  selectLoadingGetOAuthProfile,
  selectSelectedEntityOption,
} from "@/redux/slices/general/selectors";
import { resetTemplateImageUrl } from "@/redux/slices/general/slice";
import { logoutUser, signupUserOAuth } from "@/redux/slices/general/thunks";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const SpecialLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isJWTInvalid = useAppSelector(selectInvalidJWT);
  const hasEffectRun = useRef(false);

  const profile = useAppSelector(selectProfile);
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);

  const createEntityOption = useAppSelector(selectSelectedEntityOption);
  Chart.register([LineElement, PointElement, BarElement, ArcElement]);

  const pathname = usePathname();

  const locale = useLocale();

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
  }, [
    profile.id,
    loadingGetProfile,
    loadingGetOAuthProfile,
    pathname,
    initializeOneSignal,
  ]);

  useEffect(() => {
    if (profile.id) {
      loginOneSignal(profile.id);
    }
  });

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
      dispatch(signupUserOAuth(locale));
    }
  }, []);

  return (
    <>
      <Navbar />
      <ActiveMealPrepPlan />
      <ScrollToTopButton />
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
      <Script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async />
    </>
  );
};

export default SpecialLayout;
