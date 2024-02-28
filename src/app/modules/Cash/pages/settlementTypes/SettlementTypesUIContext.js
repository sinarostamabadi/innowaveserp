import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SettlementTypeModel } from "../../../../../core/_models/Cash/SettlementTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SettlementTypesUIContext = createContext();

export function useSettlementTypesUIContext() {
  return useContext(SettlementTypesUIContext);
}

export const SettlementTypesUIConsumer = SettlementTypesUIContext.Consumer;

export function SettlementTypesUIProvider({
  settlementTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SettlementTypeModel).initialFilter
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
    dataModel: SettlementTypeModel,
    newSettlementTypeButtonClick:
      settlementTypesUIEvents.newSettlementTypeButtonClick,
    openEditSettlementTypePage:
      settlementTypesUIEvents.openEditSettlementTypePage,
    openDeleteSettlementTypeDialog:
      settlementTypesUIEvents.openDeleteSettlementTypeDialog,
    openDeleteSettlementTypesDialog:
      settlementTypesUIEvents.openDeleteSettlementTypesDialog,
    openFetchSettlementTypesDialog:
      settlementTypesUIEvents.openFetchSettlementTypesDialog,
    openUpdateSettlementTypesStatusDialog:
      settlementTypesUIEvents.openUpdateSettlementTypesStatusDialog,
  };
  return (
    <SettlementTypesUIContext.Provider value={value}>
      {children}
    </SettlementTypesUIContext.Provider>
  );
}
