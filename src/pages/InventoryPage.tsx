import ProductListItem from "../components/ProductListItem";
import AddProductModal from "../components/AddNewProdModal";
import ProdStockChangeModal from "../components/ProdStockChangeModal";
import React, { useState, useContext, useEffect } from "react";
import { Product } from "../types";
import {
  IonContent,
  IonHeader,
  IonPage,
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
  IonAlert,
  useIonToast,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { InventoryContext } from "../context/InventoryContext";

/**
 * The main inventory page that first-time users will see when they open the app.
 * This page contains a list of all current products and the inventory valuation info.
 * Users can sell, restock, and add new products in this page.
 */
const InventoryPage: React.FC = () => {
  // consume the inventory logic context that was defined in `src/context/InventoryContext.tsx`
  const inventoryContext = useContext(InventoryContext);

  /**
   * Show the opening welcome instruction if it's the first time visiting
   */
  const showOpening = !localStorage.getItem("sawOpening");
  /**
   * The welcome message and first-time use instructions
   */
  const welcomeMsg =
    "Welcome to the inventory management app!\nTry adding a new product by clicking the plus button on the bottom right corner!";
  /**
   * Handle the welcome message dismiss behavior
   */
  const handleOnDismissWelcome = () => {
    localStorage.setItem("sawOpening", "true");
  };

  const [present] = useIonToast();

  const presentToast = (message: string, color?: string) => {
    present({
      message,
      duration: 2000,
      position: "top",
      positionAnchor: "page-header",
      color,
    });
  };

  // page state for tracking all products in the inventory
  const [products, setProducts] = useState<Product[]>([]);
  // page state for tracking if the add new product modal should be rendered or not
  const [showAddProdModal, setShowAddProdModal] = useState(false);
  // page state for tracking if the sell/buy stock modal should be rendered or not
  const [showStockChangeModal, setShowStockChangeModal] = useState(false);
  // page state to manage the product that the user want to change the stock
  const [prodToChange, setProdToChange] = useState<{
    product: Product;
    txType: "sell" | "buy";
  }>();

  // throw an error if the inventory logic could not load
  // in most cases, this should never happen, but in TypeScript, we can't reasonably make that assumption
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  // hook for updating the product list
  useEffect(() => {
    // get the full product list from the inventory manager and assign it into another reference
    const inv = inventoryContext.products;
    // assign that reference to the page state manager so all renders work correctly when the history changes
    setProducts(inv);
    // this block will run every time the product list changes
  }, [inventoryContext.products]);

  // render the inventory page UI
  return (
    <IonPage id="home-page">
      <IonHeader id="page-header">
        <IonToolbar>
          <IonTitle>Current Inventory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
                  console.log("Clicked sell item for " + p.name);
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
            onConfirmChangeStock={(id, stock) => {
              const p = prodToChange.product;
              try {
                if (prodToChange.txType === "buy") {
                  inventoryContext.buyProductStock(id, stock);
                  presentToast(
                    `Restocked ${stock} items of ${p.name}`,
                    "warning"
                  );
                } else {
                  inventoryContext.sellProductStock(id, stock);
                  presentToast(`Sold ${stock} items of ${p.name}`, "success");
                }
                setProdToChange(undefined);
              } catch (e) {
                presentToast(`Error! ${e}`, "error");
              }
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
            try {
              inventoryContext.addNewProduct(
                name,
                price,
                cost,
                stock,
                description
              );
              presentToast(
                `Successfully added a new product "${name}"`,
                "success"
              );
            } catch (e) {
              presentToast(`Error! ${e}`, "error");
            }
          }}
        />
        <IonAlert
          header="Welcome Dear User"
          message={welcomeMsg}
          buttons={["Dismiss"]}
          isOpen={showOpening}
          onDidDismiss={handleOnDismissWelcome}
        />
      </IonContent>
    </IonPage>
  );
};
export default InventoryPage;
