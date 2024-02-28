import React, { createContext, useContext, useState, useEffect } from "react";
import { SendToScaleModel } from "../../../../../core/_models/Report/SendToScaleModel";
const SendToScaleContext = createContext();

export function useSendToScaleContext() {
  return useContext(SendToScaleContext);
}

export const SendToScaleConsumer = SendToScaleContext.Consumer;

export function SendToScaleProvider({ events, children }) {
  const [items, setItems] = useState([]);

  const value = {
    items,
    setItems,
    dataModel: SendToScaleModel,
    gotoSellPricing: events.gotoSellPricing,
  };

  return (
    <SendToScaleContext.Provider value={value}>
      {children}
    </SendToScaleContext.Provider>
  );
}
