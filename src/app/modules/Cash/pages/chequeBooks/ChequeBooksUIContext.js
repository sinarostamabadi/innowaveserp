
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ChequeBookModel } from "src/core/_models/Cash/ChequeBookModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const ChequeBooksUIContext = createContext();

export function useChequeBooksUIContext() {
  return useContext(ChequeBooksUIContext);
}

export const ChequeBooksUIConsumer = ChequeBooksUIContext.Consumer;

export function ChequeBooksUIProvider({ chequeBooksUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ChequeBookModel).initialFilter
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
    dataModel: ChequeBookModel,
    newChequeBookButtonClick: chequeBooksUIEvents.newChequeBookButtonClick,
    openEditChequeBookPage: chequeBooksUIEvents.openEditChequeBookPage,
    openDeleteChequeBookDialog: chequeBooksUIEvents.openDeleteChequeBookDialog,
    openDeleteChequeBooksDialog: chequeBooksUIEvents.openDeleteChequeBooksDialog,
    openFetchChequeBooksDialog: chequeBooksUIEvents.openFetchChequeBooksDialog,
    openUpdateChequeBooksStatusDialog: chequeBooksUIEvents.openUpdateChequeBooksStatusDialog,
  };
  return (
    <ChequeBooksUIContext.Provider value={value}>{children}</ChequeBooksUIContext.Provider>
  );
}