/**
 * Unique ID that is used for all database items.
 * This is meant to be compatible with `crypto.randomUUID()`.
 */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

/**
 * The base inventory interface that defines all the properties and functions that will be used for the manager logic.
 */
export interface IInventory {
  // the list of products in the inventory
  products: Product[];
  // the transaction history
  transactionHistory: Transaction[];
  // the total revenue based on the transactions
  totalRevenue: number;
  // the total value based on the transactions
  totalValue: number;
  // the total cost based on the transactions
  totalCosts: number;
  // the current profit based on the cost and revenue
  totalProfit: number;

  // function for adding a new product
  addNewProduct: (
    name: string,
    retailPrice: number,
    cost: number,
    initStock: number,
    description: string,
  ) => void;
  // function for restocking a product
  buyProductStock: (productId: UUID, stock: number) => void;
  // function for selling a stock in a product
  sellProductStock: (productId: UUID, stock: number) => void;
  // function for parsing the data and getting a product that matches the ID
  findProdById: (productId: UUID) => Product;
}

/**
 * The product type that describes the properties that defines what a product is.
 * This is used throughout the app to represent the product data in our inventory.
 */
export type Product = {
  // an identifier for the product. This value will automatically increment
  id: UUID;
  // name of the product
  name: string;
  // the cost for purchasing (restocking) one item
  cost: number;
  // the price for selling one item
  price: number;
  // current number of stocks of a given product
  stock: number;
  // the product description
  description: string;
}

/**
 * Transaction types a user can perform within the app.
 * This is used to mark transactions so we can easily filter the history and perform calculations.
 */
export type TxType = "sell" | "buy" | "add";

/**
 * The transaction type that describes the content of a transaction.
 * This is used throughout the app to represent all transactions that came from the inventory.
 */
export type Transaction = {
  // transaction ID
  id: UUID;
  // the ID of the product where this transaction came from
  productId: UUID;
  // the quantity of product stocks that changed in this transaction
  quantity: number;
  // the total cost that occurred in this transaction
  totalCost: number;
  // the transaction type
  type: TxType;
  // the timestamp for when this transaction happened
  time: Date;
}
