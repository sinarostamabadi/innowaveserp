
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellPricingDetailModel } from "../../../../../core/_models/Sell/SellPricingDetailModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellPricingDetailsUIContext = createContext();

export function useSellPricingDetailsUIContext() {
  return useContext(SellPricingDetailsUIContext);
}

export const SellPricingDetailsUIConsumer = SellPricingDetailsUIContext.Consumer;

export function SellPricingDetailsUIProvider({ sellPricingDetailsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellPricingDetailModel).initialFilter
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
    dataModel: SellPricingDetailModel,
    newSellPricingDetailButtonClick: sellPricingDetailsUIEvents.newSellPricingDetailButtonClick,
    openEditSellPricingDetailPage: sellPricingDetailsUIEvents.openEditSellPricingDetailPage,
    openDeleteSellPricingDetailDialog: sellPricingDetailsUIEvents.openDeleteSellPricingDetailDialog,
    openDeleteSellPricingDetailsDialog: sellPricingDetailsUIEvents.openDeleteSellPricingDetailsDialog,
    openFetchSellPricingDetailsDialog: sellPricingDetailsUIEvents.openFetchSellPricingDetailsDialog,
    openUpdateSellPricingDetailsStatusDialog: sellPricingDetailsUIEvents.openUpdateSellPricingDetailsStatusDialog,
  };
  return (
    <SellPricingDetailsUIContext.Provider value={value}>{children}</SellPricingDetailsUIContext.Provider>
  );
}