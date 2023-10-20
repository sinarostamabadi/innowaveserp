
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PoolReservePriceModel } from "../../../../../core/_models/Pool/PoolReservePriceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PoolReservePricesUIContext = createContext();

export function usePoolReservePricesUIContext() {
  return useContext(PoolReservePricesUIContext);
}

export const PoolReservePricesUIConsumer = PoolReservePricesUIContext.Consumer;

export function PoolReservePricesUIProvider({ poolReservePricesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PoolReservePriceModel).initialFilter
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
    dataModel: PoolReservePriceModel,
    newPoolReservePriceButtonClick: poolReservePricesUIEvents.newPoolReservePriceButtonClick,
    openEditPoolReservePricePage: poolReservePricesUIEvents.openEditPoolReservePricePage,
    openDeletePoolReservePriceDialog: poolReservePricesUIEvents.openDeletePoolReservePriceDialog,
    openDeletePoolReservePricesDialog: poolReservePricesUIEvents.openDeletePoolReservePricesDialog,
    openFetchPoolReservePricesDialog: poolReservePricesUIEvents.openFetchPoolReservePricesDialog,
    openUpdatePoolReservePricesStatusDialog: poolReservePricesUIEvents.openUpdatePoolReservePricesStatusDialog,
  };
  return (
    <PoolReservePricesUIContext.Provider value={value}>{children}</PoolReservePricesUIContext.Provider>
  );
}