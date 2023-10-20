
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AccountFloatingModel } from "../../../../../core/_models/Accounting/AccountFloatingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AccountFloatingUIContext = createContext();

export function useAccountFloatingUIContext() {
  return useContext(AccountFloatingUIContext);
}

export const AccountFloatingUIConsumer = AccountFloatingUIContext.Consumer;

export function AccountFloatingUIProvider({ accountFloatingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AccountFloatingModel).initialFilter
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
    dataModel: AccountFloatingModel,
    newAccountFloatingButtonClick: accountFloatingUIEvents.newAccountFloatingButtonClick,
    openEditAccountFloatingPage: accountFloatingUIEvents.openEditAccountFloatingPage,
    openDeleteAccountFloatingDialog: accountFloatingUIEvents.openDeleteAccountFloatingDialog,
    openDeleteAccountFloatingsDialog: accountFloatingUIEvents.openDeleteAccountFloatingDialog,
    openFetchAccountFloatingDialog: accountFloatingUIEvents.openFetchAccountFloatingDialog,
    openUpdateAccountFloatingStatusDialog: accountFloatingUIEvents.openUpdateAccountFloatingStatusDialog,
  };
  return (
    <AccountFloatingUIContext.Provider value={value}>{children}</AccountFloatingUIContext.Provider>
  );
}