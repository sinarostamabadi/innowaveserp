import React, { createContext, useContext, useState, useEffect } from "react";
import { InventoryOnReceiptModel } from "src/core/_models/Report/InventoryOnReceiptModel";
import { get } from "../../../_redux/_data/InventoryOnReceipt.js";
const InventoryOnReceiptContext = createContext();

export function useInventoryOnReceiptContext() {
  return useContext(InventoryOnReceiptContext);
}

export const InventoryOnReceiptConsumer = InventoryOnReceiptContext.Consumer;

export function InventoryOnReceiptProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState(null);

  const value = {
    items,
    filters,
    setFilters,
    dataModel: InventoryOnReceiptModel,
    gotoEditBuy: events.gotoEditBuy,
    readyToPrint: readyToPrint
  };

  useEffect(()=>{
    if(!!filters){
      setReadyToPrint(false);

      get(filters).then(({data}) => {
        setItems(data);
        setReadyToPrint(true);
      });
    }
  }, [filters]);

  return (
    <InventoryOnReceiptContext.Provider value={value}>
      {children}
    </InventoryOnReceiptContext.Provider>
  );
}
