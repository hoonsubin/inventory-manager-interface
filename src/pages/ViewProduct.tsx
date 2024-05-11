import { useState, useContext, useEffect } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { Product, UUID, Transaction } from "../types";
import { typeToVisuals } from "../helpers";
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
} from "@ionic/react";
import { bag } from "ionicons/icons";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import _ from "lodash";
import "./ViewProduct.css";

/**
 * The product detail page that is rendered when the user clicks the product detail button in the inventory page.
 * This page will render the product description and the ID alongside other information you can view from the main page.
 */
const ViewProduct: React.FC = () => {
  // consume the inventory logic context that was defined in `src/context/InventoryContext.tsx`
  const inventoryContext = useContext(InventoryContext);

  // page state for tracking the current product object that the user is viewing
  const [product, setProduct] = useState<Product>();
  // page state for tracking the transaction history for the current product that the user is viewing
  const [prodHistory, setProdHistory] = useState<Transaction[]>([]);
  
  // throw an error if the inventory logic could not load
  // in most cases, this should never happen, but in TypeScript, we can't reasonably make that assumption
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  // get the URL param (specifically, the `id` param) of the current page and cast it as a UUID type
  const params = useParams<{ id: UUID }>();

  // initial hook that runs only once before the page is mounted
  // this is where we set the transaction history
  useEffect(() => {
    // get the product information by taking the product ID from the URL param and passing it to the custom function
    // this way, if the user manually changes the URL, the app can still render the correct view
    const prod = inventoryContext.findProdById(params.id);

    // get all the transaction history for this product, and assign it to the page state
    setProdHistory(inventoryContext.getAllTxOfProd(params.id));
    // also set the product as well
    setProduct(prod);
  }, []);

  // render the main product view that will change depending on the ID
  // if the product with the given ID doesn't exist, we ensure the page describes that and there is no error
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
                <h3>
                  Product ID: <IonNote>{product.id}</IonNote>
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
                <h1>Transaction History Not Found</h1>
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
