import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CashModel } from "../../../../../core/_models/General/CashModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CashsUIContext = createContext();

export function useCashsUIContext() {
  return useContext(CashsUIContext);
}

export const CashsUIConsumer = CashsUIContext.Consumer;

export function CashsUIProvider({ cashsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CashModel).initialFilter
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
    dataModel: CashModel,
    newCashButtonClick: cashsUIEvents.newCashButtonClick,
    openEditCashPage: cashsUIEvents.openEditCashPage,
    openDeleteCashDialog: cashsUIEvents.openDeleteCashDialog,
    openDeleteCashsDialog: cashsUIEvents.openDeleteCashsDialog,
    openFetchCashsDialog: cashsUIEvents.openFetchCashsDialog,
    openUpdateCashsStatusDialog: cashsUIEvents.openUpdateCashsStatusDialog,
  };
  return (
    <CashsUIContext.Provider value={value}>{children}</CashsUIContext.Provider>
  );
}
