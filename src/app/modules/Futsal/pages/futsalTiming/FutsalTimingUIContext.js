import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalTimingModel } from "../../../../../core/_models/Futsal/FutsalTimingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalTimingUIContext = createContext();

export function useFutsalTimingUIContext() {
  return useContext(FutsalTimingUIContext);
}

export const FutsalTimingUIConsumer = FutsalTimingUIContext.Consumer;

export function FutsalTimingUIProvider({ futsalTimingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalTimingModel).initialFilter
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
    dataModel: FutsalTimingModel,
    newFutsalTimingButtonClick: futsalTimingUIEvents.newFutsalTimingButtonClick,
    openEditFutsalTimingPage: futsalTimingUIEvents.openEditFutsalTimingPage,
    openDeleteFutsalTimingDialog:
      futsalTimingUIEvents.openDeleteFutsalTimingDialog,
    openDeleteFutsalTimingDialog:
      futsalTimingUIEvents.openDeleteFutsalTimingDialog,
    openFetchFutsalTimingDialog:
      futsalTimingUIEvents.openFetchFutsalTimingDialog,
    openUpdateFutsalTimingStatusDialog:
      futsalTimingUIEvents.openUpdateFutsalTimingStatusDialog,
  };
  return (
    <FutsalTimingUIContext.Provider value={value}>
      {children}
    </FutsalTimingUIContext.Provider>
  );
}
