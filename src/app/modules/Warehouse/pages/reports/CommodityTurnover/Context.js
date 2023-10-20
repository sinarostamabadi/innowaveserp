import React, { createContext, useContext, useState, useEffect } from "react";
import { CommodityTurnoverModel } from "src/core/_models/Report/CommodityTurnoverModel";
import { get } from "../../../_redux/_data/CommodityTurnover.js";
const CommodityTurnoverContext = createContext();

export function useCommodityTurnoverContext() {
  return useContext(CommodityTurnoverContext);
}

export const CommodityTurnoverConsumer = CommodityTurnoverContext.Consumer;

export function CommodityTurnoverProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState(null);

  const value = {
    items,
    filters,
    setFilters,
    dataModel: CommodityTurnoverModel,
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
    <CommodityTurnoverContext.Provider value={value}>
      {children}
    </CommodityTurnoverContext.Provider>
  );
}
