"use client";
import { useState, useEffect } from "react";

const useGetWindowWidth = () => {
  try {
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
  } catch (error) {}
};

export default useGetWindowWidth;
