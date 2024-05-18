"use client";

// Components
import AuthFormPageTemplate from "@/components/shared/AuthFormPageTemplate";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const Login = () => {
  useAuthorization();

  return <AuthFormPageTemplate type="login" />;
};

export default Login;
