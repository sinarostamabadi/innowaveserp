import React, { createContext, useContext, useState, useEffect } from "react";
import { TotalSalesProfitModel } from "../../../../../core/_models/Report/TotalSalesProfitModel";
import { get } from "../../_data/Sell";
const TotalSalesProfitContext = createContext();

export function useTotalSalesProfitContext() {
  return useContext(TotalSalesProfitContext);
}

export const TotalSalesProfitConsumer = TotalSalesProfitContext.Consumer;

export function TotalSalesProfitProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState(null);

  const value = {
    items,
    filters,
    setFilters,
    dataModel: TotalSalesProfitModel,
    gotoEditBuy: events.gotoEditBuy,
    readyToPrint: readyToPrint,
  };

  useEffect(() => {
    if (!!filters) {
      setReadyToPrint(false);

      get(filters).then(({ data }) => {
        setItems(data);
        setReadyToPrint(true);
      });
    }
  }, [filters]);

  return (
    <TotalSalesProfitContext.Provider value={value}>
      {children}
    </TotalSalesProfitContext.Provider>
  );
}
