import React, { useState } from "react";
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
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Amount to {txType}</IonLabel>
          <IonInput
            type="number"
            value={stockChange}
            onIonChange={(e) => setStockChange(parseFloat(e.detail.value!))}
          />
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
        <IonButton expand="block" onClick={handleAddProduct}>
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
