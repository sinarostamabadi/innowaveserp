import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalTimePriceingModel } from "../../../../../core/_models/Futsal/FutsalTimePriceingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalTimePriceingUIContext = createContext();

export function useFutsalTimePriceingUIContext() {
  return useContext(FutsalTimePriceingUIContext);
}

export const FutsalTimePriceingUIConsumer =
  FutsalTimePriceingUIContext.Consumer;

export function FutsalTimePriceingUIProvider({
  futsalTimePriceingUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalTimePriceingModel).initialFilter
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
    dataModel: FutsalTimePriceingModel,
    newFutsalTimePriceingButtonClick:
      futsalTimePriceingUIEvents.newFutsalTimePriceingButtonClick,
    openEditFutsalTimePriceingPage:
      futsalTimePriceingUIEvents.openEditFutsalTimePriceingPage,
    openDeleteFutsalTimePriceingDialog:
      futsalTimePriceingUIEvents.openDeleteFutsalTimePriceingDialog,
    openDeleteFutsalTimePriceingDialog:
      futsalTimePriceingUIEvents.openDeleteFutsalTimePriceingDialog,
    openFetchFutsalTimePriceingDialog:
      futsalTimePriceingUIEvents.openFetchFutsalTimePriceingDialog,
    openUpdateFutsalTimePriceingStatusDialog:
      futsalTimePriceingUIEvents.openUpdateFutsalTimePriceingStatusDialog,
  };
  return (
    <FutsalTimePriceingUIContext.Provider value={value}>
      {children}
    </FutsalTimePriceingUIContext.Provider>
  );
}
