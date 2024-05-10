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
import { arrowUp, arrowDown, add, remove } from "ionicons/icons";
import React, { useContext, useState, useEffect } from "react";
import { Transaction, TxType } from "../types";
import { InventoryContext } from "../context/InventoryContext";
import ExploreContainer from "../components/ExploreContainer";
import _ from "lodash";

import "./HistoryPage.css";

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
    setTxHistory(inventoryContext.transactionHistory);
  }, [inventoryContext.transactionHistory]);

  const typeToIcon = (txType: TxType) => {
    switch (txType) {
      case 'add':
        return add;
      case 'remove':
        return remove;
      case 'buy':
        return arrowDown;
      case 'sell':
        return arrowUp;
    }
  }

  const typeToText = (txType: TxType) => {
    switch (txType) {
      case 'add':
        return 'Add New Product';
      case 'remove':
        return 'Removed Product';
      case 'buy':
        return 'Restock Product';
      case 'sell':
        return 'Sell Product Stock';
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
                      icon={typeToIcon(i.type)}
                      slot="start"
                      color="primary"
                    ></IonIcon>
                    <IonLabel>
                      <strong>
                        {inventoryContext.findProdById(i.productId).name}
                      </strong>
                      <IonText>
                        <p>Transaction Type: {typeToText(i.type)}</p>
                        <p>Quantity: {i.quantity}</p>
                        <p>
                          {i.type === "add" || i.type === "buy"
                            ? "Total Cost:"
                            : "Total Gains:"}{" "}
                          {i.totalCost} EUR
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
