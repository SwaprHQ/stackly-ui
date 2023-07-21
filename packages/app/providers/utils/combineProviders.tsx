"use client";

import { FC, PropsWithChildren } from "react";

// export const combineComponents = (...providers: FC[]): FC => {
//   return providers.reduce(
//     (AccumulatedProviders, CurrentProviders) => {
//       const CombinedComponents = ({ children }: PropsWithChildren) => {
//         return (
//           <AccumulatedProviders>
//             <CurrentProviders>{children}</CurrentProviders>
//           </AccumulatedProviders>
//         );
//       }
//       return CombinedComponents;
//     },
//     ({ children }) => <>{children}</>,
//   );
// };
