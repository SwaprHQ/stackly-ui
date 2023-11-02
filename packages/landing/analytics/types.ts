type PageViewOptions = {
  referrer?: string;
  url?: string;
};

export type EventName = string;

export type EventOptions = {
  _site_id?: string;
  _value?: number;
};

export interface Fathom {
  blockTrackingForMe: () => void;
  enableTrackingForMe: () => void;
  setSite: (siteId: string) => void;
  trackEvent(eventId: string, opts?: EventOptions): void;
  trackPageview: (opts?: PageViewOptions) => void;
}

declare global {
  interface Window {
    fathom: Fathom;
  }
}
