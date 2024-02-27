"use client";
// Redux
import store from "@/redux/api/store";
import { Provider } from "react-redux";
// React
import { ReactNode } from "react";

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
