<p align="left">
  <img src="https://github.com/DigitalTec974/DocSpawn/assets/156151783/d31091a0-16d5-4fbd-9789-c367589fac0e" width="350" alt="DocSpawn Logo" /></a>
<p>

# DownSpawn Starter Kit: Software Development Project with TurboRepo

This repository serves as a ready-to-use toolkit and project skeleton that enables a swift start in building innovative software applications.
It leverages advanced technologies and frameworks like TurboRepo, AdonisJS, Nuxt 3, TypeScript to facilitate seamless and efficient software development.

### Prerequisites

Before you can get started, you will need to have the following installed on your machine.

- Node.js (v18 or higher)
- Git
- pnpm
- VSCode (recommended, or any other code editor)

### Apps and Packages

- `api`: an [Adonis.js](https://https://adonisjs.com/) api
- `ui`: a Nuxt component library with [PrimeVue.js](https://tailwind.primevue.org/)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `web`: a [Nuxt.js](https://nuxtjs.org) app
- `docs`: a [VitePress](https://vitepress.vuejs.org/) documentation

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting , the current config also do some prettier so we dont use prettier
- [Husky](https://typicode.github.io/husky/) to manager git hooks
- [Commintlint](https://commitlint.js.org/#/) for git code message linting

### How to install a package

To install a package to the supastarter monorepo you need to decide whether you want to install it to the root of the monorepo or to a specific workspace. Installing it to the root makes it available to all packages, while installing it to a specific workspace makes it available only to that workspace.

To install a package globally, run:

`pnpm add -w <package-name>`

To install a package to a specific workspace, run:

`pnpm add --filter <workspace-name> <package-name>`

## Visual Studio Code extensions

```json
{
  "recommendations": ["vue.volar", "dbaeumer.vscode-eslint", "eamodio.gitlens"]
}
```

### Required

- `vue.volar` - Vue Language Features (Volar)
- `dbaeumer.vscode-eslint` - VS Code ESLint extension.

### Optional

- `eamodio.gitlens` - GitLens - Git supercharged.
- `mikestead.dotenv` - DotENV - Support for dotenv file syntax

### Commitlint message

- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- `docs`: Documentation only changes
- `feat`: A new feature
- `fix`: A bug fix
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `chore`: tool changes, configuration changes, and changes to things that do not actually go into production at all.
- `test`: Adding missing tests or correcting existing tests
