import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

import "./HistoryPage.css";

const HistoryPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transaction History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Transaction History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Transaction History page" />
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
