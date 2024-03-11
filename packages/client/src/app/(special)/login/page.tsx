"use client";

// Components
import AuthFormPageTemplate from "@/components/shared/AuthFormPageTemplate";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { getProfileOAuth, getProfileJWT } from "@/redux/slices/generalSlice";
// Next Auth
import { authenticationClient } from "@/utils/auth";
// React
import { useEffect } from "react";

const Login = () => {
  authenticationClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfileOAuth());
    dispatch(getProfileJWT());
  }, []);

  return <AuthFormPageTemplate type="login" />;
};

export default Login;
