"use client";
import { breakPoints } from "@/constants";
import { breakPointsTypes } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "./useWindowSize";

const breakpoints: {
  [key in breakPointsTypes]: [number, number];
} = {
  xxl: [breakPoints.xxl, 10000],
  xl: [breakPoints.xl, breakPoints.xxl - 1],
  lg: [breakPoints.lg, breakPoints.xl - 1],
  md: [breakPoints.md, breakPoints.lg - 1],
  sm: [breakPoints.sm, breakPoints.md - 1],
  xs: [breakPoints.xs, breakPoints.sm - 1],
};

const viewPortNames: {
  isMobile: Boolean;
  isTablate: Boolean;
  isLabtop: Boolean;
  isDesktop: Boolean;
} = {
  isMobile: false,
  isTablate: false,
  isLabtop: false,
  isDesktop: false,
};

const useGetBreakpoint = () => {
  const windowSize = useWindowSize();
  const [breakpoint, setBreakpoint] = useState<breakPointsTypes>();

  useEffect(() => {
    const currentBreakpoint = Object.entries(breakpoints).find(
      ([_, breakPoint]) =>
        windowSize.width >= breakPoint[0] && windowSize.width <= breakPoint[1]
    );

    if (currentBreakpoint) {
      setBreakpoint(currentBreakpoint[0] as breakPointsTypes);
    }
  }, [windowSize]);

  // return true if the breakPoint's Axis that passed in the args is less than the current window size
  // so you pass the breakpoint that you want to check if currently in range
  const isValidBreakPoint = (breakpoint: breakPointsTypes) => {
    return breakpoints[breakpoint][0] <= windowSize.width;
  };

  const getViewPortName: typeof viewPortNames = useMemo(() => {
    switch (breakpoint) {
      case "xs":
        return {
          ...viewPortNames,
          isMobile: true,
        };
      case "sm":
        return {
          ...viewPortNames,
          isMobile: true,
        };
      case "md":
        return {
          ...viewPortNames,
          isTablate: true,
        };
      case "lg":
        return {
          ...viewPortNames,
          isLabtop: true,
        };
      case "xl":
        return {
          ...viewPortNames,
          isLabtop: true,
        };
      case "xxl":
        return {
          ...viewPortNames,
          isDesktop: true,
        };
      default:
        return {
          ...viewPortNames,
          isDesktop: true,
        };
    }
  }, [breakpoint]);

  return {
    breakpoint,
    isValidBreakPoint,
    ...getViewPortName,
  };
};

export default useGetBreakpoint;
