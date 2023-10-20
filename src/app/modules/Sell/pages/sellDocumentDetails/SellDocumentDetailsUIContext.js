
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDocumentDetailModel } from "../../../../../core/_models/Sell/SellDocumentDetailModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDocumentDetailsUIContext = createContext();

export function useSellDocumentDetailsUIContext() {
  return useContext(SellDocumentDetailsUIContext);
}

export const SellDocumentDetailsUIConsumer = SellDocumentDetailsUIContext.Consumer;

export function SellDocumentDetailsUIProvider({ sellDocumentDetailsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellDocumentDetailModel).initialFilter
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
    dataModel: SellDocumentDetailModel,
    newSellDocumentDetailButtonClick: sellDocumentDetailsUIEvents.newSellDocumentDetailButtonClick,
    openEditSellDocumentDetailPage: sellDocumentDetailsUIEvents.openEditSellDocumentDetailPage,
    openDeleteSellDocumentDetailDialog: sellDocumentDetailsUIEvents.openDeleteSellDocumentDetailDialog,
    openDeleteSellDocumentDetailsDialog: sellDocumentDetailsUIEvents.openDeleteSellDocumentDetailsDialog,
    openFetchSellDocumentDetailsDialog: sellDocumentDetailsUIEvents.openFetchSellDocumentDetailsDialog,
    openUpdateSellDocumentDetailsStatusDialog: sellDocumentDetailsUIEvents.openUpdateSellDocumentDetailsStatusDialog,
  };
  return (
    <SellDocumentDetailsUIContext.Provider value={value}>{children}</SellDocumentDetailsUIContext.Provider>
  );
}