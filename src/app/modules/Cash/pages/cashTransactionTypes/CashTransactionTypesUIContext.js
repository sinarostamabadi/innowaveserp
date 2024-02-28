import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CashTransactionTypeModel } from "../../../../../core/_models/Cash/CashTransactionTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CashTransactionTypesUIContext = createContext();

export function useCashTransactionTypesUIContext() {
  return useContext(CashTransactionTypesUIContext);
}

export const CashTransactionTypesUIConsumer =
  CashTransactionTypesUIContext.Consumer;

export function CashTransactionTypesUIProvider({
  cashTransactionTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CashTransactionTypeModel).initialFilter
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
    dataModel: CashTransactionTypeModel,
    newCashTransactionTypeButtonClick:
      cashTransactionTypesUIEvents.newCashTransactionTypeButtonClick,
    openEditCashTransactionTypePage:
      cashTransactionTypesUIEvents.openEditCashTransactionTypePage,
    openDeleteCashTransactionTypeDialog:
      cashTransactionTypesUIEvents.openDeleteCashTransactionTypeDialog,
    openDeleteCashTransactionTypesDialog:
      cashTransactionTypesUIEvents.openDeleteCashTransactionTypesDialog,
    openFetchCashTransactionTypesDialog:
      cashTransactionTypesUIEvents.openFetchCashTransactionTypesDialog,
    openUpdateCashTransactionTypesStatusDialog:
      cashTransactionTypesUIEvents.openUpdateCashTransactionTypesStatusDialog,
  };
  return (
    <CashTransactionTypesUIContext.Provider value={value}>
      {children}
    </CashTransactionTypesUIContext.Provider>
  );
}
