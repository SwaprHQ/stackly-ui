import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { CHAIN_NAMESPACES, IAdapter, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

// https://web3auth.io/docs/sdk/pnp/web/modal/initialize#arguments
export const options: Web3AuthOptions = {
  clientId: "YOUR_WEB3_AUTH_CLIENT_ID", // https://dashboard.web3auth.io/
  web3AuthNetwork: "testnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x5",
    // https://chainlist.org/
    rpcTarget: "https://rpc.ankr.com/eth_goerli",
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
  txServiceUrl: "https://safe-transaction-goerli.safe.global",
};
