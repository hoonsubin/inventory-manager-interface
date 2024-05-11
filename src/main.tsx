import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { InventoryProvider } from "./context/InventoryContext";

// get the HTML element where the app should be mounted
const container = document.getElementById("root");
// default function for mounting the React app to the browser DOM
const root = createRoot(container!);
// renders the entire application to the browser
// this is where we also inject the inventory manager logic in the form of a context provider,
// so all child components can consume the same logic
root.render(
  <React.StrictMode>
    <InventoryProvider>
      <App />
    </InventoryProvider>
  </React.StrictMode>
);
