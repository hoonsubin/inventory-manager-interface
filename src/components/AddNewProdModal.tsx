import React, { useState, useEffect } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonTextarea,
} from "@ionic/react";

/**
 * Defines the properties for adding a new product
 */
interface AddProductModalProps {
  // determines if the modal should be open
  isOpen: boolean;
  // defines the behavior when the modal is closed
  onClose: () => void;
  // defines the callback function when the user adds a new product
  // note that we are passing all the data that defines a product to the parent component
  onAddNewProduct: (
    name: string,
    cost: number,
    price: number,
    stock: number,
    description: string
  ) => void;
}

/**
 * Modal component for creating a new product. This component will ask the user for all information that defines a product
 */
const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddNewProduct,
}) => {
  // component state for the name field
  const [name, setName] = useState("");
  // component state for the price field
  const [retailPrice, setRetailPrice] = useState("");
  // component state for the cost field
  const [cost, setCost] = useState("");
  // component state for the initial stock for the new product
  const [initStock, setInitStock] = useState("");
  // component state for the product description
  const [description, setDescription] = useState("");
  // component state to check if all the inputs are valid or not
  const [isFormValid, setIsFormValid] = useState(false);

  // const validateCurrency = (amount: string) => {
  //   return amount.match(/^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/);
  // }

  // a hook that runs every time the user changes the input. It's used to check if the inputs are valid
  useEffect(() => {
    // validate inputs and set form validity
    const validateForm = () => {
      // because all inputs are technically a string type, we need to cast them to the right data type
      // we cast the currency types as a floating point because some currencies can be expressed in decimals (ex: EUR or USD)

      // cast the retail price input as a float
      const retailPriceNum = parseFloat(retailPrice);
      // cast the product cost as a float
      const costNum = parseFloat(cost);
      // cast the product quantity as an integer
      const initStockNum = parseInt(initStock, 10);

      // remove all trailing spaces and check if the product name is not blank
      const isNameValid = name.trim() !== "";
      // retail price must be a number that is above 0
      const isRetailPriceValid = !isNaN(retailPriceNum) && retailPriceNum > 0;
      // the cost must be a number that is above 0
      const isCostValid = !isNaN(costNum) && costNum > 0;
      // the initial stock must be a number that is 0 or more
      const isInitStockValid = !isNaN(initStockNum) && initStockNum >= 0;
      // same case with the product name. The product description cannot be empty
      const isDescriptionValid = description.trim() !== "";
  
      // check if all the checks above are correct
      return (
        isNameValid &&
        isRetailPriceValid &&
        isCostValid &&
        isInitStockValid &&
        isDescriptionValid
      );
    };

    // set the input check state so that it is accessible within the component
    setIsFormValid(validateForm());
    // these are the hook dependencies. Every time either of these variables change, the above code will run in the background
  }, [name, retailPrice, cost, initStock, description]);

  // a function that'll be called when the user clicks the `Add Product` button
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

  // defines the actual component (virtual DOM) that will be rendered as the UI
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
            rows={5}
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
