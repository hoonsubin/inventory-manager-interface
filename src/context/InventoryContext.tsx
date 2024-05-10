import { IInventory, UUID, Transaction, Product } from "../types";
import React, {
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { getDefaultProducts } from "../data/products";
import _ from "lodash";

// extend from the inventory interface so that it matches the main class while allowing us to extend UI-specific functions
interface InventoryContextType extends IInventory {
  getLastTxOfProd: (prodId: UUID) => Transaction | null;
  getAllTxOfProd: (prodId: UUID) => Transaction[];
  saveData: (productList: Product[], txList: Transaction[]) => void;
  loadData: () => void;
}

interface InventoryProviderType {
  children?: ReactNode;
}

export const InventoryContext =
  React.createContext<InventoryContextType | null>(null);

export const InventoryProvider: React.FC<InventoryProviderType> = ({
  children,
}) => {
  // states and getters

  const [products, setProducts] = useState<Product[]>(getDefaultProducts());

  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    []
  );

  const totalRevenue = useMemo(() => {
    // todo: calculate the total revenue by adding all the sales from the transaction history

    const purchaseTx = _.filter(transactionHistory, (i) => i.type === "sell");
    if (purchaseTx.length < 1) {
      return 0;
    }

    return _.reduce(purchaseTx, (acc, i) => acc + i.totalCost, 0);
  }, [transactionHistory]);

  const totalValue = useMemo(() => {
    return _.reduce(products, (acc, i) => acc + i.price, 0);
  }, [products]);

  const totalCosts = useMemo(() => {
    const purchaseTx = _.filter(
      transactionHistory,
      (i) => i.type === "buy" || i.type === "add"
    );
    if (purchaseTx.length < 1) {
      return 0;
    }

    return _.reduce(purchaseTx, (acc, i) => acc + i.totalCost, 0);
  }, [transactionHistory]);

  const totalProfit = useMemo(() => {
    return totalRevenue - totalCosts;
  }, [totalRevenue, totalCosts]);

  // functions

  const getAllTxOfProd = useCallback(
    (prodId: UUID) => {
      return _.filter(transactionHistory, (i) => i.id === prodId);
    },
    [transactionHistory]
  );

  const _newTransaction = useCallback(
    (tx: Transaction) => {
      setTransactionHistory([tx, ...transactionHistory]);
    },
    [transactionHistory]
  );

  const saveData = (productList: Product[], txList: Transaction[]) => {
    localStorage.setItem("inventory", JSON.stringify(productList));
    localStorage.setItem("transactions", JSON.stringify(txList));
  };

  const loadData = () => {
    const savedInventory = localStorage.getItem("inventory");
    const savedTransactions = localStorage.getItem("transactions");

    if (!savedInventory) {
      console.log('No saved inventory found, loading in the default values.');
      // error: inventory is still empty even if it loads the default ones
      setProducts(getDefaultProducts());
    }
    else {
      setProducts(JSON.parse(savedInventory));
    }

    if (!savedTransactions) {
      console.log('No saved transactions found. Loading nothing.')
    }
    else {
      setTransactionHistory(JSON.parse(savedTransactions));
    }
  };

  const findProdById = useCallback(
    (productId: UUID) => {
      const selectedProduct = _.find(products, (i) => i.id === productId);

      if (!selectedProduct) {
        throw new Error(`Product with ID ${productId} does not exist`);
      }
      return selectedProduct;
    },
    [products]
  );

  const addNewProduct = useCallback(
    (
      name: string,
      retailPrice: number,
      cost: number,
      initStock: number,
      description: string
    ) => {
      if (retailPrice < 0.01 || cost < 0.01 || initStock < 0) {
        throw new Error("Any of the numeric values cannot be below 0");
      }
      if (!name) {
        throw new Error("Please provide the product name");
      }

      // instead of incrementing the id value, we use a stronger random UUID generator function
      const prodId = crypto.randomUUID();

      const totalCost = cost * initStock;

      _newTransaction({
        id: crypto.randomUUID(),
        type: "add",
        totalCost,
        productId: prodId,
        quantity: initStock,
        time: new Date(),
      });

      setProducts([
        {
          id: prodId,
          name: name,
          price: retailPrice,
          cost: cost,
          stock: initStock,
          description,
        },
        ...products,
      ]);

      // products.push({
      //   id: prodId,
      //   name: name,
      //   price: retailPrice,
      //   cost: cost,
      //   stock: initStock,
      //   description,
      // });
      console.log(
        `Adding new product called ${name} with the price ${retailPrice} and store ${initStock} of it`
      );
    },
    [products, _newTransaction]
  );

  const removeProduct = useCallback(
    (productId: UUID, isSelling: boolean = false) => {
      const productIndexToRemove = _.findIndex(
        products,
        (i) => i.id === productId
      );
      if (productIndexToRemove === -1) {
        throw new Error(`Cannot find product with ID ${productId}`);
      }

      const selectedProduct = products[productIndexToRemove];
      // sell all stock and remove the product from the inventory
      if (isSelling) {
        // todo: instead of simply removing the product, we will also mark it as a sale
        console.log(
          `Selling the entire stock of ${selectedProduct.name} from the inventory`
        );
      }

      // todo: add new transaction history
      _newTransaction({
        id: crypto.randomUUID(),
        type: isSelling ? "sell" : "remove",
        totalCost: isSelling
          ? selectedProduct.price * selectedProduct.stock
          : 0,
        productId: selectedProduct.id,
        quantity: selectedProduct.stock,
        time: new Date(),
      });

      // remove the product from the inventory list
      setProducts(_.remove(products, (i) => i.id === productId));
      //products.splice(productIndexToRemove, 1);
      console.log(
        `Removing product ${selectedProduct.name} from the inventory`
      );
    },
    []
  );

  const buyProductStock = useCallback((productId: UUID, stock: number) => {
    if (stock < 1) {
      throw new Error("New product stock cannot be below 1");
    }
    const selectedProduct = findProdById(productId);
    // todo: add a new transaction history
    _newTransaction({
      id: crypto.randomUUID(),
      type: "buy",
      totalCost: selectedProduct.cost * stock,
      productId: selectedProduct.id,
      quantity: stock,
      time: new Date(),
    });

    selectedProduct.stock += stock;
    console.log(`Bought ${stock} more of ${selectedProduct.name}`);
  }, []);

  const sellProductStock = useCallback((productId: UUID, stock: number) => {
    if (stock < 1) {
      throw new Error("Cannot sell product with a negative number");
    }

    const selectedProduct = findProdById(productId);
    if (selectedProduct.stock < stock) {
      throw new Error(
        `Product ID ${productId} has only have ${selectedProduct.stock} items left, while you're trying to sell ${stock} items`
      );
    }

    // todo: add a new transaction history
    _newTransaction({
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      time: new Date(),
      type: "sell",
      totalCost: selectedProduct.cost * stock,
      quantity: stock,
    });

    selectedProduct.stock -= stock;
  }, []);

  const getLastTxOfProd = useCallback((prodId: UUID) => {
    const txOfProd = getAllTxOfProd(prodId);
    if (txOfProd.length < 1) {
      return null;
    }
    // sort the list into a descending order based on the timestamp and get the first item
    return _.reverse(_.sortBy(txOfProd, ["time"]))[0];
  }, []);

  // event hooks

  // effect to load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // effect to save data whenever it changes
  useEffect(() => {
    saveData(products, transactionHistory);
  }, [transactionHistory, products]);

  const contextValue: InventoryContextType = {
    products,
    transactionHistory,
    totalCosts,
    totalProfit,
    totalRevenue,
    totalValue,

    addNewProduct,
    removeProduct,
    buyProductStock,
    sellProductStock,
    findProdById,
    saveData,
    loadData,
    getAllTxOfProd,
    getLastTxOfProd,
  };

  return (
    <>
      <InventoryContext.Provider value={contextValue}>
        {children}
      </InventoryContext.Provider>
    </>
  );
};
