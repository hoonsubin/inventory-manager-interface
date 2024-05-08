import {
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/react";
import { Message, Product } from "../types";
import { addCircle, cash, trash } from "ionicons/icons";
import "./ProductListItem.css";

interface ProductListItemProps {
  message: Message;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ message }) => {
  return (
    <IonItemSliding>
      <IonItem routerLink={`/product/${message.id}`} detail={true}>
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            {message.fromName}
            <span className="date">
              <IonNote>{message.date}</IonNote>
            </span>
          </h2>
          <h3>{message.subject}</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </IonLabel>
        {/* options are: add stock, sell stock, and remove product */}
        <IonButton
          slot="end"
          color="primary"
          onClick={() => window.alert(`Restocking "${message.subject}"`)}
        >
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        </IonButton>
        <IonButton
          slot="end"
          color="secondary"
          onClick={() => window.alert(`Selling "${message.subject}"`)}
        >
          <IonIcon slot="icon-only" icon={cash}></IonIcon>
        </IonButton>
      </IonItem>
      <IonItemOptions slot="end">
        <IonItemOption
          color="danger"
          expandable={true}
          onClick={() =>
            window.alert(
              `Are you sure you want to remove "${message.subject}"?`
            )
          }
        >
          <IonIcon slot="icon-only" icon={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ProductListItem;
