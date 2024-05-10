import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewProduct: (
    name: string,
    cost: number,
    price: number,
    stock: number,
    description: string
  ) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddNewProduct,
}) => {
  // todo: need to edit the style so it looks better, also add input sanitation and checks
  const [name, setName] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [cost, setCost] = useState("");
  const [initStock, setInitStock] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProduct = () => {
    // pass the new product information to the parent component
    onAddNewProduct(
      name,
      parseFloat(retailPrice),
      parseFloat(cost),
      parseInt(initStock, 10),
      description
    );
    onClose(); // close the modal after adding the product
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Product Name</IonLabel>
          <IonInput
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Retail Price</IonLabel>
          <IonInput
            type="number"
            value={retailPrice}
            onIonChange={(e) => setRetailPrice(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
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
        </IonItem>
        <IonButton expand="block" onClick={handleAddProduct}>
          Add Product
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancel
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AddProductModal;
