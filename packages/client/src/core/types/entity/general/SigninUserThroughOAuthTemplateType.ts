type SigninUserThroughOAuthTemplateType = {
  providerName: "google" | "github";
  pageType: "login" | "signup";
  locale: string;
};

export default SigninUserThroughOAuthTemplateType;
