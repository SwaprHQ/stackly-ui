import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { useEffect, createContext, useState } from "react";
import {
  options,
  openloginAdapter,
  web3AuthConfig,
  modalConfig,
} from "../utils/web3auth";
import { ADAPTER_EVENTS } from "@web3auth/base";
import { ethers } from "ethers";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";

interface IWeb3AuthContext {
  web3AuthModalPack: Web3AuthModalPack;
  signIn: () => void;
  safe: SafeFactory | undefined;
}

interface Web3AuthProviderProps {
  children: React.ReactNode;
}

const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
export const Web3AuthContext = createContext({
  web3AuthModalPack,
} as IWeb3AuthContext);

const initWeb3Auth = async () => {
  await web3AuthModalPack.init({
    options,
    adapters: [openloginAdapter as any],
    modalConfig,
  });
};
web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, () => {
  console.log("User is authenticated");
});

web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
  console.log("User is not authenticated");
});

initWeb3Auth();
/**
 * Web3AuthProvider: provides the Web3Auth context to the application
 */
export function Web3AuthProvider({ children }: Web3AuthProviderProps) {
  const [safe, setSafe] = useState<SafeFactory>();
  const signIn = async () => {
    const authKitSignData = await web3AuthModalPack.signIn();
    console.log(authKitSignData);

    const provider = new ethers.providers.Web3Provider(
      web3AuthModalPack.getProvider() as ethers.providers.ExternalProvider
    );
    const signer = provider.getSigner();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer || provider,
    });

    const safeSDK = await SafeFactory.create({
      ethAdapter,
    });

    console.log(safeSDK.getAddress());
    const safeAddress = await safeSDK.predictSafeAddress({
      owners: [await signer.getAddress()],
      threshold: 1,
    });
    console.log(safeAddress, await provider.getCode(safeAddress));
    console.log(safe);

    const safeSdkOwner = await safeSDK.deploySafe({
      safeAccountConfig: {
        owners: [await signer.getAddress()],
        threshold: 1,
      },
    });
  };

  return (
    <Web3AuthContext.Provider value={{ web3AuthModalPack, signIn, safe }}>
      {children}
    </Web3AuthContext.Provider>
  );
}
