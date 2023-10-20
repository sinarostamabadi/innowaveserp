import React, { createContext, useContext, useState, useEffect } from "react";
import { CardexModel } from "src/core/_models/Report/CardexModel";
import { get } from "../../../_redux/_data/Cardex.js";
const CardexContext = createContext();

export function useCardexContext() {
  return useContext(CardexContext);
}

export const CardexConsumer = CardexContext.Consumer;

export function CardexProvider({ events, children }) {
  const [items, setItems] = useState([]);
  const [readyToPrint, setReadyToPrint] = useState(false);
  const [filters, setFilters] = useState(null);

  const value = {
    items,
    filters,
    setFilters,
    dataModel: CardexModel,
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
    <CardexContext.Provider value={value}>
      {children}
    </CardexContext.Provider>
  );
}
