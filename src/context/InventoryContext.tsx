import { IInventory } from "../types";
import React from 'react';

// extend from the inventory interface so that it matches the main class while allowing us to extend UI-specific functions
interface InventoryContextType extends IInventory {

}

export const InventoryContext = React.createContext<InventoryContextType | null>(null);
