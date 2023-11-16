"use client";

import { useEffect, Suspense } from "react";

import { load, trackPageview } from "fathom-client";
import { usePathname, useSearchParams } from "next/navigation";

const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID ?? "";

/**
 * This is an approach suggested by Next maintainers.
 * @see https://github.com/derrickreimer/fathom-client/issues/44
 */
const TrackPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!siteId) throw new Error("Site ID not set, skipping Fathom analytics");
  }, []);

  useEffect(() => {
    load(siteId, {
      spa: "hash",
    });
  }, []);

  useEffect(() => {
    trackPageview();
    // Record a pageview when route changes
  }, [pathname, searchParams]);

  return null;
};

export const FathomAnalytics = () => {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
};
