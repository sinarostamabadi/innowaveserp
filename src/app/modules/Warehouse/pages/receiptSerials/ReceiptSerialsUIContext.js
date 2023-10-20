
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ReceiptSerialModel } from "../../../../../core/_models/Warehouse/ReceiptSerialModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ReceiptSerialsUIContext = createContext();

export function useReceiptSerialsUIContext() {
  return useContext(ReceiptSerialsUIContext);
}

export const ReceiptSerialsUIConsumer = ReceiptSerialsUIContext.Consumer;

export function ReceiptSerialsUIProvider({ receiptSerialsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ReceiptSerialModel).initialFilter
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
    dataModel: ReceiptSerialModel,
    newReceiptSerialButtonClick: receiptSerialsUIEvents.newReceiptSerialButtonClick,
    openEditReceiptSerialPage: receiptSerialsUIEvents.openEditReceiptSerialPage,
    openDeleteReceiptSerialDialog: receiptSerialsUIEvents.openDeleteReceiptSerialDialog,
    openDeleteReceiptSerialsDialog: receiptSerialsUIEvents.openDeleteReceiptSerialsDialog,
    openFetchReceiptSerialsDialog: receiptSerialsUIEvents.openFetchReceiptSerialsDialog,
    openUpdateReceiptSerialsStatusDialog: receiptSerialsUIEvents.openUpdateReceiptSerialsStatusDialog,
  };
  return (
    <ReceiptSerialsUIContext.Provider value={value}>{children}</ReceiptSerialsUIContext.Provider>
  );
}