
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalCenterModel } from "../../../../../core/_models/Futsal/FutsalCenterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalCentersUIContext = createContext();

export function useFutsalCentersUIContext() {
  return useContext(FutsalCentersUIContext);
}

export const FutsalCentersUIConsumer = FutsalCentersUIContext.Consumer;

export function FutsalCentersUIProvider({ futsalCentersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalCenterModel).initialFilter
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
    dataModel: FutsalCenterModel,
    newFutsalCenterButtonClick: futsalCentersUIEvents.newFutsalCenterButtonClick,
    openEditFutsalCenterPage: futsalCentersUIEvents.openEditFutsalCenterPage,
    openDeleteFutsalCenterDialog: futsalCentersUIEvents.openDeleteFutsalCenterDialog,
    openDeleteFutsalCentersDialog: futsalCentersUIEvents.openDeleteFutsalCentersDialog,
    openFetchFutsalCentersDialog: futsalCentersUIEvents.openFetchFutsalCentersDialog,
    openUpdateFutsalCentersStatusDialog: futsalCentersUIEvents.openUpdateFutsalCentersStatusDialog,
  };
  return (
    <FutsalCentersUIContext.Provider value={value}>{children}</FutsalCentersUIContext.Provider>
  );
}