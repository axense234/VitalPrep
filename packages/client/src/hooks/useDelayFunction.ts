// React
import { useEffect } from "react";

const useDelayFunction = (
  delayedFunction: any,
  triggers: any[],
  delayInMS: number
) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      delayedFunction();
    }, delayInMS);
    return () => {
      clearTimeout(timeout);
    };
  }, triggers);
};

export default useDelayFunction;
