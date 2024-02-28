import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { LoginHistoryModel } from "../../../../../core/_models/Security/LoginHistoryModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const LoginHistoriesUIContext = createContext();

export function useLoginHistoriesUIContext() {
  return useContext(LoginHistoriesUIContext);
}

export const LoginHistoriesUIConsumer = LoginHistoriesUIContext.Consumer;

export function LoginHistoriesUIProvider({ loginHistoriesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(LoginHistoryModel).initialFilter
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
    dataModel: LoginHistoryModel,
    newLoginHistoryButtonClick:
      loginHistoriesUIEvents.newLoginHistoryButtonClick,
    openEditLoginHistoryPage: loginHistoriesUIEvents.openEditLoginHistoryPage,
    openDeleteLoginHistoryDialog:
      loginHistoriesUIEvents.openDeleteLoginHistoryDialog,
    openDeleteLoginHistoriesDialog:
      loginHistoriesUIEvents.openDeleteLoginHistoriesDialog,
    openFetchLoginHistoriesDialog:
      loginHistoriesUIEvents.openFetchLoginHistoriesDialog,
    openUpdateLoginHistoriesStatusDialog:
      loginHistoriesUIEvents.openUpdateLoginHistoriesStatusDialog,
  };
  return (
    <LoginHistoriesUIContext.Provider value={value}>
      {children}
    </LoginHistoriesUIContext.Provider>
  );
}
