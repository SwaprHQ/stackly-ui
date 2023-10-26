"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { EventName } from "@/constants";
import { EventOptions } from "@/analytics";

const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;

interface AnalyticsContextProps {
  trackClick: (eventName: EventName, opts?: EventOptions) => void;
}

const AnalyticsContext = createContext<AnalyticsContextProps>({
  trackClick: () => {
    throw new Error("No AnalyticsContext available");
  },
});

export const AnalyticsProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    if (!siteId) throw new Error("Site ID not set, skipping Fathom analytics");
  }, []);

  const analyticsContextValues = useMemo(
    () => ({
      trackClick: (eventName: EventName, opts?: EventOptions) => {
        window.fathom.trackEvent(eventName, opts);
        console.log(
          `Click event emitted: ${eventName}.${opts ? " Options: " : ""}`,
          opts ?? ""
        );
      },
    }),
    []
  );

  return (
    <AnalyticsContext.Provider value={analyticsContextValues}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useFathomAnalytics = () => useContext(AnalyticsContext);
