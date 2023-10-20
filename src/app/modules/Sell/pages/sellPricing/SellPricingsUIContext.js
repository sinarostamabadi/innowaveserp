
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellPricingModel } from "../../../../../core/_models/Sell/SellPricingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellPricingsUIContext = createContext();

export function useSellPricingsUIContext() {
  return useContext(SellPricingsUIContext);
}

export const SellPricingsUIConsumer = SellPricingsUIContext.Consumer;

export function SellPricingsUIProvider({ sellPricingsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellPricingModel).initialFilter
  );

  const [ids, setIds] = useState([]);

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);
  
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: SellPricingModel,
    newSellPricingButtonClick: sellPricingsUIEvents.newSellPricingButtonClick,
    openEditSellPricingPage: sellPricingsUIEvents.openEditSellPricingPage,
    openDeleteSellPricingDialog: sellPricingsUIEvents.openDeleteSellPricingDialog,
    openDeleteSellPricingsDialog: sellPricingsUIEvents.openDeleteSellPricingsDialog,
    openFetchSellPricingsDialog: sellPricingsUIEvents.openFetchSellPricingsDialog,
    openUpdateSellPricingsStatusDialog: sellPricingsUIEvents.openUpdateSellPricingsStatusDialog,
  };
  return (
    <SellPricingsUIContext.Provider value={value}>{children}</SellPricingsUIContext.Provider>
  );
}