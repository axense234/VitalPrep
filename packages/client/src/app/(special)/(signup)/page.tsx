"use client";

// Components
import AuthFormPageTemplate from "@/components/shared/AuthFormPageTemplate";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const Signup = () => {
  useAuthorization("signup");

  return <AuthFormPageTemplate type="signup" />;
};

export default Signup;
