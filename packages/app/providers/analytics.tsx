import { useEffect, useState, createContext } from "react";

import { Fathom, loadFathom } from "@/analytics";

interface IAnalyticsContext {
  fathom: Fathom;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const AnalyticsContext = createContext({} as IAnalyticsContext);

/**
 * AnalyticsProvider: provides the analytics context to the application
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [fathom, setFathom] = useState<Fathom>();
  // Load the fathom site information
  useEffect(() => {
    const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;
    const siteScriptURL = process.env.NEXT_PUBLIC_FATHOM_SITE_SCRIPT_URL;

    if (!siteId) {
      console.warn("Site ID not set, skipping Fathom analytics");
      return;
    }

    loadFathom(siteId, siteScriptURL)
      .then(() => {
        setFathom(window.fathom);
      })
      .catch((error: Error) => {
        console.error("Error loading Fathom analytics", error);
      });
  }, []);

  return (
    <AnalyticsContext.Provider
      value={
        {
          fathom,
        } as IAnalyticsContext
      }
    >
      {children}
    </AnalyticsContext.Provider>
  );
}
