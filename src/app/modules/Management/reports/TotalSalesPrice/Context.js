import React, { createContext, useContext, useState, useEffect } from "react";
import { TotalSalesPriceModel } from "../../../../../core/_models/Report/TotalSalesPriceModel";
import { get } from "../../_data/TotalSalesPrice";
const TotalSalesPriceContext = createContext();

export function useTotalSalesPriceContext() {
  return useContext(TotalSalesPriceContext);
}

export const TotalSalesPriceConsumer = TotalSalesPriceContext.Consumer;

export function TotalSalesPriceProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState({
    FromDate: "",
    ToDate: "",
    OrderBy: "",
  });

  const value = {
    items,
    filters,
    setFilters,
    dataModel: TotalSalesPriceModel,
    gotoEditBuy: events.gotoEditBuy,
    readyToPrint: readyToPrint,
  };

  useEffect(() => {
    get(filters).then(({ data }) => {
      setItems(data.Items);
      setReadyToPrint(true);
    });
  }, [filters]);

  return (
    <TotalSalesPriceContext.Provider value={value}>
      {children}
    </TotalSalesPriceContext.Provider>
  );
}
