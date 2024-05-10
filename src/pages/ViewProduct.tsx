import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { Product, UUID } from "../types";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./ViewProduct.css";

const ViewProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>();
  const inventoryContext = useContext(InventoryContext);

  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  const params = useParams<{ id: UUID }>();

  useIonViewWillEnter(() => {
    // todo: this will always load the default data, we need to make sure that it uses the latest data from the manager
    const prod = inventoryContext.findProdById(params.id);

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
              <IonIcon
                aria-hidden="true"
                icon={personCircle}
                color="primary"
              ></IonIcon>
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
                  Price: <IonNote>{product.price} EUR</IonNote>
                </h3>
                <h3>
                  Cost: <IonNote>{product.cost} EUR</IonNote>
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
          </>
        ) : (
          <ExploreContainer name="Product Not Found" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewProduct;
