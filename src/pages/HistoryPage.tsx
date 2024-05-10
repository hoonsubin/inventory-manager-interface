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
  useIonViewWillEnter,
  IonText,
  IonNote,
} from "@ionic/react";
import { arrowUp, arrowDown, add, remove, bagRemove, bagAdd } from "ionicons/icons";
import React, { useContext, useState, useEffect } from "react";
import { Transaction, TxType } from "../types";
import { InventoryContext } from "../context/InventoryContext";
import ExploreContainer from "../components/ExploreContainer";
import _ from "lodash";

import "./HistoryPage.css";

interface TxTypeVisual {
  icon: string;
  msg: string;
  color: string;
}

const HistoryPage: React.FC = () => {
  const inventoryContext = useContext(InventoryContext);
  const [txHistory, setTxHistory] = useState<Transaction[]>([]);
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  useIonViewWillEnter(() => {
    const hist = inventoryContext.transactionHistory;
    setTxHistory(hist);
  });

  useEffect(() => {
    // todo: this part does not automatically update
    setTxHistory(inventoryContext.transactionHistory);
  }, [inventoryContext.transactionHistory]);

  const typeToVisuals = (txType: TxType): TxTypeVisual => {
    switch (txType) {
      case 'add':
        return {
          icon: arrowDown,
          msg: 'Add New Product',
          color: 'primary'
        };
      case 'remove':
        return {
          icon: arrowUp,
          msg: 'Removed Product',
          color: 'primary'
        };
      case 'buy':
        return {
          icon: bagAdd,
          msg: 'Restock Product',
          color: 'warning'
        };
      case 'sell':
        return {
          icon: bagRemove,
          msg: 'Sell Product Stock',
          color: 'danger'
        };
    }
  }

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
        {txHistory.length > 0 ? (
          <>
            <IonList inset={true}>
              {_.map(txHistory, (i) => {
                return (
                  <IonItem key={i.id} detail={false}>
                    <IonIcon
                      aria-hidden="true"
                      icon={typeToVisuals(i.type).icon}
                      slot="start"
                      color={typeToVisuals(i.type).color}
                    ></IonIcon>
                    <IonLabel>
                      <strong>
                        {inventoryContext.findProdById(i.productId).name}
                      </strong>
                      <IonText>
                        <p>Transaction Type: {typeToVisuals(i.type).msg}</p>
                        <p>Quantity: {i.quantity}</p>
                        <p>
                          {i.type === "add" || i.type === "buy"
                            ? "Total Cost:"
                            : "Total Gains:"}{" "}
                          {i.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} EUR
                        </p>
                        <p>Transaction ID: {i.id}</p>
                      </IonText>
                    </IonLabel>
                    <div className="metadata-end-wrapper" slot="end">
                      <IonNote color="medium">{i.time.toString()}</IonNote>
                    </div>
                  </IonItem>
                );
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
