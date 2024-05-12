import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonText,
  IonNote,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import React, { useContext, useState, useEffect } from "react";
import { Transaction } from "../types";
import { InventoryContext } from "../context/InventoryContext";
import ExploreContainer from "../components/ExploreContainer";
import _ from "lodash";
import { typeToVisuals, dateToRelativeFormat } from "../helpers";
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

  // throw an error if the inventory logic could not load
  // in most cases, this should never happen, but in TypeScript, we can't reasonably make that assumption
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  // hook for updating the history list
  useEffect(() => {
    // get the full transaction history from the inventory manager and assign it into another reference
    const hist = inventoryContext.transactionHistory;
    // assign that reference to the page state manager so all renders work correctly when the history changes
    setTxHistory(hist);
    // this block will run every time the history list changes
  }, [inventoryContext.transactionHistory]);

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
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Inventory Value</IonCardTitle>
            <IonCardSubtitle color="primary">
              {inventoryContext.totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}{" "}
              EUR
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              Total Revenue:{" "}
              {inventoryContext.totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}{" "}
              EUR
            </p>
            <p>
              Total Costs:{" "}
              {inventoryContext.totalCosts.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}{" "}
              EUR
            </p>

            <p>
              Current Profit:{" "}
              {inventoryContext.totalProfit.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}{" "}
              EUR
            </p>
          </IonCardContent>
        </IonCard>
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
