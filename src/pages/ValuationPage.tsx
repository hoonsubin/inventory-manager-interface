import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ValuationPage.css';

const ValuationPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Valuation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inventory Valuation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Valuation page" />
      </IonContent>
    </IonPage>
  );
};

export default ValuationPage;
