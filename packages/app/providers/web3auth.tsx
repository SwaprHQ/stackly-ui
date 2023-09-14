"use client";

import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { createContext, useEffect, useState } from "react";
import {
  options,
  openloginAdapter,
  web3AuthConfig,
  modalConfig,
  relayKit,
} from "../utils/web3auth";
import { ADAPTER_EVENTS } from "@web3auth/base";
import { ethers } from "ethers";
import Safe, {
  EthersAdapter,
  SafeFactory,
  getSafeContract,
} from "@safe-global/protocol-kit";
import { ChainId, getERC20Contract } from "@stackly/sdk";
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types";
import SafeApiKit from "@safe-global/api-kit";

interface IWeb3AuthContext {
  web3AuthModalPack: Web3AuthModalPack;
  signIn: () => void;
  signOut: () => void;
  topUp: any;
  executeTransaction: any;
  safe: Safe | undefined;
  address: string | undefined;
  balance: string | undefined;
  provider: any;
  ethAdapter: EthersAdapter | undefined;
}

interface Web3AuthProviderProps {
  children: React.ReactNode;
}

const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
export const Web3AuthContext = createContext({
  web3AuthModalPack,
} as IWeb3AuthContext);

// web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, () => {
//   console.log("User is authenticated");
// });

// web3AuthModalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, () => {
//   console.log("User is not authenticated");
// });

/**
 * Web3AuthProvider: provides the Web3Auth context to the application
 */
export function Web3AuthProvider({ children }: Web3AuthProviderProps) {
  const [safe, setSafe] = useState<Safe>();
  const [safeSDK, setSafeSDK] = useState<SafeFactory>();
  const [safeService, setSafeService] = useState<SafeApiKit>();
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [ethAdapter, setEthdapter] = useState<EthersAdapter>();

  useEffect(() => {
    (async () => {
      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter as any],
        modalConfig,
      });
    })();
  }, []);

  const signIn = async () => {
    await web3AuthModalPack.signIn();

    const provider = new ethers.providers.Web3Provider(
      web3AuthModalPack.getProvider() as ethers.providers.ExternalProvider
    );
    setProvider(provider);
    const signer = provider.getSigner();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer || provider,
    });
    setEthdapter(ethAdapter);
    const safeService = new SafeApiKit({
      txServiceUrl: web3AuthConfig.txServiceUrl || "",
      ethAdapter: ethAdapter,
    });

    const safeSDK = await SafeFactory.create({
      ethAdapter,
    });
    setSafeService(safeService);
    setSafeSDK(safeSDK);

    const safeAddress = await safeSDK.predictSafeAddress({
      owners: [await signer.getAddress()],
      threshold: 1,
    });

    const isDeployed = (await provider.getCode(safeAddress)) !== "0x";

    if (!isDeployed) {
      const safe = await safeSDK.deploySafe({
        safeAccountConfig: {
          owners: [await signer.getAddress()],
          threshold: 1,
        },
      });
      setSafe(safe);
      setAddress(await safe.getAddress());
      setBalance((await safe.getBalance()).toString());
    } else {
      const safe = await Safe.create({ ethAdapter, safeAddress });
      setSafe(safe);
      setAddress(await safe.getAddress());
      setBalance((await safe.getBalance()).toString());
    }
  };

  const signOut = async () => {
    const authKitSignData = await web3AuthModalPack.signOut();
    setSafe(undefined);
  };

  const topUp = async (tokenAddress: string, amount: string) => {
    if (!safeSDK || !provider || !address) return;

    const erc20Contract = getERC20Contract(tokenAddress, provider.getSigner());

    const tx = await erc20Contract.transfer(address, amount);
    const result = await tx.wait();
    console.log("Top up done", result);
  };

  const executeTransaction = async (
    transactions: ethers.PopulatedTransaction[]
  ) => {
    if (
      !safe ||
      !safeSDK ||
      !safeService ||
      !address ||
      !provider ||
      !ethAdapter
    )
      return;

    const safeTransactionData: MetaTransactionData[] = transactions.map(
      (transaction) => ({
        to: transaction.to || "",
        data: transaction.data || "0x",
        value: "0",
      })
    );

    const safeTransaction = await safe.createTransaction({
      safeTransactionData,
    });

    const signedSafeTx = await safe.signTransaction(safeTransaction);

    const safeSingletonContract = await getSafeContract({
      ethAdapter,
      safeVersion: await safe.getContractVersion(),
    });
    const encodedTx = safeSingletonContract.encode("execTransaction", [
      signedSafeTx.data.to,
      signedSafeTx.data.value,
      signedSafeTx.data.data,
      signedSafeTx.data.operation,
      signedSafeTx.data.safeTxGas,
      signedSafeTx.data.baseGas,
      signedSafeTx.data.gasPrice,
      signedSafeTx.data.gasToken,
      signedSafeTx.data.refundReceiver,
      signedSafeTx.encodedSignatures(),
    ]);

    const response = await relayKit.relayTransaction({
      target: address,
      encodedTransaction: encodedTx,
      chainId: ChainId.GNOSIS,
      options: { isSponsored: true },
    });

    console.log(
      `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
    );
  };

  return (
    <Web3AuthContext.Provider
      value={{
        web3AuthModalPack,
        signIn,
        signOut,
        safe,
        address,
        balance,
        topUp,
        executeTransaction,
        provider,
        ethAdapter,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
}
