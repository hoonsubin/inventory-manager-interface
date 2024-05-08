import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './SalesPage.css';

const SalesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sales</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Sales page" />
      </IonContent>
    </IonPage>
  );
};

export default SalesPage;
