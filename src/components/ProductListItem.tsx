import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import React from "react";
import { Product } from "../types";
import "./ProductListItem.css";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const history = useHistory();

  const onClickDetails = () => {
    history.push(`/product/${product.id}`);
  };
  return (
    <IonCol size="12" size-md="4" key={product.id}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{product.name}</IonCardTitle>
          <IonCardSubtitle>Last Transaction: {new Date().toDateString()}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <p>Retail Price: {product.price} EUR</p>
          <p>Product Cost: {product.cost} EUR</p>
          <p>Current Stock: {product.stock}</p>
        </IonCardContent>

        <IonButton fill="clear">Restock +</IonButton>
        <IonButton fill="clear">Sell Stock -</IonButton>
        <IonButton fill="clear" onClick={onClickDetails}>Details</IonButton>
      </IonCard>
    </IonCol>
    // <IonItem routerLink={`/product/${product.id}`} detail={true}>
    //   <div slot="start" className="dot dot-unread"></div>
    //   <IonLabel className="ion-text-wrap">
    //     <h2>
    //       <b>{product.name}</b>
    //       <span className="date">
    //         {/* Get the last tx based on the tx history list */}
    //         <IonNote>Last Transaction: {new Date().toDateString()}</IonNote>
    //       </span>
    //     </h2>
    //     <h3>Retail Price: {product.price} EUR</h3>
    //     <h3>Cost to Purchase: {product.cost} EUR</h3>
    //     <h3>Remaining Stock: {product.stock}</h3>
    //   </IonLabel>
    //   <IonButton
    //     slot="end"
    //     color="primary"
    //     onClick={() => window.alert(`Restocking "${product.name}"`)}
    //   >
    //     <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
    //   </IonButton>
    //   <IonButton
    //     slot="end"
    //     color="secondary"
    //     onClick={() => window.alert(`Selling "${product.name}"`)}
    //   >
    //     <IonIcon slot="icon-only" icon={cash}></IonIcon>
    //   </IonButton>
    // </IonItem>
  );
};

export default ProductListItem;
