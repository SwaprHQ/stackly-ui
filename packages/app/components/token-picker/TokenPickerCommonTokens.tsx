"use client";

import { RadioButton } from "@/ui";
import { TokenIcon } from "../TokenIcon";
import { Token } from "@/models/token/types";

const COMMON_TOKENS = [
  {
    address: "0x532801ED6f82FFfD2DAB70A19fC2d7B2772C4f4b",
    name: "Swapr on Gnosis chain",
    symbol: "SWPR",
    decimals: 18,
    logoURI: "/assets/images/tokens/swapr.png"
  },
  {
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    name: "Wrapped Ether on Gnosis chain",
    symbol: "WETH",
    decimals: 18,
    logoURI: "/assets/images/tokens/weth.png"
  },
  {
    address: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
    name: "Wrapped XDAI",
    symbol: "WXDAI",
    decimals: 18,
    logoURI: "/assets/images/tokens/wxdai.png"
  },
  {
    address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb",
    name: "Gnosis Token on Gnosis chain",
    symbol: "GNO",
    decimals: 18,
    logoURI: "/assets/images/tokens/gno.png"
  }
];

export const TokenPickerCommonTokens = () => (
  <div className="mt-5 px-6">
    <p className="text-xs font-semibold text-em-low">Common tokens</p>
    <div className="flex flex-wrap mt-2 gap-2">
      {COMMON_TOKENS.map((token: Token) => (
        <RadioButton
          checked={false}
          id={`${token.address}${token.symbol}`}
          key={`${token.address}${token.symbol}`}
          name={token.name}
          onChange={() => {}}
          value={token.name}
        >
          <TokenIcon token={token} />
          <p className="font-semibold ml-1.5">{token.symbol}</p>
        </RadioButton>
      ))}
    </div>
  </div>
);
