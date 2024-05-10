import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, {  useContext } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./ValuationPage.css";
import { InventoryContext } from "../context/InventoryContext";

const ValuationPage: React.FC = () => {
  const inventoryContext = useContext(InventoryContext);
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

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
