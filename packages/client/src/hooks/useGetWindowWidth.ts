"use client";
import { useState, useEffect } from "react";

const useGetWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window?.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window?.innerWidth);
    };

    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

export default useGetWindowWidth;
