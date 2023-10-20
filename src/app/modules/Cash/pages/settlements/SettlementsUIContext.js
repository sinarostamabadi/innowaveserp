
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SettlementModel } from "../../../../../core/_models/Cash/SettlementModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SettlementsUIContext = createContext();

export function useSettlementsUIContext() {
  return useContext(SettlementsUIContext);
}

export const SettlementsUIConsumer = SettlementsUIContext.Consumer;

export function SettlementsUIProvider({ settlementsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SettlementModel).initialFilter
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
    dataModel: SettlementModel,
    newSettlementButtonClick: settlementsUIEvents.newSettlementButtonClick,
    openEditSettlementPage: settlementsUIEvents.openEditSettlementPage,
    openDeleteSettlementDialog: settlementsUIEvents.openDeleteSettlementDialog,
    openDeleteSettlementsDialog: settlementsUIEvents.openDeleteSettlementsDialog,
    openFetchSettlementsDialog: settlementsUIEvents.openFetchSettlementsDialog,
    openUpdateSettlementsStatusDialog: settlementsUIEvents.openUpdateSettlementsStatusDialog,
  };
  return (
    <SettlementsUIContext.Provider value={value}>{children}</SettlementsUIContext.Provider>
  );
}