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
//import "./ProductListItem.css";

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
        <IonButton fill="clear" disabled={product.stock < 1 }>Sell Stock -</IonButton>
        <IonButton fill="clear" onClick={onClickDetails}>Details</IonButton>
      </IonCard>
    </IonCol>
  );
};

export default ProductListItem;
