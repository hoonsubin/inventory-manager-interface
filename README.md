# Inventory Management Interface

## Introduction

This is a simple inventory management application that allows the user to manage all inventory and stock of multiple products and track all transactions that was made as part of the [Master’s in Management and Digital Technologies' application for winter semester 2024/25](https://cms-cdn.lmu.de/media/04-som/mmt/downloads/ws2425_essay-for-mmt-application.pdf) at the LMU.
This project is written using Ionic and Electron with React, TypeScript.

## Environment Setup

This project requires Node.js and NPM to install the packages and run the project.

## Features

This project is meant to be built and used on EVERY modern platforms.
You can access the web version here: <https://hoonsubin.github.io/inventory-manager-interface/>

With this app, you can add new products, sell existing stocks, restock, view all transaction history (every interaction with a product is considered as a transaction), and track all cost and profit-related numbers.

### Installing and Building Locally

```bash
npm install # installs all deps
npm run build:web # builds the web app version of the project. This is the foundation for all build actions
npm run build:electron # builds the desktop application for the local platform (ex: macOS or Windows)
npm run build:all # builds the project for all platforms. The mac build will fail if you are not running this from macOS due to package licensing
npm run dev # run a developer build of the app locally
```

The web build will be available in the `/dist` folder, while all desktop versions will be available inside the `/release` folder.

### Using the Application

You can double-click the executable to run the application on your device.
So far, the application was tested on Windows and macOS (Apple Silicon).

## Project Structure

```bash
.
├── .browserslistrc
├── .eslintrc.js
├── .github
│   └── workflows
│       └── deploy_action.yml
├── .gitignore
├── .vscode
│   └── extensions.json
├── README.md
├── capacitor.config.ts
├── cypress
│   ├── e2e
│   │   └── test.cy.ts
│   ├── fixtures
│   │   └── example.json
│   └── support
│       ├── commands.ts
│       └── e2e.ts
├── cypress.config.ts
├── electron
│   ├── electron-env.d.ts
│   ├── main.ts
│   └── preload.ts
├── electron-builder.json5
├── index.html
├── ionic.config.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.png
│   └── manifest.json
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── AddNewProdModal.tsx
│   │   ├── ExploreContainer.css
│   │   ├── ExploreContainer.tsx
│   │   ├── ProdStockChangeModal.tsx
│   │   ├── ProductListItem.tsx
│   │   └── TransactionListItem.tsx
│   ├── context
│   │   └── InventoryContext.tsx
│   ├── data
│   │   └── products.ts
│   ├── helpers
│   │   └── index.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── HistoryPage.css
│   │   ├── HistoryPage.tsx
│   │   ├── InventoryPage.tsx
│   │   ├── ViewProduct.css
│   │   └── ViewProduct.tsx
│   ├── setupTests.ts
│   ├── theme
│   │   └── variables.css
│   ├── types
│   │   └── index.ts
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

Most of the core logic of the application is stored in `src/context/InventoryContext.tsx`, and some utility functions in `src/helpers/index.ts`.
Rest of the files are UI-related scripts or metadata that was created as part of the scaffolding.
I tired to add comment on all important part of the code, so feel free to explore and learn how this project works.
