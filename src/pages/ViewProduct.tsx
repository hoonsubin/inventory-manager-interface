import { useState } from 'react';
import { getProduct } from '../data/products';
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
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewProduct.css';

const ViewProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>();

  const params = useParams<{ id: UUID }>();

  useIonViewWillEnter(() => {
    const prod = getProduct(params.id)
    setProduct(prod);
  });

  return (
    <IonPage id="view-product-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inventory" defaultHref="/inventory"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {product ? (
          <>
            <IonItem>
              <IonIcon aria-hidden="true" icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {product.name}
                  <span className="date">
                    <IonNote>{product.price}</IonNote>
                  </span>
                </h2>
                <h3>
                  To: <IonNote>Me</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{product.name}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
        ) : (
          <div>Product not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewProduct;
