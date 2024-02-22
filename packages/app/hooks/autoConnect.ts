"use client";

import { useAccount, useConnect } from "wagmi";
import { useEffect } from "react";

const AUTOCONNECTED_CONNECTOR_IDS = ["safe"];

function useAutoConnect() {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected)
      AUTOCONNECTED_CONNECTOR_IDS.every((connector) => {
        const connectorInstance = connectors.find((c) => c.id === connector);

        if (connectorInstance) {
          connect({ connector: connectorInstance });
          return false;
        }
        return true;
      });
  }, [connect, connectors, isConnected]);
}

export { useAutoConnect };
