import React, { createContext, useContext, useState, useEffect } from "react";
import { TotalSalesSoldModel } from "../../../../../core/_models/Report/TotalSalesSoldModel";
import { get } from "../../_data/TotalSalesSold"
const TotalSalesSoldContext = createContext();

export function useTotalSalesSoldContext() {
  return useContext(TotalSalesSoldContext);
}

export const TotalSalesSoldConsumer = TotalSalesSoldContext.Consumer;

export function TotalSalesSoldProvider({ events, children }) {
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
    dataModel: TotalSalesSoldModel,
    gotoEditBuy: events.gotoEditBuy,
    readyToPrint: readyToPrint
  };

  useEffect(()=>{
    get(filters).then(({data}) => {
        setItems(data.Items);
        setReadyToPrint(true);
    });
  }, [filters]);

  return (
    <TotalSalesSoldContext.Provider value={value}>
      {children}
    </TotalSalesSoldContext.Provider>
  );
}
