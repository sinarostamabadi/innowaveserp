import React, { createContext, useContext, useState, useEffect } from "react";
import { WarehouseHandlingModel } from "src/core/_models/Report/WarehouseHandlingModel";
import { get } from "../../../_redux/_data/WarehouseHandling.js";
const WarehouseHandlingContext = createContext();

export function useWarehouseHandlingContext() {
  return useContext(WarehouseHandlingContext);
}

export const WarehouseHandlingConsumer = WarehouseHandlingContext.Consumer;

export function WarehouseHandlingProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [ids, setIds] = useState(items && items.length > 0 ? items.map((x) => x.items.Items.ProductCode) : []);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState(null);

  const value = {
    ids,
    setIds,
    items,
    filters,
    setFilters,
    dataModel: WarehouseHandlingModel,
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
    <WarehouseHandlingContext.Provider value={value}>
      {children}
    </WarehouseHandlingContext.Provider>
  );
}
