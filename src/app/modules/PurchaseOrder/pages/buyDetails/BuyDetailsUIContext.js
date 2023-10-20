
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuyDetailModel } from "../../../../../core/_models/PurchaseOrder/BuyDetailModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BuyDetailsUIContext = createContext();

export function useBuyDetailsUIContext() {
  return useContext(BuyDetailsUIContext);
}

export const BuyDetailsUIConsumer = BuyDetailsUIContext.Consumer;

export function BuyDetailsUIProvider({ buyDetailsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BuyDetailModel).initialFilter
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
    dataModel: BuyDetailModel,
    newBuyDetailButtonClick: buyDetailsUIEvents.newBuyDetailButtonClick,
    openEditBuyDetailPage: buyDetailsUIEvents.openEditBuyDetailPage,
    openDeleteBuyDetailDialog: buyDetailsUIEvents.openDeleteBuyDetailDialog,
    openDeleteBuyDetailsDialog: buyDetailsUIEvents.openDeleteBuyDetailsDialog,
    openFetchBuyDetailsDialog: buyDetailsUIEvents.openFetchBuyDetailsDialog,
    openUpdateBuyDetailsStatusDialog: buyDetailsUIEvents.openUpdateBuyDetailsStatusDialog,
  };
  return (
    <BuyDetailsUIContext.Provider value={value}>{children}</BuyDetailsUIContext.Provider>
  );
}