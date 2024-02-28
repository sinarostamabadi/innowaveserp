import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { LoginStatusModel } from "../../../../../core/_models/Security/LoginStatusModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const LoginStatusesUIContext = createContext();

export function useLoginStatusesUIContext() {
  return useContext(LoginStatusesUIContext);
}

export const LoginStatusesUIConsumer = LoginStatusesUIContext.Consumer;

export function LoginStatusesUIProvider({ loginStatusesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(LoginStatusModel).initialFilter
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
    dataModel: LoginStatusModel,
    newLoginStatusButtonClick: loginStatusesUIEvents.newLoginStatusButtonClick,
    openEditLoginStatusPage: loginStatusesUIEvents.openEditLoginStatusPage,
    openDeleteLoginStatusDialog:
      loginStatusesUIEvents.openDeleteLoginStatusDialog,
    openDeleteLoginStatusesDialog:
      loginStatusesUIEvents.openDeleteLoginStatusesDialog,
    openFetchLoginStatusesDialog:
      loginStatusesUIEvents.openFetchLoginStatusesDialog,
    openUpdateLoginStatusesStatusDialog:
      loginStatusesUIEvents.openUpdateLoginStatusesStatusDialog,
  };
  return (
    <LoginStatusesUIContext.Provider value={value}>
      {children}
    </LoginStatusesUIContext.Provider>
  );
}
