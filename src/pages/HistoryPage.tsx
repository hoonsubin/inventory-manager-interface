import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { Transaction } from "../types";
import { InventoryContext } from "../context/InventoryContext";
import ExploreContainer from "../components/ExploreContainer";

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
        {txHistory.length > 0 ? (<>There is a history!</>) : (<ExploreContainer name="Transaction History not found" />)}
        
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
