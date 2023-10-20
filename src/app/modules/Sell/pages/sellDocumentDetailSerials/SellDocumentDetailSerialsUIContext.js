
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SellDocumentDetailSerialModel } from "../../../../../core/_models/Sell/SellDocumentDetailSerialModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SellDocumentDetailSerialsUIContext = createContext();

export function useSellDocumentDetailSerialsUIContext() {
  return useContext(SellDocumentDetailSerialsUIContext);
}

export const SellDocumentDetailSerialsUIConsumer = SellDocumentDetailSerialsUIContext.Consumer;

export function SellDocumentDetailSerialsUIProvider({ sellDocumentDetailSerialsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SellDocumentDetailSerialModel).initialFilter
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
    dataModel: SellDocumentDetailSerialModel,
    newSellDocumentDetailSerialButtonClick: sellDocumentDetailSerialsUIEvents.newSellDocumentDetailSerialButtonClick,
    openEditSellDocumentDetailSerialPage: sellDocumentDetailSerialsUIEvents.openEditSellDocumentDetailSerialPage,
    openDeleteSellDocumentDetailSerialDialog: sellDocumentDetailSerialsUIEvents.openDeleteSellDocumentDetailSerialDialog,
    openDeleteSellDocumentDetailSerialsDialog: sellDocumentDetailSerialsUIEvents.openDeleteSellDocumentDetailSerialsDialog,
    openFetchSellDocumentDetailSerialsDialog: sellDocumentDetailSerialsUIEvents.openFetchSellDocumentDetailSerialsDialog,
    openUpdateSellDocumentDetailSerialsStatusDialog: sellDocumentDetailSerialsUIEvents.openUpdateSellDocumentDetailSerialsStatusDialog,
  };
  return (
    <SellDocumentDetailSerialsUIContext.Provider value={value}>{children}</SellDocumentDetailSerialsUIContext.Provider>
  );
}