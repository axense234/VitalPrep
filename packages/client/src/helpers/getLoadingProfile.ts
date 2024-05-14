// Redux
import { useAppSelector } from "@/hooks/redux";
import {
  selectLoadingGetProfile,
  selectLoadingGetOAuthProfile,
} from "@/redux/slices/generalSlice";

const getLoadingProfile = () => {
  const loadingGetProfile = useAppSelector(selectLoadingGetProfile);
  const loadingGetOAuthProfile = useAppSelector(selectLoadingGetOAuthProfile);
  const loadingProfile =
    loadingGetProfile === "SUCCEDED"
      ? loadingGetProfile
      : loadingGetOAuthProfile;
  return loadingProfile;
};

export default getLoadingProfile;
