
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalReservePriceModel } from "../../../../../core/_models/Futsal/FutsalReservePriceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalReservePricesUIContext = createContext();

export function useFutsalReservePricesUIContext() {
  return useContext(FutsalReservePricesUIContext);
}

export const FutsalReservePricesUIConsumer = FutsalReservePricesUIContext.Consumer;

export function FutsalReservePricesUIProvider({ futsalReservePricesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalReservePriceModel).initialFilter
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
    dataModel: FutsalReservePriceModel,
    newFutsalReservePriceButtonClick: futsalReservePricesUIEvents.newFutsalReservePriceButtonClick,
    openEditFutsalReservePricePage: futsalReservePricesUIEvents.openEditFutsalReservePricePage,
    openDeleteFutsalReservePriceDialog: futsalReservePricesUIEvents.openDeleteFutsalReservePriceDialog,
    openDeleteFutsalReservePricesDialog: futsalReservePricesUIEvents.openDeleteFutsalReservePricesDialog,
    openFetchFutsalReservePricesDialog: futsalReservePricesUIEvents.openFetchFutsalReservePricesDialog,
    openUpdateFutsalReservePricesStatusDialog: futsalReservePricesUIEvents.openUpdateFutsalReservePricesStatusDialog,
  };
  return (
    <FutsalReservePricesUIContext.Provider value={value}>{children}</FutsalReservePricesUIContext.Provider>
  );
}