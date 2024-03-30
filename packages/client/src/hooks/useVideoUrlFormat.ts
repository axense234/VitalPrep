// React
import { useEffect } from "react";
// Redux
import { useAppDispatch } from "./redux";

const useVideoUrlFormat = (
  entityProperty: string,
  onEntityPropertyValueChange: (specifier: any) => void
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(entityProperty);
    if (
      entityProperty &&
      entityProperty.startsWith("https://www.youtube.com/watch?v=")
    ) {
      const newVideoUrl = entityProperty.replace("/watch?v=", "/embed/");
      console.log(newVideoUrl);
      onEntityPropertyValueChange(
        newVideoUrl.indexOf("&") === -1
          ? newVideoUrl
          : newVideoUrl.substring(0, newVideoUrl.indexOf("&"))
      );
    }
  }, [entityProperty, dispatch]);
};

export default useVideoUrlFormat;
