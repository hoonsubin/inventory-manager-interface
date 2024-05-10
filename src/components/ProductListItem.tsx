import { IonItem, IonLabel, IonNote, IonButton, IonIcon } from "@ionic/react";
import { Product } from "../types";
import { addCircle, cash } from "ionicons/icons";
import "./ProductListItem.css";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  return (
    <IonItem routerLink={`/product/${product.id}`} detail={true}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          <b>{product.name}</b>
          <span className="date">
            {/* Get the last tx based on the tx history list */}
            <IonNote>Last Transaction: {new Date().toDateString()}</IonNote>
          </span>
        </h2>
        <h3>Retail Price: {product.price} EUR</h3>
        <h3>Cost to Purchase: {product.cost} EUR</h3>
        <h3>Remaining Stock: {product.stock}</h3>
      </IonLabel>
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
  );
};

export default ProductListItem;
