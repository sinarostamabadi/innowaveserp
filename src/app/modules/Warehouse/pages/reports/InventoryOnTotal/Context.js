import React, { createContext, useContext, useState, useEffect } from "react";
import { InventoryOnTotalModel } from "src/core/_models/Report/InventoryOnTotalModel";
import { get } from "../../../_redux/_data/InventoryOnTotal.js";
const InventoryOnTotalContext = createContext();

export function useInventoryOnTotalContext() {
  return useContext(InventoryOnTotalContext);
}

export const InventoryOnTotalConsumer = InventoryOnTotalContext.Consumer;

export function InventoryOnTotalProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState(null);

  const value = {
    items,
    filters,
    setFilters,
    dataModel: InventoryOnTotalModel,
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
    <InventoryOnTotalContext.Provider value={value}>
      {children}
    </InventoryOnTotalContext.Provider>
  );
}
