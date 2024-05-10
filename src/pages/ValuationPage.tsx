import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useState, useContext } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./ValuationPage.css";
import { InventoryContext } from "../context/InventoryContext";
import { Transaction } from "../types";

const ValuationPage: React.FC = () => {
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
          <IonTitle>Inventory Valuation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inventory Valuation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Valuation page" />
      </IonContent>
    </IonPage>
  );
};

export default ValuationPage;
