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
  onClickRestock: (product: Product) => void;
  onClickSell: (product: Product) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onClickRestock, onClickSell }) => {
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
          <p>Retail Price: {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} EUR</p>
          <p>Product Cost: {product.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })} EUR</p>
          <p>Current Stock: {product.stock}</p>
        </IonCardContent>

        <IonButton fill="clear" onClick={() => onClickRestock(product)}>Restock +</IonButton>
        <IonButton fill="clear" disabled={product.stock < 1 } onClick={() => onClickSell(product)}>Sell Stock -</IonButton>
        <IonButton fill="clear" onClick={onClickDetails}>Details</IonButton>
      </IonCard>
    </IonCol>
  );
};

export default ProductListItem;
