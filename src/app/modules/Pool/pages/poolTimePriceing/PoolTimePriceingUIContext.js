
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PoolTimePriceingModel } from "../../../../../core/_models/Pool/PoolTimePriceingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PoolTimePriceingUIContext = createContext();

export function usePoolTimePriceingUIContext() {
  return useContext(PoolTimePriceingUIContext);
}

export const PoolTimePriceingUIConsumer = PoolTimePriceingUIContext.Consumer;

export function PoolTimePriceingUIProvider({ poolTimePriceingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PoolTimePriceingModel).initialFilter
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
    dataModel: PoolTimePriceingModel,
    newPoolTimePriceingButtonClick: poolTimePriceingUIEvents.newPoolTimePriceingButtonClick,
    openEditPoolTimePriceingPage: poolTimePriceingUIEvents.openEditPoolTimePriceingPage,
    openDeletePoolTimePriceingDialog: poolTimePriceingUIEvents.openDeletePoolTimePriceingDialog,
    openDeletePoolTimePriceingDialog: poolTimePriceingUIEvents.openDeletePoolTimePriceingDialog,
    openFetchPoolTimePriceingDialog: poolTimePriceingUIEvents.openFetchPoolTimePriceingDialog,
    openUpdatePoolTimePriceingStatusDialog: poolTimePriceingUIEvents.openUpdatePoolTimePriceingStatusDialog,
  };
  return (
    <PoolTimePriceingUIContext.Provider value={value}>{children}</PoolTimePriceingUIContext.Provider>
  );
}