import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { Transaction, TxType } from "../types";
import { InventoryContext } from "../context/InventoryContext";
import ExploreContainer from "../components/ExploreContainer";
import InventoryValueCard from "../components/InventoryValueCard";
import _ from "lodash";
import TransactionListItem from "../components/TransactionListItem";

import "./HistoryPage.css";

/**
 * Transaction history page that lists all inventory transactions.
 * This page contains the transaction information and the inventory valuation (cost, revenue, profit, and total valuation).
 */
const HistoryPage: React.FC = () => {
  // consume the inventory logic context that was defined in `src/context/InventoryContext.tsx`
  const inventoryContext = useContext(InventoryContext);
  // page state for tracking the full transaction history
  const [txHistory, setTxHistory] = useState<Transaction[]>([]);

  // track the type of filter the user chose
  const [filterType, setFilterType] = useState<TxType | "all">("all");

  // throw an error if the inventory logic could not load
  // in most cases, this should never happen, but in TypeScript, we can't reasonably make that assumption
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  // this isn't a pretty approach, but since the filter and display types are different, we manually map them like this
  const filterToDisplayType = useMemo(() => {
    // we use a switch statement to map the filter type with the display type
    switch (filterType) {
      case "add":
      case "buy":
        return "cost"; // adding and buying a product should display the cost
      case "sell":
        return "revenue"; // selling a product = revenue
      default:
        return "value"; // the default display mode is to check the total inventory value
    }
  }, [filterType]);

  // hook for updating the history list
  useEffect(() => {
    // get the full transaction history from the inventory manager and assign it into another reference
    // we check if the user is filtering the list and return the correct data
    const hist =
      filterType === "all"
        ? inventoryContext.transactionHistory
        : _.filter(inventoryContext.transactionHistory, (i) => {
            return i.type === filterType;
          });
    // assign that reference to the page state manager so all renders work correctly when the history changes
    setTxHistory(hist);
    // this block will run every time the history list changes
  }, [inventoryContext.transactionHistory, filterType]);

  // render the history page UI
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transaction History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Transaction History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InventoryValueCard
          totalCosts={inventoryContext.totalCosts}
          totalProfit={inventoryContext.totalProfit}
          totalRevenue={inventoryContext.totalRevenue}
          totalValue={inventoryContext.totalValue}
          displayType={filterToDisplayType}
        />
        <IonItem>
          <IonSelect
            label="Filter history"
            labelPlacement="floating"
            value={filterType}
            onIonChange={(e) => {
              const selected = e.detail.value;
              setFilterType(selected);
              console.log(`User filtered by ${e.detail.value}`);
            }}
          >
            <IonSelectOption value="all">All</IonSelectOption>
            <IonSelectOption value="sell">Only Sales</IonSelectOption>
            <IonSelectOption value="buy">Only Restocks</IonSelectOption>
            <IonSelectOption value="add">Only New Products</IonSelectOption>
          </IonSelect>
        </IonItem>
        {txHistory.length > 0 ? (
          <>
            <IonList inset={true}>
              {_.map(txHistory, (i) => {
                return <TransactionListItem key={i.id} transaction={i} />;
              })}
            </IonList>
          </>
        ) : (
          <ExploreContainer name="Transaction History Not Found" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
