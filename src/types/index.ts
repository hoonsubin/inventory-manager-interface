export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

export interface Product {
  // an identifier for the product. This value will automatically increment
  id: number;
  // name of the product
  name: string;
  // the cost for purchasing (restocking) one item
  cost: number;
  // the price for selling one item
  price: number;
  // current number of stocks of a given product
  stock: number;
  // purchase more items based on the factory price
  purchaseStock: (stock: number) => void;
  // sell a stock of this product based on the retail price
  sellStock: (stock: number) => void;
  // adds a stock of this product without any costs
  addStock: (stock: number) => void;
  // removes a stock of this product without any sales
  removeStock: (stock: number) => void;
}

export interface Transaction {
  id: number;
  productId: number;
  quantity: number
  price: number;
  type: 'sell' | 'buy' | 'remove' | 'add';
  time: Date;
}

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
}
