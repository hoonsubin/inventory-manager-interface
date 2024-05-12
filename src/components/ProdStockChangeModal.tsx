import React, { useState, useMemo } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { Product, UUID } from "../types";

/**
 * The component property for the product stock change modal.
 * We need the basic modal props like `isOpen`, `onClose`, and the confirm callback (`onConfirmChangeStock` in this case).
 * Plus, this also takes the product type and the transaction direction, as we use this modal for selling and buying.
 */
interface ProdStockChangeModalProps {
  // determines if the modal should be rendered or not
  isOpen: boolean;
  // the product data that this modal will mutate
  product: Product;
  // the transaction direction. The user can either buy or sell their stocks for a given product
  txType: "sell" | "buy";
  // the behavior for when the modal is closed
  onClose: () => void;
  // the confirmation callback function that is used to send the data to the parent component
  onConfirmChangeStock: (prodId: UUID, stock: number) => void;
}

/**
 * Modal component for changing the product stock. You can either sell or restock for an existing product
 */
const ProdStockChangeModal: React.FC<ProdStockChangeModalProps> = ({
  isOpen,
  onClose,
  txType,
  onConfirmChangeStock,
  product,
}) => {
  // component state that tracks the amount of product stock that will be changed
  const [stockChange, setStockChange] = useState(0);

  // a getter function that is used to track if the user input is valid
  // note that in `src/components/AddNewProdModal.tsx`, we used a component state and hooks to track the input state, while here, we are using `useMemo`
  // they are exactly the same in function, but since this modal requires less inputs, we try to keep it short and simple
  const isValidInput = useMemo(() => {

    // if the user is trying to sell more items than they have, we return false
    if (txType === "sell" && stockChange > product.stock) {
      return false;
    }

    // return true only if the stock change is a valid number,
    // it's above 0, and it's an integer (since fractional selling doesn't make any sense)
    return (
      !Number.isNaN(stockChange) &&
      stockChange > 0 &&
      Number.isInteger(stockChange)
    );
    // this hook will update every time the user changes the amount
  }, [stockChange]);

  // a function that defines the behavior when the user confirms the stock change
  const handleChangeStock = () => {
    // invoke the callback function so the parent component can see the results
    onConfirmChangeStock(product.id, stockChange);
    onClose(); // close the modal after adding the product
  };

  // render the UI. Note that the content slightly changes depending on the direction of the transaction through tuples
  // we also format the currency numbers so it's easier to read
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            <h1>{product.name}</h1>
            <p>Please select how much you wish to {txType}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonInput
            label={"Amount to " + txType}
            labelPlacement="floating"
            placeholder="Enter amount"
            type="number"
            value={stockChange}
            onIonInput={(e) => setStockChange(parseFloat(e.detail.value!))}
          />
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>Current Stock: {product.stock}</h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>
              {txType === "sell"
                ? `Price is ${product.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })} EUR per unit`
                : `Cost is ${product.cost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })} EUR per unit`}
            </h2>
            {isValidInput && (
              <p>
                {txType === "sell"
                  ? `You get ${(product.price * stockChange).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                      }
                    )} EUR in total`
                  : `You spend ${(product.cost * stockChange).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                      }
                    )} EUR in total`}
              </p>
            )}
          </IonLabel>
        </IonItem>
        <IonButton
          expand="block"
          onClick={handleChangeStock}
          disabled={!isValidInput}
        >
          {txType === "sell" ? "Sell Item" :  "Restock Product"}
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ProdStockChangeModal;
