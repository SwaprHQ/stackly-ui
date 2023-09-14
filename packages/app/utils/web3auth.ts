import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { CHAIN_NAMESPACES, IAdapter, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { GelatoRelayPack } from "@safe-global/relay-kit";

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
export const options: Web3AuthOptions = {
  clientId: "YOUR_WEB3_AUTH_CLIENT_ID", // https://dashboard.web3auth.io/
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x64",
    // https://chainlist.org/
    rpcTarget: "https://rpc.gnosis.gateway.fm",
  },
  uiConfig: {
    theme: "dark",
    loginMethodsOrder: ["google", "facebook"],
  },
};

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#configuring-adapters
export const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: "torus",
    showOnModal: false,
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: "metamask",
    showOnDesktop: true,
    showOnMobile: false,
  },
};

// https://web3auth.io/docs/sdk/pnp/web/modal/whitelabel#whitelabeling-while-modal-initialization
export const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "mandatory",
  },
  adapterSettings: {
    uxMode: "popup",
    whiteLabel: {
      name: "Safe",
    },
  },
});

export const web3AuthConfig: Web3AuthConfig = {
  txServiceUrl: "https://safe-transaction-gnosis-chain.safe.global",
};

export const relayKit = new GelatoRelayPack(
  process.env.NEXT_PUBLIC_GELATO_APP_KEY
);
