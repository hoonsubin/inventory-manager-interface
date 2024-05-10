import ProductListItem from "../components/ProductListItem";
import AddProductModal from "../components/AddNewProdModal";
import React, { useState, useContext, useEffect } from "react";
import { Product } from "../types";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonFab,
  IonFabButton,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { InventoryContext } from "../context/InventoryContext";
import "./InventoryPage.css";

const InventoryPage: React.FC = () => {
  const inventoryContext = useContext(InventoryContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProdModal, setShowAddProdModal] = useState(false);

  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  useEffect(() => {
    setProducts(inventoryContext.products)
  }, [inventoryContext.products])

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
          <IonTitle>Current Inventory</IonTitle>
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

        <IonGrid>
          <IonRow>
            {products.map((p) => (
              <ProductListItem key={p.id} product={p} />
            ))}
          </IonRow>
        </IonGrid>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => setShowAddProdModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <AddProductModal
          isOpen={showAddProdModal}
          onClose={() => setShowAddProdModal(false)}
          onAddNewProduct={(
            name: string,
            cost: number,
            price: number,
            stock: number,
            description: string
          ) => {
            // error: this is not getting called properly
            inventoryContext.addNewProduct(
              name,
              price,
              cost,
              stock,
              description
            );
          }}
        />
      </IonContent>
    </IonPage>
  );
};
export default InventoryPage;
