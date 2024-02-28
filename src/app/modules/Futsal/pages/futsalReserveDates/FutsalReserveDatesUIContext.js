import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { FutsalReserveDateModel } from "../../../../../core/_models/Futsal/FutsalReserveDateModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const FutsalReserveDatesUIContext = createContext();

export function useFutsalReserveDatesUIContext() {
  return useContext(FutsalReserveDatesUIContext);
}

export const FutsalReserveDatesUIConsumer =
  FutsalReserveDatesUIContext.Consumer;

export function FutsalReserveDatesUIProvider({
  futsalReserveDatesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(FutsalReserveDateModel).initialFilter
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
    dataModel: FutsalReserveDateModel,
    newFutsalReserveDateButtonClick:
      futsalReserveDatesUIEvents.newFutsalReserveDateButtonClick,
    openEditFutsalReserveDatePage:
      futsalReserveDatesUIEvents.openEditFutsalReserveDatePage,
    openDeleteFutsalReserveDateDialog:
      futsalReserveDatesUIEvents.openDeleteFutsalReserveDateDialog,
    openDeleteFutsalReserveDatesDialog:
      futsalReserveDatesUIEvents.openDeleteFutsalReserveDatesDialog,
    openFetchFutsalReserveDatesDialog:
      futsalReserveDatesUIEvents.openFetchFutsalReserveDatesDialog,
    openUpdateFutsalReserveDatesStatusDialog:
      futsalReserveDatesUIEvents.openUpdateFutsalReserveDatesStatusDialog,
  };
  return (
    <FutsalReserveDatesUIContext.Provider value={value}>
      {children}
    </FutsalReserveDatesUIContext.Provider>
  );
}
