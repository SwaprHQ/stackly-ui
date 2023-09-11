import { useContext } from "react";
import { Button } from "../ui";
import { Web3AuthContext } from "../providers/web3auth";

export const SocialConnectButton = () => {
  const { signIn, safe } = useContext(Web3AuthContext);

  return <Button onClick={signIn}>Sign in</Button>;
};
