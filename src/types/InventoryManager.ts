import { Product, Transaction, UUID, IInventory } from ".";

export class InventoryManager implements IInventory {
  constructor(products: Product[], transactionHistory: Transaction[]) {
    this._products = products;
    this._transactionHistory = transactionHistory;
  }

  private _products: Product[];
  private _transactionHistory: Transaction[];

  public get products(): Product[] {
    return this._products;
  }

  public get transactionHistory(): Transaction[] {
    return this._transactionHistory;
  }

  public get totalCosts() {
    // todo: calculate the total cost based on the transaction history
    const purchaseTx = this._transactionHistory.filter(
      (i) => i.type === "buy" || i.type === "add"
    );
    if (!purchaseTx) {
      return 0;
    }
    return purchaseTx.reduce((acc, i) => acc + i.totalCost, 0);
  }

  public get totalValue() {
    // todo: calculate the total value of the current inventory by adding all items and stocks

    return this._products.reduce((acc, i) => acc + i.price, 0);
  }

  public get totalRevenue() {
    // todo: calculate the total revenue by adding all the sales from the transaction history
    const purchaseTx = this._transactionHistory.filter(
      (i) => i.type === "sell"
    );
    if (!purchaseTx) {
      return 0;
    }
    return purchaseTx.reduce((acc, i) => acc + i.totalCost, 0);
  }

  public get totalProfit() {
    // todo: calculate the total profit by subtracting the total cost from the revenue based on the transaction history
    return this.totalRevenue - this.totalCosts;
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

    // instead of incrementing the id value, we use a stronger random UUID generator function
    const prodId = crypto.randomUUID();

    const totalCost = cost * initStock;

    this._newTransaction({
      id: crypto.randomUUID(),
      type: "add",
      totalCost,
      productId: prodId,
      quantity: initStock,
      time: new Date(),
    });

    this._products.push({
      id: prodId,
      name: name,
      price: retailPrice,
      cost: cost,
      stock: initStock,
    });
  }

  public removeProduct(productId: UUID, isSelling: boolean = false) {
    const productIndexToRemove = this._products.findIndex(
      (i) => i.id === productId
    );
    if (productIndexToRemove === -1) {
      throw new Error(`Cannot find product with ID ${productId}`);
    }

    // sell all stock and remove the product from the inventory
    if (isSelling) {
      // todo: instead of simply removing the product, we will also mark it as a sale
    }

    const selectedProduct = this._products[productIndexToRemove];
    // todo: add new transaction history
    this._newTransaction({
      id: crypto.randomUUID(),
      type: isSelling ? "sell" : "remove",
      totalCost: isSelling ? selectedProduct.price * selectedProduct.stock : 0,
      productId: selectedProduct.id,
      quantity: selectedProduct.stock,
      time: new Date(),
    });

    // remove the product from the inventory list
    this._products.splice(productIndexToRemove, 1);
  }

  public buyProductStock(productId: UUID, stock: number) {
    if (stock < 1) {
      throw new Error("New product stock cannot be below 1");
    }
    const selectedProduct = this._findProdById(productId);
    // todo: add a new transaction history
    this._newTransaction({
      id: crypto.randomUUID(),
      type: "buy",
      totalCost: selectedProduct.cost * stock,
      productId: selectedProduct.id,
      quantity: stock,
      time: new Date(),
    });

    selectedProduct.stock += stock;
  }

  public sellProductStock(productId: UUID, stock: number) {
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
    this._newTransaction({
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      time: new Date(),
      type: "sell",
      totalCost: selectedProduct.cost * stock,
      quantity: stock,
    });

    selectedProduct.stock -= stock;
  }

  /**
   * Add a new transaction to the history
   * @param tx the transaction data
   */
  private _newTransaction(tx: Transaction) {
    this._transactionHistory.push(tx);
  }

  private _findProdById(productId: UUID) {
    const selectedProduct = this._products.find((i) => i.id === productId);
    if (!selectedProduct) {
      throw new Error(`Product with ID ${productId} does not exist`);
    }
    return selectedProduct;
  }
}
