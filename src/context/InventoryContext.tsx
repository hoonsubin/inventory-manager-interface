import { IInventory, UUID, Transaction, Product } from "../types";
import React, {
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import * as helpers from "../helpers";
import _ from "lodash";

/**
 * Interface for the inventory controller context.
 * This is extended from the inventory interface so that it matches the main class while allowing us to extend UI-specific functions.
 */
interface InventoryContextType extends IInventory {
  /**
   * Function for getting the last transaction of a product with the given ID.
   * @param prodId The ID for the product that the user wish to look up.
   * @returns The transaction data, or null if there is none.
   */
  getLastTxOfProd: (prodId: UUID) => Transaction | null;
  /**
   * Function for getting all transactions for a given product ID.
   * @param prodId The ID of the product to get the transactions.
   * @returns A list of transactions for the product. If there is no history, then the list will be empty.
   */
  getAllTxOfProd: (prodId: UUID) => Transaction[];
}

/**
 * A component property type that is used to tell the component that we expect a children (consumer).
 */
interface InventoryProviderType {
  /**
   * The child component that will be using this context.
   */
  children?: ReactNode;
}

/**
 * The inventory context object that will be called directly by all consumer components.
 */
export const InventoryContext =
  React.createContext<InventoryContextType | null>(null);

/**
 * The main inventory provider logic for all context consumers in this app.
 * This is where all the important logics are implemented. This includes transaction propagation and management, cost tracking, etc.
 */
export const InventoryProvider: React.FC<InventoryProviderType> = ({
  children,
}) => {
  // states and getter definition

  // component state for tracking the list of products. Upon init, we load the locally saved data
  const [products, setProducts] = useState<Product[]>(helpers.loadProdData());

  // component state for tracking the list of all transactions that occurs for every interaction
  // same as above, we load from the locally saved data by default
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    helpers.loadTxData()
  );

  /**
   * Getter for the total revenue
   */
  const totalRevenue = useMemo(() => {
    // we first fetch all transactions that are marked as `sell`
    const purchaseTx = _.filter(transactionHistory, (i) => i.type === "sell");
    // if there are no transactions, we return 0
    if (purchaseTx.length < 1) {
      return 0;
    }
    // and then we get the sum of all the transaction value
    return _.reduce(purchaseTx, (acc, i) => acc + i.totalCost, 0);
    // this getter value will only update if the transaction history was changed
  }, [transactionHistory]);

  /**
   * Getter for the total inventory value
   */
  const totalValue = useMemo(() => {
    // return 0 value if there are no products in the inventory
    if (products.length < 1) {
      return 0;
    }
    // we take the current product list, and multiply the retail price with the current stock for each products, and sum them up
    return _.reduce(products, (acc, i) => acc + i.price * i.stock, 0);
    // this getter will only change if the product list changes
  }, [products]);

  /**
   * Getter for the total cost that occurred when restocking products
   */
  const totalCosts = useMemo(() => {
    // we get the list of all transactions that are marked as `buy` or `add` (for new products)
    const purchaseTx = _.filter(
      transactionHistory,
      (i) => i.type === "buy" || i.type === "add"
    );
    // if there is no transaction, return 0
    if (purchaseTx.length < 1) {
      return 0;
    }

    // we take the sum of all transactions that we defined above and return it
    return _.reduce(purchaseTx, (acc, i) => acc + i.totalCost, 0);
    // value will only change if the transaction history changes
  }, [transactionHistory]);

  /**
   * Getter for the current profit (revenue - cost)
   */
  const totalProfit = useMemo(() => {
    // we return the revenue subtracted by the cost.
    return totalRevenue - totalCosts;
    // this value only changes if the total revenue or the cost changed
  }, [totalRevenue, totalCosts]);

  // function definitions

  /**
   * Returns all the transaction for a given product.
   * It takes the product ID as the argument, and will return a list of transactions (or an empty list if there is none).
   */
  const getAllTxOfProd = useCallback(
    (prodId: UUID) => {
      // look through the entire transaction list and only return the ones where the IDs match
      return _.filter(transactionHistory, (i) => i.productId === prodId);
    },
    // this function will only change if the transaction history changes
    [transactionHistory]
  );

  /**
   * A private function that submits new transactions.
   * It takes the transaction data type as the argument and adds them to the current transaction list.
   * This function returns nothing.
   */
  const _newTransaction = useCallback((tx: Transaction) => {
    // set the newly appended transaction list as a component state
    // note that we decouple the existing list and adds the new one on top
    // this is so that the object reference changes and all React hook dependencies can know that the data has changed
    setTransactionHistory([tx, ...transactionHistory]);
    // this function runs eery time the tx history changes
  }, [transactionHistory])

  /**
   * A function that takes a product ID and returns the full product object.
   */
  const findProdById = useCallback(
    (productId: UUID) => {
      // we go through the list of products and get the first object where the product ID matches with the one provided
      // we can safely say that the first match is correct since all IDs are meant to be unique. If it's not, there's an issue
      const selectedProduct = _.find(products, (i) => i.id === productId);
      // note that iterating through the product list is process intensive, but we do this so this function mimics a sever operation
      // the UI should never send the entire product data, so only the ID is enough

      // if no products were found, we throw an error. We must ensure that the UI handles this gracefully
      if (!selectedProduct) {
        throw new Error(`Product with ID ${productId} does not exist`);
      }
      // returns the first product with the ID match
      return selectedProduct;
    },
    // this function will only change if the product list changes
    [products]
  );

  /**
   * Function that adds a new product to the inventory.
   * It takes the product name, retail price, cost to restock, the initial stock, and the description as the argument.
   * It returns nothing.
   * Adding a new product is considered as a transaction. The total cost is the cost per unit * the initial stock.
   */
  const addNewProduct = useCallback(
    (
      name: string,
      retailPrice: number,
      cost: number,
      initStock: number,
      description: string
    ) => {
      // throw an error if the numeric inputs are not valid
      if (retailPrice < 0.01 || cost < 0.01 || initStock < 0) {
        throw new Error("Any of the numeric values cannot be below 0");
      }
      // throw an error if the text inputs are empty
      if (!name.trim() || !description.trim()) {
        throw new Error("Please provide the product name");
      }

      // instead of incrementing the id value, we use a stronger random UUID generator function
      const prodId = crypto.randomUUID();

      // calculate the total cost for adding a new product
      const totalCost = cost * initStock;

      // submit the new transaction with the provided data
      _newTransaction({
        id: crypto.randomUUID(), // randomly generate a new transaction ID
        type: "add", // the tx type will be `add`
        totalCost,
        productId: prodId, // provide the product ID as well so we can track where this event belongs
        quantity: initStock,
        time: new Date(), // we set the transaction timestamp the moment it was created
      });

      // add the new product on top of the current inventory
      const newProdList = [
        {
          id: prodId,
          name: name,
          price: retailPrice,
          cost: cost,
          stock: initStock,
          description,
        },
        ...products, // we decouple the old inventory list so that we can create a new object reference
      ];

      // replace the old product list with the newly updated list so that React hooks can pick it up
      setProducts(newProdList);

      // add a console log for debugging
      console.log(
        `Adding new product called ${name} with the price ${retailPrice} and store ${initStock} of it`
      );
    },
    // this function only updates when the product list and the new history function changes
    [products, _newTransaction]
  );

  /**
   * Function for restocking existing products.
   * It takes the product ID and the amount to restock as an argument.
   * This action will create a new transaction.
   */
  const buyProductStock = useCallback(
    (productId: UUID, stock: number) => {
      // throw an error if the stock is below 1
      if (stock < 1) {
        throw new Error("New product stock cannot be below 1");
      }
      // get the product object with the ID
      const selectedProduct = findProdById(productId);
      // create a new transaction event
      _newTransaction({
        id: crypto.randomUUID(), // generate a random ID
        type: "buy", // this is considered a `buy` action
        totalCost: selectedProduct.cost * stock, // the total cost for restocking is the cost per unit multiplied by the newly added stock
        productId: selectedProduct.id,
        quantity: stock,
        time: new Date(),
      });

      // we add the product stock value with the number of stocks that were added
      selectedProduct.stock += stock;
      // console log for debugging
      console.log(`Bought ${stock} more of ${selectedProduct.name}`);
    },
    // this function will only change if the find product and new tx function changes
    [findProdById, _newTransaction]
  );

  /**
   * Function for selling stocks at retail price for an existing product.
   * It takes the ID of the product to sell and the amount.
   * This is considered as a transaction.
   */
  const sellProductStock = useCallback(
    (productId: UUID, stock: number) => {
      // throw an error if the user tries to sell less than 1
      if (stock < 1) {
        throw new Error("Cannot sell product with a negative number");
      }
      // get the product object that matches the provided ID
      const selectedProduct = findProdById(productId);
      // throw an error if the product doesn't have enough stocks to sell
      if (selectedProduct.stock < stock) {
        throw new Error(
          `Product ID ${productId} has only have ${selectedProduct.stock} items left, while you're trying to sell ${stock} items`
        );
      }

      // submit a new transaction
      _newTransaction({
        id: crypto.randomUUID(),
        productId: selectedProduct.id,
        time: new Date(),
        type: "sell",
        totalCost: selectedProduct.price * stock, // the total cost is the retail price * amount to sell
        quantity: stock,
      });

      // decrement the product stock with the amount that was sold
      selectedProduct.stock -= stock;
    },
    // this function will only change if the find product and new tx function changes
    [findProdById, _newTransaction]
  );

  /**
   * Function that gets the last transaction of a certain product.
   * It takes the ID of the product that the user wants to search as the argument.
   * This will return the transaction object or null if none was found.
   */
  const getLastTxOfProd = useCallback(
    (prodId: UUID) => {
      // get all the transaction for the given product ID
      const txOfProd = getAllTxOfProd(prodId);
      // return null if there was no transaction
      if (txOfProd.length < 1) {
        return null;
      }
      // sort the list into a descending order based on the timestamp and return the first item (i.e., the latest transaction)
      return _.reverse(_.sortBy(txOfProd, ["time"]))[0];
    },
    // this function only changes if the get all tx function changes
    [getAllTxOfProd]
  );

  // event hooks definitions

  // save the product data and the transaction data locally as a JSON file
  useEffect(() => {
    // use the helper function to save the product list
    helpers.saveProdData(products);
    // use the helper function to save the transaction list
    helpers.saveTxData(transactionHistory);
    // this block is called every time the transaction history for the product changes
  }, [transactionHistory, products]);

  // pass all the properties and functions defined above as a context object that will be consumed by other components
  const contextValue: InventoryContextType = {
    products,
    transactionHistory,
    totalCosts,
    totalProfit,
    totalRevenue,
    totalValue,

    addNewProduct,
    buyProductStock,
    sellProductStock,
    findProdById,
    getAllTxOfProd,
    getLastTxOfProd,
  };

  // this component technically doesn't render anything. Instead, all child components will be able to access the above functions and data
  return (
    <>
      <InventoryContext.Provider value={contextValue}>
        {children}
      </InventoryContext.Provider>
    </>
  );
};
