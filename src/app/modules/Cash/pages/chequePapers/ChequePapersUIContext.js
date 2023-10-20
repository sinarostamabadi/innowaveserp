
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ChequePaperModel } from "src/core/_models/Cash/ChequePaperModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const ChequePapersUIContext = createContext();

export function useChequePapersUIContext() {
  return useContext(ChequePapersUIContext);
}

export const ChequePapersUIConsumer = ChequePapersUIContext.Consumer;

export function ChequePapersUIProvider({ chequePapersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ChequePaperModel).initialFilter
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
    dataModel: ChequePaperModel,
    newChequePaperButtonClick: chequePapersUIEvents.newChequePaperButtonClick,
    openEditChequePaperPage: chequePapersUIEvents.openEditChequePaperPage,
    openDeleteChequePaperDialog: chequePapersUIEvents.openDeleteChequePaperDialog,
    openDeleteChequePapersDialog: chequePapersUIEvents.openDeleteChequePapersDialog,
    openFetchChequePapersDialog: chequePapersUIEvents.openFetchChequePapersDialog,
    openUpdateChequePapersStatusDialog: chequePapersUIEvents.openUpdateChequePapersStatusDialog,
  };
  return (
    <ChequePapersUIContext.Provider value={value}>{children}</ChequePapersUIContext.Provider>
  );
}