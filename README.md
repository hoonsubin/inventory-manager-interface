# Inventory Management Interface

## Introduction

This is a simple inventory management application that allows the user to manage all inventory and stock of multiple products and track all transactions.
This project is written using Ionic and Electron with React, TypeScript.

## Environment Setup

This project requires Node.js and NPM to install the packages and run the project.

## How To Use

### Installing and Building Locally

```bash
npm install # installs all deps
npm run build # builds the project for the desktop environment
npm run dev # run a developer build of the app locally
```

You can double-click the executable to run the application on your device.
So far, the application was tested on Windows and macOS (Apple Silicon).

### Using the Application


## Project Structure

```bash
.
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
│   │   ├── ProductListItem.css
│   │   └── ProductListItem.tsx
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
│   │   ├── InventoryPage.css
│   │   ├── InventoryPage.tsx
│   │   ├── ValuationPage.css
│   │   ├── ValuationPage.tsx
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
