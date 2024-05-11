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

interface ProdStockChangeModalProps {
  isOpen: boolean;
  product: Product;
  txType: "sell" | "buy";
  onClose: () => void;
  onChangeStock: (prodId: UUID, stock: number) => void;
}

const ProdStockChangeModal: React.FC<ProdStockChangeModalProps> = ({
  isOpen,
  onClose,
  txType,
  onChangeStock,
  product,
}) => {
  // todo: need to edit the style so it looks better, also add input sanitation and checks
  const [stockChange, setStockChange] = useState(0);

  const isValidInput = useMemo(() => {
    if (txType === "sell" && stockChange > product.stock) {
      return false;
    }
    return (
      !Number.isNaN(stockChange) &&
      stockChange > 0 &&
      Number.isInteger(stockChange)
    );
  }, [stockChange]);

  const handleAddProduct = () => {
    onChangeStock(product.id, stockChange);
    onClose(); // close the modal after adding the product
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>
            <h1>{product.name}</h1>
            <p>Please select how much you wish to {txType}</p>
            {/* todo: add 'sell all' check button for the sell type */}
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
        {/* todo: add automated cost and revenue calculator */}
        {/* <IonItem>
          <IonLabel position="stacked">Cost</IonLabel>
          <IonInput
            type="number"
            value={cost}
            onIonChange={(e) => setCost(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Initial Stock</IonLabel>
          <IonInput
            type="number"
            value={initStock}
            onIonChange={(e) => setInitStock(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Product Description</IonLabel>
          <IonInput
            type="text"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem> */}
        <IonButton
          expand="block"
          onClick={handleAddProduct}
          disabled={!isValidInput}
        >
          {txType === "buy" ? "Restock Product" : "Sell Stock"}
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ProdStockChangeModal;
