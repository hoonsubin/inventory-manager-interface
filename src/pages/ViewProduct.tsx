import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { Product, UUID, Transaction, TxType } from "../types";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowDown, arrowUp, bag, bagAdd, bagRemove } from "ionicons/icons";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import _ from "lodash";
import "./ViewProduct.css";

const ViewProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>();
  const [prodHistory, setProdHistory] = useState<Transaction[]>([]);
  const inventoryContext = useContext(InventoryContext);

  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  const typeToVisuals = (txType: TxType) => {
    switch (txType) {
      case "add":
        return {
          icon: arrowDown,
          msg: "Add New Product",
          color: "primary",
        };
      case "remove":
        return {
          icon: arrowUp,
          msg: "Removed Product",
          color: "danger",
        };
      case "buy":
        return {
          icon: bagAdd,
          msg: "Restock Product",
          color: "warning",
        };
      case "sell":
        return {
          icon: bagRemove,
          msg: "Sell Product Stock",
          color: "danger",
        };
    }
  };

  const params = useParams<{ id: UUID }>();

  useIonViewWillEnter(() => {
    // todo: this will always load the default data, we need to make sure that it uses the latest data from the manager
    const prod = inventoryContext.findProdById(params.id);

    setProdHistory(inventoryContext.getAllTxOfProd(params.id));
    setProduct(prod);
  });

  return (
    <IonPage id="view-product-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Inventory"
              defaultHref="/inventory"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {product ? (
          <>
            <IonItem>
              <IonIcon aria-hidden="true" icon={bag} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {product.name}
                  <span className="last-tx">
                    <IonNote>
                      Last Transaction {new Date().toDateString()}
                    </IonNote>
                  </span>
                </h2>
                <h3>
                  Price:{" "}
                  <IonNote>
                    {product.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}{" "}
                    EUR
                  </IonNote>
                </h3>
                <h3>
                  Cost:{" "}
                  <IonNote>
                    {product.cost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}{" "}
                    EUR
                  </IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{product.name}</h1>
              <p>
                {product.description
                  ? product.description
                  : "No product description"}
              </p>
            </div>
            <div className="ion-padding">
              {prodHistory.length > 0 ? (
                <>
                  <IonList inset={true}>
                    {_.map(prodHistory, (i) => {
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
                              <p>
                                Transaction Type: {typeToVisuals(i.type).msg}
                              </p>
                              <p>Quantity: {i.quantity}</p>
                              <p>
                                {i.type === "add" || i.type === "buy"
                                  ? "Total Cost:"
                                  : "Total Gains:"}{" "}
                                {i.totalCost.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}{" "}
                                EUR
                              </p>
                              <p>Transaction ID: {i.id}</p>
                            </IonText>
                          </IonLabel>
                          <div className="metadata-end-wrapper" slot="end">
                            <IonNote color="medium">
                              {i.time.toString()}
                            </IonNote>
                          </div>
                        </IonItem>
                      );
                    })}
                  </IonList>
                </>
              ) : (
                <ExploreContainer name="Transaction History Not Found" />
              )}
            </div>
          </>
        ) : (
          <ExploreContainer name="Product Not Found" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
