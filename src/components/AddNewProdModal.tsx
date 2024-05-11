import React, { useState, useEffect } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonTextarea,
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
  const [name, setName] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [cost, setCost] = useState("");
  const [initStock, setInitStock] = useState("");
  const [description, setDescription] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // const validateCurrency = (amount: string) => {
  //   return amount.match(/^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/);
  // }

  useEffect(() => {
    // Validate inputs and set form validity
    const validateForm = () => {
      const retailPriceNum = parseFloat(retailPrice);
      const costNum = parseFloat(cost);
      const initStockNum = parseInt(initStock, 10);
      const isNameValid = name.trim() !== "";
      const isRetailPriceValid = !isNaN(retailPriceNum) && retailPriceNum > 0;
      const isCostValid = !isNaN(costNum) && costNum > 0;
      const isInitStockValid = !isNaN(initStockNum) && initStockNum >= 0;
      const isDescriptionValid = description.trim() !== "";
      return (
        isNameValid &&
        isRetailPriceValid &&
        isCostValid &&
        isInitStockValid &&
        isDescriptionValid
      );
    };

    setIsFormValid(validateForm());
  }, [name, retailPrice, cost, initStock, description]);

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
          <IonInput
            label="Product Name"
            labelPlacement="floating"
            placeholder="Enter name"
            value={name}
            onIonInput={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Retail Price"
            labelPlacement="floating"
            placeholder="Enter price"
            type="number"
            value={retailPrice}
            onIonInput={(e) => setRetailPrice(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Cost Per Unit"
            labelPlacement="floating"
            placeholder="Enter cost"
            type="number"
            value={cost}
            onIonInput={(e) => setCost(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Initial Stock"
            labelPlacement="floating"
            placeholder="Enter stock number"
            type="number"
            value={initStock}
            onIonInput={(e) => setInitStock(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            labelPlacement="floating"
            label="Product Description"
            placeholder="Enter text"
            value={description}
            onIonInput={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleAddProduct} disabled={!isFormValid}>
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
