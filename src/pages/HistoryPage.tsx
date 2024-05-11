import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonText,
  IonNote,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import React, { useContext, useState, useEffect } from "react";
import { Transaction } from "../types";
import { InventoryContext } from "../context/InventoryContext";
import ExploreContainer from "../components/ExploreContainer";
import _ from "lodash";
import { typeToVisuals } from "../helpers";

import "./HistoryPage.css";

const HistoryPage: React.FC = () => {
  const inventoryContext = useContext(InventoryContext);
  const [txHistory, setTxHistory] = useState<Transaction[]>([]);
  if (!inventoryContext) {
    throw new Error(
      "Inventory context failed to load. The application cannot work."
    );
  }
  useEffect(() => {
    const hist = inventoryContext.transactionHistory;
    setTxHistory(hist);
  }, [inventoryContext.transactionHistory]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transaction History</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Transaction History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
            <IonCardHeader>
              <IonCardTitle>Inventory Value</IonCardTitle>
              <IonCardSubtitle color="primary">
                {inventoryContext.totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}{" "}
                EUR
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                Total Revenue:{" "}
                {inventoryContext.totalRevenue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}{" "}
                EUR
              </p>
              <p>
                Total Costs:{" "}
                {inventoryContext.totalCosts.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}{" "}
                EUR
              </p>

              <p>
                Current Profit:{" "}
                {inventoryContext.totalProfit.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}{" "}
                EUR
              </p>
            </IonCardContent>
          </IonCard>
        {txHistory.length > 0 ? (
          <>
            <IonList inset={true}>
              {_.map(txHistory, (i) => {
                return (
                  <IonItem key={i.id} detail={false}>
                    <IonIcon
                      aria-hidden="true"
                      icon={typeToVisuals(i.type).icon}
                      slot="start"
                      color={typeToVisuals(i.type).color}
                    ></IonIcon>
                    <IonLabel>
                      <strong>
                        {inventoryContext.findProdById(i.productId).name}
                      </strong>
                      <IonText>
                        <p>Transaction Type: {typeToVisuals(i.type).msg}</p>
                        <p>Quantity: {i.quantity}</p>
                        <p>
                          {i.type === "add" || i.type === "buy"
                            ? "Total Cost:"
                            : "Total Gains:"}{" "}
                          {i.totalCost.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}{" "}
                          EUR
                        </p>
                        <p>Transaction ID: {i.id}</p>
                      </IonText>
                    </IonLabel>
                    <div className="metadata-end-wrapper" slot="end">
                      <IonNote color="medium">{i.time.toString()}</IonNote>
                    </div>
                  </IonItem>
                );
              })}
            </IonList>
          </>
        ) : (
          <ExploreContainer name="Transaction History Not Found" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
