import ProductListItem from "../components/ProductListItem";
import React, { useState, useContext } from "react";
import { Product } from "../types";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { InventoryContext } from "../context/InventoryContext";
import "./InventoryPage.css";

const InventoryPage: React.FC = () => {
  const inventoryContext = useContext(InventoryContext);
  const [products, setProducts] = useState<Product[]>([]);

  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  useIonViewWillEnter(() => {
    const prods = inventoryContext.products;
    setProducts(prods);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  // todo: refactor this so that this UI uses a grid of cards with buttons.
  // Clicking on the card should go to the details page which will also show the same thing but with more information.
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inventory</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {products.map((p) => (
            <ProductListItem key={p.id} product={p} />
          ))}
        </IonList>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => window.alert("Adding a new product")}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
export default InventoryPage;
