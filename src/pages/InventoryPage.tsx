import ProductListItem from '../components/ProductListItem';
import { useState } from 'react';
import { getProducts } from '../data/products';
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
  IonFabButton
} from '@ionic/react';
import { add } from "ionicons/icons";
import './InventoryPage.css';

const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useIonViewWillEnter(() => {
    const prods = getProducts();
    setProducts(prods);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

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
            <IonTitle size="large">
            Inventory
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {products.map(p => <ProductListItem key={p.id} product={p} />)}
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