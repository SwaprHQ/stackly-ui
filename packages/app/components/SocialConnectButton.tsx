import { useContext } from "react";
import { Button } from "../ui";
import { Web3AuthContext } from "../providers/web3auth";
import { TokenWithBalance } from "../contexts";
import { ethers } from "ethers";
import {
  ChainId,
  Token,
  createDCAOrderWithNonce,
  getCOWProtocolSettlementAddress,
  getDCAOrderSingletonAddress,
  getERC20Contract,
  getOrderFactory,
  getOrderFactoryAddress,
  getOrderFactoryInterface,
} from "@stackly/sdk";
import { FREQUENCY_OPTIONS } from "../models/stack";
import { dateToUnixTimestamp } from "../utils/datetime";
import { parseUnits } from "viem";
import { erc20ABI } from "wagmi";

const frequencyIntervalInHours = {
  [FREQUENCY_OPTIONS.hour]: 1,
  [FREQUENCY_OPTIONS.day]: 24,
  [FREQUENCY_OPTIONS.week]: 24 * 7,
  [FREQUENCY_OPTIONS.month]: 24 * 30,
};

export const SocialConnectButton = ({
  fromToken,
  toToken,
  amount,
  frequency,
  startTime,
  endTime,
}: {
  fromToken: any;
  toToken: any;
  amount: string;
  frequency: FREQUENCY_OPTIONS;
  startTime: Date;
  endTime: Date;
}) => {
  const {
    signIn,
    signOut,
    safe,
    address,
    balance,
    topUp,
    executeTransaction,
    provider,
    ethAdapter,
  } = useContext(Web3AuthContext);

  const rawAmount = parseUnits(amount, fromToken?.decimals);

  const approveFromToken = async () => {
    if (!address || !provider) return;

    const iface = new ethers.utils.Interface(erc20ABI);

    const data = iface.encodeFunctionData("approve", [
      getOrderFactoryAddress(ChainId.GNOSIS),
      rawAmount,
    ]);

    executeTransaction([{ to: fromToken.address, data, value: "0" }]);
  };

  const createStack = async () => {
    const signer = ethAdapter?.getSigner();
    const signerAddess = await signer?.getAddress();

    if (!provider || !address || !signer || !signerAddess) return;

    const iface = new ethers.utils.Interface(erc20ABI);

    const data = iface.encodeFunctionData("approve", [
      getOrderFactoryAddress(ChainId.GNOSIS),
      rawAmount,
    ]);

    const initParams: Parameters<typeof createDCAOrderWithNonce>[1] = {
      nonce: dateToUnixTimestamp(new Date()),
      owner: address,
      receiver: address,
      sellToken: fromToken.address,
      buyToken: toToken.address,
      amount: rawAmount.toString(),
      startTime: dateToUnixTimestamp(startTime),
      endTime: dateToUnixTimestamp(endTime),
      interval: frequencyIntervalInHours[frequency],
    };

    const orderFactory = getOrderFactory(
      getOrderFactoryAddress(ChainId.GNOSIS),
      signer
    );
    const singleton = getDCAOrderSingletonAddress(ChainId.GNOSIS);
    const settlementContract = getCOWProtocolSettlementAddress(ChainId.GNOSIS);

    const createOrderTransaction =
      await orderFactory.populateTransaction.createOrderWithNonce(
        singleton,
        initParams.owner,
        initParams.receiver,
        initParams.sellToken,
        initParams.buyToken,
        initParams.amount,
        initParams.startTime,
        initParams.endTime,
        initParams.interval,
        settlementContract,
        initParams.nonce
      );

    executeTransaction([
      { to: fromToken.address, data, value: "0" },
      createOrderTransaction,
    ]);
  };

  return safe ? (
    <div>
      <p>{address}</p>
      <p>Balance: {balance}</p>
      <Button onClick={() => createStack()}>Stack</Button>
      <Button onClick={() => topUp(fromToken.address, rawAmount)}>
        Top up
      </Button>
      <Button onClick={signOut}>Sign out</Button>
    </div>
  ) : (
    <Button onClick={signIn}>Sign in</Button>
  );
};
