
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PoolReserveModel } from "../../../../../core/_models/Pool/PoolReserveModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PoolReservesUIContext = createContext();

export function usePoolReservesUIContext() {
  return useContext(PoolReservesUIContext);
}

export const PoolReservesUIConsumer = PoolReservesUIContext.Consumer;

export function PoolReservesUIProvider({ poolReservesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PoolReserveModel).initialFilter
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
    dataModel: PoolReserveModel,
    newPoolReserveButtonClick: poolReservesUIEvents.newPoolReserveButtonClick,
    openEditPoolReservePage: poolReservesUIEvents.openEditPoolReservePage,
    openDeletePoolReserveDialog: poolReservesUIEvents.openDeletePoolReserveDialog,
    openDeletePoolReservesDialog: poolReservesUIEvents.openDeletePoolReservesDialog,
    openFetchPoolReservesDialog: poolReservesUIEvents.openFetchPoolReservesDialog,
    openUpdatePoolReservesStatusDialog: poolReservesUIEvents.openUpdatePoolReservesStatusDialog,
  };
  return (
    <PoolReservesUIContext.Provider value={value}>{children}</PoolReservesUIContext.Provider>
  );
}