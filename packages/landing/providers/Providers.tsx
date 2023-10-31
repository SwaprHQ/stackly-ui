"use client";

import { PropsWithChildren } from "react";

import { AnalyticsProvider } from "@/contexts";

export const Providers = ({ children }: PropsWithChildren) => {
  return <AnalyticsProvider>{children}</AnalyticsProvider>;
};
