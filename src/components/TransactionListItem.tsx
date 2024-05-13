import { IonItem, IonLabel, IonIcon, IonText, IonNote } from "@ionic/react";
import React, { useContext } from "react";
import { Transaction } from "../types";
import { InventoryContext } from "../context/InventoryContext";
import _ from "lodash";
import {
  typeToVisuals,
  dateToRelativeFormat,
  formatNumToEur,
} from "../helpers";

/**
 * The prop definition for the TransactionListItem component
 */
interface TransactionListItemProps {
  // the transaction object that will be rendered
  transaction: Transaction;
}

/**
 * Transaction history item that shows the transaction information for a list.
 */
const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
}) => {
  // consume the inventory logic context that was defined in `src/context/InventoryContext.tsx`
  const inventoryContext = useContext(InventoryContext);

  // throw an error if the inventory logic could not load
  // in most cases, this should never happen, but in TypeScript, we can't reasonably make that assumption
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  // render the transaction item component
  return (
    <IonItem detail={false}>
      <IonIcon
        aria-hidden="true"
        icon={typeToVisuals(transaction.type).icon}
        slot="start"
        color={typeToVisuals(transaction.type).color}
      ></IonIcon>
      <IonLabel>
        <strong>
          {inventoryContext.findProdById(transaction.productId).name}
        </strong>
        <IonText>
          <p>Transaction Type: {typeToVisuals(transaction.type).msg}</p>
          <p>Quantity: {transaction.quantity}</p>
          <p>
            {transaction.type === "add" || transaction.type === "buy"
              ? "Total Cost:"
              : "Total Gains:"}{" "}
            {formatNumToEur(transaction.totalCost)}
          </p>
          <p>Transaction ID: {transaction.id}</p>
        </IonText>
      </IonLabel>
      <div className="metadata-end-wrapper" slot="end">
        <IonNote color="medium">
          {dateToRelativeFormat(transaction.time)}
        </IonNote>
      </div>
    </IonItem>
  );
};

export default TransactionListItem;
