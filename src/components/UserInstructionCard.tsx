import React, { useMemo, useState, useCallback, useEffect } from "react";
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
import { Product, Transaction } from "../types";
import _ from "lodash";

interface UserInstructionCardProps {
  products: Product[];
  transactions: Transaction[];
  inventoryCalcs: {
    totalRev: number;
    totalVal: number;
    totalProf: number;
    totalCost: number;
  };
}

interface InstructionMessageItemProps {
  message: string;
  color?: string;
}

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

const UserInstructionCard: React.FC<UserInstructionCardProps> = (props) => {
  const [appMessages, setAppMessages] = useState<InstructionMessageItemProps[]>(
    []
  );

  useEffect(() => {
    setAppMessages([
      { message: "Add more products!" },
      { message: "Sell more products!" },
    ]);
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Your "AI" Assistant</IonCardTitle>
        <IonCardSubtitle>
          Let me help you what you should do next!
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {appMessages.length < 1 ? (
          <IonLabel>No messages</IonLabel>
        ) : (
          <IonList>
            {_.map(appMessages, (i) => {
              return (
                <InstructionMessageItem key={crypto.randomUUID()} message={i.message} color={i.color} />
              );
            })}
          </IonList>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default UserInstructionCard;
