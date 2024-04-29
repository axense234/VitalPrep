"use client";

// Components
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";
import PopupModal from "@/components/shared/modals/PopupModal";
import ActiveMealPrepPlan from "@/components/shared/ActiveMealPrepPlan";
// Redux
import {
  logoutUser,
  selectInvalidJWT,
  signupUserOAuth,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// React
import { useEffect, useRef } from "react";
// ChartTS
import { LineElement, PointElement, BarElement, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js/auto";
// Helpers
import initializeOneSignal from "@/helpers/initializeOneSignal";
// Next
import Script from "next/script";

const SpecialLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isJWTInvalid = useAppSelector(selectInvalidJWT);
  const hasEffectRun = useRef(false);

  Chart.register([
    LineElement,
    PointElement,
    BarElement,
    ArcElement,
    ChartDataLabels,
  ]);

  useEffect(() => {
    initializeOneSignal();
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
      dispatch(signupUserOAuth());
    }
  }, []);

  return (
    <>
      <Script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" defer />
      <Navbar />
      <ActiveMealPrepPlan />
      <Sidebar />
      <PopupModal
        modalColor="#cfbea7"
        textColor="#120a06"
        hasBorder={true}
        modalType="general"
      />
      {children}
      <Footer />
    </>
  );
};

export default SpecialLayout;
