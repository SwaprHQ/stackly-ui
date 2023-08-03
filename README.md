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

## FAQ

- `Cannot read properties of undefined (reading Component).`

  This may happen due to circular dependencies between imports. Check if you have three or more components creating a circle of imports wich may lead to a component being invoked prior its initialization. A quick way to solve this would be checking the way you're exporting the problematic component. Check `packages/app/components/index.ts` to see an example on how to solve these exports.

- Error fetching `generated/contracts`.

  This may happen due to app build failures. Try deleting `node_modules`, then re-install and rebuild the app before launch it again. Note that if you don't rebuild the app (`yarn build:app`) you may get some errors due to generated code during the build step not being present.

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
