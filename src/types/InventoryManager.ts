import { Product, Transaction } from "./index";

export class InventoryManager {
  constructor(products: Product[], transactionHistory: Transaction[]) {
    this._products = products;
    this._transactionHistory = transactionHistory;
  }

  private _products: Product[];
  private _transactionHistory: Transaction[];

  public get product(): Product[] {
    return this._products;
  }

  public get transactionHistory(): Transaction[] {
    return this._transactionHistory;
  }

  public saveData() {
    // todo: implement data save feature so that we have persistent data
  }

  public loadData() {
    // todo: implement load data feature to read from a locally stored JSON file
  }

  public addNewProduct(
    name: string,
    retailPrice: number,
    cost: number,
    initStock: number
  ) {
    if (retailPrice < 0.01 || cost < 0.01 || initStock < 0) {
      throw new Error("Any of the numeric values cannot be below 0");
    }
    if (!name) {
      throw new Error("Please provide the product name");
    }

    // todo: add transaction history

    this._products.push({
      id: 0, // need to make it increment
      name: name,
      price: retailPrice,
      cost: cost,
      stock: initStock,
    });
  }

  public removeProduct(productId: number) {
    const productIndexToRemove = this._products.findIndex(
      (i) => i.id === productId
    );
    if (productIndexToRemove === -1) {
      throw new Error(`Cannot find product with ID ${productId}`);
    }
    // todo: add new transaction history
    this._products.splice(productIndexToRemove, 1);
  }

  public buyProductStock(productId: number, stock: number) {
    if (stock < 1) {
      throw new Error("New product stock cannot be below 1");
    }
    const selectedProduct = this._findProdById(productId);
    // todo: add a new transaction history
    selectedProduct.stock += stock;
  }

  public sellProductStock(productId: number, stock: number) {
    if (stock < 1) {
      throw new Error("Cannot sell product with a negative number");
    }
    const selectedProduct = this._findProdById(productId);
    if (selectedProduct.stock < stock) {
      throw new Error(
        `Product ID ${productId} has only have ${selectedProduct.stock} items left, while you're trying to sell ${stock} items`
      );
    }

    // todo: add a new transaction history
    selectedProduct.stock -= stock;
  }

  /**
   * Add a new transaction to the history
   * @param args the transaction data
   */
  private _newTransaction(args: Transaction) {
    this._transactionHistory.push(args);
  }

  private _findProdById(productId: number) {
    const selectedProduct = this._products.find((i) => i.id === productId);
    if (!selectedProduct) {
      throw new Error(`Product with ID ${productId} does not exist`);
    }
    return selectedProduct;
  }
}
