export const config: Record<
  string,
  {
    orderFactory: {
      address: string;
      startBlock: number;
    };
  }
> = {
  gnosis: {
    orderFactory: {
      address: "0x45B91Da2834010751b17F1eadE0a5a7B64233add",
      startBlock: 28800393,
    },
  },
  mainnet: {
    orderFactory: {
      address: "0x8B1A70fecCC6c2aE6017dDD8D0BeBDd1bD6eB261",
      startBlock: 18241414,
    },
  },
  "arbitrum-one": {
    orderFactory: {
      address: "0xf4cd605e5fef8618ac450e84b7e912c870927922",
      startBlock: 218655333,
    },
  },
};
