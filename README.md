# Tools Monorepo

This repository is structured as a monorepo using npm workspaces. Each package is located in the `packages` directory and can be published under the `@michaelhartmayer` scope.

## Usage

Install packages with npm and import the tools:

```bash
npm install @michaelhartmayer/tool
```

```ts
import { tool } from '@michaelhartmayer/tool';
```

## Development

- Install dependencies: `npm install`
- Build all packages: `npm run build`
- Generate documentation: `npm run docs`

New packages can be added under `packages/<name>` with their own `package.json`.

## Documentation

Run `npm run docs` to build and open the combined documentation for all packages. Each package should include a `typedoc.json` specifying its entry points so it will automatically appear in the docs.
