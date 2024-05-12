import { Product, Transaction, TxType } from "../types";
import { getDefaultProducts } from "../data/products";
import { arrowDown, bagRemove, bagAdd } from "ionicons/icons";
import moment from "moment";

/**
 * Inventory identifier that is used to save and read the product inventory JSON data in the browser.
 */
const INVENTORY_KEY = "inventory";
/**
 * Transaction identifier that is used to save and read the inventory JSON data in the browser.
 */
const TX_KEY = "transactions";

/**
 * Save the product inventory data to the browser.
 * @param productList List of products to save
 */
export const saveProdData = (productList: Product[]) => {
  // the `localStorage` API allows the app to access the browser storage space
  // we convert the product list into a JSON file and store it as raw text
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(productList));
};

/**
 * Save the transaction data to the browser.
 * @param txList List of transactions to save
 */
export const saveTxData = (txList: Transaction[]) => {
  // same case as the `saveProdData` function, but for transaction data
  localStorage.setItem(TX_KEY, JSON.stringify(txList));
};

/**
 * Load the locally saved product inventory to the application.
 * @returns The locally saved product list, or the default dummy inventory if none was found
 */
export const loadProdData = () => {
  // read the text data that was stored with the inventory key
  const savedInventory = localStorage.getItem(INVENTORY_KEY);

  // if the data exists, then we parse the object and cast it as a product list, or we return the default list
  return savedInventory
    ? (JSON.parse(savedInventory) as Product[])
    : getDefaultProducts();
};

/**
 * Load the locally saved transaction list to the application.
 * @returns The locally saved transaction list, or an empty list if none was found
 */
export const loadTxData = () => {
  // read the locally saved tx data like above
  const savedTransactions = localStorage.getItem(TX_KEY);

  // if the data exists, we parse the object and cast it with the right type. If not, return an empty list
  return savedTransactions
    ? (JSON.parse(savedTransactions) as Transaction[])
    : [];
};

/**
 * Helper function that maps the transaction type with the visual elements.
 * This function is used for rendering the transaction history page.
 * @param txType The transaction type, which could be add, buy, or sell
 * @returns the icon, message, and color that the UI elements can use
 */
export const typeToVisuals = (txType: TxType) => {
  switch (txType) {
    case "add":
      return {
        icon: arrowDown,
        msg: "Add New Product",
        color: "primary",
      };
    case "buy":
      return {
        icon: bagAdd,
        msg: "Restock Product",
        color: "warning",
      };
    case "sell":
      return {
        icon: bagRemove,
        msg: "Sell Product Stock",
        color: "success",
      };
  }
};

/**
 * A helper function that takes in a date object and converts it into human-readable relative string.
 * For example, `Two days ago` or `3 minutes ago`.
 * @param date The date object to format
 * @returns Formatted relative time string
 */
export const dateToRelativeFormat = (date: Date) => {
  return moment(date).fromNow();
};
