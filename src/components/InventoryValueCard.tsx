import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import React from "react";
import _ from "lodash";
import { formatNumToEur } from "../helpers";

/**
 * Properties for the inventory value card component
 */
interface InventoryValueCardProps {
  /**
   * The total inventory cost that will be rendered
   */
  totalCosts: number;
  /**
   * The total inventory value
   */
  totalValue: number;
  /**
   * The total revenue from selling products
   */
  totalRevenue: number;
  /**
   * The total profit that will be rendered
   */
  totalProfit: number;
  /**
   * Defines the primary value that will be rendered
   */
  displayType: "value" | "cost" | "profit" | "revenue";
}

/**
 * A component for displaying the current inventory value, cost, revenue, and profit.
 * The developer can change the main value to be displayed.
 */
const InventoryValueCard: React.FC<InventoryValueCardProps> = (props) => {
  const CalcHeaderRenderer = () => {
    switch (props.displayType) {
      case "value":
        return (
          <IonCardHeader>
            <IonCardTitle>Inventory Value</IonCardTitle>
            <IonCardSubtitle color="primary">
              {formatNumToEur(props.totalValue)}
            </IonCardSubtitle>
          </IonCardHeader>
        );
      case "cost":
        return (
          <IonCardHeader>
            <IonCardTitle>Total Cost</IonCardTitle>
            <IonCardSubtitle color="primary">
              {formatNumToEur(props.totalCosts)}
            </IonCardSubtitle>
          </IonCardHeader>
        );
      case "profit":
        return (
          <IonCardHeader>
            <IonCardTitle>Total Profit</IonCardTitle>
            <IonCardSubtitle color="primary">
              {formatNumToEur(props.totalProfit)}
            </IonCardSubtitle>
          </IonCardHeader>
        );
      case "revenue":
        return (
          <IonCardHeader>
            <IonCardTitle>Total Revenue</IonCardTitle>
            <IonCardSubtitle color="primary">
              {formatNumToEur(props.totalRevenue)}
            </IonCardSubtitle>
          </IonCardHeader>
        );
    }
  };

  // render the inventory value card
  return (
    <IonCard>
      <CalcHeaderRenderer />
      <IonCardContent>
        <p>Total Revenue: {formatNumToEur(props.totalRevenue)}</p>
        <p>Total Costs: {formatNumToEur(props.totalCosts)}</p>

        <p>Current Profit: {formatNumToEur(props.totalProfit)}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default InventoryValueCard;
