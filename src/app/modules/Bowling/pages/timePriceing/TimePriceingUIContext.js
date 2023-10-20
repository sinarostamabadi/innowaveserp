
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { TimePriceingModel } from "../../../../../core/_models/Bowling/TimePriceingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const TimePriceingUIContext = createContext();

export function useTimePriceingUIContext() {
  return useContext(TimePriceingUIContext);
}

export const TimePriceingUIConsumer = TimePriceingUIContext.Consumer;

export function TimePriceingUIProvider({ timePriceingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(TimePriceingModel).initialFilter
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
    dataModel: TimePriceingModel,
    newTimePriceingButtonClick: timePriceingUIEvents.newTimePriceingButtonClick,
    openEditTimePriceingPage: timePriceingUIEvents.openEditTimePriceingPage,
    openDeleteTimePriceingDialog: timePriceingUIEvents.openDeleteTimePriceingDialog,
    openDeleteTimePriceingDialog: timePriceingUIEvents.openDeleteTimePriceingDialog,
    openFetchTimePriceingDialog: timePriceingUIEvents.openFetchTimePriceingDialog,
    openUpdateTimePriceingStatusDialog: timePriceingUIEvents.openUpdateTimePriceingStatusDialog,
  };
  return (
    <TimePriceingUIContext.Provider value={value}>{children}</TimePriceingUIContext.Provider>
  );
}