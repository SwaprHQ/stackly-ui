const LAUNCH_APP = "click/launch-app";
const LAUNCH_APP_NAVBAR = `${LAUNCH_APP}-navbar`;
const FAQ = "click/faq";
const FAQ_WHAT_IS = `${FAQ}-what-is`;
const FAQ_HOW = `${FAQ}-how`;
const DUNE_ANALYTICS = "click/dune";

export const EVENTS = {
  NAVBAR: {
    DESKTOP: {
      LAUNCH_APP_CLICK: `${LAUNCH_APP_NAVBAR}-desktop`,
      DUNE_ANALYTICS: `${DUNE_ANALYTICS}-desktop`,
    },
    MOBILE: {
      LAUNCH_APP_CLICK: `${LAUNCH_APP_NAVBAR}-mobile`,
      DUNE_ANALYTICS: `${DUNE_ANALYTICS}-mobile`,
    },
  },
  SECTIONS: {
    FAQ: {
      HOW_CANCEL_STACK: `${FAQ_HOW}-cancel-stack`,
      HOW_STACKLY_WORKS: `${FAQ_HOW}-stackly-works`,
      WHAT_IS_STACKLY_CLICK: `${FAQ_WHAT_IS}-stackly`,
      WHAT_IS_STACK_CLICK: `${FAQ_WHAT_IS}-stack`,
      WHAT_IS_DCA: `${FAQ_WHAT_IS}-dca`,
      WHY_TO_DCA: `${FAQ}-why-to-dca`,
      NETWORKS_AVAILABLE: `${FAQ}-networks-available`,
    },
    HERO_BANNER: {
      STACK_NOW_CLICK: `${LAUNCH_APP}-hero-banner`,
    },
    TRY_STACKLY_BANNER: {
      TRY_STACKLY_NOW_CLICK: `${LAUNCH_APP}-try-stackly-banner`,
    },
  },
};
