import ProductListItem from '../components/ProductListItem';
import { useState } from 'react';
import { Message, getMessages } from '../data/products';
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
  IonFabList
} from '@ionic/react';
import { add, colorPalette, globe } from "ionicons/icons";
import './InventoryPage.css';

const InventoryPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
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
          {messages.map(m => <ProductListItem key={m.id} message={m} />)}
        </IonList>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={colorPalette}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={globe}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};
export default InventoryPage;
