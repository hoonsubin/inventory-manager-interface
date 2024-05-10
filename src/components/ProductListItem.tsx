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
import { Product } from "../types";
import { addCircle, cash, trash } from "ionicons/icons";
import "./ProductListItem.css";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <IonItemSliding>
      <IonItem routerLink={`/product/${product.id}`} detail={true}>
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            {product.name}
            <span className="date">
              {/* Get the last tx based on the tx history list */}
              <IonNote>Last Transaction: {new Date().toDateString()}</IonNote>
            </span>
          </h2>
          <h3>Retail Price: {product.price} EUR</h3>
          <h3>Cost to Purchase: {product.cost} EUR</h3>
        </IonLabel>
        {/* options are: add stock, sell stock, and remove product */}
        <IonButton
          slot="end"
          color="primary"
          onClick={() => window.alert(`Restocking "${product.name}"`)}
        >
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        </IonButton>
        <IonButton
          slot="end"
          color="secondary"
          onClick={() => window.alert(`Selling "${product.name}"`)}
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
              `Are you sure you want to remove "${product.name}"? Or do you wish to sell the entire stock?`
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
