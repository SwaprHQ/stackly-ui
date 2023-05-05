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
git clone https://github.com/ImpeccableHQ/stackly-ui
```

2. Install the dependencies:

```
cd stackly
yarn
```

3. Start the development server:

```
yarn dev
```

The development server will start at http://localhost:3000.

## Deployment

To deploy the Stackly project to production, you can use the following command:

```
yarn build && yarn export
```

This command will create a production build of the project in the `packages/app/out` directory. You can then deploy the contents of this directory to your server or hosting provider.

## Contributing

We welcome contributions to Stackly! To get started, fork this repository and create a new branch for your changes.

Before submitting a pull request, make sure that your code passes the linting and formatting checks:

```
yarn lint
yarn typecheck
```

## License

Stackly is released under the MIT License. See the [LICENSE](LICENSE) file for more information.