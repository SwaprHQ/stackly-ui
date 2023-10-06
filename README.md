# Stackly

Stackly is a Next.js Cloudflare mono repo project that implements Dollar Cost Averaging using CoW protocol.

## Prerequisites

Before you can run this project, make sure you have the following software installed:

- Node.js 18 or higher
- Yarn
- Git

## Getting Started

To get started with Stackly, follow these steps:

1. Clone the repository:

```
git clone https://github.com/SwaprHQ/stackly-ui.git
```

2. Install the dependencies:

```
cd stackly-ui
yarn install
yarn build:dev
```

3. Start the development server:

```
yarn dev
```

The development server will start at http://localhost:3000.

## Subgraph

To update the subgraph.yaml, go to `bin/build-subgraph.ts` and update the subgraph json. This script will run before deployment to create a new `subgraph.yaml`.

Make sure that, `bin/config.ts` is updated to reflect the latest changes for contract `address` and `startBlock`.

To deploy the Subgraph, you need to run the following commands:

```
yarn build
yarn deploy
```

## Deployment

To deploy the Stackly project to production, you can use the following command:

```
yarn build
```

This command will create a production build of the project in the `dist` directory. You can then deploy the contents of this directory to your server or hosting provider.

## Supporting new chains

1. Update the SDK.
   - You'll need the following smart contract addresses in the target chain:
     - Stackly OrderFactory
     - Stackly DCAOrder singleton
     - Stackly TheGraph subgraph endpoint
     - CoW Protcol GPv2VaultRelayer (CoW settlement)
   - Add that information in `packages\sdk\src\vaults\constants.ts`
   - `cd packages/sdk`
   - `yarn typechain`
   - `yarn build`
2. Update the Subraph.
   - Go to `packages\subgraph\bin\config.ts` and update the config object with the Factory contract `address` and `startBlock`
   - Go to `packages\subgraph\bin\build-subgraph.ts` and update the `SUPPORTED_NETWORKS` variable
   - In `packages\subgraph\package.json` create the relevant `build` and `prepare` commands for the new chain
3. Update the UI app
   - Create some tokens for the integrated chain in `packages/app/models/token/tokens.ts`
   - Add a default token pair for the chain in `packages/app/utils/constants.ts`
   - Update the WAGMI chains config in `packages/app/providers/wagmi-config.ts` with the chain info and a RPC
   - Add some common tokens for the new chain in `packages/app/components/token-picker/constants.ts`
4. Try to create a new stack in the UI

## Code Guidelines

### React Contexts

React Context checks values using simple equality (`==`). For that reason, we need to stabilize our contexts or we would be triggering a re-render for any update on Context values, even irrelevant changes. For that purpose, we use the `useMemo()` hook always for custom Contexts, as most of the time we will wrap the whole app with our custom Contexts and re-rendering might get really cumbersome at times.

- For example, check files in: `packages/app/context/`
- For more information, check: https://react.dev/learn/passing-data-deeply-with-context

## Troubleshooting

- `Unhandled Runtime Error` for NextJS

  This usually happens on NextJS v13.2.4 and up, when you export a client component (using the `"use client"` directive) using a normal function. A quick fix for this bug is to turn the normal function into an arrow function.

- `app-index.js:31 Warning: Extra attributes from the server: data-new-gr-c-s-check-loaded,data-gr-ext-installed` or similar

  This may happen due to different browser extensions like `Grammarly` and `LanguageTool` passing down extra attributes that will make a mismatch between server and client renders. Disabling/configuring the troublesome extensions to not run in the development ports (like port `3000`) should fix this issue.

- `Cannot read properties of undefined (reading Component).`

  This may happen due to circular dependencies between imports. Check if you have three or more components creating a circle of imports which may lead to a component being invoked before its initialization. A quick way to solve this would be to check the way you're exporting the problematic component. Check `packages/app/components/index.ts` to see an example of how to solve these exports.

- Error fetching `generated/contracts`.

  This may happen due to app build failures. Try deleting `node_modules`, then re-install and rebuild the app before launching it again. Note that if you don't rebuild the app (`yarn build:app`) you may get some errors due to generated code during the build step not being present.

  ```bash
  rm -rf node_modules
  yarn install
  yarn build:app
  yarn dev
  ```

## Contributing

We welcome contributions to Stackly! To get started, fork this repository and create a new branch for your changes.

Before submitting a pull request, make sure that your code passes the linting and formatting checks:

```
yarn lint
yarn typecheck
```

## License

Stackly is released under the MIT License. See the [LICENSE](LICENSE) file for more information.
