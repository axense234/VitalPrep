"use client";

// Components
import AuthFormPageTemplate from "@/components/shared/AuthFormPageTemplate";
// Redux
import { useAppDispatch } from "@/hooks/redux";
import { getProfileJWT, getProfileOAuth } from "@/redux/slices/generalSlice";
// Next Auth
import { authenticationClient } from "@/utils/auth";
// React
import { useEffect } from "react";

const Signup = () => {
  authenticationClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfileOAuth());
    dispatch(getProfileJWT());
  }, []);

  return <AuthFormPageTemplate type="signup" />;
};

export default Signup;
