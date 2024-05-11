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

/**
 * The properties for the product list item that the dev must provide
 */
interface ProductListItemProps {
  // the product that will be rendered as an item in the grid
  product: Product;
  // pass the callback function when the user clicks the restock button
  onClickRestock: (product: Product) => void;
  // pass the callback function when the user clicks the sell button
  onClickSell: (product: Product) => void;
}

/**
 * Component that renders the individual product info card in the main inventory page.
 * Users can see all information about the product except the product ID and the description.
 */
const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onClickRestock,
  onClickSell,
}) => {
  // because we reroute the user to the product detail page, we need to use the browser history
  const history = useHistory();

  // defines the behavior when the user clicks the product detail button
  const onClickDetails = () => {
    // we push the browser history to the following URL with the product ID
    // the rest is handled by the router that we defined in `src/App.tsx`
    history.push(`/product/${product.id}`);
  };

  // renders the component
  return (
    <IonCol size="12" size-md="4" key={product.id}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{product.name}</IonCardTitle>
          <IonCardSubtitle>
            Last Transaction: {new Date().toDateString()}
          </IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          <p>
            Retail Price:{" "}
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}{" "}
            EUR
          </p>
          <p>
            Product Cost:{" "}
            {product.cost.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}{" "}
            EUR
          </p>
          <p>Current Stock: {product.stock}</p>
        </IonCardContent>

        <IonButton fill="clear" onClick={() => onClickRestock(product)}>
          Restock +
        </IonButton>
        <IonButton
          fill="clear"
          disabled={product.stock < 1}
          onClick={() => onClickSell(product)}
        >
          Sell Stock -
        </IonButton>
        <IonButton fill="clear" onClick={onClickDetails}>
          Details
        </IonButton>
      </IonCard>
    </IonCol>
  );
};

export default ProductListItem;
