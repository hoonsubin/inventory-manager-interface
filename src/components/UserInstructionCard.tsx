import React, { useState, useContext, useEffect } from "react";
import {
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonNote,
} from "@ionic/react";
import { InventoryContext } from "../context/InventoryContext";
import { formatNumToEur } from "../helpers";
import _ from "lodash";

/**
 * Properties for the message item component.
 */
interface InstructionMessageItemProps {
  /**
   * The message that will be added to the queue.
   */
  message: string;
  /**
   * The color of the message. It will default to warning.
   */
  color?: string;
}

/**
 * A sub-component used to render a system message in a queue.
 */
const InstructionMessageItem: React.FC<InstructionMessageItemProps> = (
  props
) => {
  return (
    <IonItem>
      <IonLabel>
        <IonNote color={props.color || "warning"}>{props.message}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

/**
 * The user instruction component that shows a list of instructions the users should take based on the current inventory state.
 * We introduce this component as the exercise states: "Your program should ask the user what to do next. So whether a new product should be added,
 * a given product should be restocked, or sold, or calculations should be provided".
 * This component requires the inventory context to work.
 */
const UserInstructionCard: React.FC = () => {
  // consume the inventory logic context that was defined in `src/context/InventoryContext.tsx`
  const inventoryContext = useContext(InventoryContext);

  // throw an error if the inventory logic could not load
  // in most cases, this should never happen, but in TypeScript, we can't reasonably make that assumption
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }

  // component state for tracking the messages to be rendered
  const [appMessages, setAppMessages] = useState<InstructionMessageItemProps[]>(
    []
  );

  // this is the main logic block that performs all kinds of checks and adds messages to the queue
  useEffect(() => {
    // we initialize the queue that will be populated later
    // note that we make this variable mutable since we want to create a new list ref for all new messages
    let msgQueue: InstructionMessageItemProps[] = [];

    // take the total profit value so we don't have to type the full line every time we use it
    const prof = inventoryContext.totalProfit;

    if (prof === 0) { // if there is no profit, we ask the user to sell something
      msgQueue.push({ message: "You have no profit! Sell some products." });
    } else if (prof > 0 && prof < 500000) { // if the profit is between 0 ~ 500000, we ask the user to sell more and make more
      msgQueue.push({ // for single messages, a simple push is enough to add the message to the queue
        message: `You only have ${formatNumToEur(
          prof
        )}. Try selling some products.`,
      });
    } else if (prof < 0) { // if there is a negative profit, we notify the user of the situation
      msgQueue.push({
        message: `You're in ${formatNumToEur(
          prof
        )} debt! Sell everything!! Or invest ;)`,
        color: 'warning' // we change the color to warning
      });
    }

     // get a list of products where the stock is lower than 3000
     const lowStocks = _.filter(inventoryContext.products, (i) => {
        return i.stock <= 3000;
      });
  
    // if there is more than one product with a low stock
    if (lowStocks.length > 0) {
        // we create a restock message per all the items
      msgQueue = _.concat( // note that instead of pushing, we just combine the old list with the new one and reassign it
        msgQueue, // without this, all previous messages would be gone
        _.map(lowStocks, (i) => {
          const message =
            i.stock > 0
              ? `"${i.name}" only has ${i.stock} left! You should restock.`
              : `"${i.name}" is out of stock! You should restock.`;
          return {
            message,
          } as InstructionMessageItemProps;
        })
      );
    }

    // if there is no transaction history, we ask the user to do something
    if (inventoryContext.transactionHistory.length === 0) {
      msgQueue.push({
        message:
          "You don't have any transactions. Try selling, restocking, or adding a new product.",
      });
    }

    // get the product count variable so it can be used in the message
    const prodCount = inventoryContext.products.length;
    if (prodCount < 11) { // if the inventory has less than 11 products, we ask the user to add a new product
      msgQueue.push({
        message: `You only have ${prodCount} products. Try adding a new product.`,
      });
    }

    // if the user has no messages and a lot of profit, we send a congrats message
    if (msgQueue.length === 0 && prof > 10000000) {
      msgQueue.push({
        message: `Wow! You have ${formatNumToEur(
          prof
        )}! You're so rich! Try introducing a new product and hope it sells well.`, // of course, we still want the user to do something
        color: "success",
      });
    }

    // we re-initialize the list so that the reference will change, triggering a render event in React
    setAppMessages([...msgQueue]);
    // this hook will run every time the product list, transaction history, or the profit changes
  }, [
    inventoryContext.products,
    inventoryContext.transactionHistory,
    inventoryContext.totalProfit,
  ]);

  // render the help message card
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Your "AI" Assistant</IonCardTitle>
        <IonCardSubtitle>
          Let me help you with what you should do next!
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {appMessages.length < 1 ? (
          <IonLabel>No messages</IonLabel>
        ) : (
          <IonList>
            {_.map(appMessages, (i) => {
              return (
                <InstructionMessageItem
                  key={crypto.randomUUID()}
                  message={i.message}
                  color={i.color}
                />
              );
            })}
          </IonList>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default UserInstructionCard;
