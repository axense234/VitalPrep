// SCSS
import errorPageStyles from "../scss/pages/ErrorPage.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
// Data
import { homePageUrl } from "@/data";

const NotFound = () => {
  const notFoundContent = (
    <div className={errorPageStyles.errorPageContainer}>
      <h1>404 Error</h1>
      <p>Could not find the page that you were looking for.</p>
      <PrimaryButton
        type="link"
        backgroundColor="#42613F"
        textColor="#120a06"
        content="Home"
        disabled={false}
        fontSize={21}
        height={40}
        width={160}
        linkDest={homePageUrl}
      />
    </div>
  );

  return notFoundContent;
};

export default NotFound;
