// SCSS
import errorPageStyles from "../scss/pages/ErrorPage.module.scss";
// Components
import PrimaryButton from "@/components/shared/PrimaryButton";
// Data
import { homePageUrl } from "@/data";

const NotFound = () => {
  return (
    <div className={errorPageStyles.notFoundContainer}>
      <div className={errorPageStyles.notFoundContent}>
        <h1>404 Not Found</h1>
        <h4>could not find the page you were looking for</h4>
        <PrimaryButton
          content="Go Home"
          disabled={false}
          type="link"
          linkDest={homePageUrl}
        />
      </div>
    </div>
  );
};

export default NotFound;
