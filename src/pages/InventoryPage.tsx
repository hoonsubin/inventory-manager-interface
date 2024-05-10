import ProductListItem from "../components/ProductListItem";
import AddProductModal from "../components/AddNewProdModal";
import ProdStockChangeModal from "../components/ProdStockChangeModal";
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
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { InventoryContext } from "../context/InventoryContext";
import "./InventoryPage.css";

const InventoryPage: React.FC = () => {
  const inventoryContext = useContext(InventoryContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProdModal, setShowAddProdModal] = useState(false);
  const [showStockChangeModal, setShowStockChangeModal] = useState(false);
  const [prodToChange, setProdToChange] = useState<{
    product: Product;
    txType: "sell" | "buy";
  }>();

  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  useEffect(() => {
    setProducts(inventoryContext.products);
  }, [inventoryContext.products]);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

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
            <IonTitle size="large">Current Inventory</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
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
          <IonRow>
            {products.map((p) => (
              <ProductListItem
                key={p.id}
                product={p}
                onClickRestock={() => {
                  setShowStockChangeModal(true);
                  setProdToChange({
                    product: p,
                    txType: "buy",
                  });
                  console.log("Clicked restock for " + p.name);
                }}
                onClickSell={() => {
                  setShowStockChangeModal(true);
                  setProdToChange({
                    product: p,
                    txType: "sell",
                  });
                  console.log("Clicked sell stock for " + p.name);
                }}
              />
            ))}
          </IonRow>
        </IonGrid>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => setShowAddProdModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        {prodToChange && (
          <ProdStockChangeModal
            isOpen={showStockChangeModal}
            onClose={() => setShowStockChangeModal(false)}
            txType={prodToChange.txType}
            product={prodToChange.product}
            onChangeStock={(id, stock) => {
              prodToChange.txType === "buy"
                ? inventoryContext.buyProductStock(id, stock)
                : inventoryContext.sellProductStock(id, stock);
              setProdToChange(undefined);
            }}
          />
        )}

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
