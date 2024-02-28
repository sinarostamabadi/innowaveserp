import React, { createContext, useContext, useState, useEffect } from "react";
import { TotalSalesTodayModel } from "../../../../../core/_models/Report/TotalSalesTodayModel";
import { get } from "../../_data/TotalSalesToday";
const TotalSalesTodayContext = createContext();

export function useTotalSalesTodayContext() {
  return useContext(TotalSalesTodayContext);
}

export const TotalSalesTodayConsumer = TotalSalesTodayContext.Consumer;

export function TotalSalesTodayProvider({ events, children }) {
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
    dataModel: TotalSalesTodayModel,
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
    <TotalSalesTodayContext.Provider value={value}>
      {children}
    </TotalSalesTodayContext.Provider>
  );
}
