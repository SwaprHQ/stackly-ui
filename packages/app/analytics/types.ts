type PageViewOptions = {
  url?: string;
  referrer?: string;
};

export type EventOptions = {
  _site_id?: string;
  _value?: number;
};

export interface Fathom {
  blockTrackingForMe: () => void;
  enableTrackingForMe: () => void;
  trackPageview: (opts?: PageViewOptions) => void;
  trackEvent(eventId: string, opts?: EventOptions): void;
  setSite: (siteId: string) => void;
}

declare global {
  interface Window {
    fathom: Fathom;
  }
}
