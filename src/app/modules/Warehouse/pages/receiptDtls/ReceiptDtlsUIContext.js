
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ReceiptDtlModel } from "../../../../../core/_models/Warehouse/ReceiptDtlModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ReceiptDtlsUIContext = createContext();

export function useReceiptDtlsUIContext() {
  return useContext(ReceiptDtlsUIContext);
}

export const ReceiptDtlsUIConsumer = ReceiptDtlsUIContext.Consumer;

export function ReceiptDtlsUIProvider({ receiptDtlsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ReceiptDtlModel).initialFilter
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
    dataModel: ReceiptDtlModel,
    newReceiptDtlButtonClick: receiptDtlsUIEvents.newReceiptDtlButtonClick,
    openEditReceiptDtlPage: receiptDtlsUIEvents.openEditReceiptDtlPage,
    openDeleteReceiptDtlDialog: receiptDtlsUIEvents.openDeleteReceiptDtlDialog,
    openDeleteReceiptDtlsDialog: receiptDtlsUIEvents.openDeleteReceiptDtlsDialog,
    openFetchReceiptDtlsDialog: receiptDtlsUIEvents.openFetchReceiptDtlsDialog,
    openUpdateReceiptDtlsStatusDialog: receiptDtlsUIEvents.openUpdateReceiptDtlsStatusDialog,
  };
  return (
    <ReceiptDtlsUIContext.Provider value={value}>{children}</ReceiptDtlsUIContext.Provider>
  );
}